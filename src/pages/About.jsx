import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Shield, Star } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            About Dr. Mahee
          </motion.h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Dedicated to excellence in implant and aesthetic dentistry with over 15 years of clinical experience.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&q=80&w=800" 
                alt="Doctor" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-slate-900">A Passion for Perfect Smiles</h2>
              <p className="text-slate-600 leading-relaxed">
                Dr. Mahee graduated from the prestigious International Dental College and completed advanced fellowships in Implantology and Aesthetic Dentistry from Germany and USA.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Our clinic was founded on the principle that every patient deserves a personalized, comfortable, and high-tech dental experience. We combine artistry with medical precision to deliver results that change lives.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-center space-x-3">
                  <Award className="text-sky-500" />
                  <span className="font-bold text-slate-800">Certified Expert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="text-sky-500" />
                  <span className="font-bold text-slate-800">Safe Procedures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="text-sky-500" />
                  <span className="font-bold text-slate-800">Patient Care</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="text-sky-500" />
                  <span className="font-bold text-slate-800">Top Rated</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
