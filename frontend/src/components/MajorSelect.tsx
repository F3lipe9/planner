import React, { useState } from 'react';

interface Major {
  code: string;
  name: string;
  college: string;
}

interface College {
  name: string;
  shortName: string;
  description: string;
}

// UMD Colleges
const UMD_COLLEGES: College[] = [
  {
    name: 'College of Computer, Mathematical, and Natural Sciences',
    shortName: 'CMNS',
    description: 'Computer Science, Mathematics, Physics, Chemistry, Biology, and more'
  },
  {
    name: 'College of Arts and Humanities',
    shortName: 'ARHU',
    description: 'Art, English, History, Languages, Music, and more'
  },
  {
    name: 'College of Behavioral and Social Sciences',
    shortName: 'BSOS',
    description: 'Psychology, Economics, Government and Politics, and more'
  },
  {
    name: 'A. James Clark School of Engineering',
    shortName: 'ENGR',
    description: 'Aerospace, Civil, Electrical, Mechanical Engineering, and more'
  },
  {
    name: 'Robert H. Smith School of Business',
    shortName: 'BMGT',
    description: 'Accounting, Finance, Marketing, Management, and more'
  },
  {
    name: 'School of Public Health',
    shortName: 'SPHL',
    description: 'Public Health Science, Kinesiology, and more'
  },
  {
    name: 'College of Agriculture and Natural Resources',
    shortName: 'AGNR',
    description: 'Agricultural Science, Environmental Science, and more'
  },
  {
    name: 'School of Architecture, Planning and Preservation',
    shortName: 'ARCH',
    description: 'Architecture, Urban Planning, Historic Preservation'
  },
  {
    name: 'Philip Merrill College of Journalism',
    shortName: 'JOUR',
    description: 'Journalism, Mass Communication'
  },
  {
    name: 'College of Information Studies',
    shortName: 'INFO',
    description: 'Information Science, Data Science'
  }
];

