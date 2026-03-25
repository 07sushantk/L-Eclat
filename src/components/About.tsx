import React from 'react';
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'motion/react';
import { AnimatedText } from './AnimatedText';
import { BlurFadeText } from './BlurFadeText';

const About = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mousePX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mousePY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Parallax offsets
  const parallaxX = useSpring(useTransform(mouseX, [0, 2000], [15, -15]), { damping: 50, stiffness: 200 });
  const parallaxY = useSpring(useTransform(mouseY, [0, 2000], [15, -15]), { damping: 50, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    mousePX.set(clientX - left);
    mousePY.set(clientY - top);
  };

  const maskImage = useMotionTemplate`
    radial-gradient(circle 450px at ${mousePX}px ${mousePY}px, #000 0%, rgba(0,0,0,0) 100%)
  `;

  return (
    <section
      id="about"
      className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden group/about"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse Smoke Trail */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
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
          backgroundImage: 'url("https://img.freepik.com/free-photo/anime-style-chef-character-with-fire_23-2151152234.jpg?semt=ais_rp_50_assets&w=740&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          filter: 'contrast(1.2) brightness(0.4) grayscale(0.5)',
        }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#c5a059]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#c5a059]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl xl:max-w-screen-2xl mx-auto relative z-10 pt-10 md:pt-0">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 md:pb-12 mb-16 md:mb-24">
          <div className="w-full md:w-auto">
            <BlurFadeText delay={0.2}>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-[#c5a059] block mb-4 font-bold">The Gastronomic House</span>
            </BlurFadeText>
            <BlurFadeText delay={0.4} blur="20px">
              <h1 className="text-5xl md:text-9xl font-serif italic text-white leading-none tracking-tighter">
                L'Éclat
              </h1>
            </BlurFadeText>
          </div>
          <div className="text-right mt-8 md:mt-0 w-full md:w-auto">
            <BlurFadeText delay={0.6}>
              <p className="max-w-xs text-sm text-white/60 font-light leading-relaxed ml-auto">
                A Parisian culinary landmark blending traditional French heritage with subversive, unconventional modern gastronomy.
              </p>
            </BlurFadeText>
          </div>
        </div>

        {/* Main Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">

          {/* Left Column: Vertical Text & Large Image */}
          <div className="md:col-span-5 flex gap-8">
            <div className="hidden md:block">
              <span className="writing-mode-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.8em] text-white/20 font-bold">
                ESTABLISHED IN PARIS — 1924
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative group"
              style={{ x: parallaxX, y: parallaxY }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-black rounded-3xl border border-white/10">
                <img
                  src="https://assets.architecturaldigest.in/photos/63e3f0594c59253cd57afcb0/master/w_1600%2Cc_limit/DSCF4468.jpg"
                  alt="Paris Luxury Interior"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[#c5a059] p-8 flex items-center justify-center text-black hidden md:flex rounded-2xl shadow-2xl">
                <span className="text-xs uppercase tracking-widest font-bold text-center leading-loose">
                  Heritage & Innovation
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Content & Secondary Image */}
          <div className="md:col-span-7 flex flex-col gap-32">
            <div className="max-w-xl">
              <AnimatedText delay={0.3}>
                <h2 className="text-3xl md:text-6xl font-light text-white mb-12 leading-tight">
                  Crafting the <span className="font-serif italic text-[#c5a059]">unconventional</span> through precision and soul.
                </h2>
              </AnimatedText>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <AnimatedText delay={0.4}>
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    Our philosophy is rooted in the "tailoring" of flavors. Just as a master couturier shapes fabric to the body, our chefs shape ingredients to the soul. Every dish is a bespoke experience, designed to provoke and delight.
                  </p>
                </AnimatedText>
                <AnimatedText delay={0.5}>
                  <p className="text-sm text-white/50 leading-relaxed font-light">
                    We believe that fine dining should be an act of rebellion—a departure from the mundane into a world of sensory exploration. L'Éclat is not just a restaurant; it is a statement.
                  </p>
                </AnimatedText>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-16 items-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full md:w-2/3 aspect-video overflow-hidden bg-black rounded-3xl border border-white/10"
                style={{ x: useSpring(useTransform(parallaxX, [-15, 15], [5, -5])), y: useSpring(useTransform(parallaxY, [-15, 15], [5, -5])) }}
              >
                <img
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200"
                  alt="Restaurant Detail"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="w-full md:w-1/3"
              >
                <span className="text-8xl font-serif italic text-white/5 leading-none block -mb-8">01</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-4">The Atelier</h3>
                <p className="text-xs text-white/40 leading-loose uppercase tracking-widest font-light">
                  Where raw ingredients transform into edible art.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-16 items-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full md:w-2/3 aspect-video overflow-hidden bg-black rounded-3xl border border-white/10"
                style={{ x: useSpring(useTransform(parallaxX, [-15, 15], [-5, 5])), y: useSpring(useTransform(parallaxY, [-15, 15], [-5, 5])) }}
              >
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1200"
                  alt="The Cellar"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="w-full md:w-1/3 text-right md:text-left"
              >
                <span className="text-8xl font-serif italic text-white/5 leading-none block -mb-8">02</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-4">The Cellar</h3>
                <p className="text-xs text-white/40 leading-loose uppercase tracking-widest font-light">
                  A curated sanctuary of rare vintages and hidden gems.
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row gap-16 items-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-full md:w-2/3 aspect-video overflow-hidden bg-black rounded-3xl border border-white/10"
                style={{ x: useSpring(useTransform(parallaxX, [-15, 15], [5, -5])), y: useSpring(useTransform(parallaxY, [-15, 15], [5, -5])) }}
              >
                <img
                  src="https://images.unsplash.com/photo-1574096079513-d8259312b785?auto=format&fit=crop&q=80&w=1200"
                  alt="The Lounge"
                  className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="w-full md:w-1/3"
              >
                <span className="text-8xl font-serif italic text-white/5 leading-none block -mb-8">03</span>
                <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-4">The Lounge</h3>
                <p className="text-xs text-white/40 leading-loose uppercase tracking-widest font-light">
                  Intimate spaces for conversation and sensory reflection.
                </p>
              </motion.div>
            </div>
          </div>
        </div>


        {/* Bottom Section */}
        <div className="mt-48 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 block mb-6">Contact</span>
            <p className="text-sm font-medium text-white">12 Rue de la Paix, Paris</p>
            <p className="text-sm text-white/40">contact@leclat.paris</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 block mb-6">Social</span>
            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'Vogue'].map(s => (
                <a key={s} href="#" className="text-xs font-bold uppercase tracking-widest text-white/60 hover:text-[#c5a059] transition-colors">{s}</a>
              ))}
            </div>
          </div>
          <div className="text-right">
            <h4 className="text-4xl font-serif italic text-white">L'Éclat</h4>
            <span className="text-[9px] uppercase tracking-[0.5em] text-white/20">© 2024 All Rights Reserved</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
