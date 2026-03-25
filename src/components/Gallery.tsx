import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import { AnimatedText } from './AnimatedText';
import { BlurFadeText } from './BlurFadeText';

const images = [
  { url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200", title: "Main Dining Room", size: "large" },
  { url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", title: "The Atelier", size: "small" },
  { url: "https://images.unsplash.com/photo-1550966842-2849a2202768?auto=format&fit=crop&q=80&w=800", title: "Garden View", size: "small" },
  { url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200", title: "The Bar", size: "medium" },
  { url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800", title: "Chef's Table", size: "small" },
  { url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800", title: "The Cellar", size: "small" },
  { url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200", title: "Private Suite", size: "large" },
];

const Gallery = () => {
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
      id="gallery"
      className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden group/gallery"
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920")',
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
              Visual Journey
            </span>
          </BlurFadeText>
          <BlurFadeText delay={0.4} blur="20px">
            <h2 className="text-4xl md:text-8xl font-serif text-white mb-6 tracking-tighter">
              The <span className="italic text-[#c5a059]">Space</span>
            </h2>
          </BlurFadeText>
          <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent mx-auto" />
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group overflow-hidden rounded-3xl border border-white/10 break-inside-avoid"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div>
                  <span className="text-[#c5a059] text-[8px] uppercase tracking-widest block mb-2">L'Éclat Paris</span>
                  <h3 className="text-white font-serif text-xl">{img.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
