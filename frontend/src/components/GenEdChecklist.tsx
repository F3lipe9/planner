import React from 'react';

interface GenEd {
  code: string;
  name: string;
  description: string;
  credits: number;
  category: 'Fundamental Studies' | 'Distributive Studies' | 'Diversity' | 'I-Series';
  notes?: string;
}

const GENED_REQUIREMENTS: GenEd[] = [
  // Fundamental Studies (15 credits)
  {
    code: 'FSAW',
    name: 'Academic Writing',
    description: 'First-year composition requirement',
    credits: 3,
    category: 'Fundamental Studies'
  },
  {
    code: 'FSPW',
    name: 'Professional Writing',
    description: 'Upper-level writing requirement',
    credits: 3,
    category: 'Fundamental Studies'
  },
  {
    code: 'FSOC',
    name: 'Oral Communication',
    description: 'Public speaking and presentation skills',
    credits: 3,
    category: 'Fundamental Studies'
  },
  {
    code: 'FSMA',
    name: 'Mathematics',
    description: 'College-level mathematics',
    credits: 3,
    category: 'Fundamental Studies',
    notes: 'Can satisfy both FSMA and FSAR requirements'
  },
  {
    code: 'FSAR',
    name: 'Analytic Reasoning',
    description: 'Logic and formal reasoning',
    credits: 3,
    category: 'Fundamental Studies',
    notes: 'Can be satisfied by FSMA course'
  },

  // Distributive Studies (25 credits)
  {
    code: 'DSNL',
    name: 'Natural Sciences Lab',
    description: 'Laboratory science course',
    credits: 4,
    category: 'Distributive Studies'
  },
  {
    code: 'DSNS',
    name: 'Natural Sciences',
    description: 'Science course without lab',
    credits: 3,
    category: 'Distributive Studies'
  },
  {
    code: 'DSHS1',
    name: 'History and Social Sciences I',
    description: 'First history/social science course',
    credits: 3,
    category: 'Distributive Studies'
  },
  {
    code: 'DSHS2',
    name: 'History and Social Sciences II',
    description: 'Second history/social science course',
    credits: 3,
    category: 'Distributive Studies'
  },
  {
    code: 'DSHU1',
    name: 'Humanities I',
    description: 'First humanities course',
    credits: 3,
    category: 'Distributive Studies'
  },
  {
    code: 'DSHU2',
    name: 'Humanities II',
    description: 'Second humanities course',
    credits: 3,
    category: 'Distributive Studies'
  },
  {
    code: 'DSSP1',
    name: 'Scholarship in Practice',
    description: 'First scholarship in practice course',
    credits: 3,
    category: 'Distributive Studies'
  },
  {
    code: 'DSSP2',
    name: 'Scholarship in Practice (Outside Major)',
    description: 'Second scholarship in practice course',
    credits: 3,
    category: 'Distributive Studies',
    notes: 'Must be outside your major'
  },

  // I-Series/Big Question (6 credits)
  {
    code: 'SCIS1',
    name: 'Big Question I',
    description: 'First I-Series course',
    credits: 3,
    category: 'I-Series',
    notes: 'Can double-count with Distributive Studies'
  },
  {
    code: 'SCIS2',
    name: 'Big Question II',
    description: 'Second I-Series course',
    credits: 3,
    category: 'I-Series',
    notes: 'Can double-count with Distributive Studies'
  },

  // Diversity (4-6 credits)
  {
    code: 'DVUP1',
    name: 'Understanding Plural Societies I',
    description: 'First diversity requirement',
    credits: 3,
    category: 'Diversity'
  },
  {
    code: 'DVUP2',
    name: 'Understanding Plural Societies II or Cultural Competence',
    description: 'Second diversity requirement',
    credits: 3,
    category: 'Diversity',
    notes: 'Can be satisfied by DVCC (1-3 credits)'
  }
];

interface GenEdChecklistProps {
  completedGenEds: string[];
  onToggleGenEd: (genEdCode: string) => void;
}

const GenEdChecklist: React.FC<GenEdChecklistProps> = ({ completedGenEds, onToggleGenEd }) => {
  // Group GenEds by category
  const genEdsByCategory = GENED_REQUIREMENTS.reduce((acc, genEd) => {
    if (!acc[genEd.category]) {
      acc[genEd.category] = [];
    }
    acc[genEd.category].push(genEd);
    return acc;
  }, {} as Record<string, GenEd[]>);

  // Calculate completed credits per category
  const getCategoryCredits = (category: string) => {
    const requirements = genEdsByCategory[category] || [];
    const totalCredits = requirements.reduce((sum, req) => sum + req.credits, 0);
    const completedCredits = requirements
      .filter(req => completedGenEds.includes(req.code))
      .reduce((sum, req) => sum + req.credits, 0);
    return { total: totalCredits, completed: completedCredits };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">General Education Requirements</h3>
        <span className="text-sm text-gray-500">46-48 total credits</span>
      </div>
      
      {Object.entries(genEdsByCategory).map(([category, genEds]) => {
        const { total, completed } = getCategoryCredits(category);
        return (
          <div key={category} className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-800">{category}</h4>
              <span className="text-sm text-gray-600">
                {completed}/{total} credits completed
              </span>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 divide-y">
              {genEds.map((genEd) => (
                <label
                  key={genEd.code}
                  className="flex items-start p-3 hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center h-5 mt-0.5">
                    <input
                      type="checkbox"
                      checked={completedGenEds.includes(genEd.code)}
                      onChange={() => onToggleGenEd(genEd.code)}
                      className="h-4 w-4 text-umd-red border-gray-300 rounded focus:ring-umd-red"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-umd-red">
                        {genEd.name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        completedGenEds.includes(genEd.code)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {genEd.code}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 block mt-1">
                      {genEd.description} • {genEd.credits} credits
                    </span>
                    {genEd.notes && (
                      <span className="text-xs text-blue-600 block mt-1">
                        Note: {genEd.notes}
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Select the GenEd requirements you've already completed. This will help us plan your remaining courses.
            </p>
            <ul className="text-xs text-gray-500 list-disc list-inside space-y-1">
              <li>I-Series courses (SCIS) can double-count with Distributive Studies</li>
              <li>Math courses (FSMA) can satisfy both FSMA and FSAR requirements</li>
              <li>Second Diversity requirement can be satisfied with UP or CC</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenEdChecklist;