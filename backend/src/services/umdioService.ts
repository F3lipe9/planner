import axios from 'axios';

const PLANETTERP_BASE_URL = 'https://planetterp.com/api/v1';

// Complete list of UMD departments
const UMD_DEPARTMENTS = new Map<string, string>([
  ['AAAS', 'African American and Africana Studies'],
  ['AAST', 'Asian American Studies'],
  ['ABRM', 'Anti-Black Racism'],
  ['AGNR', 'Agriculture and Natural Resources'],
  ['AGST', 'Agricultural Science and Technology'],
  ['AMSC', 'Applied Mathematics & Scientific Computation'],
  ['AMST', 'American Studies'],
  ['ANSC', 'Animal Science'],
  ['ANTH', 'Anthropology'],
  ['AOSC', 'Atmospheric and Oceanic Science'],
  ['ARAB', 'Arabic'],
  ['ARCH', 'Architecture'],
  ['AREC', 'Agricultural and Resource Economics'],
  ['ARHU', 'Arts and Humanities'],
  ['ARMY', 'Army'],
  ['ARSC', 'Air Science'],
  ['ARTH', 'Art History & Archaeology'],
  ['ARTT', 'Art Studio'],
  ['ASTR', 'Astronomy'],
  ['BCHM', 'Biochemistry'],
  ['BDBA', 'Doctor of Business Administration'],
  ['BIOE', 'Bioengineering'],
  ['BIOI', 'Bioinformatics and Computational Biology'],
  ['BIOL', 'Biology'],
  ['BIOM', 'Biometrics'],
  ['BIPH', 'Biophysics'],
  ['BISI', 'Biological Sciences'],
  ['BMGT', 'Business and Management'],
  ['BMIN', 'General Business Minor'],
  ['BMSO', 'Online Business MS Programs'],
  ['BSCI', 'Biological Sciences Program'],
  ['BSOS', 'Behavioral and Social Sciences'],
  ['BSST', 'Terrorism Studies'],
  ['BUAC', 'Accounting and Information Assurance'],
  ['BUDT', 'Decision and Information Technologies'],
  ['BUFN', 'Finance'],
  ['BULM', 'Logistics, Business, and Public Policy'],
  ['BUMK', 'Marketing'],
  ['BUSI', 'Part-Time MBA Program'],
  ['BUSM', 'Full-Time MBA Program'],
  ['BUSO', 'Online MBA Program'],
  ['CBMG', 'Cell Biology & Molecular Genetics'],
  ['CCJS', 'Criminology and Criminal Justice'],
  ['CHBE', 'Chemical and Biomolecular Engineering'],
  ['CHEM', 'Chemistry'],
  ['CHIN', 'Chinese'],
  ['CHPH', 'Chemical Physics'],
  ['CHSE', 'Counseling, Higher Education, and Special Education'],
  ['CINE', 'Cinema and Media Studies'],
  ['CLAS', 'Classics'],
  ['CLFS', 'Chemical and Life Sciences'],
  ['CMLT', 'Comparative Literature'],
  ['CMSC', 'Computer Science'],
  ['COMM', 'Communication'],
  ['CPBE', 'College Park Scholars-Business, Society, Entreprenrshp'],
  ['CPCV', 'College Park Scholars-Civic Engagement for Social Good'],
  ['CPDJ', 'College Park Scholars-Data Justice'],
  ['CPET', 'College Park Scholars-Environment, Technology & Economy'],
  ['CPGH', 'College Park Scholars-Global Public Health'],
  ['CPJT', 'College Park Scholars-Justice and Legal Thought'],
  ['CPMS', 'College Park Scholars-Media, Self and Society'],
  ['CPPL', 'College Park Scholars-Public Leadership'],
  ['CPSA', 'College Park Scholars-Arts'],
  ['CPSF', 'College Park Scholars-Life Sciences'],
  ['CPSG', 'College Park Scholars-Science and Global Change'],
  ['CPSN', 'College Park Scholars-International Studies'],
  ['CPSP', 'College Park Scholars Program'],
  ['CPSS', 'College Park Scholars-Science, Technology and Society'],
  ['DANC', 'Dance'],
  ['DATA', 'Data Science and Analytics'],
  ['ECON', 'Economics'],
  ['EDCP', 'Education Counseling and Personnel Services'],
  ['EDDI', 'Education Dialogues'],
  ['EDHD', 'Education, Human Development'],
  ['EDHI', 'Education Leadership, Higher Ed and International Ed'],
  ['EDSP', 'Education, Special'],
  ['EDUC', 'Education'],
  ['EMBA', 'Executive MBA Program'],
  ['ENAE', 'Engineering, Aerospace'],
  ['ENAI', 'Engineering Artificial Intelligence,Professional Masters'],
  ['ENBC', 'Biocomputational Engineering'],
  ['ENCE', 'Engineering, Civil'],
  ['ENCO', 'Engineering, Cooperative Education'],
  ['ENEB', 'Cyber-Physical Systems Engineering'],
  ['ENED', 'Engineering Education'],
  ['ENEE', 'Electrical & Computer Engineering'],
  ['ENES', 'Engineering Science'],
  ['ENFP', 'Engineering, Fire Protection'],
  ['ENGL', 'English'],
  ['ENMA', 'Engineering, Materials'],
  ['ENME', 'Engineering, Mechanical'],
  ['ENPM', 'Engineering, Professional Masters'],
  ['ENRE', 'Reliability Engineering'],
  ['ENSE', 'Systems Engineering'],
  ['ENSP', 'Environmental Science and Policy'],
  ['ENST', 'Environmental Science and Technology'],
  ['ENTM', 'Entomology'],
  ['ENTS', 'Telecommunications'],
  ['ENVH', 'Environmental and Occupational Health'],
  ['EPIB', 'Epidemiology and Biostatistics'],
  ['FGSM', 'Federal and Global Fellows'],
  ['FIRE', 'First-Year Innovation & Research Experience'],
  ['FMSC', 'Family Science'],
  ['FREN', 'French'],
  ['GBHL', 'Global Health'],
  ['GEMS', 'Gemstone'],
  ['GEOG', 'Geographical Sciences'],
  ['GEOL', 'Geology'],
  ['GERS', 'German Studies'],
  ['GFPL', 'Global and Foreign Policy'],
  ['GREK', 'Greek'],
  ['GVPT', 'Government and Politics'],
  ['HACS', 'ACES-Cybersecurity'],
  ['HBUS', 'Interdisciplinary Business Honors'],
  ['HDCC', 'Design Cultures and Creativity'],
  ['HEBR', 'Hebrew'],
  ['HESI', 'Higher Ed, Student Affairs, and International Ed Policy'],
  ['HESP', 'Hearing and Speech Sciences'],
  ['HHUM', 'Honors Humanities'],
  ['HISP', 'Historic Preservation'],
  ['HIST', 'History'],
  ['HLSA', 'Health Services Administration'],
  ['HLSC', 'Integrated Life Sciences'],
  ['HLTH', 'Health'],
  ['HONR', 'Honors'],
  ['IDEA', 'Academy for Innovation & Entrepreneurship'],
  ['IMDM', 'Immersive Media Design'],
  ['IMMR', 'Immigration Studies'],
  ['INAG', 'Institute of Applied Agriculture'],
  ['INFM', 'Information Management'],
  ['INST', 'Information Studies'],
  ['ISRL', 'Israel Studies'],
  ['ITAL', 'Italian'],
  ['JAPN', 'Japanese'],
  ['JOUR', 'Journalism'],
  ['JWST', 'Jewish Studies'],
  ['KNES', 'Kinesiology'],
  ['KORA', 'Korean'],
  ['LACS', 'Latin American and Caribbean Studies'],
  ['LARC', 'Landscape Architecture'],
  ['LATN', 'Latin'],
  ['LBSC', 'Library Science'],
  ['LEAD', 'Leadership Education and Development'],
  ['LGBT', 'Lesbian Gay Bisexual Transgender Studies'],
  ['LING', 'Linguistics'],
  ['MAIT', 'Masters in the Mathematics of Advanced Industrial Tech'],
  ['MATH', 'Mathematics'],
  ['MEES', 'Marine-Estuarine-Environmental Sciences'],
  ['MIEH', 'Maryland Institute for Applied Environmental Health'],
  ['MITH', 'Maryland Institute for Technology in the Humanities'],
  ['MLAW', 'MPower Undergraduate Law Programs'],
  ['MSAI', 'Master of Science in Artificial Intelligence'],
  ['MSML', 'Machine Learning'],
  ['MSQC', 'Quantum Computing'],
  ['MUED', 'Music Education'],
  ['MUSC', 'School of Music'],
  ['NACS', 'Neuroscience & Cognitive Science'],
  ['NAVY', 'Navy'],
  ['NEUR', 'Neuroscience'],
  ['NFSC', 'Nutrition and Food Science'],
  ['NIAP', 'National Institute of Aeronautics - Va Tech'],
  ['NIAV', 'National Institute of Aeronautics - Univ of VA'],
  ['PEER', 'Health Center'],
  ['PERS', 'Persian'],
  ['PHIL', 'Philosophy'],
  ['PHPE', 'Philosophy, Politics, and Economics'],
  ['PHSC', 'Public Health Science'],
  ['PHYS', 'Physics'],
  ['PLCY', 'Public Policy'],
  ['PLSC', 'Plant Sciences'],
  ['PORT', 'Portuguese'],
  ['PSYC', 'Psychology'],
  ['QMMS', 'Quantitative Methodology: Measurement and Statistics'],
  ['RDEV', 'Real Estate Development'],
  ['RELS', 'Religious Studies'],
  ['RUSS', 'Russian'],
  ['SDSB', 'Social Data Science, BSOS'],
  ['SLAA', 'Second Language Acquisition and Application'],
  ['SLLC', 'School of Languages, Literatures and Cultures'],
  ['SMLP', 'Southern Management Leadership Program'],
  ['SOCY', 'Sociology'],
  ['SPAN', 'Spanish'],
  ['SPHL', 'Public Health'],
  ['STAT', 'Statistics and Probability'],
  ['SURV', 'Survey and Data Science'],
  ['TDPS', 'Theatre, Dance and Performance Studies'],
  ['THET', 'Theatre'],
  ['TLPL', 'Teaching and Learning, Policy and Leadership'],
  ['TLTC', 'Teaching and Learning Transformation Center'],
  ['UMEI', 'Maryland English Institute'],
  ['UNIV', 'University Courses'],
  ['URSP', 'Urban Studies and Planning'],
  ['USLT', 'Latina/o Studies'],
  ['VIPS', 'Vertically Integrated Projects'],
  ['VMSC', 'Veterinary Medical Sciences'],
  ['WEID', 'Words of Engagement Intergroup Dialogue Program'],
  ['WGSS', 'Women, Gender, and Sexuality Studies']
]);

