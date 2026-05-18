import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import ProjectShowcase from '../components/ProjectShowcase';


const Portfolio = ({ onNavigateToHome }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const videoRef = useRef(null);
  const descriptionRef = useRef(null);

  useGSAP(() => {
    // Entrance animations
    gsap.fromTo(titleRef.current,
      { y: 200, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
    );

    gsap.fromTo(videoRef.current,
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out', delay: 0.2 }
    );

    gsap.to(videoRef.current, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Tagline GSAP entrance
    gsap.fromTo(descriptionRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.8 }
    );
  }, { scope: containerRef });


  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#121212] overflow-x-hidden select-none"
    >
      {/* Hero Section */}
      <div className="relative w-full h-dvh bg-gradient-to-t from-[#0055FF] via-[#a8b0bd] to-[#121212] flex  items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <Header onHomeClick={onNavigateToHome} onPortfolioClick={() => { }} />

        <div className="relative flex flex-col items-center justify-center w-full ">
          <h1
            ref={titleRef}
            className="text-[32vw] md:text-[25vw] font-display text-white/90 leading-none tracking-tighter uppercase select-none"
          >
            PORTFOLIO
          </h1>

          {/* Desktop-Only Keychain Video */}
          <div
            ref={videoRef}
            className="hidden md:flex absolute inset-0 items-center justify-center z-10 pointer-events-none mix-blend-screen md:mix-blend-normal transform translate-z-0"
          >
            <video
              autoPlay loop muted playsInline
              className="w-full h-full object-contain max-h-[80vh]"
            >
              <source src="/nb-keychain-01-_DeMain-V9.webm" type="video/webm" />
            </video>
          </div>

          {/* Premium React Developer Tagline and Glassmorphic Badge */}
          <div
            ref={descriptionRef}
            className="flex flex-col items-center gap-3 mt-6 md:mt-10 absolute top-[100%] z-20 w-full"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[9px] md:text-[11px] tracking-[0.25em] text-cyan-400 uppercase font-semibold shadow-[0_0_15px_rgba(0,255,255,0.1)]">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              REACT DEVELOPER & CREATIVE ENGINEER
            </div>
            <p className="text-white/70 text-[9px] md:text-xs tracking-[0.2em] uppercase font-light text-center max-w-[320px] md:max-w-[450px] leading-relaxed mix-blend-difference">
              Specializing in pixel-perfect React interfaces, high-performance web architecture, and premium interactive animations.
            </p>
          </div>
        </div>

        <div className="absolute bottom-20 md:bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-[10px] md:text-xs tracking-widest uppercase whitespace-nowrap">
          Explore Excellence • 2026 Edition
        </div>
      </div>

      {/* Projects Showcase Section */}
      <ProjectShowcase />
    </div>
  );
};


export default Portfolio;
