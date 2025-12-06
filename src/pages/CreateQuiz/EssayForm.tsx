import React, { useState, useEffect } from 'react';
import type { Question, NewQuestion } from './types';
import { Image as ImageIcon } from 'lucide-react';

const TagPill = ({ text }: { text: string }) => (
  <div className="bg-emerald-100 text-emerald-800 text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-2">
    {text}
    <button type="button" className="text-emerald-600 hover:text-emerald-900">×</button>
  </div>
);

interface Props {
  onSave: (question: NewQuestion) => void;
  initialData: Question | null;
  onClose: () => void;
}

export default function EssayForm({ onSave, initialData, onClose }: Props) {
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [tags, setTags] = useState<string[]>(['Python', 'Cấu trúc dữ liệu']);
  
  useEffect(() => {
    if (initialData?.questionType === 'ESSAY') {
      setContent(initialData.content);
      setAnswer(initialData.options?.[0]?.content || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ content, questionType: 'ESSAY', options: [{ content: answer, isCorrect: true }] });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Nội dung câu hỏi</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Câu hỏi" required />
        <button type="button" className="mt-2 flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800"><ImageIcon size={16} /> Thêm hình minh họa</button>
      </div>

      <div>
        <label htmlFor="answer" className="block text-sm font-semibold text-gray-800 mb-2">Đáp án đúng</label>
        <input id="answer" type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Nhập đáp án chính xác..." />
        <p className="text-xs text-gray-500 mt-1">Câu trả lời phải khớp 100% hoặc có thể dùng kiểm tra tương tự (string similarity).</p>
      </div>

      <div>
        <label htmlFor="explanation" className="block text-sm font-semibold text-gray-800 mb-2">Gợi ý / Giải thích</label>
        <textarea id="explanation" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Ghi chú của giảng viên" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-800 mb-2">Mức độ khó</label>
          <select id="difficulty" className="w-full px-4 py-2 border border-gray-300 rounded-lg"><option>Dễ</option><option>Trung bình</option><option>Khó</option></select>
        </div>
        <div>
          <label htmlFor="tags" className="block text-sm font-semibold text-gray-800 mb-2">Tag chủ đề</label>
          <div className="flex flex-wrap items-center gap-2">
            {tags.map(tag => <TagPill key={tag} text={tag} />)}
            <input id="tags" type="text" className="flex-grow min-w-[100px] text-sm border-none focus:ring-0 p-1" placeholder="Thêm tag mới..."/>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Loại câu hỏi: <span className="font-semibold text-gray-800">Tự luận ngắn</span></p>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">Hủy</button>
          <button type="submit" className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">Lưu câu hỏi</button>
        </div>
      </div>
    </form>
  );
}