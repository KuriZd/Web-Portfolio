import { useState, useRef, useCallback, useEffect } from "react";
import {
  SiGithub,
  SiLinkedin,
  SiGitlab,
  SiSpotify,
  SiInstagram,
} from "react-icons/si";
import {
  RiHomeLine,
  RiUser3Line,
  RiBriefcaseLine,
  RiMailLine,
} from "react-icons/ri";

/* ── Navigation items ─────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "home", label: "Home", icon: RiHomeLine },
  { id: "about", label: "Tech", icon: RiUser3Line },
  { id: "portfolio", label: "Projects", icon: RiBriefcaseLine },
  { id: "contact", label: "Contact", icon: RiMailLine },
];

/* ── Social icons ─────────────────────────────────────────────────────────── */
const SOCIAL_ICONS = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/KuriZd",
    icon: SiGithub,
    color: "#ffffff",
    glow: "rgba(255,255,255,0.28)",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "#",
    icon: SiLinkedin,
    color: "#0A66C2",
    glow: "rgba(10,102,194,0.55)",
  },
  {
    id: "gitlab",
    label: "GitLab",
    href: "#",
    icon: SiGitlab,
    color: "#FC6D26",
    glow: "rgba(252,109,38,0.55)",
  },
  {
    id: "spotify",
    label: "Spotify",
    href: "#",
    icon: SiSpotify,
    color: "#1DB954",
    glow: "rgba(29,185,84,0.55)",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "#",
    icon: SiInstagram,
    color: "#E1306C",
    glow: "rgba(225,48,108,0.55)",
  },
];

/* ── Flatten into one array (separator = special entry) ─────────────────── */
const ALL_ITEMS = [
  ...NAV_ITEMS.map((x) => ({ ...x, type: "nav" })),
  { id: "__sep", type: "separator" },
  ...SOCIAL_ICONS.map((x) => ({ ...x, type: "social" })),
];

/* ── Gaussian magnification ───────────────────────────────────────────────── */
const MAX_SCALE = 1.8;
const SPREAD = 70;

function magnify(d) {
  if (d > SPREAD * 3) return 1;
  return 1 + (MAX_SCALE - 1) * Math.exp(-(d * d) / (2 * SPREAD * SPREAD));
}

/* ── Component ───────────────────────────────────────────────────────────── */
export default function Dock() {
  const [mouseX, setMouseX] = useState(null);
  const [hoveredId, setHovered] = useState(null);
  const [activeSection, setActive] = useState("home");
  const itemRefs = useRef([]);

  /* Scroll spy — fires when section crosses the viewport midpoint */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const onMouseMove = useCallback((e) => setMouseX(e.clientX), []);
  const onMouseLeave = useCallback(() => {
    setMouseX(null);
    setHovered(null);
  }, []);

  function getScale(index) {
    if (mouseX === null) return null; // "leaving" state
    const rect = itemRefs.current[index]?.getBoundingClientRect();
    if (!rect) return 1;
    return magnify(Math.abs(mouseX - (rect.left + rect.width / 2)));
  }

  function wrapperStyle(index) {
    const scale = getScale(index);
    const leaving = scale === null;

    return {
      transform: leaving ? "scale(1)" : `scale(${scale.toFixed(3)})`,
      transformOrigin: "top center",
      transition: leaving
        ? "transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease"
        : "transform 0.10s ease, filter 0.15s ease",
    };
  }

  function navIconStyle(item) {
    const isActive = activeSection === item.id;
    const isHover = hoveredId === item.id;
    return {
      color: isActive ? "#22D3EE" : "#ffffff",
      opacity: isActive || isHover ? 1 : 0.45,
      transition: "color 0.2s ease, opacity 0.2s ease",
    };
  }

  function socialIconStyle(item) {
    const isHover = hoveredId === item.id;
    return {
      color: item.color,
      opacity: isHover ? 1 : 0.5,
      transition: "opacity 0.2s ease",
      filter: isHover
        ? `drop-shadow(0 0 6px ${item.glow}) drop-shadow(0 0 14px ${item.glow})`
        : "none",
    };
  }

  /* ── Render ─────────────────────────────────────────────────────────────── */
  return (
    <nav
      aria-label="Main navigation and social links"
      className="fixed top-5 left-1/2 z-50"
      style={{ transform: "translateX(-50%)" }}
    >
      <ul
        role="list"
        className="flex items-start gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-full list-none m-0"
        style={{
          background: "rgba(15, 15, 15, 0.65)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.50), 0 2px 8px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {ALL_ITEMS.map((item, i) => {
          /* ── Separator ── */
          if (item.type === "separator") {
            return (
              <li
                key="__sep"
                aria-hidden="true"
                className="flex items-center self-center mx-0.5"
              >
                <span className="w-px h-4 rounded-full bg-white/15" />
              </li>
            );
          }

          const isHover = hoveredId === item.id;
          const isActive = item.type === "nav" && activeSection === item.id;
          const Icon = item.icon;

          return (
            <li key={item.id} className="flex items-center justify-center">
              <div
                ref={(el) => (itemRefs.current[i] = el)}
                style={wrapperStyle(i)}
                className="relative"
              >
                {/* Tooltip */}
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-full mt-2.5 px-1.5 py-0.5 rounded-md
                             text-[10px] font-light text-white/80 whitespace-nowrap pointer-events-none"
                  style={{
                    transform: `translateX(-50%) translateY(${isHover ? 0 : -4}px)`,
                    opacity: isHover ? 1 : 0,
                    transition: "opacity 0.18s ease, transform 0.18s ease",
                    background: "rgba(18,18,18,0.92)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {item.label}
                </span>

                {/* Active dot for nav items */}
                {item.type === "nav" && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2
                               w-1 h-1 rounded-full bg-cyan-400
                               transition-opacity duration-300"
                    style={{ opacity: isActive ? 1 : 0 }}
                  />
                )}

                {/* Nav button */}
                {item.type === "nav" && (
                  <button
                    onClick={() =>
                      document
                        .getElementById(item.id)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    aria-label={`Go to ${item.label}`}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center
                               cursor-pointer rounded-full focus:outline-none
                               focus:ring-2 focus:ring-cyan-400/40
                               focus:ring-offset-1 focus:ring-offset-transparent"
                    style={navIconStyle(item)}
                  >
                    <Icon className="w-full h-full" aria-hidden="true" />
                  </button>
                )}

                {/* Social link */}
                {item.type === "social" && (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    aria-label={item.label}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center
                               cursor-pointer rounded-full focus:outline-none
                               focus:ring-2 focus:ring-white/20
                               focus:ring-offset-1 focus:ring-offset-transparent"
                    style={socialIconStyle(item)}
                  >
                    <Icon className="w-full h-full" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
