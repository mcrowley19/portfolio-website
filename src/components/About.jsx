import { useInView } from "../hooks/useInView";

const facts = [
  { label: "Study", value: "Computer Science" },
  { label: "University", value: "Trinity College Dublin" },
  { label: "Secondary", value: "CBS Roscommon — 625 points" },
  { label: "Location", value: "Dublin, Ireland" },
];

export default function About() {
  const [ref, isInView] = useInView();

  return (
    <section className="px-6 md:px-10 max-w-6xl mx-auto">
      <div ref={ref} className={`reveal ${isInView ? "visible" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-16">
          <div>
            <p className="text-text-dim text-[10px] tracking-widest uppercase mb-6">
              About
            </p>
            <p className="text-text text-lg md:text-xl leading-relaxed font-light">
              I am a first-year CS student at Trinity College Dublin with a
              strong interest in machine learning, AI, entrepreneurship and the
              art of software development.
            </p>
            <p className="text-text text-lg md:text-xl leading-relaxed font-light pt-8">
              I love reading and learning new things. Some of my personal book
              recommendations can be found on this website.
            </p>
          </div>

          <div className="hidden md:block bg-border" />

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
