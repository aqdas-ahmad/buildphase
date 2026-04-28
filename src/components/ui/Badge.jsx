import React from 'react';
import { cn } from '../../utils/cn';

const Badge = ({ children, className, variant = 'default', ...props }) => {
  const variants = {
    default: "bg-[#2C2C2E] text-[#E5E5EA] border border-[#3A3A3C]",
    success: "bg-[#0A3D0A] text-[#4ADE80] border border-[#166534]",
    warning: "bg-[#3D2E00] text-[#FACC15] border border-[#854D0E]",
    danger: "bg-[#3D0A0A] text-[#F87171] border border-[#991B1B]",
    primary: "bg-[#2D0A14] text-[#E08999] border border-[#6D1020]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-semibold transition-colors uppercase tracking-tight",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };
