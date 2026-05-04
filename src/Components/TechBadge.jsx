export default function TechBadge({ children, variant = "default" }) {
  const variants = {
    default:
      "border-slate-600/40 bg-slate-900/70 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-100",
    bright:
      "border-cyan-300/30 bg-cyan-300/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.12)]",
  };

  return (
    <span
      className={`inline-flex min-h-7 items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors duration-200 ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
