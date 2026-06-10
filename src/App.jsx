import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const containerRef = useRef(null);
  const startupRef = useRef(null);
  const progressLineRef = useRef(null);
  const percentRef = useRef(null);
  const shuffleTextRef = useRef(null);

  const portfolioRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);

  useGSAP(() => {
    const startupWords = ["DEVELOPMENT", "CREATIVITY", "STRATEGY", "PRECISION", "MOTION", "PORTFOLIO", "ABDUR RAHMAN"];
    let wordIndex = 0;

    const shuffleInterval = setInterval(() => {
      if (shuffleTextRef.current) {
        shuffleTextRef.current.innerText = startupWords[wordIndex % startupWords.length];
        wordIndex++;
      }
    }, 150);

    const tl = gsap.timeline({
      onComplete: () => {
        clearInterval(shuffleInterval);
        setIsLoading(false);
      }
    });

    tl.to(progressLineRef.current, { width: '100%', duration: 3.5, ease: 'power4.inOut' });
    tl.to(percentRef.current, {
      innerText: 100,
      duration: 3.5,
      snap: { innerText: 1 },
      ease: 'power4.inOut'
    }, 0);

    tl.to(startupRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'expo.inOut'
    }, '+=0.2');

    gsap.set([portfolioRef.current, aboutRef.current], { xPercent: 100 });
  }, { scope: containerRef });

  const navigateTo = (from, to) => {
    if (from === to) return;

    const fromRef = from === 'home' ? homeRef : from === 'portfolio' ? portfolioRef : aboutRef;
    const toRef = to === 'home' ? homeRef : to === 'portfolio' ? portfolioRef : aboutRef;
    const direction = (from === 'home' && to === 'portfolio') || (from === 'portfolio' && to === 'about') || (from === 'home' && to === 'about') ? -1 : 1;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPage(to);
        ScrollTrigger.refresh();
      }
    });

    tl.to(fromRef.current, { xPercent: 100 * direction, duration: 1.2, ease: 'expo.inOut' }, 0);
    tl.set(toRef.current, { xPercent: -100 * direction }, 0);
    tl.to(toRef.current, { xPercent: 0, duration: 1.2, ease: 'expo.inOut' }, 0);
  };

  const goToPortfolio = () => navigateTo(currentPage, 'portfolio');
  const goToHome = () => navigateTo(currentPage, 'home');
  const goToAbout = () => navigateTo(currentPage, 'about');

  return (
    <div ref={containerRef} className="relative w-full h-dvh bg-[#0A0A0A] text-[#FDFDFD] overflow-hidden select-none">
      <div
        ref={startupRef}
        className="fixed inset-0 bg-[#080808] z-[100] flex items-center justify-center pointer-events-auto overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,85,247,0.12)_0%,_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative z-10 flex flex-col items-center w-full px-6">
          {/* Top Label */}
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-[10px] md:text-xs text-purple-400 tracking-[0.4em] uppercase font-semibold">
              Initializing Experience
            </span>
          </div>

          {/* Shuffling Text */}
          <div className="h-[14vw] md:h-[8vw] flex items-center justify-center mb-8 overflow-hidden">
            <h2 ref={shuffleTextRef} className="font-display font-black text-[14vw] md:text-[8vw] leading-[0.8] tracking-tighter uppercase text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.05)] text-center whitespace-nowrap">
              ABDUR RAHMAN
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-white/50 font-light tracking-wide max-w-[400px] text-center mb-16">
            Crafting performant, elegant digital experiences.
          </p>

          {/* Progress Bar Container */}
          <div className="w-[80vw] max-w-[400px] flex flex-col gap-4">
            <div className="w-full h-px bg-white/[0.08] relative overflow-hidden rounded-full">
              <div 
                ref={progressLineRef} 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 w-0" 
              />
            </div>
            
            <div className="flex items-center justify-between text-[10px] md:text-[11px] font-semibold tracking-widest uppercase">
              <span className="text-white/40">Loading Assets</span>
              <span className="text-white flex gap-0.5 items-baseline">
                <span ref={percentRef}>0</span>
                <span className="text-purple-400">%</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <div ref={homeRef} className="absolute inset-0">
          <Home onNavigateToPortfolio={goToPortfolio} onNavigateToAbout={goToAbout} />
        </div>

        <div ref={portfolioRef} className="absolute inset-0 z-10 shadow-[-50px_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
          <Portfolio onNavigateToHome={goToHome} onNavigateToAbout={goToAbout} />
        </div>

        <div ref={aboutRef} className="absolute inset-0 z-20 shadow-[-50px_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
          <About onNavigateToHome={goToHome} onNavigateToPortfolio={goToPortfolio} />
        </div>
      </div>
    </div>
  );
}

export default App;
