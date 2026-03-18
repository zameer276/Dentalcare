import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star, Users, Calendar } from 'lucide-react';
import api from '../api/axios';
import Loading from '../components/Loading';

export default function Home() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get('/content');
        setContent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-slate-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                {content?.heroTitle || "Dr. Mahee's Implant & Aesthetic Dental Clinic"}
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-lg">
                {content?.heroSubtitle || "Your smile is our priority. Expert dental care for a brighter future."}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/book"
                  className="px-8 py-4 bg-sky-500 text-white rounded-full font-bold hover:bg-sky-600 transition-all flex items-center justify-center"
                >
                  Book Appointment <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
                >
                  Our Services
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                  alt="Modern Dental Clinic"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-sky-100 p-3 rounded-full">
                    <ShieldCheck className="text-sky-500 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">100% Safe</p>
                    <p className="text-xs text-slate-500">Certified Procedures</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Happy Patients', value: '5000+', icon: Users },
              { label: 'Years Experience', value: '15+', icon: Star },
              { label: 'Dental Implants', value: '1200+', icon: ShieldCheck },
              { label: 'Monthly Visits', value: '300+', icon: Calendar },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 text-sky-500 mx-auto mb-4" />
                <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Specializations</h2>
          <p className="text-slate-600 mb-12 max-w-2xl mx-auto">
            We offer a wide range of dental services using the latest technology to ensure your comfort and satisfaction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(content?.services?.slice(0, 3) || [
              { title: 'Dental Implants', description: 'Permanent solution for missing teeth with natural look and feel.' },
              { title: 'Aesthetic Dentistry', description: 'Enhance your smile with veneers, whitening, and more.' },
              { title: 'Orthodontics', description: 'Straighten your teeth with modern braces or clear aligners.' },
            ]).map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-left border border-slate-100"
              >
                <div className="bg-sky-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Star className="text-sky-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/services" className="text-sky-500 font-bold hover:text-sky-600 inline-flex items-center">
              View All Services <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Patients Say</h2>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 text-yellow-400 fill-current" />)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content?.testimonials || [
              { name: 'John Doe', text: 'Best dental experience ever! Dr. Mahee is very professional and the clinic is top-notch.', rating: 5 },
              { name: 'Sarah Smith', text: 'I got my implants here and I couldn\'t be happier. The process was smooth and painless.', rating: 5 },
              { name: 'Mike Johnson', text: 'Highly recommend for anyone looking for aesthetic dental work. My smile has never looked better.', rating: 5 },
            ]).map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-slate-50 p-8 rounded-2xl"
              >
                <p className="text-slate-600 italic mb-6">"{t.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <p className="font-bold text-slate-800">{t.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
