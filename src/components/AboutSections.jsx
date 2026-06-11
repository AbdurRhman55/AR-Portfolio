import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════
   SCROLL REVEAL  — cubic-bezier GSAP feel
══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const scroller = document.querySelector("[data-scroll-about]") || window;
    const run = () => {
      const ch =
        scroller === window ? window.innerHeight : scroller.clientHeight;
      document.querySelectorAll("[data-r]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < ch * 0.88) {
          const d = el.dataset.d || 0;
          setTimeout(() => el.classList.add("vis"), +d);
        }
      });
    };
    run();
    scroller.addEventListener("scroll", run, { passive: true });
    return () => scroller.removeEventListener("scroll", run);
  }, []);
}

/* ══════════════════════════════════════════
   COUNT-UP HOOK
══════════════════════════════════════════ */
function useCountUp(target, duration = 1600, trigger) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const num = parseInt(target);
    const suffix = target.replace(String(num), "");
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * num) + suffix);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger]);
  return val || "0";
}

function StatCell({ num, lbl, delay }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const display = useCountUp(num, 1400, active);
  return (
    <div ref={ref} className="stc" data-r data-d={delay}>
      <span className="stc-n">{active ? display : "0"}</span>
      <span className="stc-l">{lbl}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   CSS
══════════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --light: #f5f7fa;
  --card:  #ffffff;
  --blue:  #0055FF;
  --bluel: #3388FF;
  --blued: #0033AA;
  --silver:#a8b0bd;
  --ink:   #1a1a2e;
  --text:  #2c3040;
  --text2: #6b7280;
  --text3: #9ca3af;
  --line:  rgba(0,85,255,0.10);
  --line2: rgba(0,0,0,0.06);
}

.wr{
  font-family:'Inter',sans-serif;
  background:var(--light);
  color:var(--ink);
  width:100%;
  overflow-x:hidden;
}

[data-r]{
  opacity:0;
  transform:translateY(40px);
  transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1);
}
[data-r="l"]{ transform:translateX(-50px); }
[data-r="r"]{ transform:translateX(50px); }
[data-r="s"]{ transform:scale(.93) translateY(18px); }
[data-r="f"]{ transform:none; }
[data-r].vis{ opacity:1; transform:none; }

.s{
  position:relative;
  z-index:1;
  width:100%;
  padding:60px 48px;
  display:flex;
  justify-content:center;
}
@media(max-width:680px){.s{padding:40px 20px}}
.si{
  width:100%;
  max-width:1100px;
}

.lbl{
  display:inline-flex;
  align-items:center;
  gap:12px;
  margin-bottom:16px;
}
.lbl-line{
  width:28px; height:1px;
  background:var(--blue);
  flex-shrink:0;
}
.lbl-t{
  font-size:10px;
  font-weight:600;
  letter-spacing:.35em;
  text-transform:uppercase;
  color:var(--blue);
}

.h1{
  font-family:'Playfair Display',serif;
  font-size:clamp(40px,6vw,76px);
  font-weight:700;
  line-height:1.06;
  letter-spacing:-.02em;
  color:var(--ink);
}
.h1 em{
  font-style:italic;
  color:var(--blue);
}
.h1 .out{
  font-style:italic;
  -webkit-text-stroke:1px rgba(0,85,255,.35);
  color:transparent;
  -webkit-text-fill-color:transparent;
}

.stats{
  background:var(--card);
  border-top:1px solid var(--line2);
  border-bottom:1px solid var(--line2);
  padding:0;
  display:flex;
  justify-content:center;
}
.stats-i{
  width:100%;
  max-width:1100px;
  display:grid;
  grid-template-columns:repeat(4,1fr);
}
@media(max-width:600px){
  .stats-i{grid-template-columns:repeat(2,1fr)}
  .stc:nth-child(2){border-right:none!important}
  .stc:nth-child(1),.stc:nth-child(2){border-bottom:1px solid var(--line2)}
  .stc:nth-child(3){border-right:1px solid var(--line2)!important}
}
.stc{
  padding:32px 20px;
  text-align:center;
  border-right:1px solid var(--line2);
  transition:background .3s;
  cursor:default;
}
.stc:last-child{border-right:none}
.stc:hover{background:rgba(0,85,255,.03)}
.stc-n{
  display:block;
  font-family:'Playfair Display',serif;
  font-size:clamp(38px,5vw,58px);
  font-weight:700;
  color:var(--blue);
  line-height:1;
  margin-bottom:8px;
}
.stc-l{
  font-size:10px;
  font-weight:600;
  letter-spacing:.25em;
  text-transform:uppercase;
  color:var(--text2);
}

