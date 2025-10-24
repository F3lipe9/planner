import React, { useState } from 'react';

interface Course {
  course_id: string;
  name: string;
  credits: string;
  description: string;
  department: string;
  dept_id?: string;
  prerequisites?: string;
  gen_ed?: string[];
  average_gpa?: number;
}

const CourseSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use the full backend URL directly (no proxy)
  const API_BASE_URL = 'https://planner-production-afa3.up.railway.app/api';

  const searchCourses = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setCourses([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log(`🔍 Calling: ${API_BASE_URL}/courses/search?q=${searchQuery}`);
      const response = await fetch(`${API_BASE_URL}/courses/search?q=${searchQuery}`);
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
        
        if (data.length === 0) {
          setError('No courses found. Try a different search term.');
        } else {
          console.log(`✅ Found ${data.length} courses`);
        }
      } else {
        throw new Error(`Backend returned ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Backend error:', error);
      setError('Failed to connect to course database. Please try again.');
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    setTimeout(() => {
      searchCourses(value);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchCourses(query);
    }
  };

  const getGpaColor = (gpa?: number) => {
    if (!gpa) return 'bg-gray-100 text-gray-800';
    if (gpa >= 3.5) return 'bg-green-100 text-green-800';
    if (gpa >= 3.0) return 'bg-blue-100 text-blue-800';
    if (gpa >= 2.5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDescription = (description: string) => {
    // Remove HTML tags and format newlines
    return description
      .replace(/<[^>]*>/g, '')
      .replace(/\n/g, '\n\n');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Search UMD Courses</h3>
      
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search by course code, name, or department (e.g., CMSC131, Calculus, Computer Science)..."
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-umd-red focus:border-transparent text-lg"
          disabled={loading}
        />
        
        {loading && (
          <div className="absolute right-4 top-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-umd-red"></div>
          </div>
        )}
        
        {!loading && query.length >= 2 && (
          <div className="absolute right-4 top-4">
            <span className="text-gray-500">↵</span>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {/* Search Results */}
      {courses.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">
                📚 Found {courses.length} course{courses.length !== 1 ? 's' : ''}
              </span>
              <span className="text-sm text-green-600 font-medium">✅ Live Data</span>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {courses.map((course, index) => (
              <div
                key={`${course.course_id}-${index}`}
                className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex flex-col gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="font-bold text-umd-red text-lg">
                          {course.course_id}
                        </div>
                        <div className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded font-medium">
                          {course.credits} cr
                        </div>
                        {course.average_gpa && (
                          <div className={`text-sm px-2 py-1 rounded font-medium ${getGpaColor(course.average_gpa)}`}>
                            GPA: {course.average_gpa.toFixed(2)}
                          </div>
                        )}
                      </div>
                      {course.gen_ed && course.gen_ed.length > 0 && (
                        <div className="flex gap-1 flex-wrap items-center">
                          <span className="text-xs font-medium text-gray-500">GenEd:</span>
                          {course.gen_ed.map((genEd, i) => (
                            <div key={i} className="text-xs px-2 py-1 rounded-full font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                              {genEd}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-md font-semibold text-gray-800 mb-1">
                      {course.name}
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      {course.department} {course.dept_id && `(${course.dept_id})`}
                    </div>
                    
                    {course.prerequisites && (
                      <div className="text-xs text-orange-600 mb-2">
                        <strong>Prerequisites:</strong> {course.prerequisites}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {formatDescription(course.description)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Tips */}
      {query.length === 0 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">💡 Search Tips:</h4>
          <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
            <li>Search by course code: <code className="bg-gray-200 px-1 rounded">CMSC131</code></li>
            <li>Search by course name: <code className="bg-gray-200 px-1 rounded">Calculus</code></li>
            <li>Search by department: <code className="bg-gray-200 px-1 rounded">Computer Science</code></li>
            <li>Need at least 2 characters to search</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseSearch;