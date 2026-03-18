import { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';

export const bookAppointment = async (req: Request, res: Response) => {
  try {
    const appointmentId = 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const appointment = await Appointment.create({ ...req.body, appointmentId });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error booking appointment' });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

export const getAppointmentStatus = async (req: Request, res: Response) => {
  const { id } = req.params; // id can be appointmentId or phone
  try {
    const appointment = await Appointment.findOne({
      $or: [{ appointmentId: id }, { phone: id }]
    });
    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching status' });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating appointment' });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting appointment' });
  }
};
