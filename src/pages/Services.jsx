import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, Zap, Heart, Activity, Sparkles } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: "Dental Implants",
      description: "State-of-the-art titanium implants to replace missing teeth permanently.",
      icon: Shield,
      color: "bg-blue-50 text-blue-500"
    },
    {
      title: "Aesthetic Dentistry",
      description: "Veneers, bonding, and smile makeovers for a perfect appearance.",
      icon: Sparkles,
      color: "bg-purple-50 text-purple-500"
    },
    {
      title: "Teeth Whitening",
      description: "Professional laser whitening for a brighter, more confident smile.",
      icon: Zap,
      color: "bg-yellow-50 text-yellow-500"
    },
    {
      title: "Orthodontics",
      description: "Invisalign and modern braces to align your teeth perfectly.",
      icon: Activity,
      color: "bg-green-50 text-green-500"
    },
    {
      title: "Root Canal",
      description: "Painless root canal treatments using advanced rotary technology.",
      icon: Heart,
      color: "bg-red-50 text-red-500"
    },
    {
      title: "General Checkup",
      description: "Comprehensive oral exams and professional cleaning services.",
      icon: Star,
      color: "bg-sky-50 text-sky-500"
    }
  ];

  return (
    <div className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Our Expert Services
          </motion.h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We provide a comprehensive range of dental treatments tailored to your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${service.color}`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
