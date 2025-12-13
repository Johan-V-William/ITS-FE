import { useState } from 'react';
import { CheckCircle2, Clock, FileText, ArrowLeft, Star } from 'lucide-react';
import type { Quiz, Student, QuizResult as QuizResultType } from '../../types/student';
import { StudentHeader } from '@/components/StudentHeader';
import FooterPage from '@/components/FooterPage';

interface QuizResultProps {
  result: QuizResultType;
  student: Student;
  onBackToCourse: () => void;
  onViewDetails: () => void;
}

export const QuizResult = ({ result, student, onBackToCourse, onViewDetails }: QuizResultProps) => {
  const [activeTab, setActiveTab] = useState<'strengths' | 'weaknesses' | 'review'>('strengths');
  const quiz = result.quiz;

  const getFeedbackContent = () => {
    if (activeTab === 'strengths') {
      return result.feedback.strengths;
    } else if (activeTab === 'weaknesses') {
      return result.feedback.weaknesses;
    }
    return ['Ôn tập lại các khái niệm cơ bản về kế thừa và đa hình'];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StudentHeader
        student={student}
        breadcrumbs={['Trang chủ', 'Khóa học', quiz.courseName, quiz.chapterName]}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-lg p-8 mb-6 border border-gray-200 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Kết quả bài làm của bạn
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Quiz: {quiz.title} – Nộp ngày {result.attempt.endTime}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">
                {result.percentage}%
              </div>
              <div className="text-gray-600">Điểm đạt được</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {result.correctCount}/{quiz.totalQuestions}
              </div>
              <div className="text-gray-600">Câu đúng</div>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-gray-900 mb-2">{result.timeSpent}</div>
              <div className="text-gray-600">Phút</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">Tiến độ hoàn thành</span>
              <span className="font-semibold text-emerald-600">{result.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-emerald-500 h-3 rounded-full transition-all"
                style={{ width: `${result.percentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Phản hồi cho bài làm</h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Bạn đã nắm vững các khái niệm cơ bản trong phần lập trình Java. Tuy nhiên, bạn cần
            xem lại phần 'kế thừa' và 'bộ nhớ JVM'. Để xuất sắc hơn lại Chương 3 – Lớp và Đối tượng.
          </p>

          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('strengths')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'strengths'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Hiểu tốt nền tảng
            </button>
            <button
              onClick={() => setActiveTab('weaknesses')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'weaknesses'
                  ? 'text-red-600 border-b-2 border-red-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sai câu năng cao
            </button>
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'review'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cần ôn lại kế thừa
            </button>
          </div>

          <div className="flex items-start justify-between">
            <ul className="space-y-2 flex-1">
              {getFeedbackContent().map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="ml-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">A</span>
              </div>
              <p className="text-xs text-gray-600 mt-2">Kết quả tốt!</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Tổng quan bài làm</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Loại câu hỏi
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                    Số lượng
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                    Trả lời đúng
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                    Tỷ lệ đúng
                  </th>
                </tr>
              </thead>
              <tbody>
                {result.questionStats.map((stat, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-4 text-gray-900">{stat.type}</td>
                    <td className="py-4 px-4 text-center text-gray-900">{stat.total}</td>
                    <td className="py-4 px-4 text-center text-gray-900">{stat.correct}</td>
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          stat.percentage >= 80
                            ? 'bg-emerald-100 text-emerald-700'
                            : stat.percentage >= 60
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {stat.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Hành động tiếp theo
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onViewDetails}
              className="w-full sm:w-auto px-8 py-3 border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
            >
              <FileText className="w-5 h-5" />
              <span>Xem chi tiết từng câu hỏi</span>
            </button>
            <button
              onClick={onBackToCourse}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại khóa học</span>
            </button>
          </div>

          <p className="text-sm text-gray-600 text-center mt-6">
            Bạn có thể xem lại bài làm để học từ các lỗi sai của mình.
          </p>
        </div>
      </main>

      <FooterPage />
    </div>
  );
};
