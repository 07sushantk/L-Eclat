import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'motion/react';
import { Utensils, ChevronRight, ChevronLeft } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { BlurFadeText } from './BlurFadeText';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

const menuData: MenuItem[] = [
  // Page 1: Starters & Mains
  {
    name: "Burgundy Escargots",
    description: "Wild-caught Burgundy snails baked in a signature garlic and parsley herb butter, served with toasted sourdough.",
    price: "$22",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Parisian Onion Soup",
    description: "Classic French onion soup with a rich 48-hour beef broth, caramelized onions, and melted Gruyère AOP.",
    price: "$18",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Duck Foie Gras",
    description: "Pan-seared duck foie gras served with a warm fig and port wine compote on toasted artisanal brioche.",
    price: "$32",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4gjUtAj6nyUlkj2tPg_1vNMG1O6Nl7h-_Q&s"
  },
  {
    name: "Lobster Bisque",
    description: "Velvety lobster cream soup finished with a touch of VSOP cognac and fresh chive oil.",
    price: "$24",
    image: "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Truffle Quiche",
    description: "Handmade shortcrust pastry filled with Périgord black truffle, wild porcini, and aged Comté.",
    price: "$26",
    image: "https://thumb.photo-ac.com/88/88e9d064d7015e9afda91a4c086273b1_t.jpeg"
  },
  {
    name: "Coq au Vin Royale",
    description: "Free-range chicken slow-braised in vintage Burgundy red wine with pearl onions and smoked pancetta.",
    price: "$42",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Beef Bourguignon",
    description: "Tender Wagyu beef slow-cooked for 12 hours in a rich red wine reduction with heirloom root vegetables.",
    price: "$48",
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Wild Sea Bass",
    description: "Pan-roasted Mediterranean sea bass served with a lemon-caper emulsion and sautéed baby spinach.",
    price: "$45",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Bouillabaisse L'Éclat",
    description: "Signature saffron-infused seafood stew with lobster tail, scallops, and local white fish.",
    price: "$58",
    image: "https://i0.wp.com/www.whats4eats.com/wp-content/uploads/2023/09/soups-bouillabaisse-ccnull.de-Marco-Verch-1099981-4x3-1.webp?fit=800%2C600&ssl=1"
  },
  {
    name: "Crispy Duck Confit",
    description: "Heritage duck leg slow-cooked in its own fat, served with Sarladaise potatoes and cherry gastrique.",
    price: "$44",
    image: "https://cdn.prod.website-files.com/65e2ec4e51f6693a3af9151d/660e61203a404d676b0da725_9bac0481-de13-4ff5-8586-61cb9be9942e.webp"
  },

  // Page 2: Signature Cuts & Desserts
  {
    name: "Wagyu Steak Frites",
    description: "A5 Wagyu ribeye served with hand-cut truffle fries and a traditional Béarnaise reduction.",
    price: "$85",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Sole Meunière",
    description: "Whole Dover sole prepared tableside with brown butter, lemon, and fresh garden parsley.",
    price: "$65",
    image: "https://www.deliciousmagazine.co.uk/wp-content/uploads/2020/03/Sole-Meuniere.jpg"
  },
  {
    name: "Rack of Lamb",
    description: "Herb-crusted Provence lamb served with a red wine jus and ratatouille niçoise.",
    price: "$52",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Scallops St. Jacques",
    description: "Jumbo sea scallops pan-seared and served over a creamy leek fondue with coral foam.",
    price: "$46",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Apple Tarte Tatin",
    description: "Caramelized Granny Smith apples on a buttery puff pastry, served with vanilla bean crème fraîche.",
    price: "$16",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Tahitian Crème Brûlée",
    description: "Classic vanilla bean custard with a perfectly crackled caramelized sugar crust and fresh berries.",
    price: "$15",
    image: "https://confessionsofabakingqueen.com/wp-content/uploads/2014/06/vanilla-bean-creme-brulee-recipe-13-of-14-683x1024.jpg"
  },
  {
    name: "Chocolate Soufflé",
    description: "Valrhona dark chocolate soufflé served with a warm Grand Marnier crème anglaise.",
    price: "$18",
    image: "https://twoplaidaprons.com/wp-content/uploads/2022/02/chocolate-souffle-with-ganache-thumbnail.jpg"
  },
  {
    name: "Paris-Brest",
    description: "Choux pastry filled with praline flavored cream and topped with toasted almonds and sea salt.",
    price: "$14",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Artisanal Macarons",
    description: "A selection of six handmade seasonal macarons from our pastry laboratory.",
    price: "$18",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Grand Fromage Board",
    description: "A curated selection of five artisanal French cheeses with lavender honey and spiced nuts.",
    price: "$32",
    image: "https://www.gourmaison.in/cdn/shop/files/Grandcheesegrazingtraywebsiteimageopen.png?v=1692784250"
  },
];