export interface Course {
  course_id: string;
  name: string;
  department: string;
  credits: string;
  description: string;
  dept_id?: string;
  prerequisites?: string;
  gen_ed?: string[];
  grading_method?: string[];
  average_gpa?: number;
  type?: string;
}

export interface SearchResult {
  name: string;
  slug: string;
  type: string; // 'course' or 'professor'
}

export class CourseService {
  async searchCourses(query: string): Promise<Course[]> {
    try {
      console.log(`🔍 Searching PlanetTerp for: "${query}"`);
      
      // Check if the query matches a department code or name
      const deptMatches = this.findMatchingDepartments(query);
      console.log(`🏫 Found ${deptMatches.length} matching departments for "${query}"`);
      
      if (deptMatches.length > 0) {
        // Exact match - search immediately
        if (deptMatches.length === 1 || deptMatches.includes(query.toUpperCase())) {
          const deptCode = deptMatches[0];
          console.log(`� Using exact department match: ${deptCode} (${UMD_DEPARTMENTS.get(deptCode)})`);
          const deptCourses = await this.getCoursesByDepartment(deptCode);
          if (deptCourses.length > 0) {
            return deptCourses;
          }
        }
        
        // Multiple matches - if query is long enough, try all of them
        if (query.length >= 3) {
          console.log(`📚 Searching multiple matching departments: ${deptMatches.join(', ')}`);
          const allCourses: Course[] = [];
          
          for (const deptCode of deptMatches) {
            const courses = await this.getCoursesByDepartment(deptCode);
            allCourses.push(...courses);
          }
          
          if (allCourses.length > 0) {
            return allCourses;
          }
        }
      }

      // Fall back to search API if not a department query
      console.log('📚 Falling back to general course search');
      const searchResponse = await axios.get(`${PLANETTERP_BASE_URL}/search`, {
        params: {
          query: query,
          limit: 100
        }
      });
      
      const searchResults: SearchResult[] = searchResponse.data;
      const courseResults = searchResults.filter(result => result.type === 'course');
      
      if (courseResults.length === 0) {
        return this.getDemoCourses(query);
      }
      
      // Process course results in parallel batches
      const courses: Course[] = [];
      const batchSize = 10;
      
      for (let i = 0; i < courseResults.length; i += batchSize) {
        const batch = courseResults.slice(i, i + batchSize);
        const batchPromises = batch.map((course: SearchResult) => this.getCourse(course.name));
        
        try {
          const batchResults = await Promise.all(batchPromises);
          courses.push(...batchResults.filter((c): c is Course => c !== null));
        } catch (error) {
          console.error('❌ Error processing batch:', error);
          continue;
        }
        
        // Small delay between batches to be respectful to the API
        if (i + batchSize < courseResults.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      return courses;
      
    } catch (error) {
      console.error('❌ Error searching PlanetTerp:', error);
      return this.getDemoCourses(query);
    }
  }

  // Helper method to find matching departments using the comprehensive UMD list
  private findMatchingDepartments(partialDept: string): string[] {
    const normalizedQuery = partialDept.toUpperCase();
    const matches: string[] = [];
    
    for (const [code, name] of UMD_DEPARTMENTS.entries()) {
      if (code.startsWith(normalizedQuery) || 
          name.toUpperCase().includes(normalizedQuery)) {
        matches.push(code);
      }
    }
    
    return matches;
  }

  async getCourse(courseId: string): Promise<Course | null> {
    try {
      const response = await axios.get(`${PLANETTERP_BASE_URL}/course`, {
        params: { name: courseId }
      });
      
      const courseData = response.data;
      
      return {
        course_id: courseData.course_number ? 
          `${courseData.department}${courseData.course_number}` : 
          courseId,
        name: courseData.title,
        department: courseData.department || 'Unknown Department',
        credits: courseData.credits?.toString() || '3',
        description: courseData.description || 'No description available',
        dept_id: courseData.department,
        average_gpa: courseData.average_gpa,
        prerequisites: this.extractPrerequisites(courseData.description),
        gen_ed: this.extractGenEds(courseData.description)
      };
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      return null;
    }
  }

  private extractPrerequisites(description: string): string {
    if (!description) return '';
    
    const prereqMatch = description.match(/[Pp]rerequisite[^.]*\./);
    if (prereqMatch) {
      return prereqMatch[0];
    }
    
    return '';
  }

  private extractGenEds(description: string): string[] {
    if (!description) return [];
    
    const genEds: string[] = [];
    
    // Check for GenEd markers in the description
    const genEdMatch = description.match(/[Gg]en[Ee]d:?\s*([A-Z,\s]+)/);
    if (genEdMatch?.[1]) {
      genEds.push(...genEdMatch[1].split(/[,\s]+/).filter(g => g));
    }

    // Check for DSSP, DVUP, SCIS, etc. markers
    const markers = ['DSSP', 'DVUP', 'SCIS', 'FSOC', 'FSAR', 'FSMA', 'FSPW', 'DSHS', 'DSHU', 'DSNS', 'DSNL', 'DSSP'];
    for (const marker of markers) {
      if (description.includes(marker)) {
        genEds.push(marker);
      }
    }
    
    return [...new Set(genEds)]; // Remove duplicates
  }

  async getCoursesByDepartment(department: string): Promise<Course[]> {
    try {
      const response = await axios.get(`${PLANETTERP_BASE_URL}/courses`, {
        params: {
          department: department.toUpperCase(),
          limit: 100
        }
      });
      
      const coursesData = response.data.filter((course: any) => 
        course.department === department.toUpperCase()
      );
      
      console.log(`📚 Found ${coursesData.length} courses in department ${department}`);
      
      return coursesData
        .sort((a: any, b: any) => {
          // Sort by course number
          const aNum = parseInt(a.course_number);
          const bNum = parseInt(b.course_number);
          return aNum - bNum;
        })
        .map((course: any) => ({
          course_id: `${course.department}${course.course_number}`,
          name: course.title,
          department: course.department,
          credits: course.credits?.toString() || '3',
          description: course.description || 'No description available',
          dept_id: course.department,
          average_gpa: course.average_gpa,
          prerequisites: this.extractPrerequisites(course.description),
          gen_ed: this.extractGenEds(course.description)
        }));
    } catch (error) {
      console.error('Error fetching department courses:', error);
      return [];
    }
  }

  private getDemoCourses(query: string): Course[] {
    console.log(`🔍 Using demo data for query: "${query}"`);
    
    const allDemoCourses: Course[] = [
      {
        course_id: 'CMSC131',
        name: 'Object-Oriented Programming I',
        department: 'Computer Science',
        credits: '4',
        description: 'Introduction to programming and computer science. Emphasizes understanding and implementation of applications using object-oriented techniques.',
        dept_id: 'CMSC',
        prerequisites: 'MATH140',
        average_gpa: 3.2
      },
      {
        course_id: 'CMSC132',
        name: 'Object-Oriented Programming II', 
        department: 'Computer Science',
        credits: '4',
        description: 'Continuation of CMSC131. Further development of programming and software development skills.',
        dept_id: 'CMSC',
        prerequisites: 'CMSC131 with C- or better',
        average_gpa: 3.1
      }
    ];

    // Filter demo courses by query
    const queryLower = query.toLowerCase();
    const filtered = allDemoCourses.filter(course =>
      course.course_id.toLowerCase().includes(queryLower) ||
      course.name.toLowerCase().includes(queryLower) ||
      course.department.toLowerCase().includes(queryLower) ||
      course.dept_id?.toLowerCase().includes(queryLower)
    );

    return filtered.length > 0 ? filtered : allDemoCourses.slice(0, 2);
  }
}

export const courseService = new CourseService();