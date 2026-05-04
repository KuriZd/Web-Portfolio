import { useEffect, useRef } from "react";
import "./App.css";
import { FaCode, FaUser, FaGithub } from "react-icons/fa";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import ProjectsSection from "./Components/ProjectsSection";
import ShaderBackground from "./assets/ShaderBackground";

function App() {
  const introRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (introRef.current) {
        introRef.current.classList.add("hide");
      }
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {/* Pantalla Intro */}
      <div className="intro-screen" ref={introRef}>
        {/* icons */}
        <div className="intro-icons">
          <FaCode className="icon" />
          <FaUser className="icon" />
          <FaGithub className="icon" />
        </div>

        {/* text */}
        <div className="intro-text">
          <h2 className="animated-title">
            {"Welcome to".split("").map((letter, i) => (
              <span
                key={`w-${i}`}
                className="title-letter"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h2>

          <h1 className="gradient-text animated-title">
            {"My Portfolio Website".split("").map((letter, i) => (
              <span
                key={`p-${i}`}
                className="title-letter"
                style={{ animationDelay: `${i * 0.06 + 0.6}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>

        {/* footer */}
        <div className="intro-footer">
          <span className="signature">&lt;KuriZd /&gt;</span>
        </div>
      </div>

      {/* Contenido principal */}
      <main>
        <ShaderBackground />
        <Navbar />
        <section id="home">
          <HeroSection />
        </section>

        <section id="about" className="min-h-screen px-10 py-20">
          <h2 className="text-3xl text-white font-bold">About Me</h2>
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
