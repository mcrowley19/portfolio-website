import { useInView } from "../hooks/useInView";
// "I cannot remember the books I've read any more than the meals I have eaten; even so, they have made me" -Ralph Waldo Emerson
const books = [
  {
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    year: "1885",
    buyLink:
      "https://www.amazon.com/s?k=Thus+Spoke+Zarathustra+Nietzsche",
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    year: "2020",
    buyLink:
      "https://www.amazon.com/s?k=Artificial+Intelligence+Modern+Approach+Russell+Norvig+4th+edition",
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    year: "1844",
    buyLink:
      "https://www.amazon.com/Count-Monte-Cristo-Alexandre-Dumas/s?k=Count+of+Monte+Cristo",
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    year: "1847",
    buyLink: "https://www.amazon.com/s?k=Wuthering+Heights+Emily+Bronte",
  },
  {
    title: "Les Misérables",
    author: "Victor Hugo",
    year: "1862",
    buyLink:
      "https://www.amazon.com/Les-Miserables-Victor-Hugo/s?k=Les+Miserables",
  },
  {
    title: "The Idiot",
    author: "Fyodor Dostoevsky",
    year: "1869",
    buyLink:
      "https://www.amazon.com/Idiot-Fyodor-Dostoevsky/s?k=The+Idiot+Dostoevsky",
  },
  {
    title: "War and Peace",
    author: "Leo Tolstoy",
    year: "1869",
    buyLink: "https://www.amazon.com/War-Peace-Leo-Tolstoy/s?k=War+and+Peace",
  },
  {
    title: "Notes from Underground",
    author: "Fyodor Dostoevsky",
    year: "1864",
    buyLink: "https://www.amazon.com/s?k=Notes+from+Underground+Dostoevsky",
  },
  {
    title: "Introduction to Machine Learning with Python",
    author: "Andreas C. Müller & Sarah Guido",
    year: "2016",
    buyLink:
      "https://www.amazon.com/Introduction-Machine-Learning-Python-Andreas/s?k=Introduction+Machine+Learning+Python",
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    year: "1942",
    buyLink:
      "https://www.amazon.com/Stranger-Albert-Camus/s?k=The+Stranger+Albert+Camus",
  },
  {
    title: "The Death of Ivan Ilyich",
    author: "Leo Tolstoy",
    year: "1886",
    buyLink: "https://www.amazon.com/s?k=The+Death+of+Ivan+Ilyich+Tolstoy",
  },
  {
    title: "Source Code",
    author: "Bill Gates",
    year: "2025",
    buyLink: "https://www.amazon.com/s?k=Source+Code+Bill+Gates",
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    year: "1847",
    buyLink: "https://www.amazon.com/s?k=Jane+Eyre+Charlotte+Bronte",
  },
  {
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    year: "1880",
    buyLink: "https://www.amazon.com/s?k=The+Brothers+Karamazov+Dostoevsky",
  },
  {
    title: "Discrete Mathematics and Its Applications",
    author: "Kenneth H. Rosen",
    year: "1988",
    buyLink:
      "https://www.amazon.com/Discrete-Mathematics-Applications-Kenneth-Rosen/s?k=Discrete+Mathematics+Rosen",
  },
  {
    title: "Nausea",
    author: "Jean-Paul Sartre",
    year: "1938",
    buyLink: "https://www.amazon.com/s?k=Nausea+Jean-Paul+Sartre",
  },
  {
    title: "For Whom the Bell Tolls",
    author: "Ernest Hemingway",
    year: "1940",
    buyLink: "https://www.amazon.com/s?k=For+Whom+the+Bell+Tolls+Hemingway",
  },
  {
    title: "The Plague",
    author: "Albert Camus",
    year: "1947",
    buyLink: "https://www.amazon.com/s?k=The+Plague+Albert+Camus",
  },
  {
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    year: "1899",
    buyLink: "https://www.amazon.com/s?k=Heart+of+Darkness+Joseph+Conrad",
  },
  {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    year: "1958",
    buyLink: "https://www.amazon.com/s?k=Things+Fall+Apart+Chinua+Achebe",
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    year: "1953",
    buyLink: "https://www.amazon.com/s?k=Fahrenheit+451+Ray+Bradbury",
  },
  {
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    year: "1946",
    buyLink: "https://www.amazon.com/s?k=Mans+Search+for+Meaning+Viktor+Frankl",
  },
  {
    title: "The Myth of Sisyphus",
    author: "Albert Camus",
    year: "1942",
    buyLink: "https://www.amazon.com/s?k=The+Myth+of+Sisyphus+Albert+Camus",
  },
  {
    title: "Meditations",
    author: "Marcus Aurelius",
    year: "180",
    buyLink: "https://www.amazon.com/s?k=Meditations+Marcus+Aurelius",
  },
  {
    title: "The Divine Comedy",
    author: "Dante Alighieri",
    year: "1320",
    buyLink: "https://www.amazon.com/s?k=The+Divine+Comedy+Dante+Alighieri",
  },
];

function BookEntry({ book }) {
  return (
    <div
      className="group border-b border-border"
    >
      <div className="py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-2 md:gap-8 items-start">
          <div className="flex items-baseline gap-4 md:min-w-[320px]">
            <a
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-bright text-sm font-medium group-hover:text-accent transition-colors duration-300 leading-snug hover:underline"
            >
              {book.title}
            </a>
          </div>

          <p className="text-text-muted text-sm">{book.author}</p>

          <div className="flex items-center gap-4">
            <span className="text-xs text-text-dim font-mono">{book.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Reading() {
  const [headerRef, headerInView] = useInView();

  return (
    <div className="px-6 md:px-10 pt-24 pb-16 max-w-6xl mx-auto min-h-screen">
      <div
        ref={headerRef}
        className={`reveal ${headerInView ? "visible" : ""}`}
      >
        <div className="mb-10">
          <p className="text-text-dim text-[10px] tracking-widest uppercase mb-4">
            Library
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-bright leading-[0.95] mb-6">
            Reading
          </h1>
          <p className="text-text-muted text-sm max-w-md leading-relaxed">
            Books that I would recommend. Inspired by{" "}
            <a
              href="https://patrickcollison.com/bookshelf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Patrick Collison
            </a>
          </p>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1 bg-border" />
        </div>
        {books.map((book) => (
          <BookEntry key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}
