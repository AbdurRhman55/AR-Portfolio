import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "../components/Header";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "../components/Icons";
import AboutSections from "../components/AboutSections";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const About = ({
  onNavigateToHome,
  onNavigateToPortfolio,
  onNavigateToContact,
}) => {
  const containerRef = useRef(null);
  const avatarRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const glowRef = useRef(null);
  const socialRef = useRef(null);
  const resumeRef = useRef(null);
  const heroRef = useRef(null);
  const hasAnimated = useRef(false);

  useGSAP(
    () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      if (leftTextRef.current) {
        gsap.set(Array.from(leftTextRef.current.children), {
          x: -150,
          opacity: 0,
        });
      }
      if (rightTextRef.current) {
        gsap.set(Array.from(rightTextRef.current.children), {
          x: 150,
          opacity: 0,
        });
      }
      gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
      if (socialRef.current) {
        gsap.set(Array.from(socialRef.current.children), {
          x: -30,
          opacity: 0,
        });
      }
      gsap.set(resumeRef.current, { y: 30, opacity: 0 });
      gsap.set(avatarRef.current, { y: 200, opacity: 0 });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(
        glowRef.current,
        { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
        0,
      );
      tl.to(
        avatarRef.current,
        { y: 0, opacity: 1, duration: 1.8, ease: "power3.out" },
        0.2,
      );

      if (leftTextRef.current) {
        tl.to(
          Array.from(leftTextRef.current.children),
          { x: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: "expo.out" },
          0.4,
        );
      }
      if (rightTextRef.current) {
        tl.to(
          Array.from(rightTextRef.current.children),
          { x: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: "expo.out" },
          0.5,
        );
      }
      if (socialRef.current) {
        tl.to(
          Array.from(socialRef.current.children),
          {
            x: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.08,
            ease: "power3.out",
          },
          0.6,
        );
      }
      tl.to(
        resumeRef.current,
        { y: 0, opacity: 0.8, duration: 1.0, ease: "power3.out" },
        0.8,
      );

      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.9,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      data-scroll-about
      className="relative w-full h-full bg-[#121212] overflow-x-hidden overflow-y-auto select-none text-white"
    >
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <Header
        onHomeClick={onNavigateToHome}
        onPortfolioClick={onNavigateToPortfolio}
        onAboutClick={() => {}}
        onContactClick={onNavigateToContact}
      />

      <section
        ref={heroRef}
        className="relative w-full h-screen flex flex-col justify-between pt-24 overflow-hidden bg-gradient-to-t from-[#0055FF] via-[#a8b0bd] to-[#121212]"
      >
        <div
          ref={glowRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none blur-[120px] bg-[radial-gradient(circle,_rgba(0,85,255,0.15)_0%,_transparent_75%)] z-0"
        />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-[75vw] h-[75vh] md:h-[100vh] max-w-[600px] md:max-w-[1050px] flex items-end justify-center z-0 select-none pointer-events-none">
          <div className="absolute inset-x-0 bottom-0 top-1/4 rounded-full bg-[#0055FF]/10 blur-[50px] pointer-events-none animate-pulse z-0" />
          <img
            ref={avatarRef}
            src="/profile.png"
            alt="Abdur Rahman"
            className="w-full h-full object-contain object-bottom relative z-10 drop-shadow-[0_20px_50px_rgba(0,85,255,0.3)]"
          />
        </div>

        <div className="flex-1 flex flex-col md:flex-row items-center justify-evenly px-10 md:px-[8vw] lg:px-[12vw] relative z-10 w-full h-full mt-28 md:mt-0 md:gap-60 gap-20">
          <div
            ref={leftTextRef}
            className="flex flex-col items-center md:items-center text-center md:text-left relative z-10 mt-8 md:mt-0"
          >
            <span className="text-[12px] md:text-[16px] text-white/50 tracking-[0.4em] uppercase font-bold mb-4 md:mb-6">
              Hello! I'm
            </span>
            <h2 className="text-[26vw] md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)] text-nowrap">
              ABDUR
            </h2>
            <h2 className="text-[26vw] md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)] text-nowrap">
              RAHMAN
            </h2>
          </div>

          <div
            ref={rightTextRef}
            className="flex flex-col items-center md:items-center text-center md:text-right relative z-10 md:mb-28 mb-0 mt-12 md:mt-24"
          >
            <span className="text-[12px] md:text-[16px] text-white/50 tracking-[0.4em] uppercase font-bold mb-4 md:mb-6">
              A Creative
            </span>
            <h2 className="text-[26vw] md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase text-transparent [-webkit-text-stroke:2px_rgba(0,85,255,0.85)] drop-shadow-[0_0_15px_rgba(0,85,255,0.15)] text-nowrap">
              DEVELOPER
            </h2>
            <h2 className="text-[26vw] md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.05)] text-nowrap">
              DESIGNER
            </h2>
          </div>
        </div>
      </section>

      <AboutSections />

      <Footer
        onNavigateToPortfolio={onNavigateToPortfolio}
        onNavigateToContact={onNavigateToContact}
        onNavigateToAbout={() => {}}
      />

      <div
        ref={socialRef}
        className="flex fixed left-4 md:left-8 top-1/2 -translate-y-1/2 flex-col gap-5 md:gap-6 z-50"
      >
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6b7280] hover:text-[#0055FF] transition-colors duration-300 transform hover:scale-110"
        >
          <GithubIcon className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/abdur-rahman-web/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6b7280] hover:text-[#0055FF] transition-colors duration-300 transform hover:scale-110"
        >
          <LinkedinIcon className="w-5 h-5" />
        </a>
        <a
          href="https://www.instagram.com/abdur_rahman_5577/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#6b7280] hover:text-[#0055FF] transition-colors duration-300 transform hover:scale-110"
        >
          <InstagramIcon className="w-5 h-5" />
        </a>
        <button
          onClick={() => window.open("https://mail.google.com/mail/?view=cm&fs=1&to=ali.matta4@gmail.com", "_blank")}
          className="text-[#6b7280] hover:text-[#0055FF] transition-colors duration-300 transform hover:scale-110 bg-transparent border-none p-0 cursor-pointer"
          aria-label="Send email"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </button>
      </div>

      <div
        ref={resumeRef}
        className="fixed bottom-20 right-8 md:bottom-8 md:right-8 z-50 md:block hidden"
      >
        <a
          href="/resume.pdf"
          download
          className="px-5 py-2.5 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-full text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-white/90 hover:text-white hover:bg-[#0055FF]/20 hover:border-[#0055FF]/40 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] uppercase inline-flex items-center gap-2 group"
        >
          Resume
          <span className="text-[12px] transform group-hover:translate-y-[2px] transition-transform duration-300">
            ↓
          </span>
        </a>
      </div>
    </div>
  );
};

export default About;
