import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// API Handlers
import signupHandler from './api/auth/signup.js';
import loginHandler from './api/auth/login.js';
import analyzeHandler from './api/journal/analyze.js';
import journalIndexHandler from './api/journal/index.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper to convert Vercel handler to Express route
const wrapHandler = (handler) => async (req, res) => {
  try {
    // Vercel handlers use res.status().json() which Express also supports
    // but some might use helper methods not in basic Express
    await handler(req, res);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// Routes
app.post('/api/auth/signup', wrapHandler(signupHandler));
app.post('/api/auth/login', wrapHandler(loginHandler));
app.post('/api/journal/analyze', wrapHandler(analyzeHandler));
app.all('/api/journal', wrapHandler(journalIndexHandler));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`🚀 API Server running at http://localhost:${PORT}`);
});
