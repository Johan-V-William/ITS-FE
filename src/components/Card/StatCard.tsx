import React from 'react';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-4 text-left">
        <div className={`p-3 rounded-full ${trend === 'up' ? 'bg-blue-50' : trend === 'down' ? 'bg-red-50' : 'bg-emerald-50'}`}>
          <Icon className={`w-6 h-6 ${trend === 'up' ? 'text-blue-600' : trend === 'down' ? 'text-red-600' : 'text-emerald-600'}`} />
        </div>
        <div className="flex-1">
          <div className="text-gray-600 text-sm mb-1">{label}</div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;