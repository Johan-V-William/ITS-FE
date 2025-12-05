import { Users, SquarePlay, CirclePlay, CalendarDays } from "lucide-react";

interface CourseCardProps {
  title: string;
  date: string;
  students: number;
  videos: number;
  quizzes: number;
}

export const CourseCard = ({ title, date, students, videos, quizzes }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow w-full h-[170px] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-t-2xl"></div>
      <div className="mt-2">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
          <button className="text-emerald-500 hover:text-emerald-600 transition-colors flex-shrink-0 ml-2">
            <SquarePlay size={18} />
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarDays size={16} className="mr-2 text-gray-500" />
            Ngày tạo: {date}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-700">
              <Users size={16} className="mr-2 text-emerald-600" />
              <span className="font-medium text-emerald-600">{students}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-gray-700">
                <CirclePlay size={16} className="mr-1.5 text-gray-500" />
                <span className="font-medium">{videos} video</span>
              </div>

              <div className="flex items-center text-sm">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-1.5">
                  <span className="text-white text-xs font-bold">?</span>
                </div>
                <span className="font-medium text-blue-500">{quizzes} quiz</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
