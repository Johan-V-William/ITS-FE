export interface Student {
  id: string;
  name: string;
  avatar?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  chapterName: string;
  totalQuestions: number;
  duration: number;
  maxAttempts: number;
  maxScore: number;
  openDate: string;
  closeDate: string;
  guidelines: string[];
}

export interface Question {
  id: string;
  quizId: string;
  questionNumber: number;
  type: 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  answers: Record<string, string>;
  score?: number;
  percentage?: number;
  timeSpent?: number;
}

export interface QuizResult {
  attempt: QuizAttempt;
  quiz: Quiz;
  questions: Question[];
  correctCount: number;
  incorrectCount: number;
  timeSpent: number;
  percentage: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
  };
  questionStats: {
    type: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
}
