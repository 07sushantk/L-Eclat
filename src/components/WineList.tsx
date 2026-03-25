import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import { AnimatedText } from './AnimatedText';
import { BlurFadeText } from './BlurFadeText';

const wines = [
  {
    name: "Château Margaux 2010",
    region: "Bordeaux, France",
    notes: "A masterpiece of elegance and power, with notes of dark berries, violets, and cedar.",
    price: "$1,250",
    type: "Red"
  },
  {
    name: "Domaine de la Romanée-Conti 2015",
    region: "Burgundy, France",
    notes: "The pinnacle of Pinot Noir, offering ethereal complexity and a finish that lasts forever.",
    price: "$4,800",
    type: "Red"
  },
  {
    name: "Krug Clos du Mesnil 2004",
    region: "Champagne, France",
    notes: "A rare single-plot Chardonnay Champagne, vibrating with mineral energy and citrus zest.",
    price: "$1,100",
    type: "Champagne"
  },
  {
    name: "Montrachet Grand Cru 2012",
    region: "Burgundy, France",
    notes: "The world's most legendary white wine, rich, buttery, and perfectly balanced.",
    price: "$2,400",
    type: "White"
  }
];

const WineList = () => {
  const mousePX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mousePY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mousePX.set(clientX - left);
    mousePY.set(clientY - top);
  };

  const maskImage = useMotionTemplate`
    radial-gradient(circle 450px at ${mousePX}px ${mousePY}px, #000 0%, rgba(0,0,0,0) 100%)
  `;

  return (
    <section
      id="winelist"
      className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden group/winelist"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse Smoke Trail */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-white/5 rounded-full blur-3xl"
            animate={{
              x: mousePX,
              y: mousePY,
              scale: [1, 1.5, 1],
              opacity: [0, 0.2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut",
            }}
            style={{
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />

      <div className="max-w-7xl xl:max-w-screen-2xl mx-auto relative z-10 pt-10 md:pt-0">
        <div className="text-center mb-16 md:mb-24">
          <BlurFadeText delay={0.2}>
            <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.6em] mb-4 block font-bold">
              The Sommelier's Selection
            </span>
          </BlurFadeText>
          <BlurFadeText delay={0.4} blur="20px">
            <h2 className="text-4xl md:text-8xl font-serif text-white mb-6 tracking-tighter">
              The <span className="italic text-[#c5a059]">Cellar</span>
            </h2>
          </BlurFadeText>
          <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {wines.map((wine, index) => (
            <motion.div
              key={wine.name}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group border-b border-white/10 pb-12 hover:border-[#c5a059]/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[#c5a059] text-[8px] uppercase tracking-widest block mb-2">{wine.type} • {wine.region}</span>
                  <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:text-[#c5a059] transition-colors">{wine.name}</h3>
                </div>
                <span className="text-white font-mono text-lg">{wine.price}</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed font-light italic">
                "{wine.notes}"
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-white/20 text-[10px] uppercase tracking-[0.5em] mb-8">Full list available upon request</p>
          <a href="#reservations" className="inline-block px-12 py-4 bg-[#c5a059] text-black font-bold text-[10px] uppercase tracking-widest rounded-full hover:bg-white transition-all duration-500">
            Book a Tasting
          </a>
        </div>
      </div>
    </section>
  );
};

export default WineList;
