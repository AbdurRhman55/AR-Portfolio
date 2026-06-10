import React, { useState, useRef } from 'react';
import RollText from './RollText';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Header = ({ onPortfolioClick, onHomeClick, onAboutClick, onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuLinksRef = useRef([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useGSAP(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

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
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.6,
        ease: 'expo.inOut'
      });
    }
  }, [isMenuOpen]);

  const handleLinkClick = (callback) => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    setIsMenuOpen(false);
    if (callback) setTimeout(callback, 600);
  };

  return (
    <>
      <header className="absolute top-6 left-4 right-4 md:top-4 md:left-8 md:right-8 z-50 flex items-center justify-between md:grid md:grid-cols-3">
        <div className="hidden md:flex flex-col md:flex-row gap-4 md:gap-10 justify-start">
          <div onClick={onHomeClick} className="cursor-pointer">
            <RollText text="Featured Work [4]" />
          </div>
          <div onClick={onPortfolioClick} className="cursor-pointer">
            <RollText text="Portfolio [25]" />
          </div>
        </div>

        <div className="flex flex-1 md:justify-center cursor-pointer order-1 md:order-none" onClick={onHomeClick}>
          <img
            src="/logo.png"
            alt="Logo"
            className={`h-10 md:h-16 w-auto object-contain ml-[-12px] md:ml-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 md:opacity-100' : ''}`}
          />
        </div>

        <div className="flex items-center justify-end md:gap-10 text-right order-2 md:order-none">
          <div className="hidden md:flex gap-10">
            <div onClick={onAboutClick} className="cursor-pointer">
              <RollText text="About" />
            </div>
            <div onClick={onContactClick} className="cursor-pointer">
              <RollText text="Contact" />
            </div>
          </div>

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

      <div
        ref={menuRef}
        className="fixed inset-0 z-[55] flex flex-col bg-gradient-to-t from-[#0055FF] via-[#a8b0bd] to-[#121212] translate-x-full md:hidden"
      >
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-[60]">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-10 w-auto object-contain brightness-0 invert"
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
            { label: 'About', action: onAboutClick },
            { label: 'Contact', action: onContactClick }
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

        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center justify-center text-center">
          <p className="text-gray-300 text-xs uppercase tracking-widest font-bold">Get in touch</p>
          <p className="text-white mt-2 font-medium">ali.matta4@Gmail.com</p>
        </div>
      </div>
    </>
  );
};

export default Header;
