import type { LucideIcon } from 'lucide-react';

interface QuizInfoCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  label: string;
  value: string | number;
}

export const QuizInfoCard = ({ icon: Icon, iconColor, iconBgColor, label, value }: QuizInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-start space-x-4">
        <div className={`${iconBgColor} rounded-lg p-3`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};
