import { FileText, Clock, RefreshCw, Star, Calendar, CheckCircle2, ArrowLeft, Play } from 'lucide-react';
import { QuizInfoCard } from '../../components/Card/QuizInfoCard';
import type { Quiz, Student } from '../../types/student';
import FooterPage from '@/components/FooterPage';
import { StudentHeader } from '@/components/StudentHeader';

interface QuizIntroProps {
  quiz: Quiz;
  student: Student;
  onStartQuiz: () => void;
  onBackToCourse: () => void;
}

export const QuizIntro = ({ quiz, student, onStartQuiz, onBackToCourse }: QuizIntroProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StudentHeader
        student={student}
        breadcrumbs={['Trang chủ', 'Khóa học', quiz.courseName, quiz.chapterName]}
        onExit={onBackToCourse}
      />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-lg p-8 mb-6 border border-gray-200">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
              <p className="text-gray-600 leading-relaxed">{quiz.description}</p>

              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">
                    <span className="font-semibold">{quiz.totalQuestions}</span> câu hỏi
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span className="text-gray-700">
                    Thời lượng: <span className="font-semibold">{quiz.duration} phút</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <RefreshCw className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">
                    Số lần làm: <span className="font-semibold">{quiz.maxAttempts}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Star className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">
                    Điểm tối đa: <span className="font-semibold">{quiz.maxScore}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <QuizInfoCard
            icon={Clock}
            iconColor="text-blue-600"
            iconBgColor="bg-blue-50"
            label="Thời gian làm bài"
            value={`${quiz.duration} phút`}
          />
          <QuizInfoCard
            icon={Calendar}
            iconColor="text-emerald-600"
            iconBgColor="bg-emerald-50"
            label="Ngày mở / Ngày đóng"
            value={`${quiz.openDate} – ${quiz.closeDate}`}
          />
          <QuizInfoCard
            icon={RefreshCw}
            iconColor="text-orange-600"
            iconBgColor="bg-orange-50"
            label="Số lần làm tối đa"
            value={`${quiz.maxAttempts} lần`}
          />
          <QuizInfoCard
            icon={Star}
            iconColor="text-purple-600"
            iconBgColor="bg-purple-50"
            label="Điểm tối đa"
            value={`${quiz.maxScore} điểm`}
          />
        </div>

        <div className="bg-white rounded-lg p-8 mb-6 border border-gray-200">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Hướng dẫn và quy định</h2>
          </div>

          <ul className="space-y-3">
            {quiz.guidelines.map((guideline, index) => (
              <li key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{guideline}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-lg p-8 border border-gray-200">
          <p className="text-center text-gray-600 mb-6">
            Khi bạn nhấn <span className="font-semibold">"Bắt đầu làm bài"</span>, thời gian sẽ bắt đầu đếm ngược.
            Đảm bảo bạn đã chuẩn bị sẵn sàng.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Bắt đầu làm bài</span>
            </button>
            <button
              onClick={onBackToCourse}
              className="w-full sm:w-auto px-8 py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Quay lại khóa học</span>
            </button>
          </div>
        </div>
      </main>

      <FooterPage />
    </div>
  );
};
