import React, { useState, useEffect } from 'react';
import type { Question, NewQuestion } from '../../types/quiz';
import { Plus, Trash2, Bold, Italic, Underline, Image as ImageIcon } from 'lucide-react';
import { createQuestionApi, updateQuestionApi, getTopicsApi, type Topic } from '../../services/quizService';

interface Props {
  onSave: (question: NewQuestion) => void;
  initialData: Question | null;
  onClose: () => void;
}

export default function MultipleChoiceForm({ onSave, initialData, onClose }: Props) {
  const [content, setContent] = useState('');
  const [options, setOptions] = useState<{ content: string }[]>([
    { content: '' }, { content: '' }, { content: '' }, { content: '' }
  ]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (correctOptionIndex === null) { alert("Vui lòng chọn một đáp án đúng."); return; }
    if (!selectedTopicId) { alert("Vui lòng chọn Chủ đề."); return; }
    
    setIsLoading(true);
    const finalOptions = options.map((opt, index) => ({ ...opt, isCorrect: index === correctOptionIndex }));

    try {
      const payload = {
        content: content,
        questionType: 'MULTIPLE_CHOICE',
        difficulty: difficulty,
        topicId: selectedTopicId,
        options: finalOptions
      };

      let savedData;
      // --- LOGIC PHÂN BIỆT CREATE / UPDATE ---
      if (initialData?.id) {
        savedData = await updateQuestionApi(initialData.id, payload);
        alert("Cập nhật câu hỏi thành công!");
      } else {
        savedData = await createQuestionApi(payload);
        alert("Thêm câu hỏi mới thành công!");
      }

      onSave({ 
        content, 
        questionType: 'MULTIPLE_CHOICE', 
        id: savedData.id, 
        topicId: selectedTopicId,
        options: finalOptions 
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
        <div className="border border-gray-300 rounded-lg">
          <div className="p-2 border-b border-gray-300 flex items-center gap-4 bg-gray-50/50">
            <Bold size={18} className="cursor-pointer hover:text-emerald-600" />
            <Italic size={18} className="cursor-pointer hover:text-emerald-600" />
            <Underline size={18} className="cursor-pointer hover:text-emerald-600" />
          </div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} className="w-full p-3 focus:outline-none" placeholder="Nhập nội dung câu hỏi..." required />
        </div>
        <button type="button" className="mt-2 flex items-center gap-2 text-sm text-blue-600 font-semibold hover:text-blue-800"><ImageIcon size={16} /> Thêm hình minh họa</button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Đáp án</label>
        <div className="space-y-3">
          {options.map((opt, index) => (
            <div key={index} className="flex items-center gap-3 p-2 border border-gray-300 rounded-lg bg-gray-50/30">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center">{String.fromCharCode(65 + index)}</div>
              <input type="text" placeholder={`Nhập nội dung đáp án ${String.fromCharCode(65 + index)}...`} value={opt.content} onChange={(e) => handleOptionChange(index, e.target.value)} className="flex-grow px-3 py-2 bg-transparent focus:outline-none" required />
              <div className="flex items-center gap-2 pr-2">
                <input id={`option-${index}`} type="radio" name="correct_option" checked={correctOptionIndex === index} onChange={() => setCorrectOptionIndex(index)} className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-400" />
                <label htmlFor={`option-${index}`} className="text-sm text-gray-600">Chọn đúng</label>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddOption} className="mt-3 flex items-center gap-2 text-sm text-emerald-600 font-semibold border border-emerald-500 rounded-lg px-4 py-2 hover:bg-emerald-50"><Plus size={16} /> Thêm lựa chọn khác</button>
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
          {topics.length === 0 ? <div className="text-sm text-red-500 bg-red-50 p-2 rounded">⚠️ Chưa có Topic.</div> : (
              <select value={selectedTopicId} onChange={(e) => setSelectedTopicId(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                {topics.map((topic) => (<option key={topic.id} value={topic.id}>{topic.name}</option>))}
              </select>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">Loại câu hỏi: <span className="font-semibold text-gray-800">Trắc nghiệm</span></p>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 font-medium">Hủy</button>
          <button type="submit" disabled={isLoading} className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">{isLoading ? 'Đang lưu...' : 'Lưu câu hỏi'}</button>
        </div>
      </div>
    </form>
  );
}