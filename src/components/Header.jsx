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
      // Close animation
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.6,
        ease: 'expo.inOut'
      });
    }
  }, [isMenuOpen]);

  const handleLinkClick = (callback) => {
    setIsMenuOpen(false);
    if (callback) setTimeout(callback, 600); // Wait for menu to close before navigating
  };

  return (
    <>
      <header className="absolute top-6 left-6 right-6 md:top-4 md:left-8 md:right-8 z-50 flex items-center justify-between md:grid md:grid-cols-3">
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
            className="h-10 md:h-16 w-auto object-contain mix-blend-difference"
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
            className="md:hidden relative z-[60] w-12 h-12 flex flex-col justify-center items-center gap-1.5 focus:outline-none transition-all duration-300"
          >
            <span className={`w-8 h-0.5 transition-all duration-500 bg-gradient-to-r from-blue-500 to-indigo-600 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-8 h-0.5 transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-8 h-0.5 transition-all duration-500 bg-gradient-to-r from-blue-500 to-indigo-600 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </header>



      {/* Mobile Slide-out Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-white z-[55] flex flex-col items-center justify-center translate-x-full md:hidden"
      >
        <div className="flex flex-col items-center gap-8">
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
              className="text-4xl font-display font-black text-[#111] hover:text-blue-600 transition-colors cursor-pointer tracking-tighter"
            >
              {link.label}
            </div>
          ))}
        </div>

        {/* Mobile Menu Footer Info */}
        <div className="absolute bottom-12 text-center">
          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">Get in touch</p>
          <p className="text-[#111] mt-2 font-medium">alimasroor@design.com</p>
        </div>
      </div>
    </>
  );
};

export default Header;

