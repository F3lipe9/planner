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
    database: dbConnected ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString()
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
        prerequisites TEXT,
        average_gpa DECIMAL(3,2),
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
    const courses = await courseService.searchCourses(q);
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
    const course = await courseService.getCourse(courseId);
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

// Get courses by department
app.get('/api/courses/department/:dept', async (req, res) => {
  const { dept } = req.params;
  
  console.log(`📝 Fetching courses for department: ${dept}`);
  
  try {
    // For now, we'll search by department name
    const courses = await courseService.searchCourses(dept);
    const departmentCourses = courses.filter(course => 
      course.department.toLowerCase().includes(dept.toLowerCase()) ||
      course.dept_id?.toLowerCase().includes(dept.toLowerCase())
    );
    
    res.json(departmentCourses);
  } catch (error) {
    console.error('❌ Error fetching department courses:', error);
    res.status(500).json({ error: 'Failed to fetch department courses' });
  }
});

// Debug endpoint to see what courses are available from PlanetTerp
app.get('/api/debug/courses', async (req, res) => {
  try {
    const { limit = '50' } = req.query;
    const response = await fetch('https://planetterp.com/api/v1/courses');
    const allCourses = await response.json();
    
    // Get unique departments
    const departments = [...new Set(allCourses
      .filter((course: any) => course.department)
      .map((course: any) => course.department)
    )].sort();
    
    // Get sample of courses
    const sampleCourses = allCourses
      .slice(0, parseInt(limit as string))
      .map((course: any) => ({
        course_id: course.name,
        name: course.title,
        department: course.department,
        credits: course.credits,
        description: course.description ? course.description.substring(0, 100) + '...' : 'No description',
        prerequisites: course.prerequisites,
        average_gpa: course.average_gpa
      }));
    
    res.json({
      totalCourses: allCourses.length,
      departments: departments.slice(0, 20), // First 20 departments
      sampleCourses: sampleCourses,
      planetTerpStatus: 'Connected'
    });
  } catch (error: any) {
    res.status(500).json({ 
      error: error.message,
      planetTerpStatus: 'Failed'
    });
  }
});

// Test PlanetTerp connection directly
app.get('/api/test-planetterp', async (req, res) => {
  try {
    const response = await fetch('https://planetterp.com/api/v1/courses');
    const data = await response.json();
    
    // Count courses by popular departments
    const deptCounts: { [key: string]: number } = {};
    data.forEach((course: any) => {
      if (course.department) {
        deptCounts[course.department] = (deptCounts[course.department] || 0) + 1;
      }
    });
    
    // Get top departments
    const topDepartments = Object.entries(deptCounts)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 10)
      .map(([dept, count]) => ({ department: dept, courseCount: count }));
    
    res.json({
      totalCourses: data.length,
      topDepartments: topDepartments,
      sampleCourse: data.find((course: any) => course.name === 'CMSC131') || 'CMSC131 not found',
      status: 'SUCCESS'
    });
  } catch (error: any) {
    res.json({
      error: error.message,
      status: 'FAILED'
    });
  }
});

// Majors endpoint (placeholder for future development)
app.get('/api/majors', async (req, res) => {
  const popularMajors = [
    { code: 'COMPSCI', name: 'Computer Science', department: 'Computer Science' },
    { code: 'ENGL', name: 'English', department: 'English' },
    { code: 'BIO', name: 'Biological Sciences', department: 'Biology' },
    { code: 'PSYC', name: 'Psychology', department: 'Psychology' },
    { code: 'ECON', name: 'Economics', department: 'Economics' },
    { code: 'MATH', name: 'Mathematics', department: 'Mathematics' },
    { code: 'CHEM', name: 'Chemistry', department: 'Chemistry' },
    { code: 'PHYS', name: 'Physics', department: 'Physics' },
    { code: 'HIST', name: 'History', department: 'History' },
    { code: 'BMGT', name: 'Business Management', department: 'Business' }
  ];
  
  res.json(popularMajors);
});

// Plan generation endpoint (placeholder for future development)
app.post('/api/plans/generate', async (req, res) => {
  const { major, completedCourses, startYear, preferences } = req.body;
  
  console.log(`📝 Generating plan for: ${major}, start year: ${startYear}`);
  
  // Placeholder response - will implement actual planning logic later
  res.json({
    plan: {
      major: major,
      startYear: startYear,
      semesters: [],
      generatedAt: new Date().toISOString(),
      status: 'placeholder'
    },
    message: 'Plan generation endpoint - to be implemented'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'UMD 4-Year Planner API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      courseSearch: '/api/courses/search?q=:query',
      courseDetails: '/api/courses/:courseId',
      departmentCourses: '/api/courses/department/:dept',
      majors: '/api/majors',
      planGeneration: '/api/plans/generate (POST)',
      debug: '/api/debug/courses'
    },
    documentation: 'https://github.com/your-username/umd-planner'
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET  /api/health',
      'GET  /api/courses/search?q=:query',
      'GET  /api/courses/:courseId',
      'GET  /api/courses/department/:dept',
      'GET  /api/majors',
      'POST /api/plans/generate',
      'GET  /api/debug/courses',
      'GET  /api/test-planetterp'
    ]
  });
});

// Error handling middleware
app.use((error: any, req: any, res: any, next: any) => {
  console.error('🚨 Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 UMD Planner API server running on port ${PORT}`);
  console.log(`📚 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Course search: http://localhost:${PORT}/api/courses/search?q=CMSC`);
});