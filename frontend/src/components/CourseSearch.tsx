import React, { useState } from 'react';

interface Course {
  course_id: string;
  name: string;
  credits: string;
  description: string;
  department: string;
}

const CourseSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);

  const searchCourses = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setCourses([]);
      return;
    }

    setLoading(true);
    try {
      // Use relative URL - will work in both dev and production
      const response = await fetch(`/api/courses/search?q=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        setBackendAvailable(true);
      } else {
        throw new Error('Backend not available');
      }
    } catch (error) {
      console.error('Backend not available, using demo mode');
      setBackendAvailable(false);
      // Fallback to demo data
      setCourses([
        {
          course_id: 'CMSC131',
          name: 'Object-Oriented Programming I',
          credits: '4',
          description: 'Introduction to computer programming...',
          department: 'Computer Science'
        },
        {
          course_id: 'MATH140',
          name: 'Calculus I',
          credits: '4', 
          description: 'Differential calculus...',
          department: 'Mathematics'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    searchCourses(value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Search Courses</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses (e.g., CMSC131, MATH140, Computer Science)..."
          value={query}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-umd-red"
        />
        {loading && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-umd-red"></div>
          </div>
        )}
      </div>
      
      {!backendAvailable && (
        <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded text-sm">
          Demo mode: Showing sample courses (backend not available)
        </div>
      )}
      
      {courses.length > 0 && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <div className="p-3 bg-gray-50 border-b">
            <span className="font-medium text-gray-700">
              Found {courses.length} courses
            </span>
          </div>
          {courses.map((course) => (
            <div
              key={course.course_id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-umd-red text-lg">
                    {course.course_id}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {course.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {course.department} • {course.credits} credits
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  {course.credits} cr
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2 line-clamp-2">
                {course.description}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSearch;