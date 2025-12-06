import { HelpCircle, Calendar, Users, List, Trash2, Edit, Eye, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Topic {
  id: string;
  courseId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: string | null;
  validFrom: string | null;
  validTo: string | null;
  questions: any[];
}

interface QuizItemProps {
  topic: Topic;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function TopicCard({ topic, onDelete, onEdit }: QuizItemProps) {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const handleView = () => {
    navigate(`/examinate/${topic.id}`);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(topic.id);
    } else {
      // TODO: Navigate to edit page
      console.log('Edit topic:', topic.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      if (window.confirm(`Are you sure you want to delete "${topic.name}"?`)) {
        onDelete(topic.id);
      }
    }
  };

  // Determine if quiz is active based on valid dates
  const isActive = () => {
    if (!topic.validFrom || !topic.validTo) return true;
    const now = new Date();
    const from = new Date(topic.validFrom);
    const to = new Date(topic.validTo);
    return now >= from && now <= to;
  };

  const getStatus = () => {
    if (!topic.validFrom || !topic.validTo) return 'active';
    const now = new Date();
    const from = new Date(topic.validFrom);
    const to = new Date(topic.validTo);
    
    if (now < from) return 'scheduled';
    if (now > to) return 'closed';
    return 'active';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      case 'closed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    return `Quiz - ${status.charAt(0).toUpperCase() + status.slice(1)}`;
  };

  const status = getStatus();
  const active = isActive();

  return (
    <div 
      className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer hover:scale-[1.01]"
      onClick={handleView}
    >
      <div className={`${active ? 'bg-purple-100' : 'bg-gray-100'} p-4 rounded-lg flex-shrink-0`}>
        <HelpCircle className={`w-6 h-6 ${active ? 'text-purple-600' : 'text-gray-600'}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <span className={`${getStatusColor(status)} text-xs font-medium px-2 py-1 rounded`}>
            {getStatusLabel(status)}
          </span>
          <span className="text-sm text-gray-500">
            Created: {formatDate(topic.createdAt)}
          </span>
        </div>

        <h3 className="text-lg text-left font-semibold text-gray-900 mb-2 truncate">
          {topic.name}
        </h3>

        <p className="text-sm text-left text-gray-600 mb-3 line-clamp-1">
          {topic.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
          {topic.validFrom && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Opens: {formatDate(topic.validFrom)}</span>
            </div>
          )}
          {topic.validTo && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Closes: {formatDate(topic.validTo)}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <List className="w-4 h-4" />
            <span>{topic.questions.length} questions</span>
          </div>
          {topic.version !== null && (
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>v{topic.version}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button 
          onClick={handleView}
          className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
          title="View quiz"
        >
          <Eye className="w-5 h-5" />
        </button>
        <button
          onClick={handleEdit}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Edit quiz"
        >
          <Edit className="w-5 h-5" />
        </button>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete quiz"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}