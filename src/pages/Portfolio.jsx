import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import ProjectShowcase from '../components/ProjectShowcase';


const Portfolio = ({ onNavigateToHome }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const videoRef = useRef(null);

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
  }, { scope: containerRef });


  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#121212] overflow-x-hidden select-none"
    >
      {/* Hero Section */}
      <div className="relative w-full h-screen bg-gradient-to-t from-[#0055FF] via-[#a8b0bd] to-[#121212] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        <Header onHomeClick={onNavigateToHome} onPortfolioClick={() => { }} />

        <div className="relative flex items-center justify-center w-full">
          <h1
            ref={titleRef}
            className="text-[30vw] md:text-[25vw] font-display text-white/90 leading-none tracking-tighter uppercase select-none"
          >
            PORTFOLIO
          </h1>

          <div
            ref={videoRef}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <video
              autoPlay loop muted playsInline
              className="w-full h-full object-contain max-h-[80vh]"
            >
              <source src="/nb-keychain-01-_DeMain-V9.webm" type="video/webm" />
            </video>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-xs tracking-widest uppercase">
          Explore Excellence • 2026 Edition
        </div>
      </div>

      {/* Projects Showcase Section */}
      <ProjectShowcase />
    </div>
  );
};


export default Portfolio;
