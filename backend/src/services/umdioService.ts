import axios from 'axios';

const UMDIO_BASE_URL = 'https://api.umd.io/v1';

export interface Course {
  course_id: string;
  name: string;
  department: string;
  credits: string;
  description: string;
  prerequisites?: string;
  dept_id?: string; // Add this for compatibility
}

export class UMDioService {
  async searchCourses(query: string): Promise<Course[]> {
    try {
      console.log(`🔍 Searching UMD.io for: ${query}`);
      
      // Get all courses and filter client-side
      const response = await axios.get(`${UMDIO_BASE_URL}/courses`);
      const allCourses: Course[] = response.data;
      
      // Filter courses by query
      const filteredCourses = allCourses.filter(course => 
        course.course_id.toLowerCase().includes(query.toLowerCase()) ||
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        (course.department && course.department.toLowerCase().includes(query.toLowerCase())) ||
        (course.dept_id && course.dept_id.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 20); // Limit results
      
      console.log(`✅ Found ${filteredCourses.length} courses for "${query}"`);
      return filteredCourses;
    } catch (error) {
      console.error('❌ Error searching courses:', error);
      return [];
    }
  }

  async getCourse(courseId: string): Promise<Course | null> {
    try {
      const response = await axios.get(`${UMDIO_BASE_URL}/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      return null;
    }
  }
}

export const umdioService = new UMDioService();