const Menu = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;
  const currentItems = menuData.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

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
      id="menu"
      className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden group/menu"
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
          filter: 'contrast(1.2) brightness(0.6) grayscale(0.5)',
        }}
      />

      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c5a059]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c5a059]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl xl:max-w-screen-2xl mx-auto relative z-10 pt-10 md:pt-0">
        <div className="text-center mb-16 md:mb-24">
          <BlurFadeText delay={0.2}>
            <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.6em] mb-4 block font-bold">
              The Gastronomic Collection
            </span>
          </BlurFadeText>
          <BlurFadeText delay={0.4} blur="20px">
            <h2 className="text-4xl md:text-8xl font-serif text-white mb-6 tracking-tighter">
              Our <span className="italic text-[#c5a059]">Menu</span>
            </h2>
          </BlurFadeText>
          <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent mx-auto" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12"
          >
            {currentItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col sm:flex-row gap-6 p-4 sm:p-6 rounded-3xl transition-all duration-700 hover:bg-white/[0.03] border border-transparent hover:border-white/10"
              >
                <div className="w-full sm:w-32 md:w-40 h-40 flex-shrink-0 overflow-hidden rounded-2xl border border-white/5 group-hover:border-[#c5a059]/30 transition-colors">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex justify-between items-baseline mb-3">
                    <AnimatedText delay={index * 0.05 + 0.2}>
                      <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-[#c5a059] transition-colors">
                        {item.name}
                      </h3>
                    </AnimatedText>
                    <span className="text-[#c5a059] font-mono text-sm font-medium">{item.price}</span>
                  </div>
                  <AnimatedText delay={index * 0.05 + 0.3}>
                    <p className="text-white/40 text-sm leading-relaxed font-light mb-4">
                      {item.description}
                    </p>
                  </AnimatedText>
                  <div className="h-px w-0 bg-gradient-to-r from-[#c5a059] to-transparent group-hover:w-full transition-all duration-1000" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-32 flex justify-center items-center gap-12">
          <button
            onClick={() => setPage(0)}
            className={`group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] transition-all ${page === 0 ? 'text-[#c5a059] scale-110 font-bold' : 'text-white/20 hover:text-white'}`}
          >
            <ChevronLeft className={`w-4 h-4 transition-transform group-hover:-translate-x-1 ${page === 0 ? 'text-[#c5a059]' : 'text-white/20'}`} />
            Page 01
          </button>
          <div className="w-16 h-[1px] bg-white/5" />
          <button
            onClick={() => setPage(1)}
            className={`group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] transition-all ${page === 1 ? 'text-[#c5a059] scale-110 font-bold' : 'text-white/20 hover:text-white'}`}
          >
            Page 02
            <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${page === 1 ? 'text-[#c5a059]' : 'text-white/20'}`} />
          </button>
        </div>
      </div>

      {/* Background Text Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <h2 className="text-[20vw] font-serif text-white/[0.02] leading-none uppercase tracking-tighter">
          {page === 0 ? 'Starters' : 'Main'}
        </h2>
      </div>
    </section>
  );
};

export default Menu;
