import { BookOpen, House, LogOut } from 'lucide-react';

const HeaderPage = () => {
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Phần bên trái */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
            <BookOpen size={24} />
          </div>
          <span className="text-lg font-bold text-gray-900">ITS Admin</span>
          <span className="text-gray-400">|</span>
          <House size={20} />
          <span className="text-sm text-gray-600">Trang chủ</span>
        </div>

        {/* Phần bên phải - Nút đăng xuất */}
        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2">
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default HeaderPage;
