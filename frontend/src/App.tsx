import React from 'react';
import './index.css';
import CourseSearch from './components/CourseSearch';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-umd-red text-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold">UMD 4-Year Planner</h1>
          <p className="mt-2">Plan your perfect 4 years at University of Maryland</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the UMD Planner!</h2>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              This tool helps you plan your entire UMD journey. Search for courses and start building your 4-year plan.
            </p>
          </div>

          {/* Course Search Component */}
          <CourseSearch />
        </div>
      </div>
    </div>
  );
}

export default App;