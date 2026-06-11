import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const S = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --blue:#0055FF;
  --blue-mid:#2e6fff;
  --blue-light:#e8eeff;
  --blue-soft:rgba(0,85,255,.1);
  --blue-border:rgba(0,85,255,.18);
  --mid:#a8b0bd;
  --dark:#121212;
  --bg:#f4f6fb;
  --surface:#ffffff;
  --surface2:#f0f3fa;
  --border:#dde2ee;
  --border-hi:#c5cce0;
  --text:#121212;
  --text-sub:#4a5568;
  --muted:#7a8299;
  --mono:'JetBrains Mono',monospace;
  --display:'Syne',sans-serif;
  --body:'Inter',sans-serif;
}

.hero-bg{
  background:linear-gradient(160deg,#121212 0%,#1a2a5e 28%,#0055FF 58%,#a8b0bd 82%,#f4f6fb 100%);
  position:relative;overflow:hidden;
}
.hero-bg::after{
  content:'';position:absolute;inset:0;z-index:0;
  background:linear-gradient(to bottom,transparent 60%,var(--bg) 100%);
  pointer-events:none;
}
.hero-bg::before{
  content:'';position:absolute;inset:0;z-index:0;
  opacity:.03;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events:none;
}

.c-page{max-width:1100px;margin:0 auto;padding:60px 8px 0}

.c-nav{
  display:flex;align-items:center;justify-content:space-between;
  padding:26px 0;position:relative;z-index:2;
}
.c-logo{font-family:var(--mono);font-size:13px;color:#fff;display:flex;align-items:center;gap:9px;text-decoration:none}
.c-logo-dot{width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:0 0 12px rgba(255,255,255,.7)}
.c-status{
  display:flex;align-items:center;gap:8px;
  font-family:var(--mono);font-size:11px;color:#fff;
  background:rgba(255,255,255,.14);
  border:1px solid rgba(255,255,255,.28);
  padding:7px 16px;border-radius:100px;
  backdrop-filter:blur(8px);
}
.c-pulse{width:7px;height:7px;border-radius:50%;background:#4ade80;position:relative;flex-shrink:0}
.c-pulse::before{content:'';position:absolute;inset:-3px;border-radius:50%;background:#4ade80;animation:c-ping 1.6s ease-out infinite;opacity:.5}
@keyframes c-ping{0%{transform:scale(1);opacity:.5}100%{transform:scale(2.4);opacity:0}}

.c-hero{
  display:grid;grid-template-columns:1fr 1fr;
  gap:60px;align-items:center;
  padding:80px 0 80px;position:relative;z-index:1;
}
@media(max-width:720px){.c-hero{grid-template-columns:1fr;gap:40px;padding:60px 0 60px}.c-hero-right{display:none}}

.c-eyebrow{
  font-family:var(--mono);font-size:11px;color:rgba(255,255,255,.6);
  letter-spacing:.22em;text-transform:uppercase;
  display:flex;align-items:center;gap:10px;margin-bottom:18px;
}
.c-eyebrow::before{content:'';width:26px;height:1px;background:rgba(255,255,255,.4);display:block}

.c-hero-title{
  font-family:var(--display);
  font-size:clamp(40px,5.5vw,68px);
  font-weight:800;line-height:1.06;letter-spacing:-.025em;
  color:#fff;margin-bottom:18px;
}
.c-hero-title .acc{
  background:linear-gradient(90deg,#a8b0bd,#ffffff);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}

.c-hero-sub{font-size:15px;color:rgba(255,255,255,.65);line-height:1.75;max-width:400px;margin-bottom:32px}

.c-tags{display:flex;flex-wrap:wrap;gap:8px}
.c-tag{
  font-family:var(--mono);font-size:11px;padding:5px 13px;
  border-radius:6px;border:1px solid rgba(255,255,255,.2);
  color:rgba(255,255,255,.7);background:rgba(255,255,255,.08);
  letter-spacing:.02em;backdrop-filter:blur(4px);
}

.c-terminal{
  background:rgba(18,18,18,.75);
  border:1px solid rgba(255,255,255,.12);
  border-radius:16px;overflow:hidden;
  font-family:var(--mono);
  backdrop-filter:blur(20px);
  box-shadow:0 32px 64px rgba(0,0,0,.35);
}
.c-t-bar{
  background:rgba(255,255,255,.05);padding:13px 18px;
  display:flex;align-items:center;gap:7px;
  border-bottom:1px solid rgba(255,255,255,.08);
}
.c-tr{width:11px;height:11px;border-radius:50%;background:#ef4444}
.c-ty{width:11px;height:11px;border-radius:50%;background:#f59e0b}
.c-tg{width:11px;height:11px;border-radius:50%;background:#10b981}
.c-tf{margin-left:auto;font-size:11px;color:rgba(255,255,255,.3)}
.c-t-body{padding:24px;font-size:13px;line-height:2.1}
.c-dim{color:rgba(255,255,255,.25)}.c-key{color:#7dd3fc}.c-val{color:#86efac}.c-str{color:#fca5a5}.c-purple{color:#c4b5fd}
.c-cursor{display:inline-block;width:8px;height:15px;background:#818cf8;vertical-align:middle;animation:c-blink 1s step-end infinite}
@keyframes c-blink{0%,100%{opacity:1}50%{opacity:0}}

.c-main-wrap{background:var(--bg);position:relative;z-index:1}
.sec-hd{display:flex;align-items:center;gap:14px;margin-bottom:24px}
.sec-hd h2{font-family:var(--display);font-size:19px;font-weight:700;color:var(--text);white-space:nowrap}
.sec-hd::after{content:'';flex:1;height:1px;background:var(--border)}

.c-main-grid{display:grid;grid-template-columns:3fr 2fr;gap:28px;padding:20px 0 80px}
@media(max-width:720px){.c-main-grid{grid-template-columns:1fr}}

.c-card{
  background:var(--surface);
  border:1px solid var(--border);
  border-radius:20px;padding:36px;
  box-shadow:0 4px 24px rgba(0,85,255,.06);
}
.c-form-row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:540px){.c-form-row{grid-template-columns:1fr}}
.c-field{margin-bottom:16px}
.c-field label{
  display:block;font-family:var(--mono);font-size:10px;
  color:var(--muted);text-transform:uppercase;letter-spacing:.14em;margin-bottom:7px;
}
.c-field input,.c-field textarea{
  width:100%;background:var(--surface2);
  border:1.5px solid var(--border);
  border-radius:10px;padding:12px 16px;
  color:var(--text);font-family:var(--body);font-size:14px;
  outline:none;resize:none;
  transition:border-color .2s,box-shadow .2s,background .2s;
}
.c-field input:focus,.c-field textarea:focus{
  border-color:var(--blue);
  background:#fff;
  box-shadow:0 0 0 3px rgba(0,85,255,.1);
}
.c-field textarea{min-height:122px;line-height:1.65}
.c-field ::placeholder{color:var(--border-hi)}

.c-send-btn{
  width:100%;padding:14px 24px;
  background:var(--blue);color:#fff;
  font-family:var(--body);font-weight:600;font-size:14px;
  border:none;border-radius:10px;
  display:flex;align-items:center;justify-content:center;gap:10px;
  transition:background .2s,transform .15s,box-shadow .2s;
  letter-spacing:.01em;position:relative;overflow:hidden;cursor:pointer;
}
.c-send-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 60%,rgba(255,255,255,.1))}
.c-send-btn:hover{background:var(--blue-mid);box-shadow:0 8px 28px rgba(0,85,255,.35);transform:translateY(-2px)}
.c-send-btn:active{transform:translateY(0);box-shadow:none}
.c-send-btn:disabled{opacity:.6;pointer-events:none}

.c-right-col{display:flex;flex-direction:column;gap:18px}

.c-info-card{
  background:var(--surface);border:1.5px solid var(--border);
  border-radius:13px;padding:16px 18px;
  display:flex;align-items:center;gap:15px;
  text-decoration:none;
  transition:border-color .22s,box-shadow .22s,transform .22s;
  cursor:pointer;
}
.c-info-card:hover{border-color:var(--blue);box-shadow:0 4px 20px rgba(0,85,255,.1);transform:translateX(4px)}
.c-ic-icon{
  width:40px;height:40px;flex-shrink:0;border-radius:10px;
  background:var(--blue-soft);border:1px solid var(--blue-border);
  display:flex;align-items:center;justify-content:center;color:var(--blue);
}
.c-ic-text p:first-child{font-family:var(--mono);font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.12em;margin-bottom:2px}
.c-ic-text p:last-child{font-size:13px;color:var(--text);font-weight:500}
.c-ic-arrow{margin-left:auto;color:var(--mid);font-size:15px;transition:color .2s,transform .2s}
.c-info-card:hover .c-ic-arrow{color:var(--blue);transform:translate(2px,-2px)}

.c-avail{
  display:flex;align-items:center;gap:10px;
  padding:14px 18px;border-radius:12px;
  background:rgba(16,185,129,.07);border:1px solid rgba(16,185,129,.22);
  font-family:var(--mono);font-size:12px;color:#059669;
}

.c-social-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:11px}
.c-s-btn{
  display:flex;flex-direction:column;align-items:center;gap:8px;
  padding:16px 6px;border-radius:12px;
  border:1.5px solid var(--border);background:var(--surface);
  text-decoration:none;cursor:pointer;
  transition:border-color .22s,box-shadow .22s,transform .2s,background .22s;
}
.c-s-btn:hover{transform:translateY(-4px)}
.c-s-btn.gh:hover{border-color:#24292f;box-shadow:0 6px 20px rgba(36,41,47,.12);background:#f6f8fa}
.c-s-btn.li:hover{border-color:#0a66c2;box-shadow:0 6px 20px rgba(10,102,194,.14);background:#e8f0fe}
.c-s-btn.ig:hover{border-color:#e1306c;box-shadow:0 6px 20px rgba(225,48,108,.14);background:#fff0f6}
.c-s-btn.fb:hover{border-color:#1877f2;box-shadow:0 6px 20px rgba(24,119,242,.14);background:#e8f0fe}
.c-s-btn svg{width:22px;height:22px}
.c-s-btn span{font-family:var(--mono);font-size:10px;color:var(--muted);transition:color .2s}
.c-s-btn:hover span{color:var(--text)}

.c-footer{
  border-top:1px solid var(--border);padding:28px 0;
  display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;
}
.c-footer p{font-family:var(--mono);font-size:11px;color:var(--muted)}

.c-toast{
  position:fixed;bottom:32px;left:50%;
  transform:translateX(-50%) translateY(16px);
  background:var(--surface);border:1.5px solid var(--blue-border);
  border-radius:12px;padding:14px 22px;
  display:flex;align-items:center;gap:10px;
  font-size:13px;font-weight:500;color:var(--text);
  box-shadow:0 16px 48px rgba(0,85,255,.12);
  z-index:1000;opacity:0;pointer-events:none;
  transition:opacity .35s,transform .35s;white-space:nowrap;
}
.c-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
.c-check{color:#059669;font-size:17px}
.c-spinner{width:15px;height:15px;border:2px solid rgba(0,85,255,.2);border-top-color:var(--blue);border-radius:50%;animation:c-spin .6s linear infinite;flex-shrink:0}
@keyframes c-spin{to{transform:rotate(360deg)}}
`;

const Contact = ({
  onNavigateToHome,
  onNavigateToPortfolio,
  onNavigateToAbout,
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const eyebrowRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const tagsRef = useRef(null);
  const termWrapRef = useRef(null);
  const formCardRef = useRef(null);
  const rightColRef = useRef(null);
  const toastRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(navRef.current, {
        opacity: 0,
        y: -22,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(eyebrowRef.current, {
        opacity: 0,
        x: -18,
        duration: 0.7,
        delay: 0.25,
        ease: "power3.out",
      });

      const tEl = heroTitleRef.current;
      if (tEl) {
        const wrapTextNodes = (el) => {
          Array.from(el.childNodes).forEach((child) => {
            if (child.nodeType === 3) {
              const text = child.textContent;
              if (text.trim()) {
                const span = document.createElement("span");
                span.style.display = "inline-block";
                span.textContent = text;
                span.className = "hc";
                child.replaceWith(span);
              }
            } else if (child.nodeType === 1) {
              if (child.tagName === "BR") {
                const wrapper = document.createElement("span");
                wrapper.style.display = "inline";
                wrapper.innerHTML = "<br>";
                wrapper.className = "hc";
                child.replaceWith(wrapper);
              } else {
                child.classList.add("hc");
                wrapTextNodes(child);
              }
            }
          });
        };
        wrapTextNodes(tEl);
        gsap.fromTo(
          ".hc",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            delay: 0.4,
            ease: "power3.out",
          },
        );
      }

      gsap.from(heroSubRef.current, {
        opacity: 0,
        y: 22,
        duration: 0.9,
        delay: 0.95,
        ease: "power3.out",
      });
      if (tagsRef.current) {
        gsap.from(tagsRef.current.children, {
          opacity: 0,
          y: 14,
          stagger: 0.09,
          duration: 0.6,
          delay: 1.15,
          ease: "power3.out",
        });
      }
      gsap.from(termWrapRef.current, {
        opacity: 0,
        x: 44,
        duration: 1.1,
        delay: 0.55,
        ease: "power3.out",
      });
      gsap.from(formCardRef.current, {
        opacity: 0,
        y: 38,
        duration: 0.9,
        ease: "power3.out",
      });

      if (rightColRef.current) {
        const els = rightColRef.current.querySelectorAll(
          ".c-info-card, .c-avail, .c-s-btn",
        );
        gsap.from(els, {
          opacity: 0,
          y: 26,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
        });
      }

      gsap.from(footerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  const handleSend = () => {
    const btn = document.getElementById("c-send-btn");
    const name = document.getElementById("c-f-name").value.trim();
    const email = document.getElementById("c-f-email").value.trim();
    const msg = document.getElementById("c-f-msg").value.trim();
    if (!name || !email || !msg) {
      gsap.to("#c-form-card", {
        x: -6,
        duration: 0.05,
        yoyo: true,
        repeat: 6,
        ease: "power1.inOut",
      });
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<div class="c-spinner"></div> Sending…';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
      ["c-f-name", "c-f-email", "c-f-subject", "c-f-msg"].forEach(
        (id) => (document.getElementById(id).value = ""),
      );
      const t = toastRef.current;
      if (t) {
        t.classList.add("show");
        setTimeout(() => t.classList.remove("show"), 3800);
      }
    }, 1600);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-x-hidden overflow-y-auto select-none"
      style={{ background: "#f4f6fb" }}
    >
      <style>{S}</style>

      <Header
        onHomeClick={onNavigateToHome}
        onPortfolioClick={onNavigateToPortfolio}
        onAboutClick={onNavigateToAbout}
        onContactClick={() => {}}
      />

      <div className="hero-bg">
        <div className="c-page">
          {/* <div ref={navRef} className="c-nav" style={{ borderBottom: "1px solid rgba(255,255,255,.08)" }}>
            <div className="c-logo">
              <span className="c-logo-dot"></span>
              <span>dev.portfolio</span>
            </div>
            <div className="c-status">
              <div className="c-pulse"></div>
              Open to opportunities
            </div>
          </div> */}

          <section className="c-hero">
            <div>
              {/* <div ref={eyebrowRef} className="c-eyebrow">
                Contact
              </div> */}
              <h1 ref={heroTitleRef} className="c-hero-title">
                Let's build
                <br />
                <span className="acc">something</span>
                <br />
                great.
              </h1>
              <p ref={heroSubRef} className="c-hero-sub">
                I'm a full-stack developer crafting clean, performant digital
                products. Have a project or just want to say hi? My inbox is
                always open.
              </p>
              <div ref={tagsRef} className="c-tags">
                <span className="c-tag">React / Next.js</span>
                <span className="c-tag">Node.js</span>
                <span className="c-tag">TypeScript</span>
                <span className="c-tag">UI / UX</span>
                <span className="c-tag">Open Source</span>
              </div>
            </div>
            <div ref={termWrapRef} className="c-hero-right">
              <div className="c-terminal">
                <div className="c-t-bar">
                  <div className="c-tr"></div>
                  <div className="c-ty"></div>
                  <div className="c-tg"></div>
                  <span className="c-tf">developer.json</span>
                </div>
                <div className="c-t-body">
                  <div>
                    <span className="c-dim">{`{`}</span>
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="c-key">"name"</span>
                    <span className="c-dim">:</span>{" "}
                    <span className="c-str">"Abdur Rahman"</span>
                    <span className="c-dim">,</span>
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="c-key">"role"</span>
                    <span className="c-dim">:</span>{" "}
                    <span className="c-str">"Full Stack Developer"</span>
                    <span className="c-dim">,</span>
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="c-key">"location"</span>
                    <span className="c-dim">:</span>{" "}
                    <span className="c-str">"Peshawar, PK"</span>
                    <span className="c-dim">,</span>
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="c-key">"exp"</span>
                    <span className="c-dim">:</span>{" "}
                    <span className="c-val">"2+ years"</span>
                    <span className="c-dim">,</span>
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="c-key">"stack"</span>
                    <span className="c-dim">: [</span>
                    <span className="c-str">"React"</span>
                    <span className="c-dim">,</span>
                    <span className="c-str">"Node"</span>
                    <span className="c-dim">,</span>
                    <span className="c-str">"TS"</span>
                    <span className="c-dim">],</span>
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="c-key">"status"</span>
                    <span className="c-dim">:</span>{" "}
                    <span className="c-purple">"available"</span>
                  </div>
                  <div>
                    <span className="c-dim">{`}`}</span>&nbsp;
                    <span className="c-cursor"></span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="c-main-wrap">
        <div className="c-page">
          <div className="c-main-grid">
            <div>
              <div className="sec-hd">
                <h2>Send a message</h2>
              </div>
              <div ref={formCardRef} id="c-form-card" className="c-card">
                <div className="c-form-row">
                  <div className="c-field">
                    <label>Name</label>
                    <input
                      type="text"
                      id="c-f-name"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="c-field">
                    <label>Email</label>
                    <input
                      type="email"
                      id="c-f-email"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="c-field">
                  <label>Subject</label>
                  <input
                    type="text"
                    id="c-f-subject"
                    placeholder="What's this about?"
                  />
                </div>
                <div className="c-field">
                  <label>Message</label>
                  <textarea
                    id="c-f-msg"
                    placeholder="Tell me about your project, idea, or just say hello…"
                  ></textarea>
                </div>
                <button
                  id="c-send-btn"
                  className="c-send-btn"
                  onClick={handleSend}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send Message
                </button>
              </div>
            </div>

            <div ref={rightColRef} className="c-right-col">
              <div>
                <div className="sec-hd">
                  <h2>Contact info</h2>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "11px",
                  }}
                >
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ali.matta4@gmail.com"
                    target="_blank"
                    className="c-info-card"
                  >
                    <div className="c-ic-icon">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="c-ic-text">
                      <p>Email</p>
                      <p>ali.matta4@gmail.com</p>
                    </div>
                    <div className="c-ic-arrow">↗</div>
                  </a>

                  <a
                    href="https://maps.google.com?q=Peshawar+Pakistan"
                    target="_blank"
                    className="c-info-card"
                  >
                    <div className="c-ic-icon">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div className="c-ic-text">
                      <p>Location</p>
                      <p>Peshawar, Pakistan</p>
                    </div>
                    <div className="c-ic-arrow">↗</div>
                  </a>

                  <div
                    className="c-info-card"
                    style={{ cursor: "default", pointerEvents: "none" }}
                  >
                    <div className="c-ic-icon">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div className="c-ic-text">
                      <p>Response time</p>
                      <p>Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="c-avail">
                <div className="c-pulse"></div>
                Available for freelance &amp; full-time roles
              </div>

              <div>
                <div className="sec-hd">
                  <h2>Find me online</h2>
                </div>
                <div className="c-social-grid">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    className="c-s-btn gh"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: "#24292f" }}
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/abdur-rahman-web/"
                    target="_blank"
                    className="c-s-btn li"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: "#0a66c2" }}
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href="https://www.instagram.com/abdur_rahman_5577/"
                    target="_blank"
                    className="c-s-btn ig"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <defs>
                        <linearGradient
                          id="c-ig"
                          x1="0%"
                          y1="100%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#f58529" />
                          <stop offset="50%" stopColor="#dd2a7b" />
                          <stop offset="100%" stopColor="#8134af" />
                        </linearGradient>
                      </defs>
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        stroke="url(#c-ig)"
                      />
                      <circle cx="12" cy="12" r="4" stroke="url(#c-ig)" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1"
                        fill="url(#c-ig)"
                        stroke="none"
                      />
                    </svg>
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://facebook.com/yourusername"
                    target="_blank"
                    className="c-s-btn fb"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ color: "#1877f2" }}
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <Footer
            onNavigateToPortfolio={onNavigateToPortfolio}
            onNavigateToAbout={onNavigateToAbout}
          />
        </div>
      </div>

      <div ref={toastRef} className="c-toast">
        <span className="c-check">✓</span>
        <span>Message sent! I'll get back to you within 24 hours.</span>
      </div>
    </div>
  );
};

export default Contact;
