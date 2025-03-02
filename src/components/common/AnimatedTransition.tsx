
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTransitionProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slideUp' | 'slideDown' | 'scale';
  className?: string;
  isPresent?: boolean;
  duration?: number;
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideUp: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 }
  },
  slideDown: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 }
  }
};

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  variant = 'fade',
  className = '',
  isPresent = true,
  duration = 0.3
}) => {
  return (
    <AnimatePresence mode="wait">
      {isPresent && (
        <motion.div
          className={className}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants[variant]}
          transition={{ 
            duration: duration, 
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedTransition;
