import { ReactNode } from 'react';

interface SocialButtonProps {
  icon: ReactNode;
  text?: string;
  onClick: () => void;
}

export const SocialButton = ({ icon, text, onClick }: SocialButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
    >
      {icon}
      {text && <span className="text-sm">{text}</span>}
    </button>
  );
};
