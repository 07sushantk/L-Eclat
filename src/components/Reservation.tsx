import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { Calendar, Users, Clock, Utensils, ChevronRight, CheckCircle2, MapPin, X } from 'lucide-react';
import { AnimatedText } from './AnimatedText';

interface Table {
  id: number;
  x: number;
  y: number;
  size: 'small' | 'medium' | 'large';
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  type: string;
  description: string;
  image: string;
}

const mainFloorTables: Table[] = [
  { id: 1, x: 20, y: 20, size: 'small', capacity: 2, status: 'available', type: 'Window Seat', description: 'Overlooking the garden', image: 'https://images.unsplash.com/photo-1550966842-2849a2202768?auto=format&fit=crop&q=80&w=400' },
  { id: 2, x: 45, y: 20, size: 'small', capacity: 2, status: 'available', type: 'Window Seat', description: 'Overlooking the garden', image: 'https://images.unsplash.com/photo-1550966842-2849a2202768?auto=format&fit=crop&q=80&w=400' },
  { id: 3, x: 70, y: 20, size: 'small', capacity: 2, status: 'reserved', type: 'Window Seat', description: 'Overlooking the garden', image: 'https://images.unsplash.com/photo-1550966842-2849a2202768?auto=format&fit=crop&q=80&w=400' },
  { id: 4, x: 20, y: 50, size: 'medium', capacity: 4, status: 'available', type: 'Standard', description: 'Center of the room', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400' },
  { id: 5, x: 50, y: 50, size: 'large', capacity: 6, status: 'available', type: 'Family Booth', description: 'Private and cozy', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400' },
  { id: 6, x: 80, y: 50, size: 'medium', capacity: 4, status: 'occupied', type: 'Standard', description: 'Near the bar', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400' },
  { id: 7, x: 35, y: 80, size: 'medium', capacity: 4, status: 'available', type: 'Standard', description: 'Quiet corner', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400' },
  { id: 8, x: 65, y: 80, size: 'medium', capacity: 4, status: 'available', type: 'Standard', description: 'Quiet corner', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400' },
  { id: 9, x: 15, y: 85, size: 'large', capacity: 8, status: 'available', type: "Chef's Table", description: 'Front row to the kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400' },
];

const secondFloorTables: Table[] = [
  { id: 101, x: 25, y: 30, size: 'large', capacity: 12, status: 'available', type: 'Private Suite', description: 'Exclusive party house room', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400' },
  { id: 102, x: 75, y: 30, size: 'large', capacity: 12, status: 'available', type: 'Private Suite', description: 'Exclusive party house room', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400' },
  { id: 103, x: 50, y: 55, size: 'large', capacity: 50, status: 'available', type: 'Grand Function Hall', description: 'Main ballroom for large events', image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400' },
  { id: 104, x: 20, y: 80, size: 'medium', capacity: 8, status: 'reserved', type: 'Lounge Area', description: 'Cocktail reception space', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400' },
  { id: 105, x: 80, y: 80, size: 'medium', capacity: 8, status: 'available', type: 'Lounge Area', description: 'Cocktail reception space', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400' },
  { id: 106, x: 50, y: 20, size: 'medium', capacity: 10, status: 'available', type: 'Stage Area', description: 'For live performances or speeches', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400' },
];

const Reservation = () => {
  const [activeFloor, setActiveFloor] = useState<'main' | 'second'>('main');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showForm, setShowForm] = useState(false);

  const currentTables = activeFloor === 'main' ? mainFloorTables : secondFloorTables;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '2',
    date: '',
    time: '',
    requests: ''
  });

  const [hoveredTable, setHoveredTable] = useState<Table | null>(null);

  const mousePX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mousePY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);

  // Spotlight effect for floor plan
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(circle 150px at ${spotlightX}px ${spotlightY}px, rgba(197, 160, 89, 0.15), transparent 80%)`;

  // 3D Tilt values
  const rotateX = useSpring(useTransform(mousePY, [0, 1000], [5, -5]), { damping: 20 });
  const rotateY = useSpring(useTransform(mousePX, [0, 1000], [-5, 5]), { damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mousePX.set(clientX - left);
    mousePY.set(clientY - top);
  };

  const handleFloorPlanMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    spotlightX.set(clientX - left);
    spotlightY.set(clientY - top);
  };

  const maskImage = useMotionTemplate`radial-gradient(circle 450px at ${mousePX}px ${mousePY}px, #000 0%, rgba(0,0,0,0) 100%)`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleTableClick = (table: Table) => {
    if (table.status === 'available') {
      setSelectedTable(table);
      setFormData({ ...formData, guests: table.capacity.toString() });
      setShowForm(true);
    }
  };

  const guidelines = [
    { icon: <Clock className="w-5 h-5" />, title: "Punctuality", desc: "We hold tables for 15 minutes past reservation time." },
    { icon: <Users className="w-5 h-5" />, title: "Group Size", desc: "Parties larger than 8 require private event booking." },
    { icon: <Utensils className="w-5 h-5" />, title: "Dress Code", desc: "Smart elegant attire is requested for all guests." },
  ];

  return (
    <section
      id="reservations"
      className="min-h-screen bg-[#0a0a0a] py-32 px-6 relative overflow-hidden group/res"
      onMouseMove={handleMouseMove}
      style={{ perspective: "1200px" }}
    >
      {/* Ambient Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#c5a059]/20 rounded-full"
            animate={{
              y: [0, -1000],
              x: (Math.random() - 0.5) * 500,
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-10px",
            }}
          />
        ))}
      </div>

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
          backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1726711510572-a76f355b9e09?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMHJlc2VydmF0aW9ufGVufDB8fDB8fHww")',
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
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#c5a059]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-[#c5a059]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 pt-10 md:pt-0">
        <div className="text-center mb-12 md:mb-20">
          <AnimatedText delay={0.2}>
            <span className="text-[#c5a059] text-[9px] md:text-[10px] uppercase tracking-[0.6em] mb-4 block font-bold">
              Private Dining
            </span>
          </AnimatedText>
          <AnimatedText delay={0.3}>
            <h2 className="text-4xl md:text-8xl font-serif text-white mb-6 tracking-tighter">
              Secure Your <span className="italic text-[#c5a059]">Sanctuary</span>
            </h2>
          </AnimatedText>
          <div className="w-24 md:w-32 h-[1px] bg-gradient-to-r from-[#c5a059] to-transparent mx-auto" />
        </div>

        <div className="flex justify-center mb-12 gap-4">
          {['main', 'second'].map((floor) => (
            <button
              key={floor}
              onClick={() => {
                setActiveFloor(floor as 'main' | 'second');
                setSelectedTable(null);
                setShowForm(false);
              }}
              className={`px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.4em] transition-all duration-500 border ${activeFloor === floor
                  ? 'bg-[#c5a059] border-[#c5a059] text-black font-bold shadow-[0_0_20px_rgba(197,160,89,0.3)]'
                  : 'bg-white/5 border-white/10 text-white/40 hover:border-white/30'
                }`}
            >
              {floor === 'main' ? 'Main Dining' : 'Grand Hall & Party House'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left Side: 2D Restaurant Layout */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 space-y-8"
            style={{ rotateX, rotateY }}
          >
            <div
              onMouseMove={handleFloorPlanMouseMove}
              className="relative aspect-[4/3] bg-white/[0.02] border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 backdrop-blur-sm shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />

              <div className="absolute top-4 left-8 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-2">
                {activeFloor === 'main' ? 'Main Floor' : 'Second Floor'}
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              </div>

              {/* Live Ticker */}
              <div className="absolute top-4 right-8 overflow-hidden w-48 h-4">
                <motion.div
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="text-[8px] uppercase tracking-widest text-white/10 whitespace-nowrap"
                >
                  {activeFloor === 'main'
                    ? "Live Availability: 4 Tables Remaining • Chef's Table Open • Evening Service Active"
                    : "Grand Hall Status: Private Event in Progress • Function Hall Available • Party House Open"
                  }
                </motion.div>
              </div>

              {/* Entrance Label */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/5 border-t border-x border-white/10 rounded-t-xl text-white/30 text-[9px] uppercase tracking-widest">
                {activeFloor === 'main' ? 'Entrance' : 'Staircase Access'}
              </div>

              {/* Bar Area Label */}
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 rotate-90 px-6 py-2 bg-white/5 border-t border-x border-white/10 rounded-t-xl text-white/30 text-[9px] uppercase tracking-widest">
                {activeFloor === 'main' ? 'Bar Area' : 'Private Bar'}
              </div>

              {/* Kitchen Area */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 px-8 py-3 bg-white/5 border-b border-x border-white/10 rounded-b-2xl text-white/20 text-[8px] uppercase tracking-[0.4em]">
                {activeFloor === 'main' ? 'Kitchen Pass' : 'Service Elevator'}
              </div>

              {/* Wine Cellar / Terrace */}
              <div className="absolute bottom-12 right-8 border border-white/5 rounded-2xl p-3 bg-white/[0.02]">
                <span className="text-[7px] uppercase tracking-widest text-white/20 block">
                  {activeFloor === 'main' ? 'Wine Cellar' : 'Grand Terrace'}
                </span>
              </div>

              {/* Party House Label (Second Floor Only) */}
              {activeFloor === 'second' && (
                <div className="absolute top-12 left-12 border border-white/5 rounded-2xl p-3 bg-white/[0.02]">
                  <span className="text-[7px] uppercase tracking-widest text-white/20 block">Party House</span>
                </div>
              )}

              {/* Chef's Table Zone / VIP Lounge */}
              <div className="absolute bottom-12 left-8 border border-dashed border-[#c5a059]/30 rounded-3xl p-4">
                <span className="text-[8px] uppercase tracking-widest text-[#c5a059]/50 block mb-2">
                  {activeFloor === 'main' ? "Chef's Table Zone" : "VIP Lounge Area"}
                </span>
              </div>

              {/* Ballroom Zone (Second Floor Only) */}
              {activeFloor === 'second' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[40%] border border-dashed border-white/10 rounded-[3rem] pointer-events-none flex items-center justify-center">
                  <span className="text-[10px] uppercase tracking-[0.8em] text-white/5 font-bold">Grand Ballroom</span>
                </div>
              )}

              {/* Tables Grid */}
              <div className="relative w-full h-full">
                {currentTables.map((table) => (
                  <motion.button
                    key={table.id}
                    onMouseEnter={() => setHoveredTable(table)}
                    onMouseLeave={() => setHoveredTable(null)}
                    whileHover={{ scale: table.status === 'available' ? 1.1 : 1 }}
                    whileTap={{ scale: table.status === 'available' ? 0.95 : 1 }}
                    onClick={() => handleTableClick(table)}
                    className={`absolute rounded-2xl flex flex-col items-center justify-center transition-all duration-500 shadow-2xl border ${selectedTable?.id === table.id
                      ? 'bg-[#c5a059] border-white text-black z-20 scale-110 shadow-[0_0_30px_rgba(197,160,89,0.5)]'
                      : table.status === 'available'
                        ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-[#c5a059]/50'
                        : table.status === 'occupied'
                          ? 'bg-red-500/10 border-red-500/20 text-red-500/40 cursor-not-allowed'
                          : 'bg-white/5 border-white/5 text-white/10 cursor-not-allowed'
                      }`}
                    style={{
                      left: `${table.x}%`,
                      top: `${table.y}%`,
                      width: table.size === 'small' ? '40px' : table.size === 'medium' ? '60px' : '80px',
                      height: table.size === 'small' ? '40px' : table.size === 'medium' ? '60px' : '80px',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {selectedTable?.id === table.id && (
                      <motion.div
                        layoutId="active-glow"
                        className="absolute inset-0 rounded-2xl bg-[#c5a059]/20 blur-xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredTable?.id === table.id && (
                        <motion.div
                          initial={{ opacity: 0, y: table.y < 40 ? -10 : 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: table.y < 40 ? 80 : -80, scale: 1 }}
                          exit={{ opacity: 0, y: table.y < 40 ? -10 : 10, scale: 0.8 }}
                          className={`absolute ${table.y < 40 ? 'top-full mt-4' : 'bottom-full mb-4'} w-40 bg-black/95 border border-white/10 rounded-2xl backdrop-blur-xl z-50 pointer-events-none overflow-hidden shadow-2xl`}
                        >
                          <div className="w-full h-20 overflow-hidden">
                            <img
                              src={table.image}
                              alt={table.type}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="p-2">
                            <p className="text-[8px] font-bold text-[#c5a059] uppercase tracking-widest">{table.type}</p>
                            <p className="text-[7px] text-white/60 mt-1 leading-relaxed">{table.description}</p>
                            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
                              <Users className="w-2 h-2 text-[#c5a059]" />
                              <span className="text-[7px] text-white/40 uppercase tracking-widest">Seats {table.capacity}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <span className="text-[8px] md:text-[10px] font-bold opacity-50 relative z-10">T-{table.id}</span>
                    <Users className="w-2.5 h-2.5 md:w-3 md:h-3 mt-1 relative z-10" />
                    <span className="text-[7px] md:text-[8px] mt-0.5 relative z-10">{table.capacity}P</span>

                    {table.id === 9 && (
                      <motion.div
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 border-2 border-[#c5a059] rounded-2xl blur-[2px] pointer-events-none"
                      />
                    )}

                    {table.status === 'occupied' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0a0a]" />
                    )}
                    {table.status === 'reserved' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/20 rounded-full border-2 border-[#0a0a0a]" />
                    )}
                    {table.status === 'available' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-white/40 text-[10px] uppercase tracking-widest">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-white/40 text-[10px] uppercase tracking-widest">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white/20 rounded-full" />
                <span className="text-white/40 text-[10px] uppercase tracking-widest">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#c5a059] rounded-full shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                <span className="text-white/40 text-[10px] uppercase tracking-widest">Selected</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Dynamic Glass Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-b from-[#c5a059]/20 to-transparent rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
              {/* Progress Bar */}
              {showForm && !isSubmitted && (
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 120, ease: "linear" }}
                    className="h-full bg-[#c5a059]"
                  />
                </div>
              )}

              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.div
                    key="select-prompt"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex-grow flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a059]"
                    >
                      <MapPin className="w-8 h-8" />
                    </motion.div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif text-white">Select Your Table</h3>
                      <p className="text-white/40 text-sm max-w-[240px] mx-auto font-light">
                        Choose your preferred dining location from the interactive floor plan to begin your reservation.
                      </p>
                    </div>
                  </motion.div>
                ) : !isSubmitted ? (
                  <motion.div
                    key="form-container"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                        <div className="px-3 py-1 bg-[#c5a059] text-black text-[10px] font-bold rounded-full">Table {selectedTable?.id}</div>
                        <span className="text-white/40 text-[10px] uppercase tracking-widest">{selectedTable?.capacity} Guests Max</span>
                      </div>
                      <button
                        onClick={() => setShowForm(false)}
                        className="text-white/20 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-4">
                        <div className="relative group/input">
                          <input
                            required
                            type="text"
                            id="name"
                            placeholder=" "
                            className="peer w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-[#c5a059]/50 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                          <label
                            htmlFor="name"
                            className="absolute left-4 top-4 text-white/30 text-[10px] uppercase tracking-widest transition-all peer-focus:top-2 peer-focus:text-[#c5a059] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[#c5a059]"
                          >
                            Full Name
                          </label>
                        </div>
                        <div className="relative group/input">
                          <input
                            required
                            type="email"
                            id="email"
                            placeholder=" "
                            className="peer w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-[#c5a059]/50 transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                          <label
                            htmlFor="email"
                            className="absolute left-4 top-4 text-white/30 text-[10px] uppercase tracking-widest transition-all peer-focus:top-2 peer-focus:text-[#c5a059] peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[#c5a059]"
                          >
                            Email Address
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-white/30 text-[10px] uppercase tracking-widest ml-1">Date</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]" />
                            <input
                              required
                              type="date"
                              className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#c5a059]/50 transition-all [color-scheme:dark]"
                              value={formData.date}
                              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-white/30 text-[10px] uppercase tracking-widest ml-1">Time</label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c5a059]" />
                            <select
                              required
                              className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#c5a059]/50 transition-all appearance-none"
                              value={formData.time}
                              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            >
                              <option value="" className="bg-[#1a1a1a]">Select Time</option>
                              {['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(t => (
                                <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full group relative overflow-hidden bg-[#c5a059] text-black font-bold py-4 rounded-xl transition-all duration-500 hover:bg-white uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 mt-4"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                          />
                        ) : (
                          <>
                            Confirm Table {selectedTable?.id}
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-6 relative"
                  >
                    {/* Sparkles Effect */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          x: (Math.random() - 0.5) * 200,
                          y: (Math.random() - 0.5) * 200
                        }}
                        transition={{ duration: 2, delay: 0.2 + i * 0.1 }}
                        className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#c5a059] rounded-full blur-[1px]"
                      />
                    ))}

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                      className="w-20 h-20 bg-[#c5a059] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(197,160,89,0.4)]"
                    >
                      <CheckCircle2 className="w-10 h-10 text-black" />
                    </motion.div>
                    <h3 className="text-white text-4xl font-serif">Merci, {formData.name.split(' ')[0]}</h3>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 max-w-xs mx-auto">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                        <span>Table</span>
                        <span className="text-white font-bold">{selectedTable?.id}</span>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                        <span>Guests</span>
                        <span className="text-white font-bold">{formData.guests}</span>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                        <span>Date</span>
                        <span className="text-white font-bold">{formData.date}</span>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/40">
                        <span>Time</span>
                        <span className="text-white font-bold">{formData.time}</span>
                      </div>
                    </div>

                    <p className="text-white/30 text-[10px] max-w-xs mx-auto leading-relaxed uppercase tracking-widest">
                      A confirmation email has been sent to {formData.email}
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setShowForm(false);
                        setSelectedTable(null);
                      }}
                      className="text-[#c5a059] text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors pt-8"
                    >
                      Back to Floor Plan
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Dining Guidelines Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
          {guidelines.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-black transition-all duration-500">
                {item.icon}
              </div>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest">{item.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Special Occasions Section */}
        <div className="mt-32 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c5a059]/5 to-transparent rounded-[3rem] -z-10" />
          <div className="p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 aspect-square rounded-[2rem] overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200"
                alt="Private Event"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <AnimatedText delay={0.2}>
                <span className="text-[#c5a059] text-[10px] uppercase tracking-[0.6em] font-bold">Events & Celebrations</span>
              </AnimatedText>
              <AnimatedText delay={0.3}>
                <h3 className="text-4xl md:text-7xl font-serif text-white leading-tight">Host an <span className="italic">Unforgettable</span> Evening</h3>
              </AnimatedText>
              <AnimatedText delay={0.4}>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  From intimate wedding receptions to corporate galas, L'Éclat offers a bespoke setting for your most significant moments. Our events team will tailor every detail to your vision.
                </p>
              </AnimatedText>
              <button className="px-8 py-4 border border-white/10 rounded-full text-white text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500">
                Inquire About Private Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
