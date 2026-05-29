import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../services/db.js';
import { authMiddleware } from '../middleware/auth.js';

export const authRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Register
authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.execute({
      sql: 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      args: [name, email, hashedPassword]
    });

    const user = { id: result.lastInsertRowid, name, email, tier: 'free' };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email]
    });

    const userRecord = result.rows[0];

    if (!userRecord || !(await bcrypt.compare(password, userRecord.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = { 
      id: userRecord.id, 
      name: userRecord.name, 
      email: userRecord.email, 
      tier: userRecord.tier 
    };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });

    res.json({ user, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Me
authRouter.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await db.execute({
      sql: 'SELECT id, name, email, tier, created_at FROM users WHERE id = ?',
      args: [req.user.id]
    });

    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout (mostly frontend responsibility to clear token, but can be a placeholder)
authRouter.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});
