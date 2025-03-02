
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'monochrome';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'default',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  const colorClasses = {
    default: 'text-primary',
    monochrome: 'text-white'
  };

  return (
    <Link to="/">
      <motion.div 
        className={`font-display font-bold ${sizeClasses[size]} ${colorClasses[variant]} ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: 'reverse', 
              duration: 1.5,
              ease: "easeInOut" 
            }}
            className="w-6 h-6 bg-primary rounded-md flex items-center justify-center"
          >
            <span className="text-primary-foreground text-sm">R</span>
          </motion.div>
          <span>IdeaDetective</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;
