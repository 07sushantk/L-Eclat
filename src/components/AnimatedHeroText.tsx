import React from 'react';
import { motion } from 'motion/react';

interface AnimatedHeroTextProps {
  text: string;
  className?: string;
  secondaryText?: string;
  secondaryClassName?: string;
}

export const AnimatedHeroText: React.FC<AnimatedHeroTextProps> = ({
  text,
  className = "",
  secondaryText,
  secondaryClassName = ""
}) => {
  const letters = Array.from(text);
  const secondaryLetters = secondaryText ? Array.from(secondaryText) : [];

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 150,
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        className={`flex flex-wrap justify-center gap-x-[0.2em] ${className}`}
      >
        {letters.map((letter, index) => (
          <motion.span
            variants={child}
            key={index}
            className="inline-block cursor-default"
            whileHover={{
              y: -15,
              scale: 1.1,
              color: "#c5a059", // Bronze/Gold accent
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>

      {secondaryText && (
        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          custom={2}
          className={`flex flex-wrap justify-center gap-x-[0.2em] mt-2 ${secondaryClassName}`}
        >
          {secondaryLetters.map((letter, index) => (
            <motion.span
              variants={child}
              key={index}
              className="inline-block cursor-default"
              whileHover={{
                y: -15,
                scale: 1.1,
                color: "#f3e5ab", // Champagne highlight
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>
      )}
    </div>
  );
};
