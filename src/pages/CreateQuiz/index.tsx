import React, { useState, useEffect } from 'react';
import Header from '@/components/HeaderPage';
import Footer from '@/components/FooterPage';
import { BackgroundPattern } from '@/components/BackgroundPattern';
import { Plus, Trash2, Edit, ChevronRight, Home } from 'lucide-react';
import { AddQuestionModal } from './AddQuestionModal';
import type { Question, NewQuestion } from './types';
// Import thêm getQuestionsApi
import { createQuizApi, deleteQuestionApi, getTopicsApi, getQuestionsApi, type Topic } from '../../services/quizService';

const InfoPill = ({ text, color }: { text: string; color: string }) => (
  <span className={`text-xs font-medium px-3 py-1 rounded-full ${color}`}>{text}</span>
);

export default function CreateQuiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  // States cho Form chính
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDesc, setQuizDesc] = useState('');
  const [duration, setDuration] = useState(30);

  // State quản lý Topic cho Quiz
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');

  // 1. Load danh sách Topic
  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getTopicsApi();
      setTopics(data);
      if (data.length > 0) {
        setSelectedTopicId(data[0].id);
      }
    };
    fetchTopics();
  }, []);

  // 2. Load danh sách Câu hỏi từ Database (MỚI THÊM)
  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestionsApi();
      
      // Map dữ liệu từ Backend (choices, correct) sang Frontend (options, isCorrect)
      const mappedQuestions: Question[] = data.map((q: any) => ({
        id: q.id,
        content: q.content,
        questionType: q.questionType,
        // Backend trả về 'choices' với field 'correct', Frontend dùng 'options' với field 'isCorrect'
        options: q.choices ? q.choices.map((c: any) => ({
            content: c.content,
            isCorrect: c.correct
        })) : [],
        topicId: q.topicId 
      }));

      setQuestions(mappedQuestions);
    };
    fetchQuestions();
  }, []);

  const handleSaveQuestion = (questionData: NewQuestion) => {
    if (editingQuestion) {
      setQuestions(
        questions.map((q) => (q.id === editingQuestion.id ? { ...editingQuestion, ...questionData } : q))
      );
    } else {
      const newQuestion: Question = { 
        ...questionData, 
        id: questionData.id || Date.now() 
      };
      setQuestions([...questions, newQuestion]);
    }
    setEditingQuestion(null);
  };

  const handleOpenEditModal = (question: Question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleDeleteQuestion = async (id: string | number) => {
    if (!window.confirm("Bạn có chắc muốn xóa câu hỏi này không?")) return;
    try {
      await deleteQuestionApi(id);
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (error) {
      console.error(error);
      alert("Lỗi khi xóa câu hỏi!");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSubmitQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if(questions.length === 0) { alert("Vui lòng thêm ít nhất 1 câu hỏi"); return; }
    if(!quizTitle.trim()) { alert("Vui lòng nhập tên quiz"); return; }
    if(!selectedTopicId) { alert("Vui lòng chọn Chủ đề cho Quiz"); return; }

    try {
        await createQuizApi({
            title: quizTitle,
            description: quizDesc,
            duration: duration,
            topicId: selectedTopicId,
            questionIds: questions.map(q => q.id.toString())
        });
        alert("Tạo Quiz thành công!");
    } catch (error) {
        console.error(error);
        alert("Lỗi tạo Quiz!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-emerald-50 to-green-50 relative overflow-hidden">
      <BackgroundPattern />
      <Header />
      <main className="flex-1 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Home size={16} className="mr-2" />
            Trang chủ <ChevronRight size={16} className="mx-1" />
            Khóa học <ChevronRight size={16} className="mx-1" />
            Lập trình Java <ChevronRight size={16} className="mx-1" />
            <span className="font-semibold text-gray-700">Tạo Quiz mới</span>
          </div>

          <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-md border border-white/20 mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Tạo Quiz mới</h2>
            <p className="text-gray-600 mt-1 mb-4">Tạo bài kiểm tra cho khóa học Lập trình Java</p>
            <div className="flex items-center gap-3">
              <InfoPill text="Bắt buộc" color="bg-emerald-100 text-emerald-800" />
              <InfoPill text="Có điểm" color="bg-blue-100 text-blue-800" />
              <InfoPill text="Hiển thị ngay sau khi nộp" color="bg-gray-200 text-gray-700" />
            </div>
          </div>

          <form onSubmit={handleSubmitQuiz}>
            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-xl shadow-md border border-white/20 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4">Thông tin chung</h3>
              <div className="grid grid-cols-6 gap-x-6 gap-y-5">
                <div className="col-span-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Tên quiz</label>
                  <input type="text" id="title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} placeholder="Ví dụ: Quiz Chương 3 - Lớp và Đối tượng" required className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề (Topic)</label>
                  {topics.length === 0 ? (
                    <div className="text-sm text-red-500 bg-red-50 p-2 rounded">⚠️ Chưa có Topic nào.</div>
                  ) : (
                    <select 
                      value={selectedTopicId}
                      onChange={(e) => setSelectedTopicId(e.target.value)}
                      className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>{topic.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="num_questions" className="block text-sm font-medium text-gray-700 mb-1">Số câu hỏi</label>
                  <input type="number" id="num_questions" value={questions.length} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-emerald-50 text-emerald-800 font-bold" />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="max_score" className="block text-sm font-medium text-gray-700 mb-1">Điểm tối đa</label>
                  <input type="number" id="max_score" defaultValue={100} className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg" />
                </div>
                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Thời lượng (phút)</label>
                  <input type="number" id="duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg" />
                </div>
                <div className="col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea id="description" rows={4} value={quizDesc} onChange={(e) => setQuizDesc(e.target.value)} placeholder="Mô tả ngắn gọn nội dung quiz..." className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg"></textarea>
                </div>
                <div className="col-span-6 sm:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-1">Ngày mở</label><input type="date" className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg"/></div>
                <div className="col-span-6 sm:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-1">Ngày đóng</label><input type="date" className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg"/></div>
                <div className="col-span-6 sm:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-1">Số lần làm tối đa</label><select className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg"><option>1 lần</option><option>2 lần</option><option>Không giới hạn</option></select></div>
                <div className="col-span-6 sm:col-span-3"><label className="block text-sm font-medium text-gray-700 mb-1">Chế độ hiển thị kết quả</label><select className="w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-lg"><option>Hiển thị ngay</option><option>Sau khi quiz đóng</option></select></div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-lg p-8 rounded-xl shadow-md border border-white/20">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-4">Danh sách câu hỏi ({questions.length})</h3>
              <div className="space-y-4 mb-6">
                {questions.map((q, index) => (
                  <div key={q.id} className="border border-gray-200/50 p-4 rounded-lg flex justify-between items-center bg-white/50 hover:bg-white/80 transition-colors">
                    <div className="flex-1 truncate pr-4">
                      <p className="text-xs font-bold uppercase text-emerald-600 tracking-wider">{q.questionType.replace(/_/g, ' ')}</p>
                      <p className="text-gray-800 font-medium">{q.content}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button type="button" onClick={() => handleOpenEditModal(q)} className="p-2 text-gray-500 hover:text-blue-600"><Edit size={18} /></button>
                      <button type="button" onClick={() => handleDeleteQuestion(q.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => setIsModalOpen(true)} className="w-full border-2 border-dashed border-emerald-300 text-emerald-600 hover:bg-emerald-50/50 hover:border-emerald-400 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-semibold">
                <Plus size={20} />
                Thêm câu hỏi mới
              </button>
            </div>
            
            <div className="mt-8 flex justify-end">
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-emerald-300">
                    Hoàn tất và Lưu Quiz
                </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <AddQuestionModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveQuestion}
          existingQuestion={editingQuestion}
        />
      )}
    </div>
  );
}