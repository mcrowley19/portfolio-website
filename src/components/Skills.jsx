import { useInView } from '../hooks/useInView'

const columns = [
  {
    heading: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'],
  },
  {
    heading: 'Frameworks & Tools',
    items: ['React', 'Node.js', 'Next.js', 'Tailwind', 'Flask', 'Git'],
  },
  {
    heading: 'Domains',
    items: ['Machine Learning', 'Linear Algebra', 'Systems Design', 'Web Development', 'Data Structures', 'Algorithms'],
  },
]

export default function Skills() {
  const [ref, isInView] = useInView()

  return (
    <section className="px-6 md:px-10 py-24 max-w-6xl mx-auto">
      <div ref={ref} className={`reveal ${isInView ? 'visible' : ''}`}>
        <p className="text-text-dim text-[10px] tracking-widest uppercase mb-12">Toolkit</p>

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
                    className="text-text text-sm border-b border-border pb-3 hover:text-text-bright hover:pl-2 transition-all duration-300"
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
  )
}
