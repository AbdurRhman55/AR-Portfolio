import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProjectShowcase = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const tagsRef = useRef([]);
  const titleLineRef = useRef(null);
  const titleSpanRef = useRef(null);
  const subtitleRef = useRef(null);

  const projects = [
    { id: 1, title: 'Law & Human Rights', tag: '@gov_portal', color: 'bg-[#1a237e]', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Ibri Private School', tag: '@edu_platform', color: 'bg-[#00695c]', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'Bitcoder Labs', tag: '@tech_studio', color: 'bg-[#0d47a1]', image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'Research Acadamia', tag: '@academic_hub', color: 'bg-[#4a148c]', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop' },
  ];

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const wrappers = cardsRef.current.filter(el => el !== null);
    const tags = tagsRef.current.filter(el => el !== null);
    if (wrappers.length === 0) return;

    const scroller = section.closest('[data-scroll-portfolio]') || window;

    const isMobile = window.innerWidth < 769;

    gsap.set(titleLineRef.current, { x: isMobile ? -60 : -120, opacity: 0 });
    gsap.set(titleSpanRef.current, { x: isMobile ? 60 : 120, opacity: 0 });
    gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
    gsap.set(wrappers, { y: isMobile ? 400 : 600, x: 0, rotate: 0, opacity: 0, scale: isMobile ? 0.7 : 0.85, filter: 'blur(10px)' });
    gsap.set(tags, { opacity: 0, scale: 0, y: 10 });

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'expo.out', duration: 1.2 }
    });

    tl.to(titleLineRef.current, { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out' }, 0)
      .to(titleSpanRef.current, { x: 0, opacity: 1, duration: 1.4, ease: 'power3.out' }, 0.1)
      .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.3)
      .to(wrappers, { y: isMobile ? -20 : -50, opacity: 1, filter: 'blur(0px)', scale: 1, duration: 1.2, ease: 'power3.out' }, 0.5)
      .to(wrappers, {
        rotate: (i) => (i - 1.5) * (isMobile ? 12 : 18),
        x: (i) => (i - 1.5) * (isMobile ? 60 : 155),
        y: (i) => Math.abs(i - 1.5) * (isMobile ? 25 : 50) - (isMobile ? 40 : 100),
        scale: isMobile ? 0.75 : 0.95,
        duration: 1.5,
        ease: 'expo.inOut'
      }, '-=0.6')
      .to(tags, {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.4');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tl.play();
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(section);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full h-dvh bg-[#fafafa] flex flex-col gap-4 items-center justify-center overflow-hidden px-4 md:px-0">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="text-center mb-20 md:mb-28 mt-10 relative z-10 w-full px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-[#111] tracking-tight leading-[1.1]">
          <span ref={titleLineRef} className="inline-block">A place to display your</span>{' '}
          <span ref={titleSpanRef} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">masterpiece.</span>
        </h2>
        <p ref={subtitleRef} className="mt-5 md:mt-6 text-gray-400 font-medium tracking-[0.25em] uppercase text-[11px] md:text-xs">
          Crafting digital excellence through design
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-6xl h-[350px] md:h-[500px] flex items-center justify-center">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="absolute flex flex-col items-center"
          >
            <div
              ref={(el) => (tagsRef.current[index] = el)}
              className={`mb-2 md:mb-4 px-3 md:px-4 py-1 md:py-1.5 rounded-full text-white text-[8px] md:text-[10px] font-bold shadow-lg ${project.color} z-20 whitespace-nowrap uppercase tracking-wider`}
            >
              {project.tag}
            </div>

            <div
              className={`relative w-36 h-48 md:w-48 md:h-64 rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border-[4px] md:border-[5px] border-white cursor-pointer group`}
              style={{ zIndex: index }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 md:p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white/60 text-[8px] md:text-[10px] uppercase tracking-widest mb-1">Featured Project</span>
                <h3 className="text-white font-bold text-sm md:text-lg leading-tight">{project.title}</h3>
                <div className="mt-2 md:mt-3 w-6 md:w-8 h-[2px] bg-white/50"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-12 flex flex-wrap justify-center gap-6 md:gap-10 text-[8px] md:text-[10px] font-bold tracking-[0.3em] uppercase text-gray-300">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <span>Strategy</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
          <span>Design</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
          <span>Development</span>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
