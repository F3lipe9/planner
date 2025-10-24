import React, { useState } from 'react';
import './index.css';
import CourseSearch from './components/CourseSearch';
import MajorSelect from './components/MajorSelect';
import YearSelect from './components/YearSelect';

function App() {
  const [selectedMajor, setSelectedMajor] = useState<{ code: string; name: string; college: string } | undefined>();
  const [selectedYear, setSelectedYear] = useState<number>();
  const [currentStep, setCurrentStep] = useState<'major' | 'year' | 'courses'>('major');

  const moveToNextStep = () => {
    if (currentStep === 'major') setCurrentStep('year');
    else if (currentStep === 'year') setCurrentStep('courses');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-umd-red text-white p-6 rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold">UMD 4-Year Planner</h1>
          <p className="mt-2">Plan your perfect 4 years at University of Maryland</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the UMD Planner!</h2>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                  ${currentStep === 'major' ? 'border-umd-red bg-umd-red text-white' : 
                    selectedMajor ? 'border-green-500 bg-green-500 text-white' : 
                    'border-gray-300 text-gray-300'}`}>
                  1
                </div>
                <div className={`h-1 w-12 mx-2 ${selectedMajor ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                  ${currentStep === 'year' ? 'border-umd-red bg-umd-red text-white' : 
                    selectedYear ? 'border-green-500 bg-green-500 text-white' : 
                    'border-gray-300 text-gray-300'}`}>
                  2
                </div>
                <div className={`h-1 w-12 mx-2 ${selectedYear ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 
                  ${currentStep === 'courses' ? 'border-umd-red bg-umd-red text-white' : 
                    'border-gray-300 text-gray-300'}`}>
                  3
                </div>
              </div>
            </div>

            {/* Major Selection Step */}
            {currentStep === 'major' && (
              <div className="space-y-6">
                <p className="text-gray-600">
                  Let's start by selecting your major. This will help us create a customized 4-year plan for you.
                </p>

                <div className="max-w-xl">
                  <MajorSelect
                    onSelect={(major) => {
                      setSelectedMajor(major);
                      setTimeout(moveToNextStep, 500);
                    }}
                    selectedMajor={selectedMajor}
                  />
                </div>
              </div>
            )}

            {/* Year Selection Step */}
            {currentStep === 'year' && (
              <div className="space-y-6">
                <p className="text-gray-600">
                  Great! Now tell us when you started at UMD. This helps us track your progress and requirements.
                </p>

                <div className="max-w-2xl">
                  <YearSelect
                    onSelect={(year) => {
                      setSelectedYear(year);
                      setTimeout(moveToNextStep, 500);
                    }}
                    selectedYear={selectedYear}
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={() => setCurrentStep('major')}
                    className="text-gray-600 hover:text-umd-red flex items-center"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Major Selection
                  </button>
                </div>
              </div>
            )}

            {/* Course Search Step */}
            {currentStep === 'courses' && (
              <div className="space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-700">
                        Major: <span className="font-semibold">{selectedMajor?.name}</span>
                      </p>
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-green-700">
                        Started in: <span className="font-semibold">{selectedYear}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600">
                  Now, let's search for courses you've already completed or are currently taking.
                </p>

                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentStep('year')}
                    className="text-gray-600 hover:text-umd-red flex items-center"
                  >
                    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Year Selection
                  </button>
                </div>

                <CourseSearch />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;