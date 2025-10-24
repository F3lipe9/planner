import React from 'react';

interface YearSelectProps {
  onSelect: (year: number) => void;
  selectedYear?: number;
}

const YearSelect: React.FC<YearSelectProps> = ({ onSelect, selectedYear }) => {
  // Get current year
  const currentYear = new Date().getFullYear();
  
  // Generate array of years (5 years back to current year)
  const years = Array.from({ length: 6 }, (_, i) => currentYear - (5 - i)).sort((a, b) => b - a);

  return (
    <div className="w-full">
      <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1">
        When did you start at UMD?
      </label>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelect(year)}
            className={`
              py-3 px-4 rounded-lg text-center transition-colors
              ${selectedYear === year
                ? 'bg-umd-red text-white shadow-md'
                : 'bg-white border border-gray-300 text-gray-700 hover:border-umd-red hover:text-umd-red'
              }
              focus:outline-none focus:ring-2 focus:ring-umd-red focus:ring-offset-2
            `}
          >
            <span className="text-lg font-medium">{year}</span>
            {year === currentYear && (
              <span className="block text-xs mt-1 font-medium">
                {selectedYear === year ? 'Selected' : 'Current'}
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="mt-2 text-sm text-gray-500">
        {selectedYear 
          ? `You started at UMD in ${selectedYear}`
          : 'Select the year you began your UMD journey'}
      </p>
    </div>
  );
};

export default YearSelect;