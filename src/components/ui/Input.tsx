import React, { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        className={`
          w-full px-4 py-3 rounded-xl 
          bg-white border-none shadow-sm ring-1 ring-slate-200
          text-slate-900 placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition-all duration-200
          ${error ? 'ring-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