.about-bg{ background:var(--light) }
.about-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:40px;
  align-items:start;
  margin-top:36px;
}
@media(max-width:900px){
  .about-grid{grid-template-columns:1fr;gap:48px}
}

.av-box{
  position:relative;
  border-radius:4px;
  overflow:hidden;
  border:1px solid var(--line);
  background:var(--card);
  display:inline-block;
  width:100%;
  max-width:380px;
}
.av-box-inner{
  position:relative;
  aspect-ratio:3/4;
}
.av-img{
  display:block;
  width:100%;
  height:100%;
  object-fit:cover;
  position:absolute;
  inset:0;
}
.av-avail{
  position:absolute;
  bottom:14px;
  left:50%;
  transform:translateX(-50%);
  white-space:nowrap;
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:5px 12px;
  border-radius:100px;
  border:1px solid rgba(255,255,255,.25);
  background:rgba(0,0,0,.55);
  backdrop-filter:blur(6px);
  font-size:10px;
  font-weight:600;
  letter-spacing:.2em;
  text-transform:uppercase;
  color:#fff;
}
.av-dot{
  width:5px;height:5px;
  border-radius:50%;
  background:var(--blue);
  animation:blink 2s ease-in-out infinite;
}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.av-corner{
  position:absolute;
  width:18px;height:18px;
  border-color:var(--blue);
  border-style:solid;
  opacity:.25;
}
.av-corner.tl{top:12px;left:12px;border-width:1px 0 0 1px}
.av-corner.tr{top:12px;right:12px;border-width:1px 1px 0 0}
.av-corner.bl{bottom:12px;left:12px;border-width:0 0 1px 1px}
.av-corner.br{bottom:12px;right:12px;border-width:0 1px 1px 0}

.about-body p{
  font-size:15.5px;
  line-height:1.9;
  color:var(--text2);
  font-weight:300;
}
.about-body p+p{margin-top:18px}
.about-body b{font-weight:500;color:var(--ink)}

.skills{margin-top:28px}
.sk-row{margin-bottom:18px}
.sk-head{
  display:flex;
  justify-content:space-between;
  margin-bottom:7px;
  font-size:11.5px;
  font-weight:500;
  letter-spacing:.06em;
  color:var(--text)}
.sk-track{
  width:100%;
  height:2px;
  background:var(--line2);
  border-radius:2px;
  overflow:hidden;
}
.sk-fill{
  height:100%;
  background:linear-gradient(90deg,var(--blue),var(--bluel));
  border-radius:2px;
  transform:scaleX(0);
  transform-origin:left;
  transition:transform 1.1s cubic-bezier(.16,1,.3,1);
}
.sk-fill.run{transform:scaleX(1)}

