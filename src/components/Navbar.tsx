import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { BouncyLetters } from './BouncyLetters';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Menu', 'About', 'Chef', 'Reservations'];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        duration: 1.2
      }}
      className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50"
    >
      {/* Blurry background strip */}
      <div className="absolute inset-0 h-24 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm pointer-events-none" />

      <motion.a
        href="#"
        className="relative z-10 cursor-pointer group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-2xl font-serif tracking-tighter text-[#d4af37] flex items-center gap-2">
          <motion.span
            className="block"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            ✧
          </motion.span>
          <BouncyLetters text="L'ÉCLAT" className="font-bold tracking-[0.2em]" />
        </div>
        <motion.div
          className="h-[1px] bg-[#c5a059] w-0 group-hover:w-full transition-all duration-500"
        />
      </motion.a>

      <nav className="hidden md:flex gap-12 relative z-10 items-center">
        {navItems.map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-[10px] uppercase tracking-[0.4em] text-white/60 hover:text-white transition-colors relative group py-2"
          >
            <BouncyLetters text={item} />
            <motion.span
              className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c5a059] transition-all duration-500 group-hover:w-full"
            />
          </motion.a>
        ))}
      </nav>

      <div className="flex items-center gap-4 relative z-10">
        <motion.a
          href="#reservations"
          className="hidden sm:block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button className="bg-white/[0.08] backdrop-blur-2xl border border-white/10 text-white text-[10px] uppercase tracking-[0.3em] px-8 py-3 rounded-full hover:bg-[#c5a059] hover:text-black hover:border-[#c5a059] transition-all duration-700 shadow-[0_10px_40px_rgba(0,0,0,0.3)] group overflow-hidden relative">
            <span className="relative z-10">Book Table</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
            />
          </button>
        </motion.a>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="text-3xl font-serif text-white hover:text-[#c5a059] transition-colors"
              >
                <BouncyLetters text={item} />
              </motion.a>
            ))}
            <motion.a
              href="#reservations"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8 px-12 py-4 bg-[#c5a059] text-black font-bold rounded-full uppercase tracking-[0.3em] text-xs"
            >
              Book Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
