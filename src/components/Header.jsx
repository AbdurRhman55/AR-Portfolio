import React, { useState, useRef } from 'react';
import RollText from './RollText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Header = ({ onPortfolioClick, onHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuLinksRef = useRef([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(() => {
    if (isMenuOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      const scrollContainers = document.querySelectorAll('[data-scroll-container]');
      scrollContainers.forEach(el => {
        el.style.overflowY = 'hidden';
      });

      // Open animation
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.8,
        ease: 'expo.inOut'
      });
      gsap.fromTo(menuLinksRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      // Restore scrolling
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
      const scrollContainers = document.querySelectorAll('[data-scroll-container]');
      scrollContainers.forEach(el => {
        el.style.overflowY = 'auto';
      });

      // Close animation
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.6,
        ease: 'expo.inOut'
      });
    }
  }, [isMenuOpen]);

  const handleLinkClick = (callback) => {
    // Restore scrolling immediately before navigation
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    const scrollContainers = document.querySelectorAll('[data-scroll-container]');
    scrollContainers.forEach(el => {
      el.style.overflowY = 'auto';
    });

    setIsMenuOpen(false);
    if (callback) setTimeout(callback, 600); // Wait for menu to close before navigating
  };

  return (
    <>
      <header className="absolute top-6 left-4 right-4 md:top-4 md:left-8 md:right-8 z-50 flex items-center justify-between md:grid md:grid-cols-3">
        {/* Desktop Left Nav / Mobile Hidden */}
        <div className="hidden md:flex flex-col md:flex-row gap-4 md:gap-10 justify-start">
          <div onClick={onHomeClick} className="cursor-pointer">
            <RollText text="Featured Work [6]" />
          </div>
          <div onClick={onPortfolioClick} className="cursor-pointer">
            <RollText text="Portfolio [25]" />
          </div>
        </div>

        {/* Centered Logo Image - Responsive alignment */}
        <div className="flex flex-1 md:justify-center cursor-pointer order-1 md:order-none" onClick={onHomeClick}>
          <img
            src="./ChatGPT Image May 14, 2026, 04_25_50 PM.png"
            alt="Logo"
            className={`h-10 md:h-16 w-auto object-contain ml-[-12px] md:ml-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 md:opacity-100' : 'mix-blend-difference'}`}
          />
        </div>

        {/* Desktop Right Nav / Mobile Hamburger */}
        <div className="flex items-center justify-end md:gap-10 text-right order-2 md:order-none">
          <div className="hidden md:flex gap-10">
            <RollText text="About" />
            <RollText text="Contact" />
          </div>

          {/* Hamburger Button (Mobile Only) */}
          <button
            onClick={toggleMenu}
            className={`md:hidden relative z-[60] w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none bg-transparent transition-all duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}
          >
            <span className="w-8 h-0.5 transition-all duration-500 bg-white"></span>
            <span className="w-8 h-0.5 transition-all duration-300 bg-white"></span>
            <span className="w-8 h-0.5 transition-all duration-500 bg-white"></span>
          </button>
        </div>
      </header>


      {/* Mobile Slide-out Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[55] flex flex-col bg-gradient-to-t from-[#0055FF] via-[#a8b0bd] to-[#121212] translate-x-full md:hidden"
      >
        {/* Mobile Menu Header (Inside Overlay) */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-[60]">
          <img
            src="./ChatGPT Image May 14, 2026, 04_25_50 PM.png"
            alt="Logo"
            className="h-10 w-auto object-contain brightness-0 invert" // Guarantees a pure white logo on dark backgrounds
          />
          <button
            onClick={toggleMenu}
            className="w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
          >
            <span className="w-6 h-0.5 bg-white rotate-45 translate-y-[4px]"></span>
            <span className="w-6 h-0.5 bg-white -rotate-45 -translate-y-[4px]"></span>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          {[
            { label: 'Home', action: onHomeClick },
            { label: 'Portfolio', action: onPortfolioClick },
            { label: 'About', action: null },
            { label: 'Contact', action: null }
          ].map((link, i) => (
            <div
              key={link.label}
              ref={el => menuLinksRef.current[i] = el}
              onClick={() => handleLinkClick(link.action)}
              className="text-6xl sm:text-7xl font-display font-black text-white hover:text-blue-200 transition-colors cursor-pointer tracking-tighter"
            >
              {link.label}
            </div>
          ))}
        </div>

        {/* Mobile Menu Footer Info */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center text-center">
          <p className="text-gray-300 text-xs uppercase tracking-widest font-bold">Get in touch</p>
          <p className="text-white mt-2 font-medium">ali.matta4@Gmail.com</p>
        </div>
      </div>
    </>
  );
};


export default Header;

