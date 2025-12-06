import React from 'react';
import type { Question } from '../../pages/Examinate/types';
import { CheckCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  answer?: string;
  onAnswerChange?: (questionId: string, answer: string) => void;
  viewMode?: 'preview' | 'taking';
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  questionNumber, 
  answer, 
  onAnswerChange,
  viewMode = 'taking'
}) => {

  console.log('Rendering QuestionCard:', { question});
  if (viewMode === 'preview') {
    // Admin preview mode - show correct answers
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 justify-between">
            <div className=' flex'>
                <span className="bg-[#DDF7EB] px-3 py-1 rounded-full text-sm font-medium">
                Q{questionNumber}
                </span>
                <h3 className="text-gray-900 font-medium">{question.question}</h3>
            </div>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium ml-4">
                {question.type}
            </span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {question.options?.map((option) => {
            const isCorrect = option.text === question.correctAnswer;
            return (
              <div
                key={option.id}
                className={`flex items-center px-4 py-3 rounded-lg border ${
                  isCorrect
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <span className="text-gray-900 text-left flex-1">{option.text}</span>
              </div>
            );
          })}

          {question.type === 'Short Answer' && (
            <div className="px-4 py-3 text-left rounded-lg border border-[#E0E6E3] bg-[#F3F4F6]">
              <div className="text-[#5F6368] ml-7">Ví dụ câu trả lời: {question.correctAnswer}</div>
            </div>
          )}
        </div>

        {question.explanation && (
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
            <span>{question.explanation}</span>
          </div>
        )}
      </div>
    );
  }

  // Taking mode - interactive questions
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-[#DDF7EB] px-3 py-1 rounded-full text-sm font-medium">
              Q{questionNumber}
            </span>
            <span className="text-blue-600 text-sm font-medium">{question.type}</span>
          </div>
          <h3 className="text-gray-900 font-medium">{question.question}</h3>
        </div>
      </div>

      <div className="space-y-2">
        {question.options?.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
              answer === option.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.id}
              checked={answer === option.id}
              onChange={(e) => onAnswerChange?.(question.id, e.target.value)}
              className="mr-3"
            />
            <span className="mr-2 font-medium text-gray-700">{option.id.toUpperCase()}</span>
            <span className="text-gray-900 text-left flex-1">{option.text}</span>
          </label>
        ))}

        {question.type === 'Short Answer' && (
          <input
            type="text"
            value={answer || ''}
            onChange={(e) => onAnswerChange?.(question.id, e.target.value)}
            placeholder="Nhập câu trả lời..."
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none"
          />
        )}
      </div>
    </div>
  );
};

export default QuestionCard;