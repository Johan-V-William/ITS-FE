import { BookOpen, GraduationCap, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CourseHeaderProps {
  courseName?: string;
  courseDescription?: string;
  onAddContent?: () => void;
}

const CourseHeader = ({ 
  courseName = "Course Management", 
  courseDescription = "Manage your course content",
  onAddContent 
}: CourseHeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  const handleAddContent = () => {
    if (onAddContent) {
      onAddContent();
    } else {
      // TODO: Implement add content functionality
      console.log('Add content clicked');
    }
  };

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-200 relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
            </button>

            {/* Course Info */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold shadow-md">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">{courseName}</h1>
                <p className="text-sm text-gray-600">{courseDescription}</p>
              </div>
            </div>
          </div>

          {/* Add Content Button */}
          <button 
            onClick={handleAddContent}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;