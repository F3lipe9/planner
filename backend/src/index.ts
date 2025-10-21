import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query, testConnection } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test database connection
app.get('/api/health', async (req, res) => {
  const dbConnected = await testConnection();
  res.json({ 
    status: 'OK', 
    message: 'UMD Planner API is running',
    database: dbConnected ? 'Connected' : 'Disconnected'
  });
});

// Initialize database tables
app.get('/api/init-db', async (req, res) => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        course_code VARCHAR(20) UNIQUE NOT NULL,
        title TEXT NOT NULL,
        credits INTEGER NOT NULL,
        description TEXT,
        department VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    res.json({ message: 'Database tables created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database initialization failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});