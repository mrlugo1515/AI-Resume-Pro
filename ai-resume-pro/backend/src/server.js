import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { optimizeRouter } from './routes/optimize.js';
import { aiRouter } from './routes/ai.js';
import { authRouter } from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Routes (order matters — public routes before auth-protected ones)
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRouter);
app.use('/api/optimize', optimizeRouter);
app.use('/api', aiRouter);          // /api/resume/optimize, /api/cover-letter/generate, /api/ai/test

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Resume Pro backend running on port ${PORT}`);
});