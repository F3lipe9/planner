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
      
      // Try exact department match first (e.g., "CMSC", "MATH")
      if (/^[A-Za-z]{4}$/i.test(query)) {
        console.log('🏫 Query matches department code format, using department search');
        const deptCourses = await this.getCoursesByDepartment(query);
        if (deptCourses.length > 0) {
          return deptCourses;
        }
      }

      // Try partial department match (e.g., "CMS" from "CMSC")
      if (query.length >= 3) {
        const deptMatches = await this.findMatchingDepartments(query);
        if (deptMatches.length === 1) {
          console.log(`🎯 Found exact department match: ${deptMatches[0]}`);
          const deptCourses = await this.getCoursesByDepartment(deptMatches[0]);
          if (deptCourses.length > 0) {
            return deptCourses;
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

  // Helper method to find matching departments
  private async findMatchingDepartments(partialDept: string): Promise<string[]> {
    try {
      const response = await axios.get(`${PLANETTERP_BASE_URL}/courses`, {
        params: { limit: 1 }
      });
      
      // Extract unique departments from the first page of results and ensure they're strings
      const departments = [...new Set(response.data
        .map((course: any) => course.department)
        .filter((dept: unknown): dept is string => 
          typeof dept === 'string' && dept.length > 0
        ))] as string[];
      
      // Find departments that match the partial query
      return departments.filter((dept: string) => 
        dept.toLowerCase().startsWith(partialDept.toLowerCase())
      );
    } catch (error) {
      console.error('Error finding departments:', error);
      return [];
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