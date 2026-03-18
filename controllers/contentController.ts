import { Request, Response } from 'express';
import { Content } from '../models/Content';

export const getContent = async (req: Request, res: Response) => {
  try {
    let content = await Content.findOne();
    if (!content) {
      content = await Content.create({});
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(content);
  } catch (error) {
    res.status(400).json({ message: 'Error updating content' });
  }
};
