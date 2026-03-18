import express from 'express';
import { getContent, updateContent } from '../controllers/contentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getContent);
router.put('/', protect, updateContent);

export default router;
