import React, { useState, useEffect } from 'react';
import type { Question, NewQuestion } from './types';
import { Image as ImageIcon } from 'lucide-react';
import { createQuestionApi, updateQuestionApi, getTopicsApi, type Topic } from '../../services/quizService';

interface Props {
  onSave: (question: NewQuestion) => void;
  initialData: Question | null;
  onClose: () => void;
}

export default function EssayForm({ onSave, initialData, onClose }: Props) {
  const [content, setContent] = useState('');
  const [answer, setAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('Dễ');
  
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopicsApi();
      setTopics(data);
      if (initialData?.topicId) {
        setSelectedTopicId(initialData.topicId);
      } else if (data.length > 0) {
        setSelectedTopicId(data[0].id);
      }
    };
    fetchTopics();

    if (initialData?.questionType === 'ESSAY') {
      setContent(initialData.content);
      setAnswer(initialData.options?.[0]?.content || '');
      // Nếu initialData có difficulty thì set lại ở đây (nếu cần)
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopicId) { alert("Vui lòng chọn Chủ đề!"); return; }

    setIsLoading(true);
    try {
      const payload = {
        content: content,
        questionType: 'ESSAY',
        difficulty: difficulty,
        topicId: selectedTopicId,
        options: [] 
      };

      let savedData;

      // --- LOGIC PHÂN BIỆT TẠO MỚI / CẬP NHẬT ---
      if (initialData?.id) {
        // Có ID -> Gọi API Update
        savedData = await updateQuestionApi(initialData.id, payload);
        alert("Cập nhật thành công!");
      } else {
        // Không có ID -> Gọi API Create
        savedData = await createQuestionApi(payload);
        alert("Thêm mới thành công!");
      }

      // Trả dữ liệu về trang cha để hiển thị
      onSave({ 
        content, 
        questionType: 'ESSAY', 
        id: savedData.id, // ID từ backend
        topicId: selectedTopicId, // Lưu lại topicId để lần sau mở lên edit vẫn đúng
        options: [{ content: answer, isCorrect: true }] 
      });

    } catch (error) {
      console.error(error);
      alert("Lỗi khi lưu câu hỏi!");
    } finally {
      setIsLoading(false);
    }
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
      </div>

      <div>
        <label htmlFor="explanation" className="block text-sm font-semibold text-gray-800 mb-2">Gợi ý / Giải thích</label>
        <textarea id="explanation" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Ghi chú của giảng viên" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-800 mb-2">Mức độ khó</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
            <option>Dễ</option>
            <option>Trung bình</option>
            <option>Khó</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">Chủ đề (Topic)</label>
          {topics.length === 0 ? (
             <div className="text-sm text-red-500 bg-red-50 p-2 rounded">⚠️ Chưa có Topic.</div>
          ) : (
              <select value={selectedTopicId} onChange={(e) => setSelectedTopicId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                {topics.map((topic) => (<option key={topic.id} value={topic.id}>{topic.name}</option>))}
              </select>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Loại câu hỏi: <span className="font-semibold text-gray-800">Tự luận ngắn</span></p>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">Hủy</button>
          <button type="submit" disabled={isLoading} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">{isLoading ? 'Đang lưu...' : 'Lưu câu hỏi'}</button>
        </div>
      </div>
    </form>
  );
}