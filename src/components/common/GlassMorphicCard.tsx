
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassMorphicCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  animate?: boolean;
}

const GlassMorphicCard: React.FC<GlassMorphicCardProps> = ({
  children,
  className = '',
  interactive = false,
  animate = false
}) => {
  const baseClasses = "rounded-xl border border-white/20 bg-white/80 backdrop-blur-sm shadow-sm p-6 overflow-hidden relative";
  const interactiveClasses = interactive ? "transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white/90" : "";
  
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(baseClasses, interactiveClasses, className)}
      >
        <div className="bg-noise"></div>
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    );
  }
  
  return (
    <div className={cn(baseClasses, interactiveClasses, className)}>
      <div className="bg-noise"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassMorphicCard;
