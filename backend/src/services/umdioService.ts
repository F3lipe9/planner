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
      
      // Use PlanetTerp's search endpoint instead of fetching all courses
      const searchResponse = await axios.get(`${PLANETTERP_BASE_URL}/search`, {
        params: {
          query: query,
          limit: 50 // Maximum allowed by API
        }
      });
      
      const searchResults: SearchResult[] = searchResponse.data;
      console.log(`📊 Search found ${searchResults.length} total results`);
      
      // Filter to only courses (not professors)
      const courseResults = searchResults.filter(result => result.type === 'course');
      console.log(`📚 Found ${courseResults.length} courses in search results`);
      
      if (courseResults.length === 0) {
        console.log('🔍 No courses found in search, trying broader approach...');
        return this.getDemoCourses(query);
      }
      
      // Get detailed information for each course
      const courses: Course[] = [];
      
      for (const courseResult of courseResults.slice(0, 20)) { // Limit to 20 courses
        try {
          const courseDetail = await this.getCourse(courseResult.name);
          if (courseDetail) {
            courses.push(courseDetail);
          }
        } catch (error) {
          console.log(`⚠️ Could not fetch details for ${courseResult.name}`);
        }
        
        // Small delay to be respectful to the API
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log(`✅ Returning ${courses.length} detailed courses`);
      return courses;
    } catch (error) {
      console.error('❌ Error searching PlanetTerp:', error);
      return this.getDemoCourses(query);
    }
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
        // Extract prerequisites from description if available
        prerequisites: this.extractPrerequisites(courseData.description)
      };
    } catch (error) {
      console.error(`Error fetching course ${courseId}:`, error);
      return null;
    }
  }

  // Helper to extract prerequisites from course description
  private extractPrerequisites(description: string): string {
    if (!description) return '';
    
    const prereqMatch = description.match(/[Pp]rerequisite[^.]*\./);
    if (prereqMatch) {
      return prereqMatch[0];
    }
    
    return '';
  }

  // Alternative: Get courses by department
  async getCoursesByDepartment(department: string): Promise<Course[]> {
    try {
      const response = await axios.get(`${PLANETTERP_BASE_URL}/courses`, {
        params: {
          department: department.toUpperCase(),
          limit: 50
        }
      });
      
      const coursesData = response.data;
      
      return coursesData.map((course: any) => ({
        course_id: `${course.department}${course.course_number}`,
        name: course.title,
        department: course.department,
        credits: course.credits?.toString() || '3',
        description: course.description || 'No description available',
        dept_id: course.department,
        average_gpa: course.average_gpa,
        prerequisites: this.extractPrerequisites(course.description)
      }));
    } catch (error) {
      console.error('Error fetching department courses:', error);
      return [];
    }
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
      },
      {
        course_id: 'MATH140',
        name: 'Calculus I',
        department: 'Mathematics',
        credits: '4',
        description: 'Differential calculus, including functions, limits, continuity, differentiation, and applications.',
        dept_id: 'MATH',
        prerequisites: 'MATH115 or placement',
        average_gpa: 2.8
      },
      {
        course_id: 'ENGL101',
        name: 'Academic Writing',
        department: 'English',
        credits: '3',
        description: 'Introduction to academic writing with emphasis on critical reading and writing processes.',
        dept_id: 'ENGL',
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
}

export const courseService = new CourseService();