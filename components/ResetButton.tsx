import React from 'react';
import { RefreshCw } from 'lucide-react';

interface ResetButtonProps {
  onReset: () => void;
}

export const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="group flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
    >
      <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
      <span>אפס הצבעות</span>
    </button>
  );
};