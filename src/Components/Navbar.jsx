import { useState, useEffect } from "react";

const links = [
  { href: "#home", label: "Home", id: "home" },
  { href: "#about", label: "About", id: "about" },
  { href: "#portfolio", label: "Portfolio", id: "portfolio" },
  { href: "#contact", label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observers = links.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const linkClass = (id) =>
    `relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 focus:ring-offset-transparent rounded px-1 py-0.5 ${
      activeSection === id
        ? "text-cyan-400"
        : "text-slate-300 hover:text-slate-100"
    }`;

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-cyan-400 focus:text-slate-950 focus:px-4 focus:py-2 focus:rounded focus:font-semibold"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        className="w-full fixed top-0 left-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-700/30 shadow-lg shadow-slate-950/20"
      >
        <div className="px-6 md:px-20 py-4 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#home"
            className="text-slate-100 text-2xl font-bold tracking-tight hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-1 focus:ring-offset-transparent rounded"
          >
            &lt;Kuri<span className="text-cyan-400">Zd</span> /&gt;
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex space-x-8 text-base font-semibold">
            {links.map(({ href, label, id }) => (
              <a key={id} href={href} className={linkClass(id)}>
                {label}
                {/* Animated underline — always in DOM, scaled in/out */}
                <span
                  className={`block h-0.5 rounded-full mt-0.5 origin-left transition-transform duration-300 bg-cyan-400 ${
                    activeSection === id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-slate-100 cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-slate-950/95 backdrop-blur-md border-t border-slate-700/20 ${
            menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 pb-5 pt-3 flex flex-col space-y-1">
            {links.map(({ href, label, id }) => (
              <a
                key={id}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-semibold py-2 px-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                  activeSection === id
                    ? "text-cyan-400 bg-cyan-400/5"
                    : "text-slate-300 hover:text-slate-100 hover:bg-white/5"
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
