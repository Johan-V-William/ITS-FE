import { BookOpen, Mail, Phone } from 'lucide-react';

const FooterPage = () => {
  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-500 text-white w-12 h-12 rounded-lg flex items-center justify-center">
                <BookOpen size={28} />
              </div>
              <span className="text-lg font-bold text-gray-800">ITS - Intelligent Tutoring System</span>
            </div>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Hệ thống giảng dạy thông minh giúp học sinh có thể tương tác với giáo viên AI rất dễ dàng.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <Mail size={16} className="mr-3" />
                support@its.edu.vn
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <Phone size={16} className="mr-3" />
                +84 123 456 789
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Tính năng</h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition">Quản lý khóa học</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition">Theo dõi tiến độ</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition">Bài tập cho học viên</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition">Hỗ trợ AI</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Hỗ trợ</h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                <li><a href="#" className="hover:text-emerald-600 transition">Trang tâm hỗ trợ</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition">Hướng dẫn sử dụng</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition">Liên hệ</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition">Chính sách bảo mật</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-gray-300 text-center text-sm text-gray-500">
          © 2024 ITS - Intelligent Tutoring System. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </div>
  );
};

export default FooterPage;
