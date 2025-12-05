import React from 'react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { label: 'Tổng quan', active: false },
    { label: 'Tín khóa học', active: true },
    { label: 'Có mặt', active: false },
    { label: 'Mất chật', active: false },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-48 bg-white shadow-lg z-50 border-l border-gray-200">
      <div className="p-4">
        <h3 className="font-semibold text-gray-700 mb-4">select</h3>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg text-sm ${item.active
                    ? 'bg-emerald-100 text-emerald-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
