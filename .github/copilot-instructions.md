# UMD Planner AI Assistant Instructions

## Project Overview
UMD Planner is a web application that helps University of Maryland students plan their 4-year academic journey. The project consists of:
- Frontend: React application with Tailwind CSS
- Backend: Express.js API server integrating with PlanetTerp API for course data

## Key Components

### Backend Architecture
- `src/index.ts`: Main Express server with API routes
- `src/db.ts`: Database connection and query utilities
- `src/services/umdioService.ts`: PlanetTerp API integration service

### Frontend Architecture
- `src/App.tsx`: Main React application component
- `src/components/CourseSearch.tsx`: Course search interface with live API integration

## Development Workflows

### API Integration
- PlanetTerp API is the primary data source for course information
- Base URL: https://planner-production-afa3.up.railway.app/api
- Key endpoints:
  - `/courses/search?q=:query` - Course search
  - `/courses/:courseId` - Course details
  - `/courses/department/:dept` - Department courses

### Common Patterns

#### Error Handling
```typescript
try {
  // API calls or database operations
} catch (error: any) {
  console.error('❌ Error:', error);
  res.status(500).json({ 
    error: error.message,
    status: 'FAILED'
  });
}
```

#### API Response Format
```typescript
interface Course {
  course_id: string;
  name: string;
  credits: string;
  description: string;
  department: string;
  prerequisites?: string;
  average_gpa?: number;
}
```

#### Component State Management
Frontend components use React hooks for state management:
```typescript
const [query, setQuery] = useState('');
const [courses, setCourses] = useState<Course[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Development Guidelines

1. **API Calls**
   - Always include error handling and loading states
   - Use the `API_BASE_URL` constant for endpoints
   - Log significant operations and errors

2. **UI Components**
   - Follow Tailwind CSS patterns for consistent styling
   - Use semantic HTML elements
   - Include loading indicators and error states
   - Format data presentation (GPA colors, course descriptions)

3. **Type Safety**
   - Define interfaces for API responses and component props
   - Use TypeScript strict mode

4. **Database Operations**
   - Use parameterized queries for safety
   - Include proper error handling
   - Test connections before operations

## Common Tasks

### Adding a New API Endpoint
1. Add route in `backend/src/index.ts`
2. Implement error handling
3. Add TypeScript interfaces if needed
4. Update frontend API client if required

### Creating UI Components
1. Follow existing component structure in `frontend/src/components`
2. Include loading and error states
3. Use Tailwind CSS for styling
4. Implement responsive design

## Testing
- Frontend: React Testing Library for component tests
- Backend: API endpoint testing with appropriate error cases
- Integration: Test PlanetTerp API integration thoroughly

## Deployment
- Backend deployed on Railway
- Environment variables required for deployment
- Database initialization handled by `/api/init-db` endpoint

## Additional Resources
- [PlanetTerp API Documentation](https://planetterp.com/api)
- [Railway Deployment Documentation](https://docs.railway.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)