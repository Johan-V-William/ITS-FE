// src/pages/CreateQuiz/types.ts

export interface Option {
  content: string;
  isCorrect: boolean;
}

export interface Question {
  id: number; // ID tạm thời ở frontend để quản lý (sửa, xóa)
  content: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'ESSAY';
  options?: Option[];
  explanation?: string;
  // Thêm các trường khác từ backend nếu cần (ví dụ: difficulty)
}

// Dùng Omit để loại bỏ 'id' khi gửi lên server
export type NewQuestion = Omit<Question, 'id'>;