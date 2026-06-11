import React from "react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "./Icons";

const S = `
.ftr{
  background:var(--clr-bg,#121212);
  border-top:1px solid rgba(255,255,255,.06);
  padding:48px 48px 32px;
  font-family:'Inter',sans-serif;
  color:var(--clr-text,rgba(255,255,255,.7));
}
@media(max-width:680px){.ftr{padding:36px 20px 24px}}
.ftr-inner{
  max-width:1100px;
  margin:0 auto;
  display:grid;
  grid-template-columns:2fr 1fr 1fr 1fr;
  gap:40px;
}
@media(max-width:800px){.ftr-inner{grid-template-columns:1fr 1fr;gap:32px}}
@media(max-width:500px){.ftr-inner{grid-template-columns:1fr;gap:28px}}
.ftr-brand{}
.ftr-logo{
  font-family:'Playfair Display',serif;
  font-size:22px;
  font-weight:700;
  color:#f5f5f7;
  letter-spacing:-.02em;
  margin-bottom:8px;
}
.ftr-logo em{font-style:italic;color:#0055FF}
.ftr-tag{
  font-size:12px;
  line-height:1.7;
  color:rgba(255,255,255,.45);
  max-width:260px;
  font-weight:300;
}
.ftr-head{
  font-size:10px;
  font-weight:600;
  letter-spacing:.2em;
  text-transform:uppercase;
  color:#0055FF;
  margin-bottom:16px;
}
.ftr-links{
  list-style:none;
  padding:0;
  margin:0;
  display:flex;
  flex-direction:column;
  gap:10px;
}
.ftr-links a{
  font-size:13px;
  color:rgba(255,255,255,.55);
  text-decoration:none;
  transition:color .2s;
  cursor:pointer;
}
.ftr-links a:hover{color:#0055FF}
.ftr-social{
  display:flex;
  gap:14px;
  margin-top:16px;
}
.ftr-social a{
  color:rgba(255,255,255,.4);
  transition:color .2s,transform .2s;
  display:flex;
}
.ftr-social a:hover{color:#0055FF;transform:translateY(-2px)}
.ftr-bot{
  max-width:1100px;
  margin:32px auto 0;
  padding-top:20px;
  border-top:1px solid rgba(255,255,255,.05);
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:11px;
  color:rgba(255,255,255,.3);
}
@media(max-width:500px){.ftr-bot{flex-direction:column;gap:8px;text-align:center}}
.ftr-top{
  width:36px;height:36px;
  border-radius:50%;
  border:1px solid rgba(255,255,255,.1);
  background:transparent;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  transition:all .25s;
  color:rgba(255,255,255,.4);
}
.ftr-top:hover{border-color:#0055FF;color:#0055FF;transform:translateY(-3px)}
`;

export default function Footer({ onNavigateToHome, onNavigateToPortfolio, onNavigateToAbout, onNavigateToContact }) {
  const scrollToTop = () => {
    const scroller = document.querySelector("[data-scroll-about], [data-scroll-portfolio]");
    if (scroller) scroller.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style>{S}</style>
      <footer className="ftr">
        <div className="ftr-inner">
          <div className="ftr-brand">
            <div className="ftr-logo">Abdur <em>Rahman</em></div>
            <p className="ftr-tag">Crafting performant, elegant digital experiences with modern web technologies.</p>
            <div className="ftr-social">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon className="w-4 h-4" /></a>
              <a href="https://www.linkedin.com/in/abdur-rahman-web/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/abdur_rahman_5577/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><InstagramIcon className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <div className="ftr-head">Navigation</div>
            <ul className="ftr-links">
              <li><a onClick={() => { if (onNavigateToPortfolio) onNavigateToPortfolio() }}>Portfolio</a></li>
              <li><a onClick={() => { if (onNavigateToAbout) onNavigateToAbout() }}>About</a></li>
              <li><a onClick={() => { if (onNavigateToContact) onNavigateToContact() }}>Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="ftr-head">Social</div>
            <ul className="ftr-links">
              <li><a href="https://www.linkedin.com/in/abdur-rahman-web/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/abdur_rahman_5577/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </div>

          <div>
            <div className="ftr-head">Contact</div>
            <ul className="ftr-links">
              <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=ali.matta4@gmail.com" target="_blank" rel="noopener noreferrer">Email Me</a></li>
              <li><a onClick={() => { if (onNavigateToContact) onNavigateToContact() }}>Get in Touch</a></li>
            </ul>
          </div>
        </div>

        <div className="ftr-bot">
          <span>&copy; {new Date().getFullYear()} Abdur Rahman. All rights reserved.</span>
          <button className="ftr-top" onClick={scrollToTop} aria-label="Back to top">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
}
