import React, { useState, useEffect } from 'react';
import type { Question, NewQuestion } from './types';
import { Image as ImageIcon, Check, X } from 'lucide-react';

interface Props {
  onSave: (question: NewQuestion) => void;
  initialData: Question | null;
  onClose: () => void;
}

export default function TrueFalseForm({ onSave, initialData, onClose }: Props) {
  const [content, setContent] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    if (initialData?.questionType === 'TRUE_FALSE') {
      setContent(initialData.content);
      const correctOpt = initialData.options?.find(opt => opt.isCorrect);
      if (correctOpt) setCorrectAnswer(correctOpt.content.toLowerCase() === 'true');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (correctAnswer === null) { alert('Vui lòng chọn đáp án Đúng hoặc Sai.'); return; }
    const options = [ { content: 'True', isCorrect: correctAnswer === true }, { content: 'False', isCorrect: correctAnswer === false } ];
    onSave({ content, questionType: 'TRUE_FALSE', options });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Nội dung câu hỏi</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Nhập nội dung câu hỏi tại đây..." required />
        <button type="button" className="mt-2 flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800"><ImageIcon size={16} /> Thêm hình minh họa</button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Chọn đáp án đúng</label>
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => setCorrectAnswer(true)} className={`cursor-pointer p-6 border-2 rounded-lg text-center font-medium transition-all ${correctAnswer === true ? 'border-blue-500 bg-blue-50/70' : 'border-gray-300 hover:border-gray-400'}`}>
            <div className={`mx-auto h-8 w-8 rounded-full flex items-center justify-center mb-2 ${correctAnswer === true ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}><Check size={20} /></div>
            <p className="font-bold text-lg text-gray-800">Đúng</p>
            <p className="text-sm text-gray-500">Đáp án chính xác</p>
          </div>
          <div onClick={() => setCorrectAnswer(false)} className={`cursor-pointer p-6 border-2 rounded-lg text-center font-medium transition-all ${correctAnswer === false ? 'border-red-400 bg-red-50/70' : 'border-gray-300 hover:border-gray-400'}`}>
             <div className={`mx-auto h-8 w-8 rounded-full flex items-center justify-center mb-2 ${correctAnswer === false ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-500'}`}><X size={20} /></div>
            <p className="font-bold text-lg text-gray-800">Sai</p>
            <p className="text-sm text-gray-500">Đáp án không chính xác</p>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="explanation" className="block text-sm font-semibold text-gray-800 mb-2">Giải thích / Gợi ý</label>
        <textarea id="explanation" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Nhập giải thích hoặc ví dụ giúp sinh viên hiểu lý do đáp án đúng." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-800 mb-2">Mức độ khó</label>
          <select id="difficulty" className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option>Dễ</option><option>Trung bình</option><option>Khó</option></select>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-800 mb-2">Chủ đề</label>
          <input type="text" id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Nhập từ khóa chủ đề..."/>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Loại câu hỏi: <span className="font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">Đúng / Sai</span></p>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">Hủy</button>
          <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">Lưu câu hỏi</button>
        </div>
      </div>
    </form>
  );
}