import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { BlurFadeText } from './BlurFadeText';

const reviews = [
  {
    author: "Sarah Jenkins",
    role: "Food Critic, Vogue",
    content: "An absolute masterclass in gastronomy. The attention to detail in every dish was staggering. The best meal of my life.",
    rating: 5
  },
  {
    author: "Jean-Pierre Blanc",
    role: "Michelin Guide Reviewer",
    content: "L'Éclat manages to honor French tradition while completely reinventing it. A bold, necessary voice in modern dining.",
    rating: 5
  },
  {
    author: "Michael Chen",
    role: "Lifestyle Editor",
    content: "The atmosphere alone is worth the visit. But the food... the food is what will bring me back again and again.",
    rating: 5
  },
  {
    author: "Elena Moretti",
    role: "Gourmet Traveler",
    content: "From the first greeting to the final petit four, the service was impeccable. A truly world-class experience.",
    rating: 5
  }
];

const Reviews = () => {
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
      id="reviews"
      className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden group/reviews"
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
        }}
      />

      <div className="max-w-7xl xl:max-w-screen-2xl mx-auto relative z-10 pt-10 md:pt-0">
        <div className="text-center mb-16 md:mb-24">
          <BlurFadeText delay={0.2}>
            <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.6em] mb-4 block font-bold">
              Voices of Excellence
            </span>
          </BlurFadeText>
          <BlurFadeText delay={0.4} blur="20px">
            <h2 className="text-4xl md:text-8xl font-serif text-white mb-6 tracking-tighter">
              Guest <span className="italic text-[#c5a059]">Reflections</span>
            </h2>
          </BlurFadeText>
          <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {reviews.map((review, index) => (
            <motion.div
              key={review.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-xl group hover:bg-white/[0.05] transition-all duration-700"
            >
              <Quote className="absolute top-8 left-8 w-12 h-12 text-[#c5a059]/10 group-hover:text-[#c5a059]/20 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#c5a059] fill-[#c5a059]" />
                ))}
              </div>
              <p className="text-white/60 text-lg md:text-xl font-serif italic leading-relaxed mb-8">
                "{review.content}"
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                <div className="w-10 h-10 rounded-full bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059] font-serif">
                  {review.author[0]}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest">{review.author}</h4>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
