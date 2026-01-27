import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-xl font-medium flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed shadow-sm md:shadow-md";
  
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-orange-500/20",
    secondary: "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20",
    outline: "bg-white text-green-600 border border-green-200 hover:bg-green-50",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 shadow-none border-none"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children as React.ReactNode}
    </motion.button>
  );
};
