import React from 'react';
import type { Question } from '../types/types';
import { Check, XCircle } from 'lucide-react';

interface ResultCardProps {
  question: Question;
  questionNumber: number;
  userAnswer?: string;
  showExplanation: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ question, questionNumber, userAnswer, showExplanation }) => {
  const isCorrect = userAnswer === question.correctAnswer;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 justify-between">
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
      </div>

      <div className="space-y-2 mb-4">
        {question.options?.map((option) => {
          const isUserAnswer = userAnswer === option.id;
          const isCorrectAnswer = option.id === question.correctAnswer;
          
          let className = 'flex items-center p-3 rounded-lg border-2 ';
          if (isCorrectAnswer) {
            className += 'border-emerald-500 bg-emerald-50';
          } else if (isUserAnswer && !isCorrect) {
            className += 'border-red-500 bg-red-50';
          } else {
            className += 'border-gray-200';
          }

          return (
            <div key={option.id} className={className}>
              <span className="mr-2 font-medium text-gray-700">{option.id.toUpperCase()}</span>
              <span className="text-gray-900 text-left flex-1">{option.text}</span>
              {isCorrectAnswer && <Check className="w-5 h-5 text-emerald-600" />}
              {isUserAnswer && !isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
            </div>
          );
        })}

        {question.type === 'Short Answer' && (
          <div className="space-y-2 text-left">
            <div className={`p-3 rounded-lg border-2 ${isCorrect ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'}`}>
              <div className="text-sm text-gray-600 mb-1">Câu trả lời của bạn:</div>
              <div className="font-medium">{userAnswer || '(Chưa trả lời)'}</div>
            </div>
            <div className="p-3 rounded-lg border-2 border-emerald-500 bg-emerald-50">
              <div>Đáp án đúng: {question.correctAnswer}</div>
            </div>
          </div>
        )}
      </div>

      {showExplanation && question.explanation && (
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
          <span><span className="font-medium">Giải thích:</span> {question.explanation}</span>
        </div>
      )}
    </div>
  );
};

export default ResultCard;