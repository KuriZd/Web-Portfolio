import { motion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";
import TechBadge from "./TechBadge";

const MotionArticle = motion.article;
const MotionDiv = motion.div;
const MotionH3 = motion.h3;
const MotionP = motion.p;

function ProjectVisual({ project, compact = false }) {
  return (
    <MotionDiv
      layoutId={`project-image-${project.id}`}
      className={`relative overflow-hidden rounded-2xl border border-white/10 ${project.visual.grid} ${
        compact ? "h-48" : "h-72 sm:h-96"
      }`}
    >
      <div className="absolute inset-0 opacity-45 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className={`absolute -left-16 top-8 h-44 w-44 rounded-full bg-gradient-to-br ${project.visual.accent} blur-3xl opacity-50`} />
      <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-slate-950/58 p-4 shadow-2xl shadow-black/40 backdrop-blur-md">
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
    </MotionDiv>
  );
}

export { ProjectVisual };

export default function ProjectCard({ project, onSelect, reducedMotion }) {
  return (
    <MotionArticle
      layoutId={`project-card-${project.id}`}
      className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-950/72 p-3 shadow-2xl shadow-black/30 backdrop-blur-md"
      whileHover={reducedMotion ? undefined : { y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onClick={() => onSelect(project)}
    >
      <button
        type="button"
        className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-2xl cursor-pointer"
        aria-label={`Open ${project.title} project details`}
      >
        <ProjectVisual project={project} compact />

        <div className="space-y-4 px-2 pb-3 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <MotionP
                layoutId={`project-category-${project.id}`}
                className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300/80"
              >
                {project.category}
              </MotionP>
              <MotionH3
                layoutId={`project-title-${project.id}`}
                className="mt-2 text-2xl font-bold tracking-tight text-white"
              >
                {project.title}
              </MotionH3>
            </div>
            <span className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full border border-slate-600/50 bg-white/5 text-slate-300 transition-all duration-200 group-hover:border-cyan-300/50 group-hover:text-cyan-100">
              <FiArrowUpRight aria-hidden="true" />
            </span>
          </div>

          <MotionP
            layoutId={`project-description-${project.id}`}
            className="text-sm leading-6 text-slate-400"
          >
            {project.shortDescription}
          </MotionP>

          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
        </div>
      </button>
    </MotionArticle>
  );
}
