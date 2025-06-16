import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaCode,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";
import { useState } from "react";

export default function HeroSection() {
  const [clickedProject, setClickedProject] = useState(false);
  const [clickedContact, setClickedContact] = useState(false);

  const handleProjectClick = () => {
    setClickedProject(true);
    setTimeout(() => setClickedProject(false), 1000);
  };

  const handleContactClick = () => {
    setClickedContact(true);
    setTimeout(() => setClickedContact(false), 1000);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-10 text-[#f5f5dc] space-y-8">
      {/* Título principal */}
      <h1 className="text-4xl sm:text-7xl font-extrabold text-left text-shadow-amber-200 ">
        <span className="text-white">Frontend & Backend </span>
        <span className="text-[#499AA1] block">Developer</span>
      </h1>

      {/* Subtítulo */}
      <h2 className="text-4xl text-gray-300 text-left">
        Network & CSE Student
      </h2>

      {/* Descripción */}
      <p className="text-2xl text-gray-400 max-w-xl text-left">
        Website Builder Focused on Innovation, Functionality and
        User-Experience.
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-4">
        {["React", "JavaScript", "Node.js", "Tailwind"].map((tech) => (
          <span
            key={tech}
            // className="px-6 py-1.5 bg-white/10 text-white border border-white/20 backdrop-blur-sm rounded-full text-base sm:text-lg font-medium hover:bg-white/20 hover:scale-105 hover:shadow-md transition-all duration-300"
            className="px-6 py-1.5 bg-white/10 text-white text-base sm:text-lg font-medium rounded-full border border-white/20 backdrop-blur-sm hover:scale-110 hover:bg-white/20 hover:brightness-110 hover:shadow-xl hover:animate-pulse transition-all duration-500"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Botones de acción */}
      <div className="flex gap-4 flex-wrap text-2xl">
        {/* Contact Me Button */}
        <button
          onClick={handleContactClick}
          className={`px-6 py-2 border border-white/20 text-white font-semibold rounded-lg relative overflow-hidden z-10 group bg-white/10 backdrop-blur-sm hover:scale-110 transition-all duration-300 ${
            clickedContact ? "shadow-inset-center" : ""
          }`}
        >
          <span className="absolute inset-0 bg-[#499AA1] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0 rounded-lg"></span>
          <span className="relative z-10 group-hover:text-[#f1f4f9] transition-colors duration-300 flex items-center gap-2">
            Contact Me
            <span className="text-3xl ml-2">
              <MdOutlineEmail />
            </span>
          </span>
        </button>

        {/* Projects Button */}
        <button
          onClick={handleProjectClick}
          className={`px-6 py-2 bg-white/10 text-white font-semibold rounded-lg border border-white/20 backdrop-blur-sm hover:scale-110 hover:bg-white/20 hover:brightness-110 hover:shadow-xl hover:animate-pulse transition-all duration-500 flex items-center gap-2 ${
            clickedProject ? "shadow-inset-center" : ""
          }`}
        >
          Projects
          <IoCodeSlash className="text-3xl ml-2" />
        </button>
      </div>

      {/* Íconos sociales */}
      <div className="flex gap-8 text-4xl mt-6=4">
        <a
          href="#"
          className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-purple-400 hover:scale-110 hover:shadow-md transition-all duration-300"
        >
          <FaGithub />
        </a>
        <a
          href="#"
          className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-purple-400 hover:scale-110 hover:shadow-md transition-all duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="#"
          className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-purple-400 hover:scale-110 hover:shadow-md transition-all duration-300"
        >
          <FaInstagram />
        </a>
      </div>
    </section>
  );
}
