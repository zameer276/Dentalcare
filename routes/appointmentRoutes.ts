import express from 'express';
import { 
  bookAppointment, 
  getAppointments, 
  getAppointmentStatus, 
  updateAppointment, 
  deleteAppointment 
} from '../controllers/appointmentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/book', bookAppointment);
router.get('/', protect, getAppointments);
router.get('/status/:id', getAppointmentStatus);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

export default router;
