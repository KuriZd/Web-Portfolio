import { useEffect, useRef, useState } from "react";
import "./App.css";
import { FaCode, FaUser, FaGithub } from "react-icons/fa";
import HeroSection from "./Components/HeroSection";
import Technologies from "./Components/Technologies";
import ProjectsSection from "./Components/ProjectsSection";
import Dock from "./Components/Dock";
import ShaderBackground from "./assets/ShaderBackground";

function App() {
  const introRef = useRef(null);
  const [introAriaHidden, setIntroAriaHidden] = useState(false);

  useEffect(() => {
    const hideTimeout = setTimeout(() => {
      if (introRef.current) {
        introRef.current.classList.add("hide");
      }
      setTimeout(() => setIntroAriaHidden(true), 800);
    }, 2500);

    return () => clearTimeout(hideTimeout);
  }, []);

  return (
    <>
      {/* Intro screen */}
      <div
        className="intro-screen"
        ref={introRef}
        aria-hidden={introAriaHidden}
        role="presentation"
      >
        <div className="intro-icons">
          <FaCode className="icon" aria-hidden="true" />
          <FaUser className="icon" aria-hidden="true" />
          <FaGithub className="icon" aria-hidden="true" />
        </div>

        <div className="intro-text">
          <p className="animated-title intro-welcome">
            {"Welcome to".split("").map((letter, i) => (
              <span
                key={`w-${i}`}
                className="title-letter"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </p>

          <h1 className="gradient-text animated-title">
            {"My Portfolio".split("").map((letter, i) => (
              <span
                key={`p-${i}`}
                className="title-letter"
                style={{ animationDelay: `${i * 0.05 + 0.6}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>

        <div className="intro-footer">
          <span className="signature">&lt;KuriZd /&gt;</span>
        </div>
      </div>

      <Dock />

      {/* Main content */}
      <main id="main-content" className="pt-20">
        <ShaderBackground />

        <section id="home">
          <HeroSection />
        </section>

        <section id="about">
          <Technologies />
        </section>

        <ProjectsSection />

        <section id="contact" className="min-h-screen px-10 py-20">
          <h2 className="text-3xl text-white font-bold">Contact</h2>
        </section>
      </main>
    </>
  );
}

export default App;
