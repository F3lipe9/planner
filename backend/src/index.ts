import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query, testConnection } from './db';
import { courseService } from './services/umdioService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health check endpoint
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

// Course search endpoint
app.get('/api/courses/search', async (req, res) => {
  const { q } = req.query;
  
  console.log(`📝 Received course search request for: "${q}"`);
  
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  try {
    const courses = await umdioService.searchCourses(q);
    console.log(`📊 Returning ${courses.length} courses to frontend`);
    
    // Log first course if available for debugging
    if (courses.length > 0) {
      console.log(`📋 Sample course: ${courses[0].course_id} - ${courses[0].name}`);
    }
    
    res.json(courses);
  } catch (error) {
    console.error('❌ Error in course search:', error);
    res.status(500).json({ error: 'Failed to search courses' });
  }
});

// Get specific course by ID
app.get('/api/courses/:courseId', async (req, res) => {
  const { courseId } = req.params;
  
  console.log(`📝 Fetching course: ${courseId}`);
  
  try {
    const course = await umdioService.getCourse(courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error('❌ Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Test UMD.io connection directly
app.get('/api/test-umdio', async (req, res) => {
  try {
    const response = await fetch('https://api.umd.io/v1/courses');
    const data = await response.json();
    res.json({
      totalCourses: data.length,
      sampleCourses: data.slice(0, 5),
      status: 'SUCCESS'
    });
  } catch (error: any) {
    res.json({
      error: error.message,
      status: 'FAILED'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});// Deployment trigger
 
