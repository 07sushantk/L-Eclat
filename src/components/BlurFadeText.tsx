import React from 'react';
import { motion } from 'motion/react';

interface BlurFadeTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
  blur?: string;
  y?: number;
}

export const BlurFadeText: React.FC<BlurFadeTextProps> = ({ 
  children, 
  delay = 0, 
  className = "", 
  duration = 1,
  blur = "10px",
  y = 10
}) => {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        filter: `blur(${blur})`,
        y: y 
      }}
      whileInView={{ 
        opacity: 1, 
        filter: "blur(0px)",
        y: 0 
      }}
      viewport={{ once: true }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
