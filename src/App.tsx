/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import ScrollCanvas from './components/ScrollCanvas';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import About from './components/About';
import Chef from './components/Chef';
import Reservation from './components/Reservation';
import Cocktails from './components/Cocktails';
import Gallery from './components/Gallery';
import WineList from './components/WineList';
import Reviews from './components/Reviews';
import CursorGlow from './components/CursorGlow';
import { FrenchWelcomeText } from './components/FrenchWelcomeText';
import { BlurFadeText } from './components/BlurFadeText';
import {
  HeritageSection,
  FeatureCards,
  DishCards,
  MomentsSection,
  WineSection,
  ChefCards,
  ReviewCards,
  FooterCard
} from './components/UIOverlay';

// NOTE: If you increase the number of frames in your local assets, 
// update this TOTAL_FRAMES constant to match your new frame count.
const TOTAL_FRAMES = 900;

export default function App() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [activePage, setActivePage] = useState('home');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current || activePage !== 'home') return;

      const scrollTop = window.scrollY;
      const maxScrollTop = scrollContainerRef.current.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;

      // Calculate frame index
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.floor(scrollFraction * TOTAL_FRAMES)
      );

      // Use requestAnimationFrame for smooth updates
      requestAnimationFrame(() => {
        setCurrentFrame(frameIndex);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  // Handle hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'menu') {
        setActivePage('menu');
      } else if (hash === 'about') {
        setActivePage('about');
      } else if (hash === 'chef') {
        setActivePage('chef');
      } else if (hash === 'reservations') {
        setActivePage('reservations');
      } else if (hash === 'cocktails') {
        setActivePage('cocktails');
      } else if (hash === 'gallery') {
        setActivePage('gallery');
      } else if (hash === 'winelist') {
        setActivePage('winelist');
      } else if (hash === 'reviews') {
        setActivePage('reviews');
      } else {
        setActivePage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white selection:bg-[#d4af37] selection:text-black overflow-x-hidden">
      <CursorGlow />
      <Navbar />

      {activePage === 'home' ? (
        <>
          {/* Cinematic Background */}
          <ScrollCanvas currentFrame={currentFrame} totalFrames={TOTAL_FRAMES} />

          {/* Scroll Container (Increased height for even smoother cinematic scrolling) */}
          <div
            ref={scrollContainerRef}
            className="relative z-10 h-[1200vh]"
          >
            {/* Hero Section (Visible at start) */}
            <div className="h-screen flex flex-col items-center justify-center text-center px-6 relative">
              <div className={`transition-all duration-1000 ease-out ${currentFrame > 30 ? 'opacity-0 translate-y-[-20px] scale-95' : 'opacity-100 translate-y-0 scale-100'}`}>
                <BlurFadeText delay={0.5} blur="20px" duration={1.5}>
                  <FrenchWelcomeText />
                </BlurFadeText>
              </div>
            </div>

            {/* Floating UI Elements based on expanded frame ranges */}
            <HeritageSection frame={currentFrame} />
            <FeatureCards frame={currentFrame} />
            <DishCards frame={currentFrame} />
            <MomentsSection frame={currentFrame} />
            <WineSection frame={currentFrame} />
            <ChefCards frame={currentFrame} />
            <ReviewCards frame={currentFrame} />
            <FooterCard frame={currentFrame} />

            {/* Frame Counter & Progress (Refined visual indicator) */}
            <div className="fixed bottom-12 left-12 flex items-center gap-6 z-50">
              <div className="text-[9px] font-mono text-white/20 tracking-[0.3em] uppercase">
                Sequence_{currentFrame.toString().padStart(3, '0')}
              </div>
              <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-[#c5a059] transition-all duration-300"
                  style={{ width: `${(currentFrame / (TOTAL_FRAMES - 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </>
      ) : activePage === 'menu' ? (
        <Menu />
      ) : activePage === 'about' ? (
        <About />
      ) : activePage === 'chef' ? (
        <Chef />
      ) : activePage === 'reservations' ? (
        <Reservation />
      ) : activePage === 'cocktails' ? (
        <Cocktails />
      ) : activePage === 'gallery' ? (
        <Gallery />
      ) : activePage === 'winelist' ? (
        <WineList />
      ) : (
        <Reviews />
      )}
    </div>
  );
}