.exp-bg{
  background:var(--light);
}
.exp-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:36px;
  width:100%;
}
@media(max-width:900px){
  .exp-grid{grid-template-columns:1fr}
}
.exp-item{
  position:relative;
  background:var(--card);
  border:1px solid var(--line2);
  border-radius:8px;
  overflow:hidden;
  transition:border-color .3s, box-shadow .35s, transform .35s;
  cursor:default;
}
.exp-item:hover{
  border-color:rgba(0,85,255,.2);
  box-shadow:0 8px 32px rgba(0,0,0,.06);
  transform:translateY(-4px);
}
.exp-item::before{
  content:'';
  position:absolute;
  top:0;
  left:0;
  right:0;
  height:3px;
  background:linear-gradient(90deg,var(--blue),var(--bluel));
  opacity:0;
  transition:opacity .35s;
}
.exp-item:hover::before{opacity:1}
.exp-top{
  padding:20px 24px 0;
}
.exp-badge{
  display:inline-block;
  padding:4px 12px;
  border-radius:4px;
  font-size:10.5px;
  font-weight:600;
  letter-spacing:.04em;
  color:var(--blue);
  background:rgba(0,85,255,.07);
}
.exp-body{
  padding:16px 24px 24px;
}
.exp-role{
  font-size:16px;
  font-weight:700;
  color:var(--ink);
  letter-spacing:-.01em;
  margin-bottom:4px;
}
.exp-co{
  font-size:13px;
  font-weight:400;
  color:var(--text2);
  margin-bottom:14px;
  display:flex;
  align-items:center;
  gap:6px;
}
.exp-co::before{
  content:'';
  display:inline-block;
  width:4px;
  height:4px;
  border-radius:50%;
  background:var(--blue);
  flex-shrink:0;
}
.exp-desc{
  font-size:13px;
  line-height:1.75;
  color:var(--text3);
  font-weight:300;
  margin-bottom:16px;
}
.exp-tags{
  display:flex;
  flex-wrap:wrap;
  gap:6px;
}
.exp-tag{
  padding:3px 10px;
  font-size:10.5px;
  font-weight:500;
  color:var(--text2);
  border:1px solid var(--line2);
  border-radius:4px;
  transition:all .2s;
}
.exp-tag:hover{
  color:var(--blue);
  border-color:var(--line);
  background:rgba(0,85,255,.04);
}

.svc-bg{
  background:var(--card);
  border-top:1px solid var(--line2);
  border-bottom:1px solid var(--line2);
}
.sh{margin-bottom:40px}
.svc-list{width:100%}
.svc-item{
  display:grid;
  grid-template-columns:60px 1fr 1fr auto;
  gap:32px;
  align-items:center;
  padding:32px 0;
  border-bottom:1px solid var(--line2);
  transition:background .3s;
  cursor:default;
  border-radius:0;
  position:relative;
}
@media(max-width:800px){
  .svc-item{
    grid-template-columns:40px 1fr;
    grid-template-rows:auto auto auto;
    gap:12px 16px;
  }
  .svc-desc{grid-column:2!important}
  .svc-tags{grid-column:2!important}
  .svc-arrow{display:none!important}
}
.svc-item:first-child{border-top:1px solid var(--line2)}
.svc-item::before{
  content:'';
  position:absolute;
  left:0;right:0;top:0;bottom:0;
  background:rgba(0,85,255,.02);
  opacity:0;
  transition:opacity .3s;
}
.svc-item:hover::before{opacity:1}
.svc-num{
  font-family:'Playfair Display',serif;
  font-size:13px;
  font-style:italic;
  color:var(--text3);
  letter-spacing:.03em;
}
.svc-name{
  font-family:'Playfair Display',serif;
  font-size:22px;
  font-weight:700;
  color:var(--ink);
  letter-spacing:-.01em;
}
.svc-desc{
  font-size:13px;
  line-height:1.75;
  color:var(--text2);
  font-weight:300;
  max-width:320px;
}
.svc-tags{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end}
.sv-tag{
  padding:4px 12px;
  font-size:10.5px;
  font-weight:500;
  letter-spacing:.05em;
  color:var(--text2);
  border:1px solid var(--line2);
  border-radius:3px;
}
.svc-arrow{
  font-size:18px;
  color:var(--blue);
  opacity:.3;
  transition:opacity .3s,transform .3s;
}
.svc-item:hover .svc-arrow{opacity:.7;transform:translateX(6px)}

