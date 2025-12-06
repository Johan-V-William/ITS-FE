import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

export function StatCard({ label, value, icon: Icon, bgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`${bgColor} p-4 rounded-lg`}>
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
    </div>
  );
}
