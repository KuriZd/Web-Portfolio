import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";
import TechBadge from "./TechBadge";

const MotionArticle = motion.article;
const MotionDiv = motion.div;
const MotionH3 = motion.h3;
const MotionP = motion.p;

function ProjectVisual({ project, compact = false, layoutPrefix = "" }) {
  return (
    <MotionDiv
      layoutId={`${layoutPrefix}project-image-${project.id}`}
      className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-inner shadow-white/5 ${project.visual.grid} ${
        compact ? "h-52" : "h-72 sm:h-96"
      }`}
    >
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/12 to-transparent" />
      <div className={`absolute -left-16 top-8 h-44 w-44 rounded-full bg-gradient-to-br ${project.visual.accent} blur-3xl opacity-55`} />
      <div className={`absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-gradient-to-br ${project.visual.accent} blur-3xl opacity-25`} />
      <div className="absolute left-5 top-5 inline-flex items-center rounded-full border border-white/[0.12] bg-slate-950/45 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
        {project.category}
      </div>

      {project.image ? (
        <div className="absolute inset-x-5 bottom-5 top-14 flex items-center justify-center rounded-2xl border border-white/10 bg-slate-950/50 p-5 shadow-2xl shadow-black/40 backdrop-blur-md">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="max-h-full max-w-full rounded-xl object-contain drop-shadow-[0_20px_32px_rgba(0,0,0,0.45)]"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-slate-950/62 p-4 shadow-2xl shadow-black/40 backdrop-blur-md">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="space-y-3">
            <div className={`h-3 rounded-full bg-gradient-to-r ${project.visual.accent} ${compact ? "w-7/12" : "w-5/12"}`} />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-12 rounded-xl bg-white/10" />
              <div className="h-12 rounded-xl bg-white/10" />
              <div className="h-12 rounded-xl bg-white/10" />
            </div>
            <div className="h-2 rounded-full bg-white/14" />
            <div className="h-2 w-8/12 rounded-full bg-white/10" />
          </div>
        </div>
      )}
    </MotionDiv>
  );
}

export { ProjectVisual };

export default function ProjectCard({ project, onSelect, reducedMotion, layoutPrefix = "" }) {
  return (
    <MotionArticle
      layoutId={`${layoutPrefix}project-card-${project.id}`}
      className="group relative min-h-[31rem] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-slate-950/78 p-3 shadow-2xl shadow-black/30 backdrop-blur-md transition-colors duration-200 hover:border-cyan-300/30"
      whileHover={reducedMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.8 }}
      onClick={() => onSelect(project, layoutPrefix)}
    >
      <div className={`pointer-events-none absolute inset-x-8 -top-16 h-28 rounded-full bg-gradient-to-r ${project.visual.accent} opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20`} />
      <button
        type="button"
        className="relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl cursor-pointer"
        aria-label={`Open ${project.title} project details`}
      >
        <ProjectVisual project={project} compact layoutPrefix={layoutPrefix} />

        <div className="space-y-4 px-2 pb-3 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <MotionP
                layoutId={`${layoutPrefix}project-category-${project.id}`}
                className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300/80"
              >
                {project.category}
              </MotionP>
              <MotionH3
                layoutId={`${layoutPrefix}project-title-${project.id}`}
                className="mt-2 text-2xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-50"
              >
                {project.title}
              </MotionH3>
            </div>
            <span className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-white/10 bg-white/[0.055] text-slate-300 shadow-lg shadow-black/20 transition-all duration-200 group-hover:border-cyan-300/50 group-hover:bg-cyan-300/10 group-hover:text-cyan-100">
              <FiArrowUpRight aria-hidden="true" />
            </span>
          </div>

          <MotionP
            layoutId={`${layoutPrefix}project-description-${project.id}`}
            className="min-h-[4.5rem] text-sm leading-6 text-slate-400"
          >
            {project.shortDescription}
          </MotionP>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.slice(0, 4).map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
        </div>
      </button>
    </MotionArticle>
  );
}
