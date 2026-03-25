import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedText } from './AnimatedText';

interface GlassCardProps {
  isVisible: boolean;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({ isVisible, children, className = "", delay = 0 }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, scale: 0.98, filter: 'blur(10px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
          className={`backdrop-blur-2xl bg-white/[0.03] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group w-full ${className}`}
        >
          {/* Subtle glow effect */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#c5a059]/5 rounded-full blur-3xl group-hover:bg-[#c5a059]/10 transition-colors duration-700" />
          <div className="relative z-10">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const HeritageSection: React.FC<{ frame: number }> = ({ frame }) => {
  const isVisible = frame >= 50 && frame <= 130;
  return (
    <div className="fixed inset-0 flex items-center justify-start p-4 md:p-24 pt-28 md:pt-24 pointer-events-none overflow-y-auto md:overflow-hidden">
      <GlassCard isVisible={isVisible} className="max-w-2xl xl:max-w-4xl pointer-events-auto my-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="w-full md:w-1/2">
            <AnimatedText delay={0.2}>
              <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-3 md:mb-4 block font-medium">L'Héritage Parisien</span>
            </AnimatedText>
            <AnimatedText delay={0.3}>
              <h2 className="text-white text-2xl md:text-5xl font-serif mb-4 md:mb-6 leading-tight">A Century of <br /><span className="italic">Culinary Art</span></h2>
            </AnimatedText>
            <AnimatedText delay={0.4}>
              <p className="text-white/50 leading-relaxed mb-6 md:mb-8 text-sm md:text-lg">
                Since 1924, L'Éclat has defined the pinnacle of Parisian fine dining. Located in the heart of the 1st arrondissement, we preserve the most refined traditions while embracing the avant-garde.
              </p>
            </AnimatedText>
            <AnimatedText delay={0.5}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-4 text-white/30 text-[10px] tracking-widest uppercase">
                  <div className="h-px w-8 md:w-12 bg-white/20" />
                  <span>Established in Paris, 1924</span>
                </div>
                <a href="#about" className="text-[#c5a059] text-[10px] uppercase tracking-[0.4em] font-bold hover:text-white transition-colors flex items-center gap-2 group/btn">
                  Discover Our Story
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </AnimatedText>
          </div>
          <div className="w-full md:w-1/2 h-40 md:h-64 rounded-xl md:rounded-2xl overflow-hidden border border-white/10">
            <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" alt="Parisian Restaurant Interior" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" referrerPolicy="no-referrer" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export const FeatureCards: React.FC<{ frame: number }> = ({ frame }) => {
  const isVisible = frame >= 160 && frame <= 240;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 pt-28 md:pt-6 pointer-events-none overflow-y-auto md:overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-7xl xl:max-w-screen-2xl w-full pointer-events-auto my-auto">
        <GlassCard isVisible={isVisible} delay={0}>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#c5a059]/10 flex items-center justify-center mb-4 md:mb-6 border border-[#c5a059]/20">
            <span className="text-[#c5a059] text-lg md:text-xl">✧</span>
          </div>
          <AnimatedText delay={0.2}>
            <h3 className="text-white font-serif text-xl md:text-2xl mb-2 md:mb-4">Gastronomy</h3>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4">A symphony of flavors crafted from the finest seasonal ingredients sourced globally.</p>
          </AnimatedText>
          <a href="#menu" className="text-[#c5a059] text-[9px] uppercase tracking-widest font-bold hover:text-white transition-colors">Explore Cuisine →</a>
        </GlassCard>
        <GlassCard isVisible={isVisible} delay={0.1}>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#c5a059]/10 flex items-center justify-center mb-4 md:mb-6 border border-[#c5a059]/20">
            <span className="text-[#c5a059] text-lg md:text-xl">✦</span>
          </div>
          <AnimatedText delay={0.3}>
            <h3 className="text-white font-serif text-xl md:text-2xl mb-2 md:mb-4">Mixology</h3>
          </AnimatedText>
          <AnimatedText delay={0.4}>
            <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4">Bespoke cocktails that tell a story, blending rare spirits with fresh botanical essences.</p>
          </AnimatedText>
          <a href="#cocktails" className="text-[#c5a059] text-[9px] uppercase tracking-widest font-bold hover:text-white transition-colors">View Bar Menu →</a>
        </GlassCard>
        <GlassCard isVisible={isVisible} delay={0.2}>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-[#c5a059]/10 flex items-center justify-center mb-4 md:mb-6 border border-[#c5a059]/20">
            <span className="text-[#c5a059] text-lg md:text-xl">❂</span>
          </div>
          <AnimatedText delay={0.4}>
            <h3 className="text-white font-serif text-xl md:text-2xl mb-2 md:mb-4">Atmosphere</h3>
          </AnimatedText>
          <AnimatedText delay={0.5}>
            <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-4">An immersive sensory environment where every detail is curated for your comfort.</p>
          </AnimatedText>
          <a href="#gallery" className="text-[#c5a059] text-[9px] uppercase tracking-widest font-bold hover:text-white transition-colors">Tour the Space →</a>
        </GlassCard>
      </div>
    </div>
  );
};

export const DishCards: React.FC<{ frame: number }> = ({ frame }) => {
  const isVisible = frame >= 270 && frame <= 360;
  return (
    <div className="fixed inset-0 flex items-center justify-end p-4 md:p-24 pt-28 md:pt-24 pointer-events-none overflow-y-auto md:overflow-hidden">
      <GlassCard isVisible={isVisible} className="max-w-2xl xl:max-w-4xl pointer-events-auto my-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="w-full md:w-1/2 h-40 md:h-80 rounded-xl md:rounded-2xl overflow-hidden border border-white/10">
            <img src="https://images.unsplash.com/photo-1546039907-7fa05f864c02?auto=format&fit=crop&q=80&w=800" alt="Signature Dish" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="w-full md:w-1/2">
            <AnimatedText delay={0.2}>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="h-[1px] w-6 md:w-8 bg-[#c5a059]" />
                <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Chef's Signature</span>
              </div>
            </AnimatedText>
            <AnimatedText delay={0.3}>
              <h2 className="text-white text-2xl md:text-4xl font-serif mb-4 md:mb-6 leading-tight">Black Truffle <br />Risotto</h2>
            </AnimatedText>
            <AnimatedText delay={0.4}>
              <p className="text-white/50 mb-6 md:mb-8 leading-relaxed text-xs md:text-base italic">
                "A delicate balance of earth and cream, elevated by fresh Périgord black truffles and 24-month aged parmesan."
              </p>
            </AnimatedText>
            <div className="grid grid-cols-2 gap-4 mb-6 md:mb-8">
              <AnimatedText delay={0.5}>
                <div>
                  <span className="text-white/30 text-[8px] md:text-[9px] uppercase tracking-widest block mb-1">Origin</span>
                  <span className="text-white text-[10px] md:text-xs">Périgord, France</span>
                </div>
              </AnimatedText>
              <AnimatedText delay={0.5}>
                <div>
                  <span className="text-white/30 text-[8px] md:text-[9px] uppercase tracking-widest block mb-1">Aging</span>
                  <span className="text-white text-[10px] md:text-xs">24 Months</span>
                </div>
              </AnimatedText>
            </div>
            <AnimatedText delay={0.6}>
              <a href="#menu" className="block w-full text-center group relative overflow-hidden bg-white text-black font-bold py-2.5 md:py-3 rounded-xl transition-all duration-500 hover:bg-[#c5a059] hover:text-white uppercase tracking-[0.2em] text-[9px] md:text-[10px] shadow-[0_5px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_5px_15px_rgba(197,160,89,0.3)]">
                Explore the Menu
              </a>
            </AnimatedText>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export const MomentsSection: React.FC<{ frame: number }> = ({ frame }) => {
  const isVisible = frame >= 390 && frame <= 480;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 pt-28 md:pt-6 pointer-events-none overflow-y-auto md:overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl xl:max-w-screen-xl w-full pointer-events-auto my-auto">
        <GlassCard isVisible={isVisible} delay={0}>
          <div className="h-32 md:h-48 rounded-xl overflow-hidden mb-4 md:mb-6 border border-white/10">
            <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800" alt="Friends Enjoying" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <AnimatedText delay={0.2}>
            <h3 className="text-[#c5a059] font-serif text-xl md:text-2xl mb-2 md:mb-4 italic">Moments of Joy</h3>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6">
              Whether for a celebration among friends or an intimate evening, L'Éclat transforms every moment into an everlasting memory.
            </p>
          </AnimatedText>
          <a href="#gallery" className="text-[#c5a059] text-[9px] uppercase tracking-widest font-bold hover:text-white transition-colors">View Moments →</a>
        </GlassCard>
        <GlassCard isVisible={isVisible} delay={0.2}>
          <div className="h-32 md:h-48 rounded-xl overflow-hidden mb-4 md:mb-6 border border-white/10">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" alt="Emotional Celebration" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <AnimatedText delay={0.3}>
            <h3 className="text-[#c5a059] font-serif text-xl md:text-2xl mb-2 md:mb-4 italic">Shared Emotions</h3>
          </AnimatedText>
          <AnimatedText delay={0.4}>
            <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6">
              From engagements to reunions, we are the stage for your most beautiful emotions, supported by exceptional service.
            </p>
          </AnimatedText>
          <a href="#reservations" className="text-[#c5a059] text-[9px] uppercase tracking-widest font-bold hover:text-white transition-colors">Book Your Moment →</a>
        </GlassCard>
      </div>
    </div>
  );
};

export const WineSection: React.FC<{ frame: number }> = ({ frame }) => {
  const isVisible = frame >= 510 && frame <= 600;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 pt-28 md:pt-6 pointer-events-none overflow-y-auto md:overflow-hidden">
      <GlassCard isVisible={isVisible} className="max-w-4xl xl:max-w-screen-xl w-full pointer-events-auto text-center my-auto">
        <AnimatedText delay={0.2}>
          <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-6 md:mb-8 block">The Royal Cellar</span>
        </AnimatedText>
        <AnimatedText delay={0.3}>
          <h2 className="text-white text-3xl md:text-6xl font-serif mb-6 md:mb-8 tracking-tight">Grands Crus</h2>
        </AnimatedText>
        <AnimatedText delay={0.4}>
          <p className="text-white/50 max-w-2xl mx-auto mb-8 md:mb-12 text-sm md:text-lg leading-relaxed">
            Our sommelier has curated over 5,000 bottles, from the legendary estates of Bordeaux to the hidden gems of Burgundy.
          </p>
        </AnimatedText>
        <div className="flex justify-center gap-4 md:gap-12 mb-10">
          <AnimatedText delay={0.5}>
            <div className="text-center">
              <div className="text-xl md:text-3xl text-white font-serif mb-1 md:mb-2">5000+</div>
              <div className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-widest">Bottles</div>
            </div>
          </AnimatedText>
          <AnimatedText delay={0.6}>
            <div className="text-center">
              <div className="text-xl md:text-3xl text-white font-serif mb-1 md:mb-2">1945</div>
              <div className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-widest">Oldest Vintage</div>
            </div>
          </AnimatedText>
          <AnimatedText delay={0.7}>
            <div className="text-center">
              <div className="text-xl md:text-3xl text-white font-serif mb-1 md:mb-2">99 pts</div>
              <div className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-widest">Avg Rating</div>
            </div>
          </AnimatedText>
        </div>
        <AnimatedText delay={0.8}>
          <a href="#winelist" className="inline-block px-10 py-3 border border-[#c5a059]/30 text-[#c5a059] text-[10px] uppercase tracking-widest rounded-full hover:bg-[#c5a059] hover:text-black transition-all duration-500">
            Explore the Cellar
          </a>
        </AnimatedText>
      </GlassCard>
    </div>
  );
};

export const ChefCards: React.FC<{ frame: number }> = ({ frame }) => {
  const isVisible = frame >= 630 && frame <= 720;
  return (
    <div className="fixed inset-0 flex items-center justify-start p-4 md:p-24 pt-28 md:pt-24 pointer-events-none overflow-y-auto md:overflow-hidden">
      <GlassCard isVisible={isVisible} className="max-w-2xl xl:max-w-4xl pointer-events-auto my-auto">
        <div className="flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-[#c5a059] p-1">
            <img src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=400" alt="Chef Julian Vane" className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
          </div>
          <div className="text-center md:text-left">
            <AnimatedText delay={0.2}>
              <h2 className="text-white text-2xl md:text-5xl font-serif mb-1 md:mb-2">Julian Vane</h2>
            </AnimatedText>
            <AnimatedText delay={0.3}>
              <p className="text-[#c5a059] italic tracking-widest text-[10px] md:text-sm uppercase">Director of Culinary Creation</p>
            </AnimatedText>
          </div>
        </div>
        <AnimatedText delay={0.4}>
          <p className="text-white/60 leading-relaxed mb-6 md:mb-10 text-base md:text-xl font-light italic">
            "True luxury lies in the simplicity of perfect ingredients, handled with reverence and presented with soul."
          </p>
        </AnimatedText>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
          <div className="flex flex-col">
            <span className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-widest mb-2">Distinctions</span>
            <div className="flex gap-1.5 md:gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a059] text-[10px] md:text-xs">★</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-widest mb-2">Experience</span>
            <span className="text-white text-sm md:text-lg font-serif">25 Years</span>
          </div>
          <div className="flex-grow" />
          <a href="#chef" className="px-8 py-3 bg-white/5 border border-white/10 text-white text-[10px] uppercase tracking-widest rounded-full hover:bg-[#c5a059] hover:text-black transition-all duration-500">
            Meet the Team
          </a>
        </div>
      </GlassCard>
    </div>
  );
};

export const ReviewCards: React.FC<{ frame: number }> = ({ frame }) => {
  const isVisible = frame >= 750 && frame <= 840;
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-4 md:p-6 pt-28 md:pt-6 pointer-events-none overflow-y-auto md:overflow-hidden">
      <div className="max-w-3xl xl:max-w-5xl w-full pointer-events-auto my-auto">
        <GlassCard isVisible={isVisible} className="text-center">
          <div className="mb-6 md:mb-10">
            <div className="flex justify-center gap-1.5 md:gap-2 mb-4 md:mb-6">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className="text-[#c5a059] text-lg md:text-xl">★</span>
              ))}
            </div>
            <AnimatedText delay={0.2}>
              <p className="text-white text-lg md:text-3xl font-serif italic mb-6 md:mb-10 leading-relaxed">
                "An absolute masterclass in gastronomy. The attention to detail in every dish was staggering. The best meal of my life."
              </p>
            </AnimatedText>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <AnimatedText delay={0.3}>
                  <span className="text-white font-medium tracking-widest uppercase text-[10px] md:text-xs mb-1">Sarah Jenkins</span>
                </AnimatedText>
                <AnimatedText delay={0.4}>
                  <span className="text-white/30 uppercase tracking-[0.3em] text-[8px] md:text-[10px]">Food Critic</span>
                </AnimatedText>
              </div>
              <a href="#reviews" className="text-[#c5a059] text-[9px] uppercase tracking-widest font-bold hover:text-white transition-colors border-b border-[#c5a059]/30 pb-1">
                Read All Reviews
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export const FooterCard: React.FC<{ frame: number }> = ({ frame }) => {
  const isVisible = frame >= 860 && frame <= 900;
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6 pt-28 md:pt-6 pointer-events-none overflow-y-auto md:overflow-hidden">
      <GlassCard isVisible={isVisible} className="max-w-4xl xl:max-w-screen-xl w-full text-center pointer-events-auto py-8 md:py-20 my-auto">
        <AnimatedText delay={0.2}>
          <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.6em] mb-6 md:mb-10 block font-bold">The Experience Awaits</span>
        </AnimatedText>
        <AnimatedText delay={0.3}>
          <h2 className="text-white text-3xl md:text-8xl font-serif mb-8 md:mb-12 tracking-tighter">Reserve your <br /><span className="italic text-[#c5a059]">Table</span></h2>
        </AnimatedText>
        <AnimatedText delay={0.4}>
          <p className="text-white/40 mb-10 md:mb-16 max-w-lg mx-auto text-sm md:text-lg font-light">
            Join us for an evening where every moment is a celebration of the senses.
          </p>
        </AnimatedText>
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center">
          <AnimatedText delay={0.5}>
            <a href="#reservations" className="block w-full md:w-auto bg-[#c5a059] text-black font-bold px-10 md:px-16 py-3.5 md:py-5 rounded-2xl hover:bg-white transition-all duration-500 uppercase tracking-[0.3em] text-[9px] md:text-xs shadow-[0_10px_30px_rgba(197,160,89,0.3)]">
              Book Now
            </a>
          </AnimatedText>
          <AnimatedText delay={0.6}>
            <a href="#menu" className="block w-full md:w-auto border border-white/20 text-white px-10 md:px-16 py-3.5 md:py-5 rounded-2xl hover:bg-white/10 transition-all duration-500 uppercase tracking-[0.3em] text-[9px] md:text-xs">
              View Menu
            </a>
          </AnimatedText>
        </div>
        <div className="mt-10 md:mt-24 pt-6 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="text-white/20 text-[8px] md:text-[10px] uppercase tracking-[0.3em]">
            L'Éclat • 12 Rue de la Paix • Paris
          </div>
          <div className="flex gap-4 md:gap-8 text-white/20 text-[8px] md:text-[10px] uppercase tracking-[0.3em]">
            <span>Instagram</span>
            <span>Twitter</span>
            <span>Facebook</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

