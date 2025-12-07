import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Interface cho Topic
export interface Topic {
  id: string;
  name: string;
}

// Helper chuyển đổi độ khó
const mapDifficulty = (diff: string): number => {
  if (diff === 'Trung bình') return 2;
  if (diff === 'Khó') return 3;
  return 1; // Dễ
};

// API 1: Lấy danh sách Topic
export const getTopicsApi = async (): Promise<Topic[]> => {
  try {
    const response = await axios.get(`${API_URL}/content/topics?page=0&size=100`);
    if (response.data && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Lỗi lấy danh sách topic:", error);
    return [];
  }
};

// API 2: Tạo câu hỏi (POST)
export const createQuestionApi = async (data: any) => {
  const payload = {
    topicId: data.topicId, 
    content: data.content,
    difficulty: mapDifficulty(data.difficulty),
    questionType: data.questionType,
    choices: data.options || [] 
  };
  const response = await axios.post(`${API_URL}/content/questions`, payload);
  return response.data;
};

// API 3: Cập nhật câu hỏi (PUT)
export const updateQuestionApi = async (id: string | number, data: any) => {
  const payload = {
    topicId: data.topicId,
    content: data.content,
    difficulty: mapDifficulty(data.difficulty),
    questionType: data.questionType,
    choices: data.options || []
  };
  const response = await axios.put(`${API_URL}/content/questions/${id}`, payload);
  return response.data;
};

// API 4: Xóa câu hỏi (DELETE)
export const deleteQuestionApi = async (id: string | number) => {
  await axios.delete(`${API_URL}/content/questions/${id}`);
  return true;
};

// API 5: Tạo bài thi
export const createQuizApi = async (data: any) => {
  const payload = {
    title: data.title,
    description: data.description,
    duration: Number(data.duration),
    topicId: data.topicId, 
    questionIds: data.questionIds || []
  };
  console.log("Payload tạo Quiz:", JSON.stringify(payload, null, 2));
  const response = await axios.post(`${API_URL}/assessments/quiz`, payload);
  return response.data;
};

// API 6: Lấy danh sách câu hỏi (MỚI THÊM)
export const getQuestionsApi = async () => {
  try {
    // Lấy 100 câu hỏi mới nhất (có thể tăng size nếu cần)
    const response = await axios.get(`${API_URL}/content/questions?page=0&size=100`);
    
    // Xử lý dữ liệu phân trang của Spring Boot
    if (response.data && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    // Trường hợp trả về mảng trực tiếp
    if (Array.isArray(response.data)) {
      return response.data;
    }
    return [];
  } catch (error) {
    console.error("Lỗi lấy danh sách câu hỏi:", error);
    return [];
  }
};