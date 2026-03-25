import React from 'react';
import { motion } from 'motion/react';

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
