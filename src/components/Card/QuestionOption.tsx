import { Check } from 'lucide-react';

interface QuestionOptionProps {
  option: string;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export const QuestionOption = ({ option, isSelected, onSelect, disabled }: QuestionOptionProps) => {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? 'border-emerald-500 bg-emerald-50'
          : 'border-gray-200 bg-white hover:border-gray-300'
      } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300 bg-white'
          }`}
        >
          {isSelected && <Check className="w-3 h-3 text-white" />}
        </div>
        <span className={`${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
          {option}
        </span>
      </div>
    </button>
  );
};
