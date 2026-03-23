import { useInView } from "../hooks/useInView";

const facts = [
  { label: "Study", value: "Computer Science" },
  { label: "University", value: "Trinity College Dublin" },
  { label: "Secondary", value: "CBS Roscommon — 625 points" },
  { label: "Location", value: "Dublin, Ireland" },
  { label: "Languages", value: "Python, Java, TypeScript, JavaScript" },
  { label: "Interests", value: "ML, Systems, Web" },
  { label: "Volunteering", value: "Hack Europe Associate, TCD Claude Builder Club (1st Year Rep)" },
];

export default function About() {
  const [ref, isInView] = useInView();

  return (
    <section className="px-6 md:px-10 max-w-6xl mx-auto">
      <div ref={ref} className={`reveal ${isInView ? "visible" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-16">
          {/* Left — prose */}
          <div>
            <p className="text-text-dim text-[10px] tracking-widest uppercase mb-6">
              About
            </p>
            <p className="text-text text-lg md:text-xl leading-relaxed font-light">
              CS student at Trinity College Dublin with a focus on machine
              learning and systems programming. I build things to understand how
              they work — from autograd engines to food simulation models for
              Mars. I spend time reading classics and technical works to deepen
              both creative and analytical thinking.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block bg-border" />

          {/* Right — data */}
          <div>
            <p className="text-text-dim text-[10px] tracking-widest uppercase mb-6">
              Details
            </p>
            <div className="space-y-4">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex justify-between items-baseline border-b border-border pb-3"
                >
                  <span className="text-text-muted text-xs uppercase tracking-wider">
                    {f.label}
                  </span>
                  <span className="text-text text-sm text-right">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
