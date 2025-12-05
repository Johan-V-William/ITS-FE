import React, { useState, useEffect } from 'react';
import type { Question, NewQuestion } from './types';
import { Plus, Trash2, Bold, Italic, Underline, Image as ImageIcon } from 'lucide-react';

interface Props {
  onSave: (question: NewQuestion) => void;
  initialData: Question | null;
  onClose: () => void;
}

// Component nhỏ cho các tag
const TagPill = ({ text }: { text: string }) => (
  <div className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{text}</div>
);

export default function MultipleChoiceForm({ onSave, initialData, onClose }: Props) {
  const [content, setContent] = useState('');
  const [options, setOptions] = useState<{ content: string }[]>([
    { content: '' }, { content: '' }, { content: '' }, { content: '' }
  ]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>(['Java', 'OOP']);

  useEffect(() => {
    if (initialData?.questionType === 'MULTIPLE_CHOICE') {
      setContent(initialData.content);
      setOptions(initialData.options?.map(opt => ({ content: opt.content })) || []);
      setCorrectOptionIndex(initialData.options?.findIndex(opt => opt.isCorrect) ?? null);
    }
  }, [initialData]);

  const handleAddOption = () => setOptions([...options, { content: '' }]);
  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
    if (correctOptionIndex === index) setCorrectOptionIndex(null);
  };
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index].content = value;
    setOptions(newOptions);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (correctOptionIndex === null) { alert("Vui lòng chọn một đáp án đúng."); return; }
    const finalOptions = options.map((opt, index) => ({ ...opt, isCorrect: index === correctOptionIndex }));
    onSave({ content, questionType: 'MULTIPLE_CHOICE', options: finalOptions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Nội dung câu hỏi */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Nội dung câu hỏi</label>
        <div className="border border-gray-300 rounded-lg">
          <div className="p-2 border-b border-gray-300 flex items-center gap-4 bg-gray-50/50">
            <Bold size={18} className="cursor-pointer hover:text-emerald-600" />
            <Italic size={18} className="cursor-pointer hover:text-emerald-600" />
            <Underline size={18} className="cursor-pointer hover:text-emerald-600" />
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} className="w-full p-3 focus:outline-none" placeholder="Nhập nội dung câu hỏi..." required />
        </div>
        <button type="button" className="mt-2 flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800">
          <ImageIcon size={16} /> Thêm hình minh họa
        </button>
      </div>

      {/* Đáp án */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Đáp án</label>
        <div className="space-y-3">
          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-gray-50/30">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">
                {String.fromCharCode(65 + index)}
              </div>
              <input type="text" placeholder={`Nhập nội dung đáp án ${String.fromCharCode(65 + index)}...`} value={opt.content} onChange={(e) => handleOptionChange(index, e.target.value)} className="flex-grow px-3 py-2 bg-transparent focus:outline-none" required />
              <div className="flex items-center gap-2 pr-2">
                <input id={`option-${index}`} type="radio" name="correct_option" checked={correctOptionIndex === index} onChange={() => setCorrectOptionIndex(index)} className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-400" />
                <label htmlFor={`option-${index}`} className="text-sm text-gray-600">Chọn đúng</label>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddOption} className="mt-3 flex items-center gap-2 text-sm text-emerald-600 font-semibold border border-emerald-500 rounded-lg px-4 py-2 hover:bg-emerald-50">
          <Plus size={16} /> Thêm lựa chọn khác
        </button>
      </div>
      
      {/* Các trường thông tin khác */}
      <div>
        <label htmlFor="explanation" className="block text-sm font-semibold text-gray-800 mb-2">Giải thích / Gợi ý</label>
        <textarea id="explanation" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Nhập giải thích cho câu trả lời đúng..." />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-800 mb-2">Mức độ khó</label>
          <select id="difficulty" className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option>Dễ</option><option>Trung bình</option><option>Khó</option></select>
        </div>
        <div>
          <label htmlFor="hint_time" className="block text-sm font-semibold text-gray-800 mb-2">Thời gian gợi ý (giây)</label>
          <input type="number" id="hint_time" defaultValue={60} className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Tags</label>
        <div className="flex items-center gap-2">
          {tags.map(tag => <TagPill key={tag} text={tag} />)}
          <button type="button" className="text-sm text-blue-600 font-semibold hover:text-blue-800">+ Thêm tag</button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Loại câu hỏi: <span className="font-semibold text-gray-800">Trắc nghiệm</span></p>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">Hủy</button>
          <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">Lưu câu hỏi</button>
        </div>
      </div>
    </form>
  );
}