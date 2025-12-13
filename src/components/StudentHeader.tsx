import { BookOpen } from 'lucide-react';
import type { Student } from '../types/student';

interface HeaderProps {
  student: Student;
  breadcrumbs?: string[];
  onExit?: () => void;
}

export const StudentHeader = ({ student, breadcrumbs, onExit }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">ITS Student</span>
            </div>

            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-400">›</span>}
                    <span className={index === breadcrumbs.length - 1 ? 'text-gray-900' : ''}>
                      {crumb}
                    </span>
                  </div>
                ))}
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                {student.avatar ? (
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium text-gray-700">
                    {student.name.charAt(0)}
                  </span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-900 hidden sm:block">
                {student.name}
              </span>
            </div>
            {onExit && (
              <button
                onClick={onExit}
                className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                Thoát
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
