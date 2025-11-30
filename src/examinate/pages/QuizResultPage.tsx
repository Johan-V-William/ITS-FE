import React from 'react';
import { useQuiz } from '../hooks/useQuiz';
import type { QuizResult, Student } from '../types/types';
import ResultCard from '../components/ResultCard';

interface QuizResultPageProps {
  quizId: string;
  result: QuizResult;
  student: Student;
}

const QuizResultPage: React.FC<QuizResultPageProps> = ({ quizId, result, student }) => {
  const { quiz } = useQuiz(quizId);

    const submittedDate = new Date(result.timeSubmitted);
  const formattedTime = submittedDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const formattedDate = submittedDate.toLocaleDateString('vi-VN');

  if (!quiz) return null;

  return (
    <div className="min-h-screen bg-[#E9F5EE]">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 px-6 py-6 text-left">
          <div className="text-sm text-gray-500 mb-4">
            Trang chủ › Khóa học › Toán học cơ bản › Quiz › Kết quả › {student.name}
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Kết quả chi tiết – {quiz.title}
          </h1>
          
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=6b7280&color=fff`} 
                alt={student.name} 
                className="w-16 h-16 rounded-full" 
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{student.email}</p>
                <div className="inline-block px-2 py-0.5 bg-[#DBEAFE] text-[#1E40AF] rounded-full">
                    ID: {student.id}
                </div>
                
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-[#DCFCE7] text-[#34A853] rounded-lg font-medium">
                  Điểm đạt được: {Math.round(result.score)}%
                </div>
                <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                  Câu đúng: {result.correctCount}/{result.totalQuestions}
                </div>
              </div>
              <div className="px-2 py-1 bg-[#F3F4F6] text-[#374151] rounded-lg font-medium">
                Thời gian: 18 phút
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Nộp bài lúc: {formattedTime}, {formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full px-6 py-8">
        {quiz.questions.map((question, index) => (
          <ResultCard
            key={question.id}
            question={question}
            questionNumber={index + 1}
            userAnswer={result.answers[question.id]}
            showExplanation={true}
          />
        ))}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="font-bold text-gray-900 mb-4">Phản hồi cho bài làm</h3>
          
          <div className="flex items-start gap-6 mb-6">
            <div className="flex-1 gap-4">
              <div className="p-4 text-left">
                <p className="text-gray-700">
                  Học viên nắm vững các khái niệm cơ bản về Java, nhưng cần cải thiện ở phần kế thừa và bổ nhớ. Đề xuất ôn tập chương 3 – Lớp và Đối tượng.
                </p>
              </div>
              
              <div className="flex gap-2">
                <button className="px-4 py-2 text-[#34A853] rounded-full bg-[#34A8531A]">
                  Hiệu khái niệm tốt
                </button>
                <button className="px-4 py-2 text-[#EA580C] rounded-full bg-[#FFEDD5]">
                  Sai câu hỏi nâng cao
                </button>
                <button className="px-4 py-2 text-[#EA580C] rounded-full bg-[#FFEDD5]">
                  Cần ôn lại kế thừa
                </button>
              </div>
              <textarea
                placeholder="Ghi chú thêm của giảng viên..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none mt-4"
                rows={3}
              />
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#10b981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56 * (result.score / 100)} ${2 * Math.PI * 56}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-600">{Math.round(result.score)}%</span>
                </div>
              </div>
              <span className="text-sm text-gray-600">Tổng điểm</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Tổng kết bài làm</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-emerald-600 font-medium">Tổng điểm: {Math.round(result.score)}%</span>
              <span className="text-blue-600 font-medium">Câu đúng: {result.correctCount}/{result.totalQuestions}</span>
              <span className="text-red-600 font-medium">Câu sai: {result.totalQuestions - result.correctCount}</span>
            </div>
          </div>
          
          <div className="relative pt-2 pb-6">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500 border-t pt-4">
            — Hết bài làm —
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;