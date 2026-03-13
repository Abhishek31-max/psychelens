import connectDB from '../utils/db';
import { JournalEntry } from '../utils/models';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    await connectDB();

    if (req.method === 'GET') {
      const entries = await JournalEntry.find({ userId }).sort({ date: -1 });
      return res.status(200).json(entries);
    }

    if (req.method === 'POST') {
      const { content, sentiment, insight } = req.body;
      const entry = await JournalEntry.create({
        userId,
        content,
        sentiment,
        insight
      });
      return res.status(201).json(entry);
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
