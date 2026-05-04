import { useCallback, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "./projectsData";

const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const reducedMotion = useReducedMotion();
  const closeProject = useCallback(() => setSelectedProject(null), []);

  return (
    <section
      id="portfolio"
      className="relative min-h-screen overflow-hidden px-5 py-24 sm:px-8 lg:px-10"
    >
      <div className="absolute inset-0 -z-10 bg-[#05070d]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(168,85,247,0.14),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.1),rgba(2,6,23,0.92))]" />
      <div className="absolute inset-0 -z-10 opacity-35 bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-3xl">
          <MotionP
            className="text-xs font-bold uppercase tracking-[0.32em] text-cyan-300/80"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45 }}
          >
            My Work
          </MotionP>
          <MotionH2
            className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Featured Projects
          </MotionH2>
          <MotionP
            className="mt-5 text-base leading-8 text-slate-400 sm:text-lg"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Selected builds with clean interfaces, practical architecture, and
            motion that keeps the experience fast and intentional.
          </MotionP>
        </div>

        <LayoutGroup>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {projects.map((project, index) => (
              <MotionDiv
                key={project.id}
                initial={reducedMotion ? false : { opacity: 0, y: 22 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <ProjectCard
                  project={project}
                  onSelect={setSelectedProject}
                  reducedMotion={reducedMotion}
                />
              </MotionDiv>
            ))}
          </div>

          <ProjectModal
            project={selectedProject}
            onClose={closeProject}
            reducedMotion={reducedMotion}
          />
        </LayoutGroup>
      </div>
    </section>
  );
}
