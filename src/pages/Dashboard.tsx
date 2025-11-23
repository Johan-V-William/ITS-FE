import { useState, useMemo } from 'react';
import Header from '@/components/HeaderPage';
import Footer from '@/components/FooterPage';
import Pagination from '@/components/Panigation';
import { CourseCard } from '@/components/Card/CourseCard';
import FilterBar from '@/components/Bar/FilterBar';
import { Plus } from 'lucide-react';
import { Course } from '@/services/courseService';
import { BackgroundPattern } from '@/components/BackgroundPattern';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 6;

  const courses: Course[] = [
    {
      id: '1',
      title: 'Toán học cơ bản',
      startDate: '10/10/2024',
      students: 74,
      videos: 15,
      quizzes: 4,
      duration: '25 giờ'
    },
    {
      id: '2',
      title: 'Vật lý đại cương',
      startDate: '10/10/2024',
      students: 20,
      videos: 20,
      quizzes: 5,
      duration: '27 giờ'
    },
    {
      id: '3',
      title: 'Hóa học hữu cơ',
      startDate: '08/10/2024',
      students: 35,
      videos: 25,
      quizzes: 6,
      duration: '22 giờ'
    },
    {
      id: '4',
      title: 'Sinh học phân tử',
      startDate: '05/10/2024',
      students: 12,
      videos: 35,
      quizzes: 8,
      duration: '30 giờ'
    },
    {
      id: '5',
      title: 'Lịch sử Việt Nam',
      startDate: '02/10/2024',
      students: 40,
      videos: 20,
      quizzes: 3,
      duration: '15 giờ'
    },
    {
      id: '6',
      title: 'Tiếng Anh giao tiếp',
      startDate: '28/09/2024',
      students: 50,
      videos: 45,
      quizzes: 10,
      duration: '25 giờ'
    },
    {
      id: '7',
      title: 'Toán nâng cao',
      startDate: '28/09/2024',
      students: 50,
      videos: 45,
      quizzes: 10,
      duration: '25 giờ'
    },
    {
      id: '8',
      title: 'Vật lý lượng tử',
      startDate: '28/09/2024',
      students: 50,
      videos: 45,
      quizzes: 10,
      duration: '25 giờ'
    },
    {
      id: '9',
      title: 'Hóa vô cơ',
      startDate: '28/09/2024',
      students: 50,
      videos: 45,
      quizzes: 10,
      duration: '25 giờ'
    },
    {
      id: '10',
      title: 'Sinh học tế bào',
      startDate: '28/09/2024',
      students: 50,
      videos: 45,
      quizzes: 10,
      duration: '25 giờ'
    },
    {
      id: '11',
      title: 'Lịch sử thế giới',
      startDate: '28/09/2024',
      students: 50,
      videos: 45,
      quizzes: 10,
      duration: '25 giờ'
    },
    {
      id: '12',
      title: 'Tiếng Anh thương mại',
      startDate: '28/09/2024',
      students: 50,
      videos: 45,
      quizzes: 10,
      duration: '25 giờ'
    },
  ];

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
    // Có thể thêm logic fetch data ở đây nếu cần
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
                <h2 className="text-3xl font-bold text-gray-800">Quản lý khóa học</h2>
                <p className="text-gray-600">
                  Quản lý và theo dõi tất cả các khóa học trong hệ thống
                  <span className="ml-2 text-emerald-600 font-medium">
                    ({courses.length} khóa học)
                  </span>
                </p>
              </div>

              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition shadow-md">
                <Plus size={20} />
                Thêm khóa học
              </button>
            </div>

            <FilterBar />
          </div>

          {/* Course grid - chỉ hiển thị 6 courses mỗi trang */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                date={course.startDate}
                students={course.students}
                videos={course.videos}
                quizzes={course.quizzes}
                duration={course.duration}
              />
            ))}
          </div>

          {/* Hiển thị thông báo nếu không có khóa học */}
          {currentCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Không có khóa học nào để hiển thị</p>
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
