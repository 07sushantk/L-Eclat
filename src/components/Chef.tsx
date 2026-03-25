import React from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { Star, Award, Utensils, Quote } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { BlurFadeText } from './BlurFadeText';

const Chef = () => {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);
    const mousePX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
    const mousePY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

    const springX = useSpring(mouseX, { damping: 50, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 200 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        mouseX.set(x);
        mouseY.set(y);
        mousePX.set(clientX - left);
        mousePY.set(clientY - top);
    };

    const maskImage = useMotionTemplate`
    radial-gradient(circle 450px at ${mousePX}px ${mousePY}px, #000 0%, rgba(0,0,0,0) 100%)
  `;

    const chefs = [
        {
            name: "Elena Rossi",
            role: "Chef de Cuisine",
            image: "https://e1.pxfuel.com/desktop-wallpaper/719/345/desktop-wallpaper-high-quality-chef-chef.jpg",
            bio: "Master of Italian-French fusion, Elena brings 15 years of Michelin-starred experience from Florence.",
            specialty: "Hand-rolled Pasta & Emulsions"
        },
        {
            name: "Marcus Thorne",
            role: "Pastry Architect",
            image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&q=80&w=600",
            bio: "A former sculptor turned pastry chef, Marcus treats every dessert as a structural masterpiece.",
            specialty: "Sugar Work & Molecular Pastry"
        },
        {
            name: "Saki Tanaka",
            role: "Sous Chef",
            image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=600",
            bio: "Saki bridges the gap between Eastern precision and Western soul in our signature seafood dishes.",
            specialty: "Fermentation & Umami Extraction"
        },
        {
            name: "David Chen",
            role: "Master Sommelier",
            image: "https://wallpapers.com/images/hd/chef-pictures-1333-x-2000-bgew42h1uiholbg1.jpg",
            bio: "David curates our 5,000-bottle cellar with a focus on rare vintages and biodynamic innovators.",
            specialty: "Vintage Curation & Pairings"
        },
        {
            name: "Isabella Garcia",
            role: "Garde Manger",
            image: "https://i.pinimg.com/736x/5f/9c/91/5f9c91fc2df3edb394de5aa2dd51e408.jpg",
            bio: "Isabella's cold kitchen is a laboratory of color and texture, where salads become art.",
            specialty: "Botanical Infusions & Textures"
        },
        {
            name: "Thomas Wright",
            role: "Grill Master",
            image: "https://img.freepik.com/premium-photo/chef-preparing-gourmet-dish_1031776-5280.jpg",
            bio: "Thomas commands the open fire, mastering the primal dance of smoke and flame.",
            specialty: "Wood-fire Gastronomy"
        }
    ];

    return (
        <section
            id="chef"
            className="min-h-screen bg-[#0f0f0f] py-32 px-6 relative overflow-x-hidden group/chef"
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

            {/* Revealable Background Image (Organic Brush Effect) */}
            <motion.div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    backgroundImage: 'url("https://images5.alphacoders.com/139/thumb-1920-1392508.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.7,
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: '100% 100%',
                    maskSize: '100% 100%',
                    filter: 'contrast(1.2) brightness(0.8)',
                }}
            />

            {/* Smoke/Grain Overlay */}
            <div className="absolute inset-0 z-[1] opacity-30 pointer-events-none mix-blend-screen">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-40 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#c5a059]/10 blur-[150px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-[#c5a059]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl xl:max-w-screen-2xl mx-auto relative z-10 pt-10 md:pt-0">
                {/* Hero Chef Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-24 md:mb-40">
                    {/* Left Side: Editorial Image & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 group/img">
                            <img
                                src="https://img.freepik.com/free-photo/chef-cooking-kitchen-while-wearing-professional-attire_23-2151208316.jpg?semt=ais_hybrid&w=740&q=80"
                                alt="Chef Julian Vane"
                                className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-1000 scale-105 group-hover/img:scale-100"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            {/* Floating Stats Overlay */}
                            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4">
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                    <span className="text-[#c5a059] block text-2xl font-serif">3</span>
                                    <span className="text-white/30 text-[8px] uppercase tracking-widest">Michelin Stars</span>
                                </div>
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                    <span className="text-[#c5a059] block text-2xl font-serif">25</span>
                                    <span className="text-white/30 text-[8px] uppercase tracking-widest">Years Exp.</span>
                                </div>
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                    <span className="text-[#c5a059] block text-2xl font-serif">12</span>
                                    <span className="text-white/30 text-[8px] uppercase tracking-widest">Global Awards</span>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-12 -left-12 w-32 h-32 hidden lg:flex items-center justify-center"
                        >
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                                <text className="text-[8px] uppercase tracking-[0.2em] fill-[#c5a059] font-bold">
                                    <textPath xlinkHref="#circlePath">
                                        Director of Culinary Creation • Julian Vane •
                                    </textPath>
                                </text>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Star className="w-6 h-6 text-[#c5a059] fill-[#c5a059]" />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Narrative Content */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <BlurFadeText delay={0.2}>
                                <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.6em] font-bold block">The Visionary</span>
                            </BlurFadeText>
                            <BlurFadeText delay={0.4} blur="20px">
                                <h2 className="text-6xl md:text-9xl font-serif text-white leading-none tracking-tighter">
                                    Julian <br />
                                    <span className="italic text-[#c5a059]">Vane</span>
                                </h2>
                            </BlurFadeText>
                        </div>

                        <div className="h-px w-32 bg-gradient-to-r from-[#c5a059] to-transparent" />

                        <div className="relative">
                            <Quote className="absolute -top-6 -left-6 w-12 h-12 text-[#c5a059]/10" />
                            <AnimatedText delay={0.4}>
                                <p className="text-white/60 text-xl md:text-2xl font-light italic leading-relaxed font-serif">
                                    "Cooking is not just about technique; it's about capturing a moment in time, a memory of a place, and serving it with absolute reverence for the ingredient."
                                </p>
                            </AnimatedText>
                        </div>

                        <div className="space-y-6 text-white/40 text-base md:text-lg font-light leading-relaxed max-w-xl">
                            <AnimatedText delay={0.5}>
                                <p>
                                    Born in the heart of Provence, Julian's journey began in his grandmother's kitchen, where he learned that the most profound flavors often come from the simplest earth-grown treasures.
                                </p>
                            </AnimatedText>
                        </div>

                        <div className="pt-8 flex flex-wrap gap-4">
                            {['Innovation', 'Heritage', 'Precision', 'Soul'].map((tag) => (
                                <div key={tag} className="px-6 py-2 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/40 hover:border-[#c5a059] hover:text-[#c5a059] transition-colors cursor-default">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* The Culinary Brigade Section */}
                <div className="space-y-20">
                    <div className="text-center space-y-4">
                        <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.6em] font-bold block">The Brigade</span>
                        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">Masters of the <span className="italic">Craft</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {chefs.map((chef, index) => (
                            <motion.div
                                key={chef.name}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="group/card relative"
                            >
                                <div className="backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 h-full flex flex-col transition-all duration-700 hover:bg-white/[0.05] hover:border-[#c5a059]/30">
                                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 md:mb-8 border border-white/10">
                                        <img
                                            src={chef.image}
                                            alt={chef.name}
                                            className="w-full h-full object-cover grayscale group-hover/card:grayscale-0 transition-all duration-1000 group-hover/card:scale-110"
                                            referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                                        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-700">
                                            <span className="text-[#c5a059] text-[8px] uppercase tracking-widest font-bold bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-[#c5a059]/30">
                                                {chef.specialty}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 flex-grow">
                                        <div>
                                            <h3 className="text-2xl font-serif text-white mb-1">{chef.name}</h3>
                                            <p className="text-[#c5a059] text-[10px] uppercase tracking-[0.3em] font-medium">{chef.role}</p>
                                        </div>
                                        <p className="text-white/40 text-sm leading-relaxed font-light">
                                            {chef.bio}
                                        </p>
                                    </div>

                                    <div className="pt-8 mt-auto flex items-center justify-between border-t border-white/5">
                                        <div className="flex gap-1">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#c5a059]/30" />
                                            ))}
                                        </div>
                                        <Utensils className="w-4 h-4 text-white/10 group-hover/card:text-[#c5a059]/40 transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-10 w-16 h-16 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/5 flex items-center justify-center text-[#c5a059]/20"
            >
                <Utensils className="w-6 h-6" />
            </motion.div>

            <motion.div
                animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-1/4 right-10 w-20 h-20 rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/5 flex items-center justify-center text-[#c5a059]/20"
            >
                <Award className="w-8 h-8" />
            </motion.div>
        </section>
    );
};

export default Chef;
