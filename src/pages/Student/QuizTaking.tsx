import { useState } from 'react';
import { Clock, FileText, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { QuestionOption } from '../../components/Card/QuestionOption';
import type { Quiz, Question, Student } from '../../types/student';
import FooterPage from '@/components/FooterPage';
import { StudentHeader } from '@/components/StudentHeader';

interface QuizTakingProps {
  quiz: Quiz;
  questions: Question[];
  student: Student;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  timeRemaining: string;
  onAnswerSelect: (questionId: string, answer: string) => void;
  onGoToQuestion: (index: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export const QuizTaking = ({
  quiz,
  questions,
  student,
  currentQuestionIndex,
  answers,
  timeRemaining,
  onAnswerSelect,
  onGoToQuestion,
  onNext,
  onPrevious,
  onSubmit,
}: QuizTakingProps) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  const handleSubmitClick = () => {
    setShowSubmitModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    onSubmit();
  };

  const getQuestionStatus = (index: number) => {
    if (index < currentQuestionIndex) return 'completed';
    if (index === currentQuestionIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <StudentHeader
        student={student}
        breadcrumbs={['Trang chủ', 'Khóa học', quiz.courseName, quiz.chapterName]}
      />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Quiz: {quiz.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Thời lượng: {quiz.duration} phút</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="text-gray-700">{quiz.totalQuestions} câu hỏi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">Điểm tối đa: {quiz.maxScore}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{timeRemaining}</div>
              <div className="text-sm text-gray-600">Thời gian còn lại</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              Câu {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div className="text-sm text-gray-600">{progress}% hoàn thành</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, index) => {
              const status = getQuestionStatus(index);
              const isAnswered = questions[index].id in answers;
              return (
                <button
                  key={index}
                  onClick={() => onGoToQuestion(index)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    status === 'current'
                      ? 'bg-blue-500 text-white'
                      : status === 'completed' && isAnswered
                      ? 'bg-emerald-500 text-white'
                      : status === 'completed'
                      ? 'bg-gray-300 text-gray-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 mb-6 border border-gray-200">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Q{currentQuestion.questionNumber}. {currentQuestion.question}
            </h2>
            {currentQuestion.type === 'MCQ' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                MCQ
              </span>
            )}
          </div>

          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <QuestionOption
                key={index}
                option={option}
                isSelected={answers[currentQuestion.id] === option}
                onSelect={() => onAnswerSelect(currentQuestion.id, option)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onPrevious}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Câu trước</span>
            </button>

            <p className="text-sm text-gray-500">Tự động lưu sau mỗi 30 giây</p>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmitClick}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
              >
                Nộp bài
              </button>
            ) : (
              <button
                onClick={onNext}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </main>

      <FooterPage />

      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
              Xác nhận nộp bài?
            </h2>

            <p className="text-gray-600 text-center mb-6">
              Bạn đã hoàn thành {answeredCount}/{questions.length} câu hỏi. Sau khi nộp, bạn sẽ
              không thể chỉnh sửa bài làm.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Số câu đã trả lời</span>
                <span className="font-bold text-gray-900">
                  {answeredCount} / {questions.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Điểm tối đa</span>
                <span className="font-bold text-gray-900">{quiz.maxScore}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Thời gian còn lại</span>
                <span className="font-bold text-red-600">{timeRemaining}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Tiến độ hoàn thành</span>
                <span className="font-bold text-emerald-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Quay lại làm tiếp
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors"
              >
                Xác nhận nộp bài
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center mt-4">
              Bài làm sẽ được lưu tự động sau khi nộp.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Đảm bảo bạn đã kiểm tra lại các câu hỏi trước khi nộp bài.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
