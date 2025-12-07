import React, { useState, useEffect } from 'react';
import type { Question, NewQuestion } from '../../types/quiz';
import MultipleChoiceForm from './MultipleChoiceForm';
import TrueFalseForm from './TrueFalseForm';
import EssayForm from './EssayForm';

type QuestionTypeTab = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'ESSAY';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: NewQuestion) => void;
  existingQuestion: Question | null;
}

export function AddQuestionModal({ isOpen, onClose, onSave, existingQuestion }: Props) {
  const [activeTab, setActiveTab] = useState<QuestionTypeTab>('MULTIPLE_CHOICE');

  useEffect(() => {
    if (existingQuestion) setActiveTab(existingQuestion.questionType);
    else setActiveTab('MULTIPLE_CHOICE');
  }, [existingQuestion]);

  if (!isOpen) return null;

  const handleSaveAndClose = (questionData: NewQuestion) => {
    onSave(questionData);
    onClose();
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceForm onSave={handleSaveAndClose} initialData={existingQuestion} onClose={onClose} />;
      case 'TRUE_FALSE':
        return <TrueFalseForm onSave={handleSaveAndClose} initialData={existingQuestion} onClose={onClose} />;
      case 'ESSAY':
        return <EssayForm onSave={handleSaveAndClose} initialData={existingQuestion} onClose={onClose} />;
      default: return null;
    }
  };

  const TabButton = ({ type, children }: { type: QuestionTypeTab; children: React.ReactNode }) => (
    <button type="button" onClick={() => !existingQuestion && setActiveTab(type)} disabled={!!existingQuestion} className={`py-2 px-3 text-sm font-medium border-b-2 ${activeTab === type ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700'} disabled:cursor-not-allowed disabled:text-gray-400`}>
      {children}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-start justify-center overflow-y-auto z-50 p-10" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{existingQuestion ? 'Chỉnh sửa câu hỏi' : `Tạo câu hỏi ${activeTab === 'MULTIPLE_CHOICE' ? 'Trắc nghiệm' : activeTab === 'TRUE_FALSE' ? 'Đúng/Sai' : 'Tự luận'}`}</h3>
          <p className="text-sm text-gray-500 mt-1">Thêm nội dung và các tùy chọn cho câu hỏi.</p>
        </div>
        <div className="p-8">
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex gap-4">
              <TabButton type="MULTIPLE_CHOICE">Trắc nghiệm</TabButton>
              <TabButton type="TRUE_FALSE">Đúng / Sai</TabButton>
              <TabButton type="ESSAY">Tự luận</TabButton>
            </nav>
          </div>
          <div>{renderForm()}</div>
        </div>
      </div>
    </div>
  );
}