// Complete list of UMD majors by college
const UMD_MAJORS: Major[] = [
  // College of Computer, Mathematical, and Natural Sciences
  { code: 'ASTR', name: 'Astronomy', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'AOSC', name: 'Atmospheric and Oceanic Science', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'BCHM', name: 'Biochemistry', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'BSCI', name: 'Biological Sciences', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'BSCI-SG', name: 'Biological Sciences at Shady Grove', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'CHEM', name: 'Chemistry (B.A., B.S.)', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'CMSC', name: 'Computer Science', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'GEOL', name: 'Geology', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'MATH', name: 'Mathematics', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'NEUR-CMNS', name: 'Neuroscience', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'PHYS', name: 'Physics', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'MATH', name: 'Mathematics', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'BSCI', name: 'Biological Sciences', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'CHEM', name: 'Chemistry', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'PHYS', name: 'Physics', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'ASTR', name: 'Astronomy', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'GEOL', name: 'Geology', college: 'College of Computer, Mathematical, and Natural Sciences' },
  { code: 'AOSC', name: 'Atmospheric and Oceanic Science', college: 'College of Computer, Mathematical, and Natural Sciences' },

  // College of Arts and Humanities
  { code: 'ARAB', name: 'Arabic Studies', college: 'College of Arts and Humanities' },
  { code: 'ARTH', name: 'Art History', college: 'College of Arts and Humanities' },
  { code: 'ARTT', name: 'Studio Art', college: 'College of Arts and Humanities' },
  { code: 'CHIN', name: 'Chinese', college: 'College of Arts and Humanities' },
  { code: 'CINE-ENGL', name: 'Cinema and Media Studies (ENGL)', college: 'College of Arts and Humanities' },
  { code: 'CINE-SLLC', name: 'Cinema and Media Studies (SLLC)', college: 'College of Arts and Humanities' },
  { code: 'CLAS', name: 'Classical Languages and Literatures', college: 'College of Arts and Humanities' },
  { code: 'DANC', name: 'Dance', college: 'College of Arts and Humanities' },
  { code: 'ENGL', name: 'English Language and Literature', college: 'College of Arts and Humanities' },
  { code: 'FREN', name: 'French Language and Literature', college: 'College of Arts and Humanities' },
  { code: 'GERM', name: 'German Studies', college: 'College of Arts and Humanities' },
  { code: 'HIST', name: 'History', college: 'College of Arts and Humanities' },
  { code: 'IMD-ARTT', name: 'Immersive Media Design (ARTT)', college: 'College of Arts and Humanities' },
  { code: 'ITAL', name: 'Italian Studies', college: 'College of Arts and Humanities' },
  { code: 'JAPN', name: 'Japanese', college: 'College of Arts and Humanities' },
  { code: 'JWST', name: 'Jewish Studies', college: 'College of Arts and Humanities' },
  { code: 'MUSC', name: 'Music', college: 'College of Arts and Humanities' },
  { code: 'PERS', name: 'Persian Studies', college: 'College of Arts and Humanities' },
  { code: 'PHIL', name: 'Philosophy', college: 'College of Arts and Humanities' },
  { code: 'RAMT', name: 'Religions of the Ancient Middle East', college: 'College of Arts and Humanities' },
  { code: 'ROML', name: 'Romance Languages', college: 'College of Arts and Humanities' },
  { code: 'RUSS', name: 'Russian Language and Literature', college: 'College of Arts and Humanities' },
  { code: 'SPAN', name: 'Spanish Language, Literatures, and Culture', college: 'College of Arts and Humanities' },
  { code: 'THET', name: 'Theatre', college: 'College of Arts and Humanities' },
  { code: 'HIST', name: 'History', college: 'College of Arts and Humanities' },
  { code: 'ARTH', name: 'Art History', college: 'College of Arts and Humanities' },
  { code: 'ARTT', name: 'Art Studio', college: 'College of Arts and Humanities' },
  { code: 'DANC', name: 'Dance', college: 'College of Arts and Humanities' },
  { code: 'MUSC', name: 'Music', college: 'College of Arts and Humanities' },
  { code: 'THET', name: 'Theatre', college: 'College of Arts and Humanities' },
  { code: 'PHIL', name: 'Philosophy', college: 'College of Arts and Humanities' },
  { code: 'SPAN', name: 'Spanish Language and Literature', college: 'College of Arts and Humanities' },
  { code: 'FREN', name: 'French Language and Literature', college: 'College of Arts and Humanities' },
  { code: 'CINE', name: 'Cinema and Media Studies', college: 'College of Arts and Humanities' },
  { code: 'JAPN', name: 'Japanese', college: 'College of Arts and Humanities' },
  { code: 'KORA', name: 'Korean', college: 'College of Arts and Humanities' },
  { code: 'PERS', name: 'Persian Studies', college: 'College of Arts and Humanities' },

  // College of Behavioral and Social Sciences
  { code: 'AAAS', name: 'African American and Africana Studies', college: 'College of Behavioral and Social Sciences' },
  { code: 'AMST', name: 'American Studies', college: 'College of Behavioral and Social Sciences' },
  { code: 'ANTH', name: 'Anthropology', college: 'College of Behavioral and Social Sciences' },
  { code: 'CCJS', name: 'Criminology and Criminal Justice', college: 'College of Behavioral and Social Sciences' },
  { code: 'CCJS-SG', name: 'Criminology and Criminal Justice at Shady Grove', college: 'College of Behavioral and Social Sciences' },
  { code: 'ECON', name: 'Economics', college: 'College of Behavioral and Social Sciences' },
  { code: 'GEOG', name: 'Geographical Sciences', college: 'College of Behavioral and Social Sciences' },
  { code: 'GVPT', name: 'Government and Politics', college: 'College of Behavioral and Social Sciences' },
  { code: 'HESP', name: 'Hearing and Speech Sciences', college: 'College of Behavioral and Social Sciences' },
  { code: 'NEUR-BSOS', name: 'Neuroscience (BSOS)', college: 'College of Behavioral and Social Sciences' },
  { code: 'PSYC', name: 'Psychology', college: 'College of Behavioral and Social Sciences' },
  { code: 'PLCY', name: 'Public Policy', college: 'College of Behavioral and Social Sciences' },
  { code: 'SDS-BSOS', name: 'Social Data Science (BSOS)', college: 'College of Behavioral and Social Sciences' },
  { code: 'SOCY', name: 'Sociology', college: 'College of Behavioral and Social Sciences' },
  { code: 'ECON', name: 'Economics', college: 'College of Behavioral and Social Sciences' },
  { code: 'PSYC', name: 'Psychology', college: 'College of Behavioral and Social Sciences' },
  { code: 'SOCY', name: 'Sociology', college: 'College of Behavioral and Social Sciences' },
  { code: 'ANTH', name: 'Anthropology', college: 'College of Behavioral and Social Sciences' },
  { code: 'GEOG', name: 'Geographical Sciences', college: 'College of Behavioral and Social Sciences' },
  { code: 'CCJS', name: 'Criminology and Criminal Justice', college: 'College of Behavioral and Social Sciences' },
  { code: 'HESP', name: 'Hearing and Speech Sciences', college: 'College of Behavioral and Social Sciences' },
  { code: 'BSOS', name: 'Social Data Science', college: 'College of Behavioral and Social Sciences' },

  // A. James Clark School of Engineering
  { code: 'ENAE', name: 'Aerospace Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'BIOE', name: 'Bioengineering', college: 'A. James Clark School of Engineering' },
  { code: 'BENG', name: 'Biocomputational Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'BENG-SG', name: 'Biocomputational Engineering at Shady Grove', college: 'A. James Clark School of Engineering' },
  { code: 'CHBE', name: 'Chemical Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENCE', name: 'Civil Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'CMPE', name: 'Computer Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'CPSE', name: 'Cyber-Physical Systems Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'CPSE-SG', name: 'Cyber-Physical Systems Engineering at Shady Grove', college: 'A. James Clark School of Engineering' },
  { code: 'ENEE', name: 'Electrical Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENFP', name: 'Fire Protection Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENMA', name: 'Materials Science and Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENME', name: 'Mechanical Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'METR', name: 'Mechatronics Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'METR-SG', name: 'Mechatronics Engineering at Shady Grove', college: 'A. James Clark School of Engineering' },
  { code: 'BIOE', name: 'Bioengineering', college: 'A. James Clark School of Engineering' },
  { code: 'CHBE', name: 'Chemical and Biomolecular Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENCE', name: 'Civil Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENEE', name: 'Electrical Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENME', name: 'Mechanical Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENES', name: 'Engineering Science', college: 'A. James Clark School of Engineering' },
  { code: 'ENFP', name: 'Fire Protection Engineering', college: 'A. James Clark School of Engineering' },
  { code: 'ENMA', name: 'Materials Science and Engineering', college: 'A. James Clark School of Engineering' },

  // Robert H. Smith School of Business
  { code: 'ACCT', name: 'Accounting', college: 'Robert H. Smith School of Business' },
  { code: 'ACCT-SG', name: 'Accounting at Shady Grove', college: 'Robert H. Smith School of Business' },
  { code: 'FINC', name: 'Finance', college: 'Robert H. Smith School of Business' },
  { code: 'IBBM', name: 'International Business', college: 'Robert H. Smith School of Business' },
  { code: 'MGMT', name: 'Management', college: 'Robert H. Smith School of Business' },
  { code: 'MGMT-SG', name: 'Management at Shady Grove', college: 'Robert H. Smith School of Business' },
  { code: 'MKTG', name: 'Marketing', college: 'Robert H. Smith School of Business' },
  { code: 'MKTG-SG', name: 'Marketing at Shady Grove', college: 'Robert H. Smith School of Business' },
  { code: 'OMBA', name: 'Operations Management & Business Analytics', college: 'Robert H. Smith School of Business' },
  { code: 'SCMN', name: 'Supply Chain Management', college: 'Robert H. Smith School of Business' },
  { code: 'BUAC', name: 'Accounting', college: 'Robert H. Smith School of Business' },
  { code: 'BUFN', name: 'Finance', college: 'Robert H. Smith School of Business' },
  { code: 'BUMK', name: 'Marketing', college: 'Robert H. Smith School of Business' },
  { code: 'BUSM', name: 'Supply Chain Management', college: 'Robert H. Smith School of Business' },
  { code: 'BUSI', name: 'International Business', college: 'Robert H. Smith School of Business' },

  // School of Public Health
  { code: 'FMSC', name: 'Family Health', college: 'School of Public Health' },
  { code: 'HLTH', name: 'Public Health Science', college: 'School of Public Health' },
  { code: 'KNES', name: 'Kinesiology', college: 'School of Public Health' },
  { code: 'PHSC', name: 'Public Health Science', college: 'School of Public Health' },
  { code: 'PHPR', name: 'Public Health Practice', college: 'School of Public Health' },
  { code: 'KNES', name: 'Kinesiology', college: 'School of Public Health' },
  { code: 'FMSC', name: 'Family Science', college: 'School of Public Health' },
  { code: 'PHSC', name: 'Public Health Science', college: 'School of Public Health' },
  { code: 'HLSA', name: 'Health Services Administration', college: 'School of Public Health' },

  // College of Agriculture and Natural Resources
  { code: 'AREC', name: 'Agricultural and Resource Economics', college: 'College of Agriculture and Natural Resources' },
  { code: 'AGST', name: 'Agricultural Science and Technology', college: 'College of Agriculture and Natural Resources' },
  { code: 'ANSC', name: 'Animal Sciences', college: 'College of Agriculture and Natural Resources' },
  { code: 'ENSP', name: 'Environmental Science and Policy', college: 'College of Agriculture and Natural Resources' },
  { code: 'ENST', name: 'Environmental Science and Technology', college: 'College of Agriculture and Natural Resources' },
  { code: 'FERM', name: 'Fermentation Science', college: 'College of Agriculture and Natural Resources' },
  { code: 'FERM-SG', name: 'Fermentation Science at Shady Grove', college: 'College of Agriculture and Natural Resources' },
  { code: 'NFSC', name: 'Nutrition and Food Science', college: 'College of Agriculture and Natural Resources' },
  { code: 'PLSC', name: 'Plant Sciences', college: 'College of Agriculture and Natural Resources' },
  { code: 'ANSC', name: 'Animal Science', college: 'College of Agriculture and Natural Resources' },
  { code: 'ENST', name: 'Environmental Science and Technology', college: 'College of Agriculture and Natural Resources' },
  { code: 'PLSC', name: 'Plant Science', college: 'College of Agriculture and Natural Resources' },
  { code: 'NFSC', name: 'Nutrition and Food Science', college: 'College of Agriculture and Natural Resources' },
  { code: 'AREC', name: 'Agricultural and Resource Economics', college: 'College of Agriculture and Natural Resources' },

  // School of Architecture, Planning and Preservation
  { code: 'ARCH', name: 'Architecture', college: 'School of Architecture, Planning and Preservation' },
  { code: 'LARC', name: 'Landscape Architecture', college: 'School of Architecture, Planning and Preservation' },
  { code: 'RDEV', name: 'Real Estate and the Built Environment', college: 'School of Architecture, Planning and Preservation' },
  { code: 'URSP', name: 'Urban Studies and Planning', college: 'School of Architecture, Planning and Preservation' },
  { code: 'HISP', name: 'Historic Preservation', college: 'School of Architecture, Planning and Preservation' },

  // Philip Merrill College of Journalism
  { code: 'JOUR', name: 'Journalism', college: 'Philip Merrill College of Journalism' },
  { code: 'COMM', name: 'Communication', college: 'Philip Merrill College of Journalism' },

  // College of Education
  { code: 'ECEE', name: 'Early Childhood/Early Childhood Special Education', college: 'College of Education' },
  { code: 'ELEM', name: 'Elementary Education', college: 'College of Education' },
  { code: 'EMSP', name: 'Elementary/Middle Special Education', college: 'College of Education' },
  { code: 'HDVL', name: 'Human Development', college: 'College of Education' },
  { code: 'MIDS', name: 'Middle School Education', college: 'College of Education' },
  { code: 'SCED-ART', name: 'Secondary Education - Art', college: 'College of Education' },
  { code: 'SCED-ENG', name: 'Secondary Education - English', college: 'College of Education' },
  { code: 'SCED-MATH', name: 'Secondary Education - Mathematics', college: 'College of Education' },
  { code: 'SCED-SCI', name: 'Secondary Education - Science', college: 'College of Education' },
  { code: 'SCED-SS', name: 'Secondary Education - Social Studies', college: 'College of Education' },
  { code: 'SCED-WL', name: 'Secondary Education - World Language', college: 'College of Education' },

  // College of Information Studies
  { code: 'INFO', name: 'Information Science', college: 'College of Information Studies' },
  { code: 'INFO-SG', name: 'Information Science at Shady Grove', college: 'College of Information Studies' },
  { code: 'INST', name: 'Information Systems', college: 'College of Information Studies' },
  { code: 'SDS-INFO', name: 'Social Data Science (INFO)', college: 'College of Information Studies' },
  { code: 'TID', name: 'Technology and Information Design', college: 'College of Information Studies' },

  // Other Programs
  { code: 'GLBH', name: 'Global Health', college: 'Other Programs' },
  { code: 'INDV', name: 'Individual Studies Program', college: 'Other Programs' },
  { code: 'IMD-CMSC', name: 'Immersive Media Design (CMSC)', college: 'Other Programs' },
  { code: 'PPE', name: 'Philosophy, Politics, and Economics', college: 'Other Programs' },
  { code: 'WGSS', name: 'Women, Gender, and Sexuality Studies', college: 'Other Programs' },
  { code: 'INST', name: 'Information Systems', college: 'College of Information Studies' },
  { code: 'BSIS', name: 'Bachelor of Science in Information Science', college: 'College of Information Studies' }
];

interface MajorSelectProps {
  onSelect: (major: Major) => void;
  selectedMajor?: Major;
}

const MajorSelect: React.FC<MajorSelectProps> = ({ onSelect, selectedMajor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter majors based on selected college and search query
  const filteredMajors = UMD_MAJORS.filter(major =>
    (selectedCollege ? major.college === selectedCollege.name : true) &&
    (searchQuery ? (
      major.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      major.code.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true)
  );

  // Reset selection when closing
  const handleClose = () => {
    setIsOpen(false);
    setSelectedCollege(null);
    setSearchQuery('');
  };

  return (
    <div className="relative w-full">
      <label htmlFor="major-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select Your Major
      </label>
      
      <div className="relative">
        <button
          id="major-select"
          type="button"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-umd-red focus:border-transparent bg-white text-left"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedMajor ? (
            <span className="flex items-center">
              <span className="flex-1">
                <span className="block text-sm font-medium text-gray-900">{selectedMajor.name}</span>
                <span className="block text-sm text-gray-500">{selectedMajor.college}</span>
              </span>
            </span>
          ) : (
            <span className="text-gray-500">Select your college and major...</span>
          )}
          
          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
            <svg
              className={`h-5 w-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-[32rem] overflow-y-auto">
          {/* Search box - only show when college is selected */}
          {selectedCollege && (
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-3">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-umd-red focus:border-transparent"
                placeholder="Search majors in this college..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* Show colleges if none selected */}
          {!selectedCollege ? (
            <div className="py-2">
              {UMD_COLLEGES.map((college) => (
                <button
                  key={college.shortName}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                  onClick={() => setSelectedCollege(college)}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {college.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {college.description}
                      </div>
                    </div>
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            // Show majors for selected college
            <div>
              <div className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200 p-3 flex items-center">
                <button
                  className="p-1 rounded-md hover:bg-gray-200 mr-2"
                  onClick={() => setSelectedCollege(null)}
                >
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-sm font-semibold text-gray-700">{selectedCollege.name}</h3>
              </div>

              <div className="py-2">
                {filteredMajors.map((major) => (
                  <button
                    key={major.code}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors ${
                      selectedMajor?.code === major.code ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => {
                      onSelect(major);
                      handleClose();
                    }}
                  >
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {major.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {major.code}
                        </div>
                      </div>
                      {selectedMajor?.code === major.code && (
                        <svg
                          className="h-5 w-5 text-umd-red ml-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}

                {filteredMajors.length === 0 && (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    No majors found matching "{searchQuery}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MajorSelect;