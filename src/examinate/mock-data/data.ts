export const demoStudent = {
    id: "SV2024001",
    name: 'Nguyễn Văn An',
    email: 'anvanguyen@student.edu.vn'
};

export const demoQuizResult = {
    score: 90,
    correctCount: 9,
    totalQuestions: 10,
    answers: {
      'q1': 'b',
      'q2': 'Java Virtual Machine',
      'q3': 't',
      'q4': 'b',
      'q5': 'a',
      'q6': 't',
      'q7': 'extends',
      'q8': 'c',
      'q9': 'f',
      'q10': 'b'
    },
    timeSubmitted: '2025-10-16T14:30:00',
    quizId: 'quiz-1',
    studentId: "SV2024001"
  }

export const demoQuizResultList = {
  averageScore: 78,
  highestScore: 98,
  lowestScore: 45,
  studentResults: [
    { 
      student: { id: "SV2024001", name: 'Nguyễn Thị Lan', email: 'lan.nguyen@student.edu' },
      score: 95, 
      attempts: 1, 
      submittedDate: '15/10/2025', 
      status: 'Hoàn thành' 
    },
    { 
      student: { id: "SV2024002", name: 'Trần Văn Minh', email: 'minh.tran@student.edu' },
      score: 87, 
      attempts: 2, 
      submittedDate: '14/10/2025', 
      status: 'Hoàn thành' 
    },
    { 
      student: { id: "SV2024003", name: 'Lê Thị Hoa', email: 'hoa.le@student.edu' },
      score: 82, 
      attempts: 1, 
      submittedDate: '16/10/2025', 
      status: 'Hoàn thành' 
    },
    { 
      student: { id: "SV2024004", name: 'Phạm Đức Anh', email: 'anh.pham@student.edu' },
      score: 76, 
      attempts: 3, 
      submittedDate: '13/10/2025', 
      status: 'Hoàn thành' 
    },
    { 
      student: { id: "SV2024005", name: 'Vũ Thị Mai', email: 'mai.vu@student.edu' },
      score: 89, 
      attempts: 2, 
      submittedDate: '17/10/2025', 
      status: 'Hoàn thành' 
    },
    { 
      student: { id: "SV2024006", name: 'Hoàng Văn Tuấn', email: 'tuan.hoang@student.edu' },
      score: 93, 
      attempts: 1, 
      submittedDate: '18/10/2025', 
      status: 'Hoàn thành' 
    },
    { 
      student: { id: "SV2024007", name: 'Đỗ Văn Hưng', email: 'hung.do@student.edu' },
      score: null, 
      attempts: 0, 
      submittedDate: '-', 
      status: 'Chưa nộp' 
    }
  ]
}

export const demoQuiz = {
  id: 'quiz-1',
  title: 'Quiz: Kiểm tra kiến thức Java cơ bản',
  course: 'Lập trình Java cơ bản',
  totalQuestions: 10,
  duration: 30,
  createdDate: '10/2025',
  questions: [
    {
      id: 'q1',
      question: 'Java là ngôn ngữ lập trình thuộc loại nào?',
      type: 'MCQ',
      options: [
        { id: 'a', text: 'Ngôn ngữ thông dịch' },
        { id: 'b', text: 'Ngôn ngữ biên dịch và thông dịch' },
        { id: 'c', text: 'Ngôn ngữ biên dịch' },
        { id: 'd', text: 'Ngôn ngữ máy' }
      ],
      correctAnswer: 'b',
      explanation: 'Java được biên dịch thành bytecode và sau đó được thông dịch bởi JVM'
    },
    {
      id: 'q2',
      question: 'JVM là viết tắt của gì?',
      type: 'Short Answer',
      correctAnswer: 'Java Virtual Machine',
      explanation: 'JVM là máy ảo Java, thực thi bytecode Java'
    },
    {
      id: 'q3',
      question: 'Java có hỗ trợ đa kế thừa không?',
      type: 'True/False',
      options: [
        { id: 't', text: 'Đúng' },
        { id: 'f', text: 'Sai' }
      ],
      correctAnswer: 'f',
      explanation: 'Java chỉ hỗ trợ đơn kế thừa với class, đa kế thừa với interface'
    },
    {
      id: 'q4',
      question: 'Kiểu dữ liệu nào sau đây là kiểu nguyên thủy trong Java?',
      type: 'MCQ',
      options: [
        { id: 'a', text: 'String' },
        { id: 'b', text: 'int' },
        { id: 'c', text: 'Integer' },
        { id: 'd', text: 'ArrayList' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 'q5',
      question: 'Phương thức main() trong Java có signature như thế nào?',
      type: 'MCQ',
      options: [
        { id: 'a', text: 'public static void main(String[] args)' },
        { id: 'b', text: 'public void main(String[] args)' },
        { id: 'c', text: 'static void main(String[] args)' }
      ],
      correctAnswer: 'a'
    },
    {
      id: 'q6',
      question: 'Garbage Collection trong Java có tự động không?',
      type: 'True/False',
      options: [
        { id: 't', text: 'Đúng' },
        { id: 'f', text: 'Sai' }
      ],
      correctAnswer: 't'
    },
    {
      id: 'q7',
      question: 'Từ khóa nào dùng để tạo một class con trong Java?',
      type: 'Short Answer',
      correctAnswer: 'extends'
    },
    {
      id: 'q8',
      question: 'Access modifier nào có phạm vi rộng nhất?',
      type: 'MCQ',
      options: [
        { id: 'a', text: 'private' },
        { id: 'b', text: 'protected' },
        { id: 'c', text: 'public' }
      ],
      correctAnswer: 'c'
    },
    {
      id: 'q9',
      question: 'Java có hỗ trợ con trỏ không?',
      type: 'True/False',
      options: [
        { id: 't', text: 'Đúng' },
        { id: 'f', text: 'Sai' }
      ],
      correctAnswer: 'f'
    },
    {
      id: 'q10',
      question: 'Exception nào được nêm khi chia cho 0 với số nguyên?',
      type: 'MCQ',
      options: [
        { id: 'a', text: 'NullPointerException' },
        { id: 'b', text: 'ArithmeticException' },
        { id: 'c', text: 'NumberFormatException' }
      ],
      correctAnswer: 'b'
    }
  ]
}