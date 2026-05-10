import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsapSetup";
import {
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact,
  SiNextdotjs, SiNodedotjs, SiExpress, SiNestjs, SiPhp,
  SiLaravel, SiPython, SiPostgresql, SiMysql, SiMongodb,
  SiDocker, SiGit, SiGithub, SiTailwindcss, SiRedux,
  SiVite, SiFirebase, SiSupabase, SiPrisma, SiGraphql,
} from "react-icons/si";

const ALL_TECHS = [
  { name: "HTML",         icon: SiHtml5,       color: "#E44D26" },
  { name: "CSS",          icon: SiCss3,        color: "#1572B6" },
  { name: "JavaScript",   icon: SiJavascript,  color: "#F7DF1E" },
  { name: "TypeScript",   icon: SiTypescript,  color: "#3178C6" },
  { name: "React",        icon: SiReact,       color: "#61DAFB" },
  { name: "Next.js",      icon: SiNextdotjs,   color: "#FFFFFF" },
  { name: "Node.js",      icon: SiNodedotjs,   color: "#68A063" },
  { name: "Express",      icon: SiExpress,     color: "#CCCCCC" },
  { name: "NestJS",       icon: SiNestjs,      color: "#E0234E" },
  { name: "PHP",          icon: SiPhp,         color: "#8892BF" },
  { name: "Laravel",      icon: SiLaravel,     color: "#FF2D20" },
  { name: "Python",       icon: SiPython,      color: "#FFD43B" },
  { name: "PostgreSQL",   icon: SiPostgresql,  color: "#336791" },
  { name: "MySQL",        icon: SiMysql,       color: "#4479A1" },
  { name: "MongoDB",      icon: SiMongodb,     color: "#47A248" },
  { name: "Docker",       icon: SiDocker,      color: "#2496ED" },
  { name: "Git",          icon: SiGit,         color: "#F05032" },
  { name: "GitHub",       icon: SiGithub,      color: "#E0E0E0" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Redux",        icon: SiRedux,       color: "#764ABC" },
  { name: "Vite",         icon: SiVite,        color: "#646CFF" },
  { name: "Firebase",     icon: SiFirebase,    color: "#FFCA28" },
  { name: "Supabase",     icon: SiSupabase,    color: "#3ECF8E" },
  { name: "Prisma",       icon: SiPrisma,      color: "#5A67D8" },
  { name: "GraphQL",      icon: SiGraphql,     color: "#E10098" },
];

const ROW_1 = ALL_TECHS.slice(0, 13);
const ROW_2 = ALL_TECHS.slice(13);

/* ── Single card ──────────────────────────────────────────────────────────── */
function TechCard({ tech }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        hovered
          ? {
              borderColor: `${tech.color}55`,
              boxShadow: `0 0 18px ${tech.color}22, 0 0 36px ${tech.color}0e`,
              transform: "scale(1.08) translateY(-3px)",
            }
          : {}
      }
      className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28
                 bg-black/50 border border-slate-700/40 rounded-2xl
                 backdrop-blur-sm flex flex-col items-center justify-center gap-2
                 cursor-pointer transition-all duration-300 select-none"
    >
      <tech.icon
        aria-hidden="true"
        style={{ color: hovered ? tech.color : "#6B7280" }}
        className="text-3xl sm:text-4xl transition-colors duration-300"
      />
      <span className="text-[10px] sm:text-xs text-slate-500 font-medium text-center px-1 leading-tight">
        {tech.name}
      </span>
    </div>
  );
}

/* ── Marquee row with drag-scroll when paused ─────────────────────────────── */
function MarqueeRow({ items, direction = "left", duration = 38 }) {
  const [paused, setPaused] = useState(false);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  // drag-to-scroll refs (active only when paused)
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const startX   = useRef(0);
  const scrollAt = useRef(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onDown = (e) => {
      if (!paused) return;
      dragging.current = true;
      startX.current   = e.type === "touchstart" ? e.touches[0].pageX : e.pageX;
      scrollAt.current = el.scrollLeft;
      el.style.cursor  = "grabbing";
    };
    const onMove = (e) => {
      if (!dragging.current) return;
      const x   = e.type === "touchmove" ? e.touches[0].pageX : e.pageX;
      el.scrollLeft = scrollAt.current - (x - startX.current);
    };
    const onUp = () => {
      dragging.current = false;
      el.style.cursor  = "grab";
    };

    el.addEventListener("mousedown",  onDown);
    el.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("touchmove",  onMove, { passive: true });
    window.addEventListener("mouseup",  onUp);
    window.addEventListener("touchend", onUp);

    return () => {
      el.removeEventListener("mousedown",  onDown);
      el.removeEventListener("touchstart", onDown);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("touchmove",  onMove);
      window.removeEventListener("mouseup",  onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [paused]);

  const animName = direction === "left" ? "marquee-left" : "marquee-right";
  const doubled  = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* scrollable only when paused */}
      <div
        ref={trackRef}
        className={`${paused ? "overflow-x-auto scrollbar-none cursor-grab" : "overflow-hidden"}`}
      >
        <div
          className="flex gap-4 w-max py-2"
          style={{
            animation: reduced.current
              ? "none"
              : `${animName} ${duration}s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {doubled.map((tech, i) => (
            <TechCard key={`${tech.name}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────────────────── */
export default function Technologies() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.from(".tech-header-item", {
        opacity: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 overflow-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, transparent, transparent 28px, rgba(255,255,255,0.018) 28px, rgba(255,255,255,0.018) 29px)",
        backgroundColor: "rgba(7, 11, 20, 0.72)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-14 px-6 space-y-5">
        <p className="tech-header-item text-xs font-bold tracking-[0.3em] text-slate-500 uppercase">
          What I Work With
        </p>

        <h2 className="tech-header-item text-5xl sm:text-7xl font-extrabold text-white tracking-tight">
          My Tech Stack
        </h2>

        <p className="tech-header-item text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          From{" "}
          <span className="text-yellow-400 font-semibold">fast frontends</span>
          {" "}to{" "}
          <span className="text-purple-400 font-semibold">scalable backends</span>
          {" "}— the tools I rely on to ship{" "}
          <span className="text-yellow-400 font-semibold">modern</span>
          ,{" "}
          <span className="text-purple-400 font-semibold">high-performance</span>
          {" "}products.
        </p>

        <p className="tech-header-item text-xs text-slate-600 tracking-wide">
          Hover to pause · drag to explore
        </p>
      </div>

      {/* Carousels — unchanged */}
      <div className="space-y-4">
        <MarqueeRow items={ROW_1} direction="left"  duration={40} />
        <MarqueeRow items={ROW_2} direction="right" duration={34} />
      </div>
    </section>
  );
}
