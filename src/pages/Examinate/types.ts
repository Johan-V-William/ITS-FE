export interface QuizOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  question: string;
  type: 'MCQ' | 'Short Answer' | 'True/False';
  options?: QuizOption[];
  correctAnswer: string;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  course: string;
  totalQuestions: number;
  duration: number;
  createdDate: string;
  questions: Question[];
}

export interface QuizResult {
  score: number;
  correctCount: number;
  totalQuestions: number;
  answers: Record<string, string>;
  timeSubmitted: string;
  quizId: string;
  studentId: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface QuizResultsData {
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  studentResults: Array<{
    student: Student;
    score: number | null;
    attempts: number;
    submittedDate: string;
    status: string;
  }>;
}