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
      
      // Try department search first if query looks like a department code
      if (/^[A-Za-z]{4}$/.test(query)) {
        console.log('🏫 Query looks like a department code, trying department search first');
        const deptCourses = await this.getCoursesByDepartment(query);
        if (deptCourses.length > 0) {
          console.log(`📚 Found ${deptCourses.length} courses in department ${query}`);
          return deptCourses;
        }
      }

      // Fall back to search API
      const searchResponse = await axios.get(`${PLANETTERP_BASE_URL}/search`, {
        params: {
          query: query,
          limit: 100 // Increased limit for more comprehensive results
        }
      });
      
      const searchResults: SearchResult[] = searchResponse.data;
      console.log(`📊 Search found ${searchResults.length} total results`);
      
      // Filter to only courses (not professors)
      const courseResults = searchResults.filter(result => result.type === 'course');
      console.log(`📚 Found ${courseResults.length} courses in search results`);
      
      if (courseResults.length === 0) {
        // Try department search as fallback
        if (query.length >= 2) {
          const deptCourses = await this.getCoursesByDepartment(query.slice(0, 4));
          if (deptCourses.length > 0) {
            return deptCourses;
          }
        }
        console.log('🔍 No courses found in search or department, using demo data...');
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
          continue; // Continue with next batch even if one fails
        }
        
        // Small delay between batches to be respectful to the API
        if (i + batchSize < courseResults.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      if (courses.length === 0) {
        console.log('⚠️ No courses found with detailed information');
        return this.getDemoCourses(query);
      }
      
      console.log(`✅ Successfully retrieved ${courses.length} courses`);
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
        prerequisites: this.extractPrerequisites(courseData.description)
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

  async getCoursesByDepartment(department: string): Promise<Course[]> {
    try {
      const response = await axios.get(`${PLANETTERP_BASE_URL}/courses`, {
        params: {
          department: department.toUpperCase(),
          limit: 100 // Increased from 50 to 100
        }
      });
      
      const coursesData = response.data;
      console.log(`📚 Found ${coursesData.length} courses in department ${department}`);
      
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