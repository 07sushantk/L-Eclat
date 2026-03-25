import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

const CursorGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main Glow */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-[9999] mix-blend-screen opacity-40"
        style={{
          background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(197, 160, 89, 0.15), transparent 80%)`,
        }}
      />
      
      {/* Sharp Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#c5a059]/30 rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: useSpring(mouseX, { damping: 40, stiffness: 400 }),
          y: useSpring(mouseY, { damping: 40, stiffness: 400 }),
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-1 h-1 bg-[#c5a059] rounded-full" />
      </motion.div>
    </>
  );
};

export default CursorGlow;
