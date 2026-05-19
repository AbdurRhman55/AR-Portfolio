import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

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

  useGSAP(() => {
    // Startup Animation Sequence
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

    // Initialize portfolio position off-screen
    gsap.set(portfolioRef.current, { xPercent: 100 });
  }, { scope: containerRef });

  const goToPortfolio = () => {
    if (currentPage === 'portfolio') return;
    const tl = gsap.timeline({
      onComplete: () => setCurrentPage('portfolio')
    });

    tl.to(homeRef.current, {
      xPercent: -100,
      duration: 1.2,
      ease: 'expo.inOut'
    }, 0);

    tl.to(portfolioRef.current, {
      xPercent: 0,
      duration: 1.2,
      ease: 'expo.inOut'
    }, 0);
  };

  const goToHome = () => {
    if (currentPage === 'home') return;
    const tl = gsap.timeline({
      onComplete: () => setCurrentPage('home')
    });

    tl.to(homeRef.current, {
      xPercent: 0,
      duration: 1.2,
      ease: 'expo.inOut'
    }, 0);

    tl.to(portfolioRef.current, {
      xPercent: 100,
      duration: 1.2,
      ease: 'expo.inOut'
    }, 0);
  };

  return (
    <div ref={containerRef} className="relative w-full h-dvh bg-[#0A0A0A] text-[#FDFDFD] overflow-hidden select-none">

      {/* Startup Page (Gaming Tech Aesthetic) */}
      <div 
        ref={startupRef}
        className="fixed inset-0 bg-[#0A0A0A] z-[100] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        
        <div className="flex flex-col items-center relative z-10">
          <div className="mb-4 text-cyan-500 font-logo text-sm tracking-[0.5em] animate-pulse">INITIALIZING SYSTEM...</div>
          <h2 
            ref={shuffleTextRef}
            className="text-white font-logo text-6xl md:text-9xl tracking-tighter uppercase drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            STARTING...
          </h2>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[15px] bg-white/5 backdrop-blur-md border-t border-white/10">
          <div ref={progressLineRef} className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 w-0 relative shadow-[0_0_30px_rgba(0,230,255,0.6)]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shimmer_1.5s_infinite]" />
            <div className="absolute right-0 top-0 h-full w-[10px] bg-white blur-sm shadow-[0_0_20px_white]" />
          </div>
          <div className="absolute bottom-8 right-10 font-logo text-6xl md:text-8xl text-white mix-blend-difference flex items-baseline gap-2 group">
            <span ref={percentRef} className="drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">0</span>
            <span className="text-2xl md:text-3xl text-cyan-400 font-bold opacity-80">%</span>
          </div>
        </div>
      </div>

      {/* Main Pages Flow */}
      <div className="absolute inset-0 z-0">
        <div ref={homeRef} className="absolute inset-0">
          <Home onNavigateToPortfolio={goToPortfolio} />
        </div>
        
        <div 
          ref={portfolioRef} 
          data-scroll-container
          className="absolute inset-0 z-10 shadow-[-50px_0_100px_rgba(0,0,0,0.5)] overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth"
        >
          <Portfolio onNavigateToHome={goToHome} />
        </div>


      </div>
    </div>
  );
}

export default App;