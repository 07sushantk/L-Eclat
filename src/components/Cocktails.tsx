import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import { GlassWater, Flame, Leaf, Wind } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { BlurFadeText } from './BlurFadeText';

const cocktails = [
  {
    name: "L'Éclat Royale",
    description: "Our signature blend of vintage cognac, gold-infused saffron syrup, and rare botanical bitters.",
    price: "$28",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
    category: "Signature"
  },
  {
    name: "Parisian Mist",
    description: "Smoky mezcal balanced with lavender-infused honey and a cloud of dry ice essence.",
    price: "$24",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
    category: "Experimental"
  },
  {
    name: "Botanical Garden",
    description: "Small-batch gin distilled with 12 secret herbs, fresh cucumber, and elderflower foam.",
    price: "$22",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
    category: "Botanical"
  },
  {
    name: "Midnight in Paris",
    description: "A dark, velvety concoction of espresso, black truffle vodka, and salted caramel.",
    price: "$26",
    image: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?auto=format&fit=crop&q=80&w=600",
    category: "After Dark"
  }
];

const Cocktails = () => {
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
      id="cocktails"
      className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden group/cocktails"
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

      {/* Revealable Background Image */}
      <motion.div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          filter: 'contrast(1.2) brightness(0.6) grayscale(0.5)',
        }}
      />

      <div className="max-w-7xl xl:max-w-screen-2xl mx-auto relative z-10 pt-10 md:pt-0">
        <div className="text-center mb-16 md:mb-24">
          <BlurFadeText delay={0.2}>
            <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.6em] mb-4 block font-bold">
              The Art of Mixology
            </span>
          </BlurFadeText>
          <BlurFadeText delay={0.4} blur="20px">
            <h2 className="text-4xl md:text-8xl font-serif text-white mb-6 tracking-tighter">
              Liquid <span className="italic text-[#c5a059]">Poetry</span>
            </h2>
          </BlurFadeText>
          <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {cocktails.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl transition-all duration-700 hover:bg-white/[0.03] border border-transparent hover:border-white/10"
            >
              <div className="w-full sm:w-48 h-64 flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 group-hover:border-[#c5a059]/30 transition-colors">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-grow flex flex-col justify-center">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-2xl font-serif text-white group-hover:text-[#c5a059] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[#c5a059] font-mono text-sm font-medium">{item.price}</span>
                </div>
                <span className="text-white/20 text-[8px] uppercase tracking-widest mb-4 block">{item.category}</span>
                <p className="text-white/40 text-sm leading-relaxed font-light mb-6">
                  {item.description}
                </p>
                <div className="h-px w-0 bg-gradient-to-r from-[#c5a059] to-transparent group-hover:w-full transition-all duration-1000" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
