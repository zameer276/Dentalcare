import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-6">Dr. Mahee's Dental</h3>
            <p className="text-sm leading-relaxed mb-6">
              Providing world-class implant and aesthetic dental services. Your smile is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-sky-500 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-sky-500 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-sky-500 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-sky-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-sky-500 transition-colors">About Doctor</Link></li>
              <li><Link to="/services" className="hover:text-sky-500 transition-colors">Our Services</Link></li>
              <li><Link to="/book" className="hover:text-sky-500 transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Services</h4>
            <ul className="space-y-4 text-sm">
              <li>Dental Implants</li>
              <li>Teeth Whitening</li>
              <li>Root Canal Treatment</li>
              <li>Orthodontics</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-sky-500 shrink-0" />
                <span>123 Dental Street, Medical City, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-sky-500 shrink-0" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-sky-500 shrink-0" />
                <span>info@drmahee.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Dr. Mahee's Implant & Aesthetic Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
