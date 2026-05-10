import { useState, useRef, useEffect } from "react";
import {
  SiGithub,
  SiLinkedin,
  SiGitlab,
  SiSpotify,
  SiInstagram,
} from "react-icons/si";
import {
  RiMapPinLine,
  RiMailLine,
  RiGlobalLine,
  RiExternalLinkLine,
  RiCodeBoxLine,
  RiSunLine,
  RiMoonLine,
  RiLayoutGridLine,
  RiTerminalBoxLine,
} from "react-icons/ri";

/* ─── Fade-in on scroll hook ─────────────────────────────────────────────── */
function useFadeIn(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function fadeStyle(visible, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
  };
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const BADGES = [
  "Team Player",
  "Detail-Oriented",
  "Fast Learner",
  "Problem Solver",
];

const PERSONAL_INFO = [
  {
    icon: RiMapPinLine,
    label: "Location",
    value: "Mexico",
    href: null,
    external: false,
  },
  {
    icon: SiGithub,
    label: "GitHub",
    value: "@KuriZd",
    href: "https://github.com/KuriZd",
    external: false,
  },
  {
    icon: RiGlobalLine,
    label: "Website",
    value: "kuri-zd-p.vercel.app",
    href: "https://kuri-zd-p.vercel.app",
    external: true,
  },
  {
    icon: RiMailLine,
    label: "Email",
    value: "kurizd@protonmail.com",
    href: "mailto:kurizd@protonmail.com",
    external: true,
  },
];

const CONNECT_SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    icon: SiGithub,
    href: "https://github.com/KuriZd",
    color: "#e5e7eb",
    glow: "rgba(229,231,235,0.35)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/kurizd/",
    color: "#0A66C2",
    glow: "rgba(10,102,194,0.50)",
  },
  {
    id: "gitlab",
    label: "GitLab",
    icon: SiGitlab,
    href: "https://gitlab.com/KuriZd",
    color: "#FC6D26",
    glow: "rgba(252,109,38,0.50)",
  },
  {
    id: "spotify",
    label: "Spotify",
    icon: SiSpotify,
    href: "https://open.spotify.com/playlist/2QlPacXuSxOyXNs7ikzV8w?si=8166ddbd44564891",
    color: "#1DB954",
    glow: "rgba(29,185,84,0.50)",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: SiInstagram,
    href: "https://www.instagram.com/kurizd_/",
    color: "#E1306C",
    glow: "rgba(225,48,108,0.50)",
  },
];

const FOOTER_SOCIALS = [
  {
    id: "github",
    label: "GitHub",
    icon: SiGithub,
    href: "https://github.com/KuriZd",
    color: "#e5e7eb",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: SiLinkedin,
    href: "https://www.linkedin.com/in/kurizd/",
    color: "#0A66C2",
  },
  {
    id: "gitlab",
    label: "GitLab",
    icon: SiGitlab,
    href: "https://gitlab.com/KuriZd",
    color: "#FC6D26",
  },
  {
    id: "spotify",
    label: "Spotify",
    icon: SiSpotify,
    href: "https://open.spotify.com/playlist/2QlPacXuSxOyXNs7ikzV8w?si=8166ddbd44564891",
    color: "#1DB954",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: SiInstagram,
    href: "https://www.instagram.com/kurizd_/",
    color: "#E1306C",
  },
];

const QUICK_LINKS = [
  { label: "Projects", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */

function FooterSocialIcon({ icon: Icon, label, href, color }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-9 h-9 rounded-full flex items-center justify-center
                 transition-all duration-200 cursor-pointer
                 focus:outline-none focus:ring-1 focus:ring-white/20"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? `${color}35` : "rgba(255,255,255,0.07)"}`,
        color: hov ? color : "#6b7280",
        transform: hov ? "scale(1.1)" : "scale(1)",
      }}
    >
      <Icon className="text-sm" aria-hidden="true" />
    </a>
  );
}

