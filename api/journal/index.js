import connectDB from '../utils/db.js';
import { JournalEntry } from '../utils/models.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    await connectDB();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // GET JOURNAL ENTRIES
    if (req.method === "GET") {

      if (req.query.type === "analysis") {
        const entries = await JournalEntry.find({ userId })
          .sort({ date: 1 })
          .limit(7);

        const analysis = entries.map((e) => ({
          name: new Date(e.date).toLocaleDateString("en-US", {
            weekday: "short"
          }),
          clarity: e.clarity || 50,
          energy: e.energy || 50,
          sentiment: e.sentiment
        }));

        return res.status(200).json(analysis);
      }

      const entries = await JournalEntry.find({ userId }).sort({ date: -1 });

      return res.status(200).json(entries);
    }

    // CREATE ENTRY
    if (req.method === "POST") {

      const { content, sentiment, insight, clarity, energy } = req.body;

      const entry = await JournalEntry.create({
        userId,
        content,
        sentiment,
        insight,
        clarity: clarity || 50,
        energy: energy || 50
      });

      return res.status(201).json(entry);
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
}