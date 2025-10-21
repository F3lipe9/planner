import React, { useState, useEffect } from 'react';
import './index.css';
import CourseSearch from './components/CourseSearch';

function App() {
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');

  useEffect(() => {
    // Test backend connection
    fetch('/api/health')
      .then(response => response.json())
      .then(data => {
        setBackendStatus('connected');
      })
      .catch(error => {
        console.log('Backend not available, using demo mode');
        setBackendStatus('error');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-umd-red text-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold">UMD 4-Year Planner</h1>
          <p className="mt-2">Plan your perfect 4 years at University of Maryland</p>
          
          {backendStatus === 'error' && (
            <div className="mt-4 p-3 bg-yellow-500 text-white rounded">
              <p>🔧 Demo Mode: Backend services coming soon!</p>
              <p className="text-sm">Full course search and planning features will be available when backend is deployed.</p>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the UMD Planner!</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">🚀 Coming Soon</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Smart 4-year plan generation</li>
                <li>Course search with real UMD data</li>
                <li>Major requirement tracking</li>
                <li>GENED requirement management</li>
                <li>PDF export functionality</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">📚 Get Started</h3>
              <p className="text-gray-600 mb-4">
                This tool will help you plan your entire UMD journey. Select your major, 
                input completed courses, and generate an optimized 4-year plan.
              </p>
              <div className="bg-blue-50 p-4 rounded border border-blue-200">
                <p className="text-blue-800 text-sm">
                  <strong>Development Update:</strong> Frontend deployed successfully! 
                  Backend API integration in progress.
                </p>
              </div>
            </div>
          </div>

          {/* Course Search Component - will work when backend is deployed */}
          <div className="mt-8">
            <CourseSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;