function SocialCircle({ icon: Icon, label, href, color, glow }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="w-11 h-11 rounded-full flex items-center justify-center
                 cursor-pointer transition-all duration-250
                 focus:outline-none focus:ring-2 focus:ring-white/20"
      style={{
        background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? `${color}40` : "rgba(255,255,255,0.08)"}`,
        color: hov ? color : "#6b7280",
        transform: hov ? "scale(1.12)" : "scale(1)",
        filter: hov ? `drop-shadow(0 0 8px ${glow})` : "none",
        transition: "all 0.2s ease",
      }}
    >
      <Icon className="text-lg" aria-hidden="true" />
    </a>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
export default function FooterSection() {
  const [isDark, setIsDark] = useState(true);
  const [aboutRef, aboutVisible] = useFadeIn();
  const [connectRef, connectVisible] = useFadeIn();
  const [footerRef, footerVisible] = useFadeIn();

  const sectionBg = {
    backgroundColor: "rgba(7, 8, 12, 0.97)",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  };

  return (
    <div id="contact" style={sectionBg}>
      {/* ── About Me ──────────────────────────────────────────────────────── */}
      <div
        ref={aboutRef}
        className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 pt-24 pb-16"
      >
        {/* Title + line */}
        <div
          style={fadeStyle(aboutVisible, 0)}
          className="flex items-center gap-5 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white whitespace-nowrap tracking-tight">
            About me
          </h2>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, rgba(255,255,255,0.12), transparent)",
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Left — description + badges */}
          <div
            className="lg:col-span-2 space-y-6"
            style={fadeStyle(aboutVisible, 80)}
          >
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              I&apos;m a{" "}
              <strong className="text-white font-semibold">
                Frontend &amp; Backend Engineer
              </strong>{" "}
              with a passion for building modern, scalable web applications. I
              bring{" "}
              <strong className="text-white font-semibold">
                hands-on experience
              </strong>{" "}
              across the full stack — from crafting pixel-perfect UIs to
              designing robust server-side architectures. I value{" "}
              <strong className="text-cyan-400 font-semibold">teamwork</strong>{" "}
              and{" "}
              <strong className="text-cyan-400 font-semibold">
                communication
              </strong>{" "}
              as much as technical depth, and I&apos;m driven by{" "}
              <strong className="text-purple-400 font-semibold">
                continuous learning
              </strong>{" "}
              and{" "}
              <strong className="text-purple-400 font-semibold">
                professional growth
              </strong>
              .
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="px-3 py-1 text-xs font-medium rounded-full text-slate-300
                             transition-colors duration-200 hover:text-white hover:border-white/20"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Right — personal info card */}
          <div
            style={{
              ...fadeStyle(aboutVisible, 160),
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "1rem",
              padding: "1.25rem 1.5rem",
            }}
          >
            <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase mb-4">
              Personal Info
            </p>
            <ul className="space-y-3 text-slate-300">
              {PERSONAL_INFO.map(
                ({ icon: Icon, label, value, href, external }) => (
                  <li key={label} className="flex items-center gap-3">
                    <Icon
                      className="text-slate-500 flex-shrink-0 text-base"
                      aria-hidden="true"
                    />
                    <span className="text-xs text-slate-500 w-14 flex-shrink-0">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="text-sm text-slate-300 hover:text-white transition-colors duration-200 flex items-center gap-1 min-w-0 truncate"
                      >
                        {value}
                        {external && (
                          <RiExternalLinkLine
                            className="flex-shrink-0 text-slate-600 text-xs"
                            aria-hidden="true"
                          />
                        )}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-300 truncate">
                        {value}
                      </span>
                    )}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Let's stay connected ──────────────────────────────────────────── */}
      <div
        ref={connectRef}
        className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-16 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div style={fadeStyle(connectVisible, 0)}>
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-600 uppercase mb-4">
            Reach out
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            Let&apos;s stay connected!
          </h2>
          <p className="text-sm text-slate-500 mb-10 max-w-md mx-auto">
            Find me across the web — open to collaborations, conversations, and
            new ideas.
          </p>
        </div>

        <div
          style={fadeStyle(connectVisible, 100)}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {CONNECT_SOCIALS.map((s) => (
            <SocialCircle key={s.id} {...s} />
          ))}
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        ref={footerRef}
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 pt-14 pb-8">
          {/* Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12"
            style={fadeStyle(footerVisible, 0)}
          >
            {/* Col 1 — Brand */}
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(34,211,238,0.12)",
                    border: "1px solid rgba(34,211,238,0.2)",
                  }}
                >
                  <RiTerminalBoxLine
                    className="text-cyan-400 text-base"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-white font-bold text-lg tracking-tight">
                  &lt;KuriZd /&gt;
                </span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                A modern portfolio showcasing projects, skills, and clean code.
                Built with React, Tailwind CSS, and passion for design.
              </p>

              {/* Theme toggle */}
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-600">Theme</span>
                <div
                  className="flex items-center gap-1 p-0.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {[
                    { icon: RiMoonLine, val: true, label: "Dark" },
                    { icon: RiSunLine, val: false, label: "Light" },
                  ].map(({ icon: Icon, val, label }) => (
                    <button
                      key={label}
                      onClick={() => setIsDark(val)}
                      aria-label={`${label} mode`}
                      className="w-7 h-7 rounded-full flex items-center justify-center
                                 transition-all duration-200 cursor-pointer
                                 focus:outline-none focus:ring-1 focus:ring-cyan-400/40"
                      style={{
                        background:
                          isDark === val
                            ? "rgba(255,255,255,0.1)"
                            : "transparent",
                        color: isDark === val ? "#e2e8f0" : "#4b5563",
                      }}
                    >
                      <Icon className="text-sm" aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Col 2 — Quick Links */}
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                Quick Links
              </p>
              <ul className="space-y-2.5 text-slate-400">
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .querySelector(href)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center gap-2 text-sm text-slate-500
                                 hover:text-slate-200 transition-colors duration-200 group"
                    >
                      <RiExternalLinkLine
                        className="text-slate-700 group-hover:text-slate-400 text-xs transition-colors duration-200"
                        aria-hidden="true"
                      />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Connect */}
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                Connect
              </p>
              <div className="flex flex-wrap gap-2">
                {FOOTER_SOCIALS.map((s) => (
                  <FooterSocialIcon key={s.id} {...s} />
                ))}
              </div>

              {/* Bento card */}
              <a
                href="https://kuri-zd-p.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                           transition-all duration-200 group cursor-pointer mt-2"
                style={{
                  background: "rgba(129,140,248,0.06)",
                  border: "1px solid rgba(129,140,248,0.15)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(129,140,248,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(129,140,248,0.06)";
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(129,140,248,0.15)" }}
                >
                  <RiLayoutGridLine
                    className="text-indigo-400 text-base"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-300 leading-none mb-0.5">
                    Bento
                  </p>
                  <p className="text-xs text-slate-600">All my links</p>
                </div>
                <RiExternalLinkLine
                  className="text-slate-700 text-xs ml-auto flex-shrink-0"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Col 4 — Info */}
            <div className="space-y-4">
              <p className="text-xs font-semibold tracking-widest text-slate-600 uppercase">
                Info
              </p>
              <ul className="space-y-2.5">
                {[
                  { label: "Version", value: "1.0.0" },
                  { label: "Last update", value: "May 2026" },
                  { label: "Built with", value: "React & Vite 6" },
                ].map(({ label, value }) => (
                  <li key={label} className="flex items-start gap-2">
                    <span className="text-xs text-slate-600 w-24 flex-shrink-0 pt-px">
                      {label}
                    </span>
                    <span className="text-xs text-slate-400">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              ...fadeStyle(footerVisible, 100),
            }}
          >
            <p className="text-xs text-slate-600 order-2 sm:order-1">
              © 2026 Oscar Zamudio. All rights reserved.
            </p>

            {/* Accent dot */}
            <div
              className="order-3 sm:order-2 w-1.5 h-1.5 rounded-full hidden sm:block"
              style={{
                background: "radial-gradient(circle, #22d3ee, #6366f1)",
                boxShadow: "0 0 8px rgba(34,211,238,0.6)",
              }}
            />

            <p className="text-xs text-slate-600 order-1 sm:order-3">
              Made with{" "}
              <span className="text-rose-500" aria-hidden="true">
                ❤
              </span>{" "}
              by{" "}
              <a
                href="https://github.com/KuriZd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-slate-300 transition-colors duration-200"
              >
                @KuriZd
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
