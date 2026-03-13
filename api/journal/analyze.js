import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    const { content } = req.body;

    // Simulated AI analysis logic
    // In a real app, this would call Gemini or another LLM
    const sentiments = ["Reflective", "Calm", "Optimistic", "Resilient", "Aware"];
    const chosenSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

    const response = {
      sentiment: chosenSentiment,
      insight: `Based on your writing, you seem to be in a ${chosenSentiment.toLowerCase()} state. Your focus on growth is evident.`,
      suggestion: "What would happen if you leaned even deeper into this feeling today?"
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
