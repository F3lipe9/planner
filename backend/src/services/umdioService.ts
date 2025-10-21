import axios from 'axios';

const PLANETTERP_BASE_URL = 'https://planetterp.com/api/v1';

export interface Course {
  course_id: string;
  name: string;
  department: string;
  credits: string;
  description: string;
  dept_id?: string;
  prerequisites?: string;
  gen_ed?: string[][];
  grading_method?: string[];
  average_gpa?: number;
}

export class CourseService {
  async searchCourses(query: string): Promise<Course[]> {
    try {
      console.log(`🔍 Searching PlanetTerp for: "${query}"`);
      
      // Get all courses from PlanetTerp
      const response = await axios.get(`${PLANETTERP_BASE_URL}/courses`);
      console.log(`📊 Total courses from PlanetTerp: ${response.data.length}`);
      
      const allCourses: any[] = response.data;
      
      // Filter courses by query (case insensitive)
      const filteredCourses = allCourses.filter(course => {
        const searchText = query.toLowerCase();
        return (
          course.name?.toLowerCase().includes(searchText) ||
          course.title?.toLowerCase().includes(searchText) ||
          (course.department && course.department.toLowerCase().includes(searchText))
        );
      }).slice(0, 20); // Limit results
      
      console.log(`✅ Found ${filteredCourses.length} courses for "${query}"`);
      
      // Convert PlanetTerp format to our format
      const formattedCourses: Course[] = filteredCourses.map(course => ({
        course_id: course.name,
        name: course.title,
        department: course.department || 'Unknown Department',
        credits: course.credits?.toString() || '3',
        description: course.description || 'No description available',
        dept_id: this.getDeptId(course.department),
        prerequisites: course.prerequisites,
        average_gpa: course.average_gpa
      }));
      
      return formattedCourses;
    } catch (error) {
      console.error('❌ Error searching PlanetTerp:', error);
      return this.getDemoCourses(query);
    }
  }

  // Extract department code from department name
  private getDeptId(department: string): string {
    if (!department) return 'UNKN';
    
    // Common department mappings
    const deptMap: { [key: string]: string } = {
      'computer science': 'CMSC',
      'mathematics': 'MATH', 
      'english': 'ENGL',
      'chemistry': 'CHEM',
      'physics': 'PHYS',
      'biology': 'BIO',
      'history': 'HIST',
      'psychology': 'PSYC',
      'economics': 'ECON',
      'business': 'BMGT'
    };
    
    const deptLower = department.toLowerCase();
    for (const [key, code] of Object.entries(deptMap)) {
      if (deptLower.includes(key)) {
        return code;
      }
    }
    
    // Fallback: take first 4 letters of department
    return department.substring(0, 4).toUpperCase();
  }

  // Enhanced demo data as fallback
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
        grading_method: ['Regular'],
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
        grading_method: ['Regular'],
        average_gpa: 3.1
      },
      {
        course_id: 'MATH140',
        name: 'Calculus I',
        department: 'Mathematics',
        credits: '4',
        description: 'Differential calculus, including functions, limits, continuity, differentiation, and applications.',
        dept_id: 'MATH',
        prerequisites: 'MATH115 or placement',
        grading_method: ['Regular'],
        average_gpa: 2.8
      },
      {
        course_id: 'ENGL101',
        name: 'Academic Writing',
        department: 'English',
        credits: '3',
        description: 'Introduction to academic writing with emphasis on critical reading and writing processes.',
        dept_id: 'ENGL',
        gen_ed: [['FSAW']],
        grading_method: ['Regular'],
        average_gpa: 3.4
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

    console.log(`🔍 Demo data filtered to: ${filtered.length} courses`);
    return filtered.length > 0 ? filtered : allDemoCourses.slice(0, 2);
  }

  async getCourse(courseId: string): Promise<Course | null> {
    try {
      const response = await axios.get(`${PLANETTERP_BASE_URL}/course?name=${courseId}`);
      const course = response.data;
      
      return {
        course_id: course.name,
        name: course.title,
        department: course.department || 'Unknown Department',
        credits: course.credits?.toString() || '3',
        description: course.description || 'No description available',
        dept_id: this.getDeptId(course.department),
        prerequisites: course.prerequisites,
        average_gpa: course.average_gpa
      };
    } catch (error) {
      console.error('Error fetching course from PlanetTerp:', error);
      return null;
    }
  }
}

// ✅ THIS IS THE CRITICAL LINE - Make sure this export exists
export const courseService = new CourseService();