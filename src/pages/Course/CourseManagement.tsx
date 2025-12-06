import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Play, HelpCircle, CheckCircle, Eye, Search, Filter, BookOpen, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { StatCard } from '../../components/Card/StatCardCourse';
import FooterPage from '@/components/FooterPage';
import CourseHeader from '@/components/CourseHeader';
import { BackgroundPattern } from '@/components/BackgroundPattern';
import { courseService } from '@/services/courseService';
import { TopicCard } from '@/components/Card/TopicCard';

type ContentFilter = 'all' | 'videos' | 'quizzes';

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

interface CourseData {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  version: number | null;
  validFrom: string | null;
  validTo: string | null;
  topics: Topic[];
}

export function CourseManagement() {
  const { id } = useParams<{ id: string }>();
  const [filter, setFilter] = useState<ContentFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Changed from 9 to 6 for better layout with list view

  // Fetch course data
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!id) {
        setError('Course ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const courses = await courseService.getAllCourses();
        const course = courses.find(c => c.id === id);
        
        if (!course) {
          setError('Course not found');
        } else {
          setCourseData(course);
        }
      } catch (err) {
        console.error('Failed to fetch course:', err);
        setError('Không thể tải thông tin khóa học. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [id]);

  // Filter topics based on search and filter
  const filteredTopics = courseData?.topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'quizzes') return matchesSearch;
    return false;
  }) || [];

  // Calculate statistics
  const totalVideos = 0;
  const totalQuizzes = courseData?.topics.length || 0;
  const activeQuizzes = filteredTopics.filter(topic => {
    if (!topic.validFrom || !topic.validTo) return true;
    const now = new Date();
    const from = new Date(topic.validFrom);
    const to = new Date(topic.validTo);
    return now >= from && now <= to;
  }).length;
  const totalViews = 0;

  // Pagination
  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTopics = filteredTopics.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  const handleAddContent = () => {
    // TODO: Implement add content functionality
    console.log('Add content to course:', id);
  };

  const handleDeleteTopic = async (topicId: string) => {
    // TODO: Implement delete functionality with API call
    console.log('Delete topic:', topicId);
    
    // Optimistic UI update
    if (courseData) {
      setCourseData({
        ...courseData,
        topics: courseData.topics.filter(t => t.id !== topicId)
      });
    }
  };

  const handleEditTopic = (topicId: string) => {
    // TODO: Implement edit functionality
    console.log('Edit topic:', topicId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <BackgroundPattern />
        <div className="flex flex-col items-center justify-center relative z-10">
          <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Đang tải thông tin khóa học...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <BackgroundPattern />
        <CourseHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-red-800 font-medium mb-1">Lỗi tải dữ liệu</h3>
                <p className="text-red-600">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-3 text-red-700 hover:text-red-800 font-medium underline"
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        </div>
        <FooterPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <BackgroundPattern />
      <CourseHeader 
        courseName={courseData?.name}
        courseDescription={courseData?.description || 'Manage your course content'}
        onAddContent={handleAddContent}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Videos"
            value={totalVideos}
            icon={Play}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            label="Total Quizzes"
            value={totalQuizzes}
            icon={HelpCircle}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            label="Active Quizzes"
            value={activeQuizzes}
            icon={CheckCircle}
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            label="Total Views"
            value={totalViews}
            icon={Eye}
            bgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Content
              </button>
              <button
                onClick={() => setFilter('videos')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'videos'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setFilter('quizzes')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'quizzes'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Quizzes
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Topics List */}
        {paginatedTopics.length > 0 ? (
          <div className="space-y-4 mb-8">
            {paginatedTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onDelete={handleDeleteTopic}
                onEdit={handleEditTopic}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-2">No content found</p>
            <p className="text-gray-400">Try adjusting your search or filter</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <FooterPage />
    </div>
  );
}