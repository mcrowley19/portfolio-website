import { useInView } from "../hooks/useInView";

const columns = [
  {
    heading: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript"],
  },
  {
    heading: "Frameworks & Libraries",
    items: [
      "React",
      "React Native",
      "Tailwind",
      "Flask",
      "FastAPI",
      "Pandas",
      "scikit-learn",
    ],
  },
  {
    heading: "Tools and infrastructure",
    items: [
      "Git",
      "Vercel",
      "AWS Amplify",
      "AWS Agentcore",
      "Render",
      "Hugging Face",
    ],
  },
];

export default function Skills() {
  const [ref, isInView] = useInView();

  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto">
      <div ref={ref} className={`reveal ${isInView ? "visible" : ""}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {columns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-accent text-xs uppercase tracking-widest font-mono mb-6">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li
                    key={item}
                    className="text-text text-sm border-b border-border pb-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
