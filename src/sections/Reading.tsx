import { Section } from "../components/Section";
import { NewtonScene } from "../components/NewtonScene";

type Entry = { title: string; note: string };

// Pulled from michaelcrowley.dev/reading. The source page lists title /
// author / year only — the one-line `<dd>` is set as "Author. Year." until
// proper notes are written.
const reading: Entry[] = [
  { title: "Thus Spoke Zarathustra", note: "Friedrich Nietzsche. 1885." },
  { title: "The Brothers Karamazov", note: "Fyodor Dostoevsky. 1880." },
  { title: "War and Peace", note: "Leo Tolstoy. 1869." },
  { title: "The Count of Monte Cristo", note: "Alexandre Dumas. 1844." },
  { title: "Les Misérables", note: "Victor Hugo. 1862." },
  { title: "The Stranger", note: "Albert Camus. 1942." },
  { title: "Notes from Underground", note: "Fyodor Dostoevsky. 1864." },
  { title: "Meditations", note: "Marcus Aurelius. c. 180." },
  { title: "Man's Search for Meaning", note: "Viktor Frankl. 1946." },
  { title: "Source Code", note: "Bill Gates. 2025." },
  { title: "Artificial Intelligence: A Modern Approach", note: "Stuart Russell & Peter Norvig. 2020." },
  { title: "Wuthering Heights", note: "Emily Brontë. 1847." },
  { title: "The Idiot", note: "Fyodor Dostoevsky. 1869." },
  { title: "Introduction to Machine Learning with Python", note: "Andreas C. Müller & Sarah Guido. 2016." },
  { title: "The Death of Ivan Ilyich", note: "Leo Tolstoy. 1886." },
  { title: "Jane Eyre", note: "Charlotte Brontë. 1847." },
  { title: "Discrete Mathematics and Its Applications", note: "Kenneth H. Rosen. 1988." },
  { title: "Nausea", note: "Jean-Paul Sartre. 1938." },
  { title: "For Whom the Bell Tolls", note: "Ernest Hemingway. 1940." },
  { title: "The Plague", note: "Albert Camus. 1947." },
  { title: "Heart of Darkness", note: "Joseph Conrad. 1899." },
  { title: "Things Fall Apart", note: "Chinua Achebe. 1958." },
  { title: "Fahrenheit 451", note: "Ray Bradbury. 1953." },
  { title: "The Myth of Sisyphus", note: "Albert Camus. 1942." },
  { title: "The Divine Comedy", note: "Dante Alighieri. c. 1320." },
  { title: "Dubliners", note: "James Joyce. 1914." },
];

export function Reading() {
  return (
    <Section id="reading" numeral="III." kicker="Reading" className="relative">
      {/* On desktop, reserve right-side space (scene width + gap) so the
          absolutely-positioned scene never overlaps the list. */}
      <div className="lg:pr-[300px]">
        <dl className="max-w-[65ch] divide-y divide-rule-line border-y border-rule-line">
          {reading.map((entry) => (
            <div
              key={entry.title}
              className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[1fr_1.4fr] sm:gap-8"
            >
              <dt className="font-display italic text-body-m text-ink-primary">
                {entry.title}
              </dt>
              <dd className="font-display text-body-m text-ink-secondary">
                {entry.note}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {/* Stationary in layout (absolute, not fixed) so it doesn't move on
          scroll, but is positioned independently of the list flow. */}
      <aside
        aria-hidden="true"
        className="mt-12 flex justify-center lg:absolute lg:right-[calc(50%-50vw)] lg:top-32 lg:mt-0 lg:block"
      >
        <NewtonScene />
      </aside>
    </Section>
  );
}
