
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', icon = true, className = '', ...props }) => {
  const baseStyles = "relative group px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden";
  
  const variants = {
    primary: "bg-transparent text-neon-blue border border-neon-blue hover:bg-neon-blue hover:text-black shadow-[0_0_20px_rgba(0,243,255,0.1)] hover:shadow-[0_0_40px_rgba(0,243,255,0.4)]",
    secondary: "bg-transparent text-white border border-white hover:bg-white hover:text-black",
    outline: "bg-transparent text-gray-300 border border-gray-700 hover:border-gray-400 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
        {icon && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
      </span>
    </button>
  );
};

export default Button;
