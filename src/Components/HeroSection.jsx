import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";
import { createElement } from "react";

const socialLinks = [
  { href: "https://github.com/KuriZd", label: "GitHub profile",   icon: FaGithub   },
  { href: "#",                          label: "LinkedIn profile", icon: FaLinkedin },
  { href: "#",                          label: "Instagram profile",icon: FaInstagram},
];

const socialBase =
  "p-3 rounded-2xl bg-slate-800/50 backdrop-blur-md border border-slate-600/30 text-slate-300 hover:text-cyan-400 hover:bg-slate-700/60 hover:border-cyan-400/30 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 focus:ring-offset-transparent cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center";

export default function HeroSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-10 text-slate-100 space-y-8">
      {/* Main title */}
      <h1 className="text-4xl sm:text-7xl font-extrabold text-left">
        <span className="text-white">Frontend & Backend </span>
        <span className="text-cyan-400 block">Developer</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-slate-400 font-medium text-left">
        Network & CSE Student
      </p>

      {/* Description */}
      <p className="text-lg sm:text-xl text-slate-300 max-w-xl text-left leading-relaxed">
        Website Builder Focused on Innovation, Functionality and
        User-Experience.
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-3">
        {["React", "JavaScript", "Node.js", "Tailwind"].map((tech) => (
          <span
            key={tech}
            className="px-5 py-1.5 bg-slate-800/50 text-slate-200 text-sm sm:text-base font-medium rounded-full border border-slate-600/40 backdrop-blur-sm hover:bg-slate-700/60 hover:border-cyan-400/30 hover:text-cyan-300 transition-all duration-200"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 flex-wrap">
        {/* Primary */}
        <button
          onClick={() => scrollTo("contact")}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-400 text-white hover:text-slate-950 font-semibold rounded-lg shadow-lg shadow-cyan-900/40 hover:shadow-cyan-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer min-h-[44px]"
        >
          Contact Me
          <MdOutlineEmail className="text-xl" aria-hidden="true" />
        </button>

        {/* Secondary */}
        <button
          onClick={() => scrollTo("portfolio")}
          className="flex items-center gap-2 px-6 py-3 bg-transparent text-slate-200 font-semibold rounded-lg border border-slate-500/50 backdrop-blur-sm hover:bg-slate-800/50 hover:border-slate-400/60 hover:text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer min-h-[44px]"
        >
          Projects
          <IoCodeSlash className="text-xl" aria-hidden="true" />
        </button>
      </div>

      {/* Social links */}
      <div className="flex gap-4 mt-4">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={label}
            className={socialBase}
          >
            {createElement(Icon, {
              className: "text-2xl",
              "aria-hidden": "true",
            })}
          </a>
        ))}
      </div>
    </section>
  );
}
