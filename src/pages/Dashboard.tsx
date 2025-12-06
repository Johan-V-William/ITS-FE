import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/HeaderPage';
import Footer from '@/components/FooterPage';
import Pagination from '@/components/Panigation';
import { CourseCard } from '@/components/Card/CourseCard';
import FilterBar from '@/components/Bar/FilterBar';
import { Plus, Loader2 } from 'lucide-react';
import { type Course, courseService } from '@/services/courseService';
import { BackgroundPattern } from '@/components/BackgroundPattern';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const coursesPerPage = 6;

  function formatDate(isoString: string) {
    const date = new Date(isoString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${date.getDate()}/${month}/${year}`;
  }

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const coursesData = await courseService.getCoursesForUI();
        setCourses(coursesData);
      } catch (err) {
        console.error('Failed to fetch courses:', err);
        setError('Không thể tải danh sách khóa học. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Tính toán courses hiển thị cho trang hiện tại
  const currentCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;
    return courses.slice(startIndex, endIndex);
  }, [currentPage, courses]);

  // Tính tổng số trang
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddCourse = () => {
    // TODO: Implement add course functionality
    console.log('Add course clicked');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-100 via-emerald-50 to-green-50 relative overflow-hidden">
      <BackgroundPattern />
      <Header />
      <main className="flex-1 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-8 relative z-10">
          {/* Header content */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl text-left font-bold text-gray-800">Quản lý khóa học</h2>
                <p className="text-gray-600">
                  Quản lý và theo dõi tất cả các khóa học trong hệ thống
                  {!loading && (
                    <span className="ml-2 text-emerald-600 font-medium">
                      ({courses.length} khóa học)
                    </span>
                  )}
                </p>
              </div>

              <button 
                onClick={handleAddCourse}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <Plus size={20} />
                Thêm khóa học
              </button>
            </div>

            <FilterBar />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-emerald-500 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Đang tải khóa học...</p>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
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
          )}

          {/* Course grid - chỉ hiển thị 6 courses mỗi trang */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    date={formatDate(course.startDate)}
                    students={course.students}
                    videos={course.videos}
                    quizzes={course.topics || 0}
                  />
                ))}
              </div>

              {/* Hiển thị thông báo nếu không có khóa học */}
              {currentCourses.length === 0 && courses.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <div className="max-w-md mx-auto">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-gray-500 text-lg font-medium mb-2">Chưa có khóa học nào</p>
                    <p className="text-gray-400 mb-4">Hãy bắt đầu bằng cách tạo khóa học đầu tiên của bạn</p>
                    <button 
                      onClick={handleAddCourse}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium inline-flex items-center gap-2 transition"
                    >
                      <Plus size={18} />
                      Thêm khóa học
                    </button>
                  </div>
                </div>
              )}

              {/* Pagination - chỉ hiển thị nếu có nhiều hơn 1 trang */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}