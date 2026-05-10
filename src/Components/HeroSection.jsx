import { motion, useReducedMotion } from "motion/react";
import { FiArrowRight, FiMail } from "react-icons/fi";

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
    label: "accessibility",
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
    label: "trends",
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
    label: "scalability",
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
    label: "clean code",
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

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  const reducedMotion = useReducedMotion();

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

      {/* Floating stickers */}
      {STICKERS.map((s) => (
        <motion.div
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
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 flex -translate-y-3 flex-col items-center text-center max-w-3xl mx-auto sm:-translate-y-2"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Greeting pill */}
        <motion.div variants={fadeUp} className="mb-7">
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
        </motion.div>

        {/* Hero title */}
        <motion.div variants={fadeUp} className="relative mb-6">
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
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-2xl text-slate-400 font-medium tracking-wide mb-5"
        >
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
        </motion.p>

        {/* Decorative divider */}
        <motion.div
          variants={fadeUp}
          className="flex items-center gap-3 w-48 mb-6"
          aria-hidden="true"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600/70 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600/70 to-transparent" />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg leading-8 text-slate-400 max-w-2xl mb-9"
        >
          Specialized in designing and building{" "}
          <span className="text-slate-200">
            scalable, maintainable, user-centric
          </span>{" "}
          web apps focused on{" "}
          <span className="text-slate-200">
            performance, accessibility, trends
          </span>{" "}
          and <span className="text-slate-200">UI/UX</span>.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("portfolio")}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base text-slate-950 cursor-pointer transition-all duration-200 hover:scale-[1.04] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{
              background:
                "linear-gradient(135deg, #22D3EE 0%, #06B6D4 55%, #0891B2 100%)",
              boxShadow:
                "0 0 28px rgba(34,211,238,0.32), 0 4px 16px rgba(0,0,0,0.28)",
            }}
          >
            View Projects
            <FiArrowRight
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base text-slate-200 cursor-pointer transition-all duration-200 hover:text-white hover:scale-[1.04] active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.13)",
              backdropFilter: "blur(14px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            <FiMail aria-hidden="true" />
            Contact Me
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
