import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { examService } from '../../services/examinateService';
import { useQuiz } from '../../hooks/useQuiz';
import type { QuizResultsData } from '../../types/examinate';
import StatCard from '../../components/Card/StatCard';

interface ResultsPageProps {
  quizId: string;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ quizId }) => {
  const navigate = useNavigate();
  const { quiz, loading: quizLoading } = useQuiz(quizId);
  const [results, setResults] = useState<QuizResultsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await examService.getQuizResults(quizId);
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
        console.error('Error fetching quiz results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [quizId]);

  const handleStudentClick = (studentId: string) => {
    // Navigate to quiz result page with both quizId and studentId
    navigate(`/quiz-result`);
  };

  if (quizLoading || loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!quiz || !results) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Không tìm thấy dữ liệu</p>
      </div>
    );
  }

  const totalPages = Math.ceil(results.studentResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedStudents = results.studentResults.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full px-4 px-6 py-8">
        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatCard icon={List} label="Điểm trung bình" value={`${results.averageScore}%`} />
          <StatCard icon={ArrowUp} label="Cao nhất" value={`${results.highestScore}%`} trend="up" />
          <StatCard icon={ArrowDown} label="Thấp nhất" value={`${results.lowestScore}%`} trend="down" />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h3 className="font-bold text-gray-900 mb-4">Kết quả sinh viên</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Sinh viên</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Điểm (%)</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Lượt làm</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Ngày nộp</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStudents.length > 0 ? (
                    displayedStudents.map((result) => (
                      <tr 
                        key={result.student.id} 
                        onClick={() => handleStudentClick(result.student.id)}
                        className="border-b border-gray-100 hover:bg-emerald-50 cursor-pointer transition-colors active:bg-emerald-100"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(result.student.name)}&background=random`}
                              alt={result.student.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <span className="font-medium text-gray-900">{result.student.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{result.student.email}</td>
                        <td className="py-4 px-4">
                          {result.score !== null ? (
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                              {result.score}%
                            </span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-gray-600">{result.attempts}</td>
                        <td className="py-4 px-4 text-gray-600">{result.submittedDate}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                            result.status === 'Hoàn thành' 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        Chưa có kết quả nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {results.studentResults.length > 0 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, results.studentResults.length)} trong {results.studentResults.length} kết quả
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;