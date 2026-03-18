import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Dr. Mahee's Implant & Aesthetic Dental Clinic" },
  heroSubtitle: { type: String, default: "Your smile is our priority. Expert dental care for a brighter future." },
  aboutText: { type: String, default: "Dr. Mahee is a renowned expert in implant and aesthetic dentistry, dedicated to providing the highest quality care." },
  phone: { type: String, default: "+1 234 567 890" },
  address: { type: String, default: "123 Dental Street, Medical City" },
  services: [{
    title: String,
    description: String,
    icon: String
  }],
  testimonials: [{
    name: String,
    text: String,
    rating: Number
  }]
});

export const Content = mongoose.model('Content', contentSchema);
