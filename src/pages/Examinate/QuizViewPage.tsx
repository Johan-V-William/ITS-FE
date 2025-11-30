import React, { useState } from 'react';
import { useQuiz } from '../../hooks/useQuiz';
import QuestionCard from '../../components/Card/QuestionCard';
import ResultsPage from '../Examinate/ResultsPage';

interface QuizViewPageProps {
  quizId: string;
}

const QuizViewPage: React.FC<QuizViewPageProps> = () => {
  // const { quizId } = useParams();
  const quizId = "quiz-1";

  const { quiz, loading } = useQuiz(quizId);
  const [activeTab, setActiveTab] = useState<'questions' | 'answers'>('questions');

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Đang tải...</div>;
  }

  if (!quiz) return null;

  return (
    <div className="min-h-screen bg-[#E9F5EE]">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="w-full max-w-full px-6 py-4">
          <div className="text-sm text-gray-500 mb-3 text-left">
            Trang chủ › Khóa học › {quiz.course} › Quiz
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-left">{quiz.title}</h1>
          
          <div className="flex gap-3">
            <span className="px-4 py-2 bg-[#DDF7EB] rounded-lg text-sm font-medium">
              Khóa học: {quiz.course}
            </span>
            <span className="px-4 py-2 bg-[#E3F2FD] rounded-lg text-sm font-medium">
              {quiz.totalQuestions} Câu hỏi
            </span>
            <span className="px-4 py-2 bg-[#DDF7EB] rounded-lg text-sm font-medium">
              Thời lượng: {quiz.duration} phút
            </span>
            <span className="px-4 py-2 bg-[#E3F2FD] rounded-lg text-sm font-medium">
              Cập nhật: {quiz.createdDate}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full px-6 py-6">
        <div className="bg-white rounded-t-lg border-t border-x border-gray-200">
          <div className="flex items-center justify-center gap-32 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('questions')}
              className={`py-4 font-medium text-base transition-colors ${
                activeTab === 'questions'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Câu hỏi
            </button>
            <button
              onClick={() => setActiveTab('answers')}
              className={`py-4 font-medium text-base transition-colors ${
                activeTab === 'answers'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Danh sách trả lời
            </button>
          </div>
        </div>

        <div className="mt-4">
          {activeTab === 'questions' && (
            <>
              {quiz.questions.map((question: typeof quiz.questions[0], index: number) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  questionNumber={index + 1}
                  viewMode="preview"
                />
              ))}
            </>
          )}

          {activeTab === 'answers' && (
            <>
              <ResultsPage quizId={quizId} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizViewPage;

