import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import { gsap } from "../lib/gsapSetup";

const MotionSticker = motion.div;

const STICKERS = [
  {
    label: "performance",
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.30)",
    glow: "0 0 20px rgba(251,191,36,0.28), 0 4px 14px rgba(0,0,0,0.3)",
    rotate: -2,
    pos: { top: "16%", left: "7%" },
    float: 8,
    delay: 0,
    hideMobile: false,
  },
  {
    label: "UI/UX",
    color: "#C084FC",
    bg: "rgba(192,132,252,0.08)",
    border: "rgba(192,132,252,0.30)",
    glow: "0 0 20px rgba(192,132,252,0.28), 0 4px 14px rgba(0,0,0,0.3)",
    rotate: 3,
    pos: { top: "20%", right: "8%" },
    float: -10,
    delay: 0.5,
    hideMobile: false,
  },
  {
    label: "Accessibility",
    color: "#34D399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.30)",
    glow: "0 0 20px rgba(52,211,153,0.28), 0 4px 14px rgba(0,0,0,0.3)",
    rotate: -1,
    pos: { top: "46%", left: "3%" },
    float: 7,
    delay: 1.0,
    hideMobile: true,
  },
  {
    label: "Trends",
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.30)",
    glow: "0 0 20px rgba(34,211,238,0.28), 0 4px 14px rgba(0,0,0,0.3)",
    rotate: 2,
    pos: { top: "44%", right: "4%" },
    float: -6,
    delay: 0.3,
    hideMobile: true,
  },
  {
    label: "Scalability",
    color: "#FB7185",
    bg: "rgba(251,113,133,0.08)",
    border: "rgba(251,113,133,0.30)",
    glow: "0 0 20px rgba(251,113,133,0.28), 0 4px 14px rgba(0,0,0,0.3)",
    rotate: -3,
    pos: { bottom: "24%", left: "8%" },
    float: 9,
    delay: 0.7,
    hideMobile: false,
  },
  {
    label: "Clean Code",
    color: "#818CF8",
    bg: "rgba(129,140,248,0.08)",
    border: "rgba(129,140,248,0.30)",
    glow: "0 0 20px rgba(129,140,248,0.28), 0 4px 14px rgba(0,0,0,0.3)",
    rotate: 1,
    pos: { bottom: "20%", right: "7%" },
    float: -8,
    delay: 0.2,
    hideMobile: false,
  },
];

export default function HeroSection() {
  const reducedMotion = useReducedMotion();
  const contentRef = useRef(null);

  useGSAP(
    () => {
      if (reducedMotion) return;

      gsap.timeline({ delay: 0.15 }).from(".hero-item", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.11,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });
    },
    { scope: contentRef, dependencies: [] },
  );

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-6 pt-16 pb-8 sm:px-12 sm:pt-18">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(167,139,250,0.05) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(251,113,133,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Floating stickers — kept in motion/react for the infinite y keyframe */}
      {STICKERS.map((s) => (
        <MotionSticker
          key={s.label}
          className={s.hideMobile ? "hidden sm:block" : "block"}
          style={{
            position: "absolute",
            ...s.pos,
            rotate: `${s.rotate}deg`,
            zIndex: 5,
          }}
          initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={
            reducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: 1, y: [0, s.float, 0] }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.5, delay: s.delay + 0.9 },
                  scale: {
                    duration: 0.5,
                    delay: s.delay + 0.9,
                    ease: [0.34, 1.56, 0.64, 1],
                  },
                  y: {
                    duration: 3.8 + s.delay * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: s.delay + 1.2,
                  },
                }
          }
          whileHover={
            reducedMotion
              ? undefined
              : { scale: 1.12, transition: { duration: 0.18 } }
          }
        >
          <span
            className="inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold select-none cursor-default backdrop-blur-sm"
            style={{
              color: s.color,
              background: s.bg,
              border: `1px solid ${s.border}`,
              boxShadow: s.glow,
            }}
          >
            {s.label}
          </span>
        </MotionSticker>
      ))}

      {/* Main content — GSAP timeline animates .hero-item children with stagger */}
      <div
        ref={contentRef}
        className="relative z-10 flex -translate-y-3 flex-col items-center text-center max-w-3xl mx-auto sm:-translate-y-2"
      >
        {/* Greeting pill */}
        <div className="hero-item mb-7">
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-medium text-slate-300"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(14px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <span role="img" aria-label="waving hand">
              👋
            </span>
            <span>
              Hey, I'm{" "}
              <span className="text-white font-semibold">Oscar Zamudio</span>
            </span>
          </div>
        </div>

        {/* Hero title */}
        <div className="hero-item relative mb-6">
          <div
            className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-10"
            style={{
              background: "radial-gradient(ellipse, #22D3EE 0%, #A78BFA 100%)",
            }}
          />
          <h1
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[1.05]"
            style={{
              background:
                "linear-gradient(140deg, #ffffff 0%, #cbd5e1 45%, #22D3EE 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Full Stack
            <br />
            Developer
          </h1>
        </div>

        {/* Tagline */}
        <p className="hero-item text-lg sm:text-2xl text-slate-400 font-medium tracking-wide mb-5">
          Crafting both{" "}
          <span
            className="font-bold"
            style={{
              color: "#FBBF24",
              textShadow: "0 0 18px rgba(251,191,36,0.55)",
            }}
          >
            Front-end
          </span>{" "}
          and{" "}
          <span
            className="font-bold"
            style={{
              color: "#A78BFA",
              textShadow: "0 0 18px rgba(167,139,250,0.55)",
            }}
          >
            Back-end
          </span>{" "}
          solutions
        </p>

        {/* Decorative divider */}
        <div
          className="hero-item flex items-center gap-3 w-48 mb-6"
          aria-hidden="true"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600/70 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600/70 to-transparent" />
        </div>

        {/* Description */}
        <p className="hero-item text-base sm:text-lg leading-8 text-slate-400 max-w-2xl mb-9">
          Specialized in designing and building{" "}
          <span className="text-slate-200">
            scalable, maintainable, user-centric
          </span>{" "}
          web apps focused on{" "}
          <span className="text-slate-200">
            performance, accessibility, trends
          </span>{" "}
          and <span className="text-slate-200">UI/UX</span>.
        </p>

        {/* CTA */}
        <div className="hero-item">
          <button
            onClick={() => scrollTo("portfolio")}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-2xl font-semibold text-base text-white cursor-pointer overflow-hidden active:scale-[0.97] transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,211,238,0.11) 0%, rgba(8,145,178,0.07) 100%)",
              border: "1px solid rgba(34,211,238,0.40)",
              backdropFilter: "blur(16px)",
              boxShadow:
                "0 0 36px rgba(34,211,238,0.18), 0 0 80px rgba(34,211,238,0.06), inset 0 1px 0 rgba(255,255,255,0.09)",
            }}
          >
            {/* Shine sweep on hover */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-[650ms] ease-in-out"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)",
              }}
            />
            {/* Cyan pulse dot */}
            <span
              aria-hidden="true"
              className="flex-shrink-0 w-2 h-2 rounded-full"
              style={{
                background: "#22D3EE",
                boxShadow:
                  "0 0 6px rgba(34,211,238,1), 0 0 14px rgba(34,211,238,0.6)",
              }}
            />
            View Projects
            <FiArrowRight
              className="transition-transform duration-200 group-hover:translate-x-1.5"
              style={{ color: "#67e8f9" }}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
