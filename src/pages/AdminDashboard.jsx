import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Trash2, 
  Settings, 
  LogOut,
  Phone,
  MapPin,
  FileText,
  Plus,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Loading from '../components/Loading';

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, contentRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/content')
      ]);
      setAppointments(appRes.data);
      setContent(contentRes.data);
    } catch (err) {
      toast.error('Failed to fetch data');
      if (err.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.put(`/appointments/${id}`, { status });
      toast.success(`Appointment ${status}`);
      fetchData();
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      toast.success('Appointment deleted');
      fetchData();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleContentUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/content', content);
      toast.success('Content updated successfully');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'Pending').length,
    approved: appointments.filter(a => a.status === 'Approved').length,
    completed: appointments.filter(a => a.status === 'Completed').length,
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white hidden lg:flex flex-col">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'appointments' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Calendar size={20} />
            <span>Appointments</span>
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <Settings size={20} />
            <span>Manage Content</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-slate-500">Welcome, Admin</span>
            <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-500 font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
          {activeTab === 'appointments' ? (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Total', value: stats.total, color: 'bg-blue-500', icon: Users },
                  { label: 'Pending', value: stats.pending, color: 'bg-amber-500', icon: Clock },
                  { label: 'Approved', value: stats.approved, color: 'bg-sky-500', icon: CheckCircle },
                  { label: 'Completed', value: stats.completed, color: 'bg-green-500', icon: CheckCircle },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-xl text-white`}>
                        <stat.icon size={24} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Appointments Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800">Recent Appointments</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Patient</th>
                        <th className="px-6 py-4 font-semibold">Date & Time</th>
                        <th className="px-6 py-4 font-semibold">Problem</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {appointments.map((app) => (
                        <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-800">{app.name}</p>
                            <p className="text-xs text-slate-500">{app.phone}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-800">{new Date(app.date).toLocaleDateString()}</p>
                            <p className="text-xs text-slate-500">{app.time}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-slate-600 max-w-xs truncate">{app.problem}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              app.status === 'Approved' ? 'bg-sky-100 text-sky-700' :
                              app.status === 'Completed' ? 'bg-green-100 text-green-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              {app.status === 'Pending' && (
                                <>
                                  <button onClick={() => handleStatusUpdate(app._id, 'Approved')} className="p-2 text-sky-500 hover:bg-sky-50 rounded-lg" title="Approve"><CheckCircle size={18} /></button>
                                  <button onClick={() => handleStatusUpdate(app._id, 'Rejected')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Reject"><X size={18} /></button>
                                </>
                              )}
                              {app.status === 'Approved' && (
                                <button onClick={() => handleStatusUpdate(app._id, 'Completed')} className="p-2 text-green-500 hover:bg-green-50 rounded-lg" title="Complete"><CheckCircle size={18} /></button>
                              )}
                              <button onClick={() => handleDelete(app._id)} className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-lg" title="Delete"><Trash2 size={18} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl">
              <form onSubmit={handleContentUpdate} className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 border-b pb-4">Hero Section</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Title</label>
                      <input
                        type="text"
                        value={content.heroTitle}
                        onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Subtitle</label>
                      <textarea
                        rows="2"
                        value={content.heroSubtitle}
                        onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 border-b pb-4">Clinic Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                      <input
                        type="text"
                        value={content.phone}
                        onChange={(e) => setContent({ ...content, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={content.address}
                        onChange={(e) => setContent({ ...content, address: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">About Text</label>
                      <textarea
                        rows="4"
                        value={content.aboutText}
                        onChange={(e) => setContent({ ...content, aboutText: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-sky-500 text-white rounded-xl font-bold hover:bg-sky-600 transition-all shadow-lg shadow-sky-200"
                  >
                    Save All Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
