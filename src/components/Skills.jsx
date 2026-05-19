import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Helper function to convert HEX color to RGB so we can create transparent shadow glows dynamically!
const hexToRgb = (hex) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 85, 255';
};

const row1 = [
  {
    name: 'HTML', color: '#E34F26', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="currentColor" opacity="0.15" />
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 8H8l.5 4.5H15.5L15 16.5 12 17.5 9 16.5l-.2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'CSS', color: '#1572B6', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" fill="currentColor" opacity="0.15" />
        <path d="M4 3l1.5 17L12 22l6.5-2L20 3H4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 8H8l.3 3h7.4L15 15l-3 1-3-1-.2-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'Tailwind', color: '#06B6D4', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.716 1.219C13.23 10.8 14.18 11.82 16.5 11.82c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.716-1.219C15.27 7.02 14.32 6 12 6zM7.5 11.82C5.1 11.82 3.6 13.02 3 15.42c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.716 1.219C8.73 16.62 9.68 17.64 12 17.64c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.716-1.219C10.77 12.84 9.82 11.82 7.5 11.82z" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'JavaScript', color: '#E5A93C', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 17c.5.7 1.2 1 2.1 1 1.3 0 2.1-.7 2.1-2.1V12H10v3.8c0 .6-.2.9-.8.9-.4 0-.7-.2-1-.5L8 17z" fill="currentColor" />
        <path d="M14 16.8c.6.7 1.4 1.2 2.5 1.2 1.3 0 2.3-.7 2.3-1.9 0-1.1-.6-1.6-1.7-2.1l-.5-.2c-.5-.2-.8-.4-.8-.8 0-.3.3-.6.7-.6.4 0 .7.2 1 .5l1-1c-.6-.7-1.3-1-2.1-1-1.2 0-2.1.7-2.1 1.8 0 1.1.6 1.6 1.6 2.1l.5.2c.6.3.9.5.9.9 0 .4-.3.7-.9.7-.5 0-1-.3-1.3-.7L14 16.8z" fill="currentColor" />
      </svg>
    )
  },
];

const row2 = [
  {
    name: 'React', color: '#00D8FF', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 12 12)" />
      </svg>
    )
  },
  {
    name: 'GSAP', color: '#0ae448', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3L3 8.5V15.5L12 21L21 15.5V8.5L12 3Z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'PHP', color: '#777BB4', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="6" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 12l2-2h3c1 0 1.5.5 1.5 1.5S12 13 11 13H9L8.5 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    name: 'MySQL', color: '#00758F', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="7" rx="8" ry="3" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 7v5c0 1.66 3.58 3 8 3s8-1.34 8-3V7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12v5c0 1.66 3.58 3 8 3s8-1.34 8-3v-5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
];

const row3 = [
  {
    name: 'Git', color: '#F05032', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M21.7 11.3l-9-9a1 1 0 00-1.4 0l-2 2 2.4 2.4-4 0-4 4 9 9a1 1 0 001.4 0l9-9a1 1 0 000-1.4z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        <circle cx="15" cy="9" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'GitHub', color: '#24292e', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.54 2.87 8.39 6.84 9.75.5.09.68-.22.68-.49v-1.71c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.52 1.05 1.52 1.05.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.4 9.4 0 0112 8.13c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49C19.14 20.65 22 16.8 22 12.26 22 6.58 17.52 2 12 2z" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'Figma', color: '#F24E1E', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="8" y="3" width="8" height="5" rx="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="8" width="4" height="5" rx="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="13" width="4" height="5" rx="2" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="10.5" r="2.5" fill="currentColor" opacity="0.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    )
  },
  {
    name: 'Vite', color: '#646CFF', icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2L3 5l2 14 7 3 7-3 2-14-9-3z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2L3 5l2 14 7 3 7-3 2-14L12 2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 6l-5 6h4l-1 6 7-8h-4l1-4z" fill="currentColor" />
      </svg>
    )
  },
];

