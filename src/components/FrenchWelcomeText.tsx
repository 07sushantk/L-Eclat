import React from "react";
import { motion } from "motion/react";

export const FrenchWelcomeText = () => {
  const dateText = "Est. 1924 • Firenze";
  const line1 = "Welcome to";
  const line2 = "L'Éclat";
  const line3 = "Haute Gastronomie Parisienne";
  const scrollText = "Scroll to begin your culinary journey";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(20px)",
      y: 30,
      textShadow: "0 0 40px rgba(255,255,255,0.8)"
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      textShadow: "0 0 0px rgba(255,255,255,0)",
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(30px)",
      y: 50,
      scale: 1.1,
      textShadow: "0 0 60px rgba(234,179,8,0.9)"
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      textShadow: "0 0 35px rgba(234,179,8,0.3)",
      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-white overflow-hidden"
    >
      {/* Date */}
      <motion.span
        variants={itemVariants}
        className="mb-10 text-xs md:text-sm tracking-[0.7em] uppercase text-yellow-400/80 font-light"
      >
        {dateText}
      </motion.span>

      {/* Title Section */}
      <div className="space-y-4">
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl italic font-serif text-white/90"
        >
          {line1}
        </motion.h2>

        <motion.h1
          variants={titleVariants}
          className="text-[4.5rem] md:text-[10rem] font-serif text-yellow-400 leading-[0.9] drop-shadow-[0_0_40px_rgba(234,179,8,0.4)]"
        >
          {line2}
        </motion.h1>
      </div>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="mt-10 text-sm md:text-lg uppercase tracking-[0.4em] text-white/70 font-light"
      >
        {line3}
      </motion.p>

      {/* Divider */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scaleX: 0 },
          visible: {
            opacity: 1,
            scaleX: 1,
            transition: { duration: 1.5, delay: 1.2 }
          }
        }}
        className="mt-12 mb-16 w-40 h-[1px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
      />

      {/* Scroll text */}
      <motion.p
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration: 1, delay: 2 }
          }
        }}
        className="text-[10px] md:text-xs uppercase tracking-[0.6em] text-white/30 animate-pulse"
      >
        {scrollText}
      </motion.p>
    </motion.div>
  );
};
