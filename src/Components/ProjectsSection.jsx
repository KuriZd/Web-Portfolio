import { useCallback, useEffect, useRef, useState } from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "./projectsData";

const MotionH2 = motion.h2;
const MotionP = motion.p;

const GAP = 20;
const REAL_COUNT = projects.length;

// Build a virtual item: vkey is an ever-increasing/decreasing integer
const makeItem = (vkey) => ({
  project: projects[((vkey % REAL_COUNT) + REAL_COUNT) % REAL_COUNT],
  vkey,
});

// Initial buffer: one full cycle before + real items + one full cycle after
const initItems = () =>
  Array.from({ length: REAL_COUNT * 3 }, (_, i) => makeItem(i - REAL_COUNT));

function useCardsPerView() {
  const [perView, setPerView] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setPerView(1);
      else if (window.innerWidth < 1280) setPerView(2);
      else setPerView(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perView;
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null); // { project, layoutPrefix }
  const reducedMotion = useReducedMotion();
  const perView = useCardsPerView();
  const closeProject = useCallback(() => setSelected(null), []);

  const trackRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  // items: dynamic growing buffer of virtual items
  const [items, setItems] = useState(initItems);
  // trackIndex: which item in `items` is shown at the left of the viewport
  const [trackIndex, setTrackIndex] = useState(REAL_COUNT);
  // animEnabled: false during instant position corrections (prepend adjust)
  const [animEnabled, setAnimEnabled] = useState(true);
  // afterPrepend: signals that after the instant correction we should go back 1
  const afterPrepend = useRef(false);

  // Measure card width from container
  useEffect(() => {
    if (!trackRef.current) return;
    const update = () => {
      if (!trackRef.current) return;
      const w = trackRef.current.offsetWidth;
      setCardWidth((w - GAP * (perView - 1)) / perView);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [perView]);

  // Reset to clean state when perView changes
  useEffect(() => {
    afterPrepend.current = false;
    setItems(initItems());
    setAnimEnabled(false);
    setTrackIndex(REAL_COUNT);
  }, [perView]);

  // After any instant correction (animEnabled=false), re-enable animation.
  // If afterPrepend is set, also decrement trackIndex to complete the prev step.
  useEffect(() => {
    if (animEnabled) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (afterPrepend.current) {
          afterPrepend.current = false;
          setTrackIndex((i) => i - 1);
        }
        setAnimEnabled(true);
      })
    );
    return () => cancelAnimationFrame(id);
  }, [animEnabled]);

  const next = useCallback(() => {
    setTrackIndex((i) => {
      const newI = i + 1;
      // Grow buffer ahead if we're getting close to the end
      setItems((prev) => {
        if (newI + perView + REAL_COUNT >= prev.length) {
          const lastKey = prev[prev.length - 1].vkey;
          return [
            ...prev,
            ...Array.from({ length: REAL_COUNT }, (_, j) => makeItem(lastKey + 1 + j)),
          ];
        }
        return prev;
      });
      return newI;
    });
  }, [perView]);

  const prev = useCallback(() => {
    setTrackIndex((i) => {
      if (i <= 0) {
        // Prepend a full cycle and correct position — no visual change
        afterPrepend.current = true;
        setAnimEnabled(false);
        setItems((prev) => {
          const firstKey = prev[0].vkey;
          return [
            ...Array.from({ length: REAL_COUNT }, (_, j) =>
              makeItem(firstKey - REAL_COUNT + j)
            ),
            ...prev,
          ];
        });
        return i + REAL_COUNT; // compensate for prepended items (instant, no animation)
      }
      return i - 1;
    });
  }, []);

  const handleDragEnd = useCallback(
    (_, info) => {
      const threshold = cardWidth * 0.2;
      const velocityThreshold = 400;
      if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
        next();
      } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
        prev();
      }
    },
    [cardWidth, next, prev]
  );

  const translateX = cardWidth > 0 ? -(trackIndex * (cardWidth + GAP)) : 0;

  // Active dot derived from the virtual key of the current item
  const activeVkey = items[trackIndex]?.vkey ?? 0;
  const activeReal = ((activeVkey % REAL_COUNT) + REAL_COUNT) % REAL_COUNT;

  const handleSelect = useCallback((project, layoutPrefix) => {
    setSelected({ project, layoutPrefix });
  }, []);

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
          <div className="relative">
            <div ref={trackRef} className="py-3" style={{ overflowX: "clip" }}>
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                style={{ gap: GAP, touchAction: "none" }}
                animate={{ x: reducedMotion ? 0 : translateX }}
                transition={
                  animEnabled && !reducedMotion
                    ? { type: "spring", stiffness: 260, damping: 32 }
                    : { duration: 0 }
                }
                drag={animEnabled ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
              >
                {items.map(({ project, vkey }) => {
                  const layoutPrefix = `v${vkey}-`;
                  return (
                    <div
                      key={vkey}
                      style={{ minWidth: cardWidth, maxWidth: cardWidth }}
                    >
                      <ProjectCard
                        project={project}
                        onSelect={handleSelect}
                        reducedMotion={reducedMotion}
                        layoutPrefix={layoutPrefix}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>

            <button
              onClick={prev}
              aria-label="Previous projects"
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-600/50 bg-slate-900/80 text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-cyan-300/60 hover:text-cyan-200 sm:-left-5"
            >
              <FiChevronLeft size={20} />
            </button>

            <button
              onClick={next}
              aria-label="Next projects"
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-600/50 bg-slate-900/80 text-slate-300 backdrop-blur-md transition-all duration-200 hover:border-cyan-300/60 hover:text-cyan-200 sm:-right-5"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const delta = i - activeReal;
                  setTrackIndex((t) => t + delta);
                }}
                aria-label={`Go to project ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeReal
                    ? "w-6 bg-cyan-300"
                    : "w-2 bg-slate-600 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <ProjectModal
            project={selected?.project ?? null}
            layoutPrefix={selected?.layoutPrefix ?? ""}
            onClose={closeProject}
            reducedMotion={reducedMotion}
          />
        </LayoutGroup>
      </div>
    </section>
  );
}