const SkillSliderRow = ({ items, direction = 'left', speed = 25, className = '' }) => {
  const rowInnerRef = useRef(null);

  // Quadruple items to ensure we have a massive track buffer on all device widths (prevents scroll jumps/glitches)
  const quadrupledItems = [...items, ...items, ...items, ...items];

  useGSAP(() => {
    const el = rowInnerRef.current;
    if (!el) return;

    // With 4 repetitions of the set, shifting by exactly 1 set is 25% of the total width
    const fromVal = direction === 'left' ? 0 : -25;
    const toVal = direction === 'left' ? -25 : 0;

    const tween = gsap.fromTo(el,
      { xPercent: fromVal },
      {
        xPercent: toVal,
        duration: speed,
        ease: 'none',
        repeat: -1
      }
    );

    const handleEnter = () => gsap.to(tween, { timeScale: 0.1, duration: 0.6 });
    const handleLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });

    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      tween.kill();
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, { scope: rowInnerRef, dependencies: [direction, speed] });

  return (
    <div
      className={`skills-row-container relative w-full overflow-hidden ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 20%, white 80%, transparent)'
      }}
    >
      <div
        ref={rowInnerRef}
        className="flex gap-5 md:gap-6 w-max [will-change:transform]"
      >
        {quadrupledItems.map((skill, idx) => {
          const brandRgb = hexToRgb(skill.color);
          return (
            <div
              key={idx}
              style={{
                '--brand-color': skill.color,
                '--brand-rgb': brandRgb,
              }}
              className="group flex flex-col items-center justify-center gap-3 px-4 py-5 h-32 min-w-[130px] md:flex-row md:items-center md:justify-start md:gap-4 md:px-7 md:py-0 md:h-24 md:min-w-[240px] rounded-2xl bg-white/95 border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.015)] backdrop-blur-md cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] select-none hover:border-[var(--brand-color)] hover:scale-105 hover:shadow-[0_20px_40px_rgba(var(--brand-rgb),0.12)]"
            >
              {/* Bespoke Glowing Brand-Colored Icon Pocket (Centered at top on mobile, left-aligned on desktop) */}
              <div
                style={{
                  background: `linear-gradient(135deg, var(--brand-color) 0%, rgba(var(--brand-rgb), 0.5) 100%)`,
                  boxShadow: `0 4px 12px rgba(var(--brand-rgb), 0.2)`
                }}
                className="flex items-center justify-center w-11 h-11 md:w-14 md:h-14 rounded-xl text-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_6px_20px_rgba(var(--brand-rgb),0.35)] [&>svg]:w-5.5 [&>svg]:h-5.5 md:[&>svg]:w-7 md:[&>svg]:h-7"
              >
                {skill.icon}
              </div>
              {/* Bespoke Dynamic Brand-Colored Typography (Centered at bottom on mobile, left-aligned on desktop) */}
              <span className="text-[9px] md:text-[13px] font-bold tracking-[0.12em] uppercase text-black/60 transition-colors duration-300 group-hover:text-[var(--brand-color)] text-center md:text-left">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // CRITICAL FIX: Granularly query the absolute custom scrolling container grandparent in your React single-page structure
    const scrollContainer = document.querySelector('[data-scroll-container]') || section.parentElement?.parentElement;
    if (!scrollContainer) return;

    // Create a beautifully staggered master timeline for the entrance reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: scrollContainer,
        start: 'top 70%', // Trigger when the top of the section enters 70% of viewport
        toggleActions: 'play none none reverse', // Play on enter, reverse on scroll back up
      }
    });

    // 1. Badge slides down
    tl.fromTo(section.querySelector('.skills-badge-new'),
      { opacity: 0, y: -45, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.4, ease: 'power3.out' }
    );

    // 2. Title Line 1 (Left) and Title Line 2 (Right) slide in together
    tl.fromTo(section.querySelector('.line-left'),
      { opacity: 0, x: -150 },
      { opacity: 1, x: 0, duration: 1.4, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(section.querySelector('.line-right'),
      { opacity: 0, x: 150 },
      { opacity: 1, x: 0, duration: 1.0, ease: 'power3.out' },
      '-=1.0'
    );

    // 3. Subtitle slides up
    tl.fromTo(section.querySelector('.skills-sub-new'),
      { opacity: 0, y: 45 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    // 4. Sliding Rows wrapper fades in & rows slide in horizontally from opposite directions
    tl.fromTo(section.querySelector('.skills-rows-wrapper'),
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.6'
    );

    tl.fromTo(section.querySelector('.skills-row-1'),
      { opacity: 0, x: -180 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(section.querySelector('.skills-row-2'),
      { opacity: 0, x: 180 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
      '-=1.2'
    );

    tl.fromTo(section.querySelector('.skills-row-3'),
      { opacity: 0, x: -180 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
      '-=1.2'
    );

    // 5. Bottom line reveals
    tl.fromTo(section.querySelector('.skills-bottom-line'),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power3.inOut' },
      '-=0.8'
    );

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#F5F5F7] flex flex-col items-center justify-evenly p-6"
    >
      {/* Soft Ambient lighting matching the light premium theme */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-[80px] bg-[radial-gradient(circle,_rgba(0,85,255,0.04)_0%,_transparent_70%)]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none blur-[80px] bg-[radial-gradient(circle,_rgba(0,240,255,0.03)_0%,_transparent_70%)]"></div>

      {/* Header */}
      <div className="skills-header-new text-center relative z-10 mb-8 md:mb-14">
        <div className="skills-badge-new inline-flex items-center gap-2 px-4 py-1.5 mb-8 md:mb-6 rounded-full border border-black/[0.06] bg-black/[0.02] opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0055FF] shadow-[0_0_8px_rgba(0,85,255,0.6)] animate-pulse"></span>
          <span className="text-[10px] md:text-[12px] tracking-[0.2em] uppercase text-black/50 font-medium">Tech Stack</span>
        </div>

        <h2 className="skills-title-new text-center font-bold text-[#121212] tracking-tight leading-[1.15] text-[clamp(1.8rem,5vw,3.5rem)]">
          <span className="line-mask block overflow-hidden">
            <span className="line-left block opacity-0">Tools I work with</span>
          </span>
          <span className="line-mask block overflow-hidden">
            <span className="line-right block opacity-0">
              <span className="bg-gradient-to-br from-[#0055FF] to-[#00f0ff] bg-clip-text text-transparent">every day</span>
            </span>
          </span>
        </h2>

        <p className="skills-sub-new mt-4 md:mt-5 mb-16 md:mb-14 text-sm md:text-base text-black/45 max-w-[480px] mx-auto leading-[1.7] text-center opacity-0">
          Technologies and frameworks I use to build high-performance, pixel-perfect web experiences.
        </p>
      </div>

      {/* Infinite Horizontal Sliding Rows */}
      <div className="skills-rows-wrapper flex flex-col gap-10 md:gap-8 w-full max-w-full relative z-10 overflow-hidden mt-28 md:mt-16 opacity-0">
        <SkillSliderRow items={row1} direction="right" speed={12} className="skills-row-1" />
        <SkillSliderRow items={row2} direction="left" speed={16} className="skills-row-2" />
        <SkillSliderRow items={row3} direction="right" speed={12} className="skills-row-3" />
      </div>

      {/* Bottom decorative line */}
      <div className="skills-bottom-line absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0055FF]/10 to-transparent origin-center"></div>
    </section>
  );
};

export default Skills;
