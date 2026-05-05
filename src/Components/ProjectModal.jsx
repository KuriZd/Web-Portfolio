import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import TechBadge from "./TechBadge";
import { ProjectVisual } from "./ProjectCard";

const MotionArticle = motion.article;
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

export default function ProjectModal({ project, layoutPrefix = "", onClose, reducedMotion }) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <MotionDiv
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-950/78 px-4 py-5 backdrop-blur-xl sm:px-6 sm:py-10"
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.18 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <MotionArticle
            layoutId={`${layoutPrefix}project-card-${project.id}`}
            className="relative my-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-600/40 bg-slate-950 shadow-2xl shadow-cyan-950/30"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-modal-title-${project.id}`}
            transition={{ type: "spring", stiffness: 220, damping: 30 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-slate-950/75 text-slate-200 shadow-lg shadow-black/30 backdrop-blur-md transition-all duration-200 hover:border-cyan-300/50 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 cursor-pointer"
              aria-label="Close project details"
            >
              <FiX className="text-xl" aria-hidden="true" />
            </button>

            <ProjectVisual project={project} layoutPrefix={layoutPrefix} />

            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:p-10">
              <div className="space-y-6">
                <div>
                  <MotionP
                    layoutId={`${layoutPrefix}project-category-${project.id}`}
                    className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300/80"
                  >
                    {project.category}
                  </MotionP>
                  <MotionH2
                    id={`project-modal-title-${project.id}`}
                    layoutId={`${layoutPrefix}project-title-${project.id}`}
                    className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
                  >
                    {project.title}
                  </MotionH2>
                </div>

                <MotionP
                  layoutId={`${layoutPrefix}project-description-${project.id}`}
                  className="text-base leading-8 text-slate-300"
                >
                  {project.description}
                </MotionP>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                    Features
                  </h3>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-2xl border border-slate-700/50 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-slate-300"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="space-y-6 rounded-3xl border border-slate-700/50 bg-white/[0.035] p-5">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                    Stack
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <TechBadge key={tech} variant="bright">
                        {tech}
                      </TechBadge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">
                    Role
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {project.role}
                  </p>
                </div>

                <div className="grid gap-3">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                    >
                      Live Demo
                      <FiExternalLink aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-700/70 px-5 py-3 text-sm font-bold text-slate-400">
                      Demo unavailable
                    </span>
                  )}
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-600/60 bg-slate-900/70 px-5 py-3 text-sm font-bold text-slate-100 transition-all duration-200 hover:border-cyan-300/50 hover:text-cyan-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      GitHub
                      <FiGithub aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/50 px-5 py-3 text-sm font-bold text-slate-500">
                      GitHub unavailable
                    </span>
                  )}
                </div>
              </aside>
            </div>
          </MotionArticle>
        </MotionDiv>
      ) : null}
    </AnimatePresence>
  );
}
