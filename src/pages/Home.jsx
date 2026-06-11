import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Header from "../components/Header";
import RollText from "../components/RollText";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "../components/Icons";

const slides = [
  {
    id: 1,
    title: "Directorate General of Law & Human Rights Khyber Pakhtunkhwa",
    left: "Government Portal",
    right: "Public Service",
    video:
      "https://videos.pexels.com/video-files/4069480/4069480-uhd_3840_2160_25fps.mp4",
  },
  {
    id: 2,
    title: "IBRI SCHOOL",
    left: "Educational Platform",
    right: "Bilingual Campus",
    video: "/99433-653480286_small.mp4",
  },
  {
    id: 3,
    title: "BITCODERLABS",
    left: "Software Agency",
    right: "Tech Solutions",
    video: "/15069628_1080_1920_30fps.mp4",
  },
  {
    id: 4,
    title: "RESEARCH ACADAMIA",
    left: "Academic Portal",
    right: "Research Hub",
    video:
      "/mixkit-flying-over-a-relaxing-creek-full-of-rock-on-the-51585-full-hd.mp4",
  },
];

const Home = ({ onNavigateToPortfolio, onNavigateToAbout, onNavigateToContact }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCursorText, setShowCursorText] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const titleRef = useRef(null);
  const initialRender = useRef(true);
  const cursorTextRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRaf = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!leftTextRef.current || !rightTextRef.current || !titleRef.current)
      return;
    gsap.fromTo(
      [leftTextRef.current, rightTextRef.current, titleRef.current],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    );
  }, [currentIndex]);

  useGSAP(
    () => {
      gsap.set(videoRefs.current[0], { opacity: 0.8 });

      if (leftTextRef.current && rightTextRef.current && titleRef.current) {
        gsap.fromTo(
          [leftTextRef.current, rightTextRef.current, titleRef.current],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" },
        );
      }
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!showCursorText) {
      if (cursorRaf.current) cancelAnimationFrame(cursorRaf.current);
      return;
    }

    let cx = mouseRef.current.x;
    let cy = mouseRef.current.y;

    const loop = () => {
      cx += (mouseRef.current.x - cx) * 0.1;
      cy += (mouseRef.current.y - cy) * 0.1;

      if (cursorTextRef.current) {
        cursorTextRef.current.style.transform = `translate(${cx + 14}px, ${cy + 14}px)`;
      }

      cursorRaf.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (cursorRaf.current) cancelAnimationFrame(cursorRaf.current);
    };
  }, [showCursorText]);

  const changeSlide = (newIndex) => {
    if (isAnimating || newIndex === currentIndex) return;
    setIsAnimating(true);

    const oldIndex = currentIndex;

    gsap.to(videoRefs.current[oldIndex], {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    });
    gsap.to(videoRefs.current[newIndex], {
      opacity: 0.8,
      duration: 0.8,
      ease: "power2.inOut",
    });

    if (leftTextRef.current && rightTextRef.current && titleRef.current) {
      gsap.to([leftTextRef.current, rightTextRef.current, titleRef.current], {
        y: -40,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIndex(newIndex);
          setIsAnimating(false);
        },
      });
    } else {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-[#0A0A0A] overflow-hidden"
    >
      <Header
        onPortfolioClick={onNavigateToPortfolio}
        onHomeClick={() => {}}
        onAboutClick={onNavigateToAbout}
        onContactClick={onNavigateToContact}
      />

      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <video
            key={slide.id}
            ref={(el) => (videoRefs.current[index] = el)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 bg-black/40 z-[2]" />

        <div
          className="absolute inset-x-0 z-[14] cursor-pointer"
          style={{ top: "80px", bottom: "80px" }}
          onMouseEnter={() => setShowCursorText(true)}
          onMouseLeave={() => setShowCursorText(false)}
          onClick={() => {
            setShowCursorText(false);
            onNavigateToPortfolio();
          }}
        />

        <div
          ref={cursorTextRef}
          className={`fixed top-0 left-0 z-[9999] pointer-events-none select-none transition-opacity duration-300 ${showCursorText ? "opacity-100" : "opacity-0"}`}
        >
          <span className="flex items-center gap-2 text-white/80 text-xs md:text-sm font-medium tracking-widest uppercase font-sans">
            View Project
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="stroke-current">
              <path d="M1 6H17M17 6L12 1M17 6L12 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      <main className="absolute inset-x-5 md:inset-x-16 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20">
        <div className="w-full flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-0">
          <div className="flex justify-center md:justify-start text-xl md:text-xl font-medium overflow-hidden text-white text-center md:text-left">
            <div key={currentIndex} ref={leftTextRef}>
              {slides[currentIndex].left}
            </div>
          </div>

          <div className="flex justify-center overflow-hidden py-4 md:py-[10vw] text-white md:min-w-[50vw] px-2 md:px-4">
            <h1
              ref={titleRef}
              key={currentIndex}
              className="flex flex-col font-display text-[clamp(24px,6vw,120px)] md:text-[clamp(40px,10vw,160px)] leading-[0.9] tracking-tight uppercase items-center justify-center max-w-4xl text-white text-center"
            >
              {slides[currentIndex].title}
            </h1>
          </div>

          <div className="flex justify-center md:justify-end text-xl md:text-xl font-medium overflow-hidden text-white text-center md:text-right">
            <div key={currentIndex} ref={rightTextRef}>
              {slides[currentIndex].right}
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-6 left-4 right-4 md:bottom-6 md:left-8 md:right-8 z-10 flex flex-col gap-4">
        <div className="flex gap-3 w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => changeSlide(index)}
              className="h-[4px] flex-1 bg-white/20 cursor-pointer overflow-hidden relative rounded-full group"
            >
              <div
                className={`absolute top-0 left-0 h-full w-full transition-transform duration-[0.6s] ease-[cubic-bezier(0.76,0,0.24,1)] ${index === currentIndex ? "bg-white translate-x-0" : "bg-[#0055FF] -translate-x-full group-hover:translate-x-0"}`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center w-full relative">
          <div className="flex justify-start text-left text-[9px] sm:text-xs md:text-lg opacity-80 mix-blend-difference">
            <RollText
              text={`© ${new Date().getFullYear()} Abdur Rahman All rights reserved.`}
            />
          </div>
          <div className="flex gap-4 md:gap-6 justify-end items-center mix-blend-difference">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition-colors flex items-center justify-center"
            >
              <span className="hidden md:inline-block">
                <RollText text="Instagram" />
              </span>
              <span className="md:hidden">
                <InstagramIcon className="w-5 h-5 text-white" />
              </span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition-colors flex items-center justify-center"
            >
              <span className="hidden md:inline-block">
                <RollText text="LinkedIn" />
              </span>
              <span className="md:hidden">
                <LinkedinIcon className="w-5 h-5 text-white" />
              </span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-500 transition-colors flex items-center justify-center"
            >
              <span className="hidden md:inline-block">
                <RollText text="GitHub" />
              </span>
              <span className="md:hidden">
                <GithubIcon className="w-5 h-5 text-white" />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
