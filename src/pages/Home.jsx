import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Header from '../components/Header';
import RollText from '../components/RollText';

const slides = [
  {
    id: 1,
    title: 'ABDUR RAHMAN',
    left: 'Frontend Developer',
    right: 'Creative Alchemist',
    video: 'https://videos.pexels.com/video-files/4069480/4069480-uhd_3840_2160_25fps.mp4'
  },
  {
    id: 2,
    title: 'AURA SHOP',
    left: 'E-Commerce',
    right: 'High Performance',
    video: '/99433-653480286_small.mp4'
  },
  {
    id: 3,
    title: 'LUMINA UI',
    left: 'Design Systems',
    right: 'Scalable Architecture',
    video: '/15069628_1080_1920_30fps.mp4'
  },
  {
    id: 4,
    title: 'VORTEX APP',
    left: 'Web Applications',
    right: 'Real-time Logic',
    video: '/mixkit-flying-over-a-relaxing-creek-full-of-rock-on-the-51585-full-hd.mp4'
  }
];

const Home = ({ onNavigateToPortfolio }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const titleRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);

  useGSAP(() => {
    gsap.set(videoRefs.current[0], { opacity: 0.8 });
  }, { scope: containerRef });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        const nextIndex = (currentIndex + 1) % slides.length;
        changeSlide(nextIndex);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  const changeSlide = (newIndex) => {
    if (isAnimating || newIndex === currentIndex) return;
    setIsAnimating(true);

    const oldIndex = currentIndex;
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex(newIndex);
        setTimeout(() => {
          if (leftTextRef.current && rightTextRef.current) {
            gsap.fromTo([leftTextRef.current, rightTextRef.current],
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
          }

          const chars = gsap.utils.toArray('.title-char');
          if (chars.length > 0) {
            gsap.fromTo(chars,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, stagger: 0.005, ease: 'power2.out', onComplete: () => setIsAnimating(false) }
            );
          }
        }, 30);
      }
    });

    gsap.to(videoRefs.current[oldIndex], { opacity: 0, duration: 0.8, ease: 'power2.inOut' });
    gsap.to(videoRefs.current[newIndex], { opacity: 0.8, duration: 0.8, ease: 'power2.inOut' });

    if (leftTextRef.current && rightTextRef.current) {
      tl.to([leftTextRef.current, rightTextRef.current], {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in'
      }, 0);
    }

    const chars = gsap.utils.toArray('.title-char');
    if (chars.length > 0) {
      tl.to(chars, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.005,
        ease: 'power2.in'
      }, 0);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden">
      <Header onPortfolioClick={onNavigateToPortfolio} onHomeClick={() => {}} />

      {/* Videos */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <video
            key={slide.id}
            ref={el => videoRefs.current[index] = el}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-[2]" />
      </div>

      {/* Main Hero Content */}
      <main className="absolute inset-x-10 md:inset-x-16 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-20">
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="flex justify-start text-sm md:text-xl font-medium overflow-hidden mix-blend-difference text-white">
            <div ref={leftTextRef}>{slides[currentIndex].left}</div>
          </div>

          <div className="flex justify-center overflow-hidden py-[10vw] mix-blend-difference text-white min-w-[50vw]">
            <div ref={titleRef} className="flex flex-col font-display text-[20vw] leading-[0.75] tracking-normal uppercase items-center w-full">
              {slides[currentIndex].title.split(' ').map((word, wordIndex) => (
                <div key={wordIndex} className="flex justify-center w-full">
                  {word.split('').map((char, charIndex) => (
                    <span key={charIndex} className="title-char inline-block whitespace-pre">
                      {char}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end text-sm md:text-xl font-medium overflow-hidden mix-blend-difference text-white">
            <div ref={rightTextRef}>{slides[currentIndex].right}</div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-10 left-6 right-6 md:bottom-6 md:left-8 md:right-8 z-10 flex flex-col gap-6 md:gap-4">
        <div className="flex gap-3 w-full mix-blend-difference">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => changeSlide(index)}
              className="h-[4px] flex-1 bg-white/20 cursor-pointer overflow-hidden relative rounded-full group"
            >
              <div
                className={`absolute top-0 left-0 h-full w-full transition-transform duration-[0.6s] ease-[cubic-bezier(0.76,0,0.24,1)] ${index === currentIndex ? 'bg-white translate-x-0' : 'bg-[#0055FF] -translate-x-full group-hover:translate-x-0'}`}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 items-center w-full relative">
          <div className="flex justify-start text-left">
            <RollText text={`© ${new Date().getFullYear()} Abdur Rahman All rights reserved.`} />
          </div>
          <div className="flex gap-3 md:gap-6 justify-end">
            <RollText text="Instagram" />
            <RollText text="LinkedIn" />
            <RollText text="GitHub" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
