export interface Course {
  id: string;
  title: string;
  startDate: string;
  students: number;
  videos: number;
  duration: string;
  topics?: number; // Add topics count
}

interface ApiCourse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: number | null;
  validFrom: string | null;
  validTo: string | null;
}

interface ApiTopic {
  id: string;
  courseId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: string | null;
  validFrom: string | null;
  validTo: string | null;
  questions: any[];
}

interface ApiCourseWithTopics extends ApiCourse {
  topics: ApiTopic[];
}

class CourseService {
  private courseCache: Map<string, ApiCourse> = new Map();
  private coursesCache: ApiCourseWithTopics[] | null = null;
  private cacheTimestamp: number | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache
  private apiBaseUrl: string = 'http://localhost:8080/api';

  // Check if cache is still valid
  private isCacheValid(): boolean {
    if (!this.cacheTimestamp) return false;
    return Date.now() - this.cacheTimestamp < this.CACHE_DURATION;
  }

  async getCourseByID(courseId: string): Promise<ApiCourse> {
    // Check cache first
    if (this.courseCache.has(courseId)) {
      return this.courseCache.get(courseId)!;
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/content/courses/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch course: ${response.status} ${response.statusText}`);
      }

      const course: ApiCourse = await response.json();
      
      // Cache the course
      this.courseCache.set(courseId, course);
      
      return course;
    } catch (error) {
      console.error('Error fetching course:', error);
      // Return a fallback course if fetch fails
      return {
        id: courseId,
        name: 'Unknown Course',
        description: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 0,
        validFrom: new Date().toISOString(),
        validTo: new Date().toISOString()
      };
    }
  }

  async getAllCourses(): Promise<ApiCourseWithTopics[]> {
    // Check cache first
    if (this.coursesCache && this.isCacheValid()) {
      return this.coursesCache;
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/content/courses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.status} ${response.statusText}`);
      }

      const courses: ApiCourseWithTopics[] = await response.json();
      
      // Cache the courses
      this.coursesCache = courses;
      this.cacheTimestamp = Date.now();
      
      // Also cache individual courses for getCourse method
      courses.forEach(course => {
        this.courseCache.set(course.id, {
          id: course.id,
          name: course.name,
          description: course.description,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          version: course.version,
          validFrom: course.validFrom,
          validTo: course.validTo
        });
      });
      
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error(`Unable to load courses: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Transform API course to frontend Course type
  transformToCourse(apiCourse: ApiCourseWithTopics): Course {
    return {
      id: apiCourse.id,
      title: apiCourse.name,
      startDate: apiCourse.createdAt,
      students: 0, // TODO: Get from API when available
      videos: 0, // TODO: Get from API when available
      duration: '0h', // TODO: Calculate or get from API when available
      topics: apiCourse.topics?.length || 0
    };
  }

  // Get all courses transformed to frontend format
  async getCoursesForUI(): Promise<Course[]> {
    const apiCourses = await this.getAllCourses();
    return apiCourses.map(course => this.transformToCourse(course));
  }

  // Get topic count for a specific course
  async getCourseTopicCount(courseId: string): Promise<number> {
    const courses = await this.getAllCourses();
    const course = courses.find(c => c.id === courseId);
    return course?.topics?.length || 0;
  }

  // Clear all caches
  clearCache(): void {
    this.courseCache.clear();
    this.coursesCache = null;
    this.cacheTimestamp = null;
  }

  // Clear only the courses list cache (useful after adding/updating courses)
  clearCoursesCache(): void {
    this.coursesCache = null;
    this.cacheTimestamp = null;
  }

  // Set API base URL (useful for different environments)
  setApiBaseUrl(url: string): void {
    this.apiBaseUrl = url;
  }
}

export const courseService = new CourseService();

export default CourseService;