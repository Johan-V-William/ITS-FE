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

export interface ApiChoice {
  id: string;
  content: string;
  correct: boolean;
}

export interface ApiQuestion {
  id: string;
  content: string;
  difficulty: number;
  questionType: string;
  createdAt: string;
  updatedAt: string;
  version: string | null;
  validFrom: string | null;
  validTo: string | null;
  choices: ApiChoice[];
}

export interface ApiQuiz {
  id: string;
  courseId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: string | null;
  validFrom: string | null;
  validTo: string | null;
  questions: ApiQuestion[];
}