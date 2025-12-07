// src/pages/CreateQuiz/types.ts

export interface Option {
  content: string;
  isCorrect: boolean;
}

export interface Question {
  id: string | number; // SỬA: Cho phép cả string (Backend) và number (Temp)
  content: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'ESSAY';
  options?: Option[];
  explanation?: string;
  difficulty?: string; // THÊM
  topicId?: string;    // THÊM
}

export type NewQuestion = Omit<Question, 'id'> & { id?: string | number };