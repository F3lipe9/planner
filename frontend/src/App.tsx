import React from 'react';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-umd-red text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">UMD 4-Year Planner</h1>
          <p className="mt-2">If this is UMD red, Tailwind is working!</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Test Components</h2>
          <button className="bg-umd-red text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition">
            Test Button
          </button>
          <p className="text-green-600 mt-4">This text should be green!</p>
          <div className="mt-4 p-4 border border-umd-gold bg-yellow-50">
            <p className="text-umd-black">This should have UMD gold border</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;