import React, { useState } from 'react';
import QuizViewPage from './pages/QuizViewPage';
import QuizResultPage from './pages/QuizResultPage';
import type { QuizResult, Student } from './types/types';
import {demoStudent, demoQuizResult} from './mock-data/data';

type ViewType = 'view' | 'result';

const Demo: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('view');
  const [quizResult] = useState<QuizResult>(demoQuizResult);

  const [student] = useState<Student>(demoStudent);

  return (
    <div className="min-h-screen w-full">
      <div className="bg-emerald-600 text-white p-4">
        <div className="w-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-emerald-600 font-bold text-xl">ITS</span>
            </div>
            <span className="font-bold text-lg">ITS Admin</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentView('view')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'view' 
                  ? 'bg-white text-emerald-600' 
                  : 'bg-emerald-700 text-white hover:bg-emerald-800'
              }`}
            >
              Xem Quiz
            </button>
            <button
              onClick={() => setCurrentView('result')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'result' 
                  ? 'bg-white text-emerald-600' 
                  : 'bg-emerald-700 text-white hover:bg-emerald-800'
              }`}
            >
              Chi tiết kết quả
            </button>
          </div>
          
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">
            Đăng xuất
          </button>
        </div>
      </div>

      {currentView === 'view' && (
        <QuizViewPage quizId="quiz-1" />
      )}
      
      {currentView === 'result' && (
        <QuizResultPage quizId="quiz-1" result={quizResult} student={student} />
      )}

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="w-full px-4 px-6 py-8">
          <div className="grid grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">ITS</span>
                </div>
                <span className="font-bold text-lg text-gray-900">ITS - Intelligent Tutoring System</span>
              </div>
              <p className="text-gray-600 text-sm">
                Hệ thống gia sư thông minh giúp nâng cao chất lượng giáo dục với công nghệ AI tiên tiến.
              </p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📧</span>
                  <a href="mailto:support@its.edu.vn" className="hover:text-emerald-600">support@its.edu.vn</a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📞</span>
                  <span>+84 123 456 789</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Tính năng</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Quản lý khóa học</a></li>
                <li><a href="#" className="hover:text-emerald-600">Theo dõi tiến độ</a></li>
                <li><a href="#" className="hover:text-emerald-600">Báo cáo chi tiết</a></li>
                <li><a href="#" className="hover:text-emerald-600">Hỗ trợ AI</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600">Trung tâm trợ giúp</a></li>
                <li><a href="#" className="hover:text-emerald-600">Hướng dẫn sử dụng</a></li>
                <li><a href="#" className="hover:text-emerald-600">Liên hệ</a></li>
                <li><a href="#" className="hover:text-emerald-600">Chính sách bảo mật</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            © 2024 ITS - Intelligent Tutoring System. Tất cả quyền được bảo lưu.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Demo;