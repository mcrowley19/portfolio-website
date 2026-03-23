import { useState } from 'react'
import { useInView } from '../hooks/useInView'

const books = [
  {
    title: 'The Count of Monte Cristo',
    author: 'Alexandre Dumas',
    year: '1844',
    review: 'A masterful tale of revenge and redemption. The intricate plotting is exceptional—every element serves the story. A deeply satisfying exploration of justice, forgiveness, and human nature.',
    buyLink: 'https://www.amazon.com/Count-Monte-Cristo-Alexandre-Dumas/s?k=Count+of+Monte+Cristo',
    category: 'Fiction',
  },
  {
    title: 'The Stranger',
    author: 'Albert Camus',
    year: '1942',
    review: 'A philosophical novella that challenges conventional morality. Camus presents an absurd protagonist that forces you to question your own values. Haunting and thought-provoking.',
    buyLink: 'https://www.amazon.com/Stranger-Albert-Camus/s?k=The+Stranger+Albert+Camus',
    category: 'Fiction',
  },
  {
    title: 'Les Misérables',
    author: 'Victor Hugo',
    year: '1862',
    review: 'An epic of breathtaking scope and human compassion. Hugo weaves social commentary with deeply personal stories. The redemption arc is one of literature\'s most powerful.',
    buyLink: 'https://www.amazon.com/Les-Miserables-Victor-Hugo/s?k=Les+Miserables',
    category: 'Fiction',
  },
  {
    title: 'The Idiot',
    author: 'Fyodor Dostoevsky',
    year: '1869',
    review: 'A profound exploration of goodness in a corrupted world. The protagonist\'s innocence against society\'s cruelty creates tragic beauty. Dostoevsky at his most philosophical and moving.',
    buyLink: 'https://www.amazon.com/Idiot-Fyodor-Dostoevsky/s?k=The+Idiot+Dostoevsky',
    category: 'Fiction',
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    year: '1869',
    review: 'An unparalleled achievement in literature. Tolstoy captures the human condition across war and peace, weaving philosophy into intimate character studies. Absolutely transformative.',
    buyLink: 'https://www.amazon.com/War-Peace-Leo-Tolstoy/s?k=War+and+Peace',
    category: 'Fiction',
  },
  {
    title: 'Discrete Mathematics and Its Applications',
    author: 'Kenneth H. Rosen',
    year: '1988',
    review: 'The essential foundation for computer science. Clear explanations of complex concepts make it accessible. Invaluable for understanding algorithms, logic, and computational thinking.',
    buyLink: 'https://www.amazon.com/Discrete-Mathematics-Applications-Kenneth-Rosen/s?k=Discrete+Mathematics+Rosen',
    category: 'Technical',
  },
  {
    title: 'Introduction to Machine Learning with Python',
    author: 'Andreas C. Müller & Sarah Guido',
    year: '2016',
    review: 'Practical and well-structured introduction to ML concepts. The balance between theory and implementation is excellent. Great for building intuition before diving deeper.',
    buyLink: 'https://www.amazon.com/Introduction-Machine-Learning-Python-Andreas/s?k=Introduction+Machine+Learning+Python',
    category: 'Technical',
  },
]

function BookEntry({ book, index }) {
  const [ref, isInView] = useInView()
  const [expanded, setExpanded] = useState(false)
  const hasReview = book.review.length > 0

  return (
    <div
      ref={ref}
      className={`group border-b border-border transition-all duration-600 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => hasReview && setExpanded(!expanded)}
        className={`w-full text-left py-6 md:py-8 ${hasReview ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-2 md:gap-8 items-start">
          {/* Index + Title */}
          <div className="flex items-baseline gap-4 md:min-w-[320px]">
            <span className="font-mono text-[10px] text-text-dim w-5 shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <a
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-bright text-sm font-medium group-hover:text-accent transition-colors duration-300 leading-snug hover:underline"
              onClick={(e) => hasReview && e.stopPropagation()}
            >
              {book.title}
            </a>
          </div>

          {/* Author */}
          <p className="text-text-muted text-sm md:pl-0 pl-9">
            {book.author}
          </p>

          {/* Year + Category + Review indicator */}
          <div className="flex items-center gap-4 md:pl-0 pl-9">
            <span className="text-xs text-text-dim font-mono">{book.year}</span>
            <span className="text-[10px] text-text-dim tracking-widest uppercase">{book.category}</span>
            {hasReview && (
              <svg
                className={`w-3 h-3 text-text-dim transition-transform duration-300 ${expanded ? 'rotate-90' : ''}`}
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
            )}
            {!hasReview && (
              <span className="text-[9px] text-text-dim/50 font-mono">—</span>
            )}
          </div>
        </div>
      </button>

      {/* Review panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-8 pl-9">
          <div className="border-l border-accent/30 pl-5 py-1">
            <p className="text-[10px] text-text-dim tracking-widest uppercase mb-3">My review</p>
            <p className="text-text text-sm leading-relaxed">
              {book.review}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Reading() {
  const [headerRef, headerInView] = useInView()

  const fiction = books.filter((b) => b.category === 'Fiction')
  const technical = books.filter((b) => b.category === 'Technical')

  return (
    <div className="px-6 md:px-10 pt-24 pb-16 max-w-6xl mx-auto min-h-screen">
      <div ref={headerRef} className={`reveal ${headerInView ? 'visible' : ''}`}>
        <div className="mb-20">
          <p className="text-text-dim text-[10px] tracking-widest uppercase mb-4">Library</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text-bright leading-[0.95] mb-6">
            Reading
          </h1>
          <p className="text-text-muted text-sm max-w-md leading-relaxed">
            Books that have been worth the time. Click any with a review to expand it.
          </p>
        </div>
      </div>

      {/* Fiction */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-accent text-xs font-mono tracking-widest uppercase">Fiction</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-text-dim text-xs font-mono">{fiction.length}</span>
        </div>
        {fiction.map((book, i) => (
          <BookEntry key={book.title} book={book} index={i} />
        ))}
      </div>

      {/* Technical */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-accent text-xs font-mono tracking-widest uppercase">Technical</span>
          <div className="h-px flex-1 bg-border" />
          <span className="text-text-dim text-xs font-mono">{technical.length}</span>
        </div>
        {technical.map((book, i) => (
          <BookEntry key={book.title} book={book} index={i + fiction.length} />
        ))}
      </div>
    </div>
  )
}
