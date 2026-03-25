import React from 'react';
import { motion } from 'motion/react';

interface BouncyLettersProps {
  text: string;
  className?: string;
}

export const BouncyLetters: React.FC<BouncyLettersProps> = ({ text, className = "" }) => {
  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      style={{ display: "flex", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          whileHover={{ 
            y: -5,
            transition: { type: "spring", stiffness: 300, damping: 10 }
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
};