.tech-bg{ background:var(--light) }
.tech-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1px;
  background:var(--line2);
  border:1px solid var(--line2);
  border-radius:4px;
  overflow:hidden;
  width:100%;
}
@media(max-width:720px){.tech-grid{grid-template-columns:1fr}}
.tc{
  padding:40px 36px;
  background:var(--light);
  transition:background .3s;
  cursor:default;
}
.tc:hover{background:rgba(0,85,255,.02)}
.tc-cat{
  font-size:10px;
  font-weight:600;
  letter-spacing:.3em;
  text-transform:uppercase;
  color:var(--blue);
  margin-bottom:24px;
  display:flex;
  align-items:center;
  gap:10px;
}
.tc-cat::after{
  content:'';
  flex:1;
  height:1px;
  background:var(--line);
}
.tc-tags{display:flex;flex-wrap:wrap;gap:8px}
.ttg{
  padding:6px 14px;
  font-size:12px;
  font-weight:400;
  color:var(--text2);
  border:1px solid var(--line2);
  border-radius:3px;
  background:var(--card);
  transition:all .2s;
  cursor:default;
  letter-spacing:.02em;
}
.ttg:hover{
  color:var(--blue);
  border-color:var(--line);
  background:rgba(0,85,255,.04);
}

.cta-bg{
  background:var(--card);
  border-top:1px solid var(--line2);
  overflow:hidden;
  position:relative;
}
.cta-bg::after{
  content:'';
  position:absolute;
  bottom:-200px;left:50%;
  transform:translateX(-50%);
  width:800px;height:500px;
  background:radial-gradient(ellipse,rgba(0,85,255,.04) 0%,transparent 68%);
  border-radius:50%;
  pointer-events:none;
}
.cta-inner{max-width:720px;margin:0 auto;text-align:center}
.cta-h{
  font-family:'Playfair Display',serif;
  font-size:clamp(38px,6vw,72px);
  font-weight:700;
  line-height:1.08;
  letter-spacing:-.02em;
  color:var(--ink);
  margin-bottom:20px;
}
.cta-h em{
  font-style:italic;
  color:var(--blue);
}
.cta-p{
  font-size:15.5px;
  line-height:1.82;
  color:var(--text2);
  font-weight:300;
  max-width:500px;
  margin:0 auto 44px;
}
.cta-row{display:flex;gap:12px;flex-wrap:wrap;justify-content:center}
.bp{
  display:inline-flex;align-items:center;gap:10px;
  padding:15px 36px;
  border-radius:4px;
  background:var(--blue);
  color:#fff;
  font-size:12px;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;
  border:none;cursor:pointer;
  transition:background .22s,transform .22s,box-shadow .22s;
}
.bp:hover{background:var(--bluel);transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,85,255,.25)}
.ba{display:inline-block;transition:transform .22s}
.bp:hover .ba{transform:translateX(4px)}
.bs{
  display:inline-flex;align-items:center;
  padding:15px 36px;
  border-radius:4px;
  border:1px solid var(--line);
  color:var(--text2);
  font-size:12px;font-weight:600;
  letter-spacing:.12em;text-transform:uppercase;
  background:transparent;text-decoration:none;
  transition:border-color .22s,color .22s,background .22s;
}
.bs:hover{border-color:rgba(0,85,255,.4);color:var(--blue);background:rgba(0,85,255,.04)}
`;

/* ══════════════════════════════════════════
   SKILL BARS with intersection trigger
══════════════════════════════════════════ */
function SkillBars({ skills }) {
  const ref = useRef(null);
  const [fired, setFired] = useState(false);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setFired(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="skills">
      {skills.map((sk, i) => (
        <div key={i} className="sk-row" data-r data-d={i * 80}>
          <div className="sk-head">
            <span>{sk.name}</span>
            <span>{sk.pct}%</span>
          </div>
          <div className="sk-track">
            <div
              className="sk-fill"
              style={{
                width: `${sk.pct}%`,
                transitionDelay: `${i * 100}ms`,
                ...(fired ? { transform: "scaleX(1)" } : {}),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function AboutSections() {
  useReveal();

  const stats = [
    { num: "2+", lbl: "Years of Experience" },
    { num: "20+", lbl: "Projects Delivered" },
    { num: "100%", lbl: "Client Satisfaction" },
    { num: "10+", lbl: "Technologies" },
  ];

  const skillsData = [
    { name: "HTML / CSS", pct: 95 },
    { name: "JavaScript / React JS", pct: 90 },
    { name: "Tailwind CSS / Bootstrap", pct: 88 },
    { name: "Git / GitHub / Figma", pct: 82 },
    { name: "PHP / MySQL", pct: 75 },
  ];

  const experience = [
    {
      yr: "2022&ndash;Now",
      role: "Senior Frontend Engineer",
      co: "Freelance & Remote Clients",
      desc: "Building high-performance web applications for global clients. Leading frontend architecture, design systems, and delivering pixel-perfect responsive interfaces.",
      tags: ["React", "JavaScript", "Tailwind CSS", "Git"],
    },
    {
      yr: "2019&ndash;22",
      role: "Lead UI Developer",
      co: "Digital Product Studio",
      desc: "Led a team of 5 developers building SaaS platforms. Established component libraries, code review workflows, and mentored junior developers.",
      tags: ["CSS", "Bootstrap", "GitHub", "Figma"],
    },
    {
      yr: "2016&ndash;19",
      role: "Frontend Developer",
      co: "Web Agency, Lahore",
      desc: "Developed 30+ client websites and web apps. Specialised in responsive design, animation, and bridging the gap between design and development.",
      tags: ["HTML", "CSS", "JavaScript", "PHP"],
    },
  ];

  const services = [
    {
      n: "01",
      name: "Web Development",
      desc: "Full-stack web apps with React, PHP and MySQL &mdash; responsive, fast, production-ready.",
      tags: ["HTML", "CSS", "JavaScript", "React JS", "PHP"],
    },
    {
      n: "02",
      name: "UI / UX Design",
      desc: "Research-backed interface design using Figma, Bootstrap and Tailwind CSS for pixel-perfect delivery.",
      tags: ["Figma", "Bootstrap", "Tailwind CSS"],
    },
    {
      n: "03",
      name: "Frontend Architecture",
      desc: "Scalable component libraries, code conventions and version control workflows teams can maintain.",
      tags: ["React JS", "JavaScript", "Git", "GitHub"],
    },
    {
      n: "04",
      name: "Backend & Database",
      desc: "Server-side development with PHP and MySQL &mdash; REST APIs, database design and deployment.",
      tags: ["PHP", "MySQL", "Git", "GitHub"],
    },
  ];

  const stack = [
    {
      cat: "Frontend",
      techs: [
        "HTML",
        "CSS",
        "JavaScript",
        "React JS",
        "Bootstrap",
        "Tailwind CSS",
      ],
    },
    {
      cat: "Tools",
      techs: ["Git", "GitHub", "Figma"],
    },
    {
      cat: "Backend",
      techs: ["PHP", "MySQL"],
    },
  ];

  return (
    <>
      <style>{G}</style>
      <div className="wr">
        <div className="stats">
          <div className="stats-i">
            {stats.map((s, i) => (
              <StatCell key={i} num={s.num} lbl={s.lbl} delay={i * 90} />
            ))}
          </div>
        </div>

        <section className="s about-bg">
          <div className="si">
            <div data-r>
              <div className="lbl">
                <div className="lbl-line" />
                <span className="lbl-t">About Me</span>
              </div>
            </div>
            <div data-r data-d="60">
              <h2 className="h1">
                A developer who <em>designs.</em>
                <br />A designer who <span className="out">codes.</span>
              </h2>
            </div>

            <div className="about-grid">
              <div data-r="l" data-d="100">
                <div className="av-box">
                  <div className="av-corner tl" />
                  <div className="av-corner tr" />
                  <div className="av-corner bl" />
                  <div className="av-corner br" />
                  <div className="av-box-inner">
                    <img
                      src="/profile.png"
                      alt="Abdur Rahman"
                      className="av-img"
                    />
                    <div className="av-avail">
                      <span className="av-dot" />
                      Available for work
                    </div>
                  </div>
                </div>
              </div>

              <div data-r="r" data-d="140">
                <div className="about-body">
                  <p>
                    I'm a <b>senior frontend developer and UI designer</b> with
                    2 years of experience building digital products people
                    actually enjoy using. I sit at the intersection of
                    engineering and design &mdash; which means I can take a
                    vague brief, shape it into a visual direction, and ship it
                    as production-ready code.
                  </p>
                  <p>
                    My work spans{" "}
                    <b>
                      Admin dashboards, marketing sites, design systems, and
                      interactive 3D experiences
                    </b>
                    . I care deeply about the details &mdash;
                    micro-interactions, loading states, colour contrast, scroll
                    behaviour &mdash; because that's where good products become
                    great ones.
                  </p>
                </div>

                <SkillBars skills={skillsData} />
              </div>
            </div>
          </div>
        </section>

        <section className="s exp-bg">
          <div className="si">
            <div data-r>
              <div className="lbl">
                <div className="lbl-line" />
                <span className="lbl-t">Experience</span>
              </div>
            </div>
            <div data-r data-d="60">
              <h2 className="h1">
                Where I've <em>worked</em>
              </h2>
            </div>
            <div className="exp-grid" data-r data-d="120">
              {experience.map((x, i) => (
                <div key={i} className="exp-item">
                  <div className="exp-top">
                    <div className="exp-badge">{x.yr}</div>
                  </div>
                  <div className="exp-body">
                    <h3 className="exp-role">{x.role}</h3>
                    <div className="exp-co">{x.co}</div>
                    <p className="exp-desc">{x.desc}</p>
                    <div className="exp-tags">
                      {x.tags.map((t, j) => (
                        <span key={j} className="exp-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s svc-bg">
          <div className="si">
            <div className="sh">
              <div data-r>
                <div className="lbl">
                  <div className="lbl-line" />
                  <span className="lbl-t">Services</span>
                </div>
              </div>
              <div data-r data-d="60">
                <h2 className="h1">
                  What I <em>bring</em> to the table
                </h2>
              </div>
            </div>
            <div className="svc-list">
              {services.map((sv, i) => (
                <div key={i} className="svc-item" data-r data-d={i * 80}>
                  <span className="svc-num">{sv.n}</span>
                  <span className="svc-name">{sv.name}</span>
                  <span className="svc-desc">{sv.desc}</span>
                  <div className="svc-tags">
                    {sv.tags.map((t, j) => (
                      <span key={j} className="sv-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="svc-arrow">&rarr;</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s tech-bg">
          <div className="si">
            <div style={{ marginBottom: "36px" }}>
              <div data-r>
                <div className="lbl">
                  <div className="lbl-line" />
                  <span className="lbl-t">Tech Stack</span>
                </div>
              </div>
              <div data-r data-d="60">
                <h2 className="h1">
                  Technologies I <em>master</em>
                </h2>
              </div>
            </div>
            <div className="tech-grid">
              {stack.map((g, i) => (
                <div key={i} className="tc" data-r data-d={i * 100}>
                  <div className="tc-cat">{g.cat}</div>
                  <div className="tc-tags">
                    {g.techs.map((t, j) => (
                      <span key={j} className="ttg">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="s cta-bg">
          <div className="si">
            <div className="cta-inner">
              <div data-r>
                <div className="lbl" style={{ justifyContent: "center" }}>
                  <div className="lbl-line" />
                  <span className="lbl-t">Let's Work Together</span>
                  <div className="lbl-line" />
                </div>
              </div>
              <div data-r data-d="80">
                <h2 className="cta-h">
                  Have a project <br />
                  in <em>mind?</em>
                </h2>
              </div>
              <p className="cta-p" data-r data-d="140">
                I take on a limited number of projects each quarter to ensure
                every client gets my full attention. If you have something worth
                building, let's talk about it.
              </p>
              <div className="cta-row" data-r data-d="200">
                <button className="bp">
                  Start a conversation <span className="ba">&rarr;</span>
                </button>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bs"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
