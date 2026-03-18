import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, User, CheckCircle, Clock3, XCircle, CheckCircle2 } from 'lucide-react';
import api from '../api/axios';
import { toast } from 'react-toastify';

export default function CheckStatus() {
  const [searchId, setSearchId] = useState('');
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId) return;
    setLoading(true);
    try {
      const res = await api.get(`/appointments/status/${searchId}`);
      setAppointment(res.data);
    } catch (err) {
      toast.error('No appointment found with this ID or phone number.');
      setAppointment(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock3 className="text-amber-500" />;
      case 'Approved': return <CheckCircle className="text-sky-500" />;
      case 'Rejected': return <XCircle className="text-red-500" />;
      case 'Completed': return <CheckCircle2 className="text-green-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Approved': return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'Rejected': return 'bg-red-50 text-red-700 border-red-100';
      case 'Completed': return 'bg-green-50 text-green-700 border-green-100';
      default: return '';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Check Appointment Status</h1>
          <p className="text-slate-600">Enter your Appointment ID or Phone Number to track your visit.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 mb-12"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Appointment ID or Phone Number"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-600 transition-all shadow-lg shadow-sky-200 disabled:opacity-70"
            >
              {loading ? 'Searching...' : 'Check Status'}
            </button>
          </form>
        </motion.div>

        {appointment && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-slate-100 gap-4">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">Appointment ID</p>
                <h3 className="text-2xl font-mono font-bold text-slate-900">{appointment.appointmentId}</h3>
              </div>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(appointment.status)}`}>
                {getStatusIcon(appointment.status)}
                <span className="font-bold">{appointment.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <User className="text-slate-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Patient Name</p>
                    <p className="text-slate-800 font-semibold">{appointment.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <Calendar className="text-slate-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Date</p>
                    <p className="text-slate-800 font-semibold">{new Date(appointment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-slate-50 p-3 rounded-xl">
                    <Clock className="text-slate-400 h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Time Slot</p>
                    <p className="text-slate-800 font-semibold">{appointment.time}</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">Problem Description</p>
                <p className="text-slate-600 text-sm italic leading-relaxed">
                  "{appointment.problem}"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
