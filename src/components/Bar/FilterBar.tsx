import React from 'react';
import { FileText } from 'lucide-react';

const FilterBar: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Sắp xếp theo:</span>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
          <option>Tên khóa học</option>
          <option>Ngày tạo</option>
          <option>Số học viên</option>
        </select>
        <div className="flex items-center gap-2 ml-left">
          <FileText className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">6 khóa học</span>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
