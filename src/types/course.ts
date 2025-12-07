export interface Topic {
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

export interface CourseData {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: number | null;
  validFrom: string | null;
  validTo: string | null;
  topics: Topic[];
}

export interface Course {
  id: string;
  title: string;
  startDate: string;
  students: number;
  videos: number;
  duration: string;
  topics?: number; // Add topics count
}

export interface ApiCourse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: number | null;
  validFrom: string | null;
  validTo: string | null;
}

export interface ApiTopic {
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

export interface ApiCourseWithTopics extends ApiCourse {
  topics: ApiTopic[];
}