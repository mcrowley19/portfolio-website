import type { ReactNode } from "react";

const paragraphs: ReactNode[] = [
  "I study CS at Trinity College Dublin. Alongside this, I am the CTO of Lockup, an app I co-founded to provide schools across Ireland with a way to easily regulate phone usage.",
  "Most of what I do outside coursework ends up on the Projects page above. My biggest interest at the moment is in large language models and I am in the midst of catching up on relevant research papers. I am also very passionate about helping students from rural Ireland succeed inside the tech industry.",
  <>
    Right now, I am building Lockup at{" "}
    <a
      href="https://www.alpine-valley.com/"
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-1 underline-offset-4 hover:text-accent-vermilion"
    >
      Alpine Valley
    </a>{" "}
    in Austria and we are preparing a list of schools for demos over the 26/27
    academic period.
  </>,
  "If any of the above interests you, feel free to reach out across any of my socials",
];

export function About() {
  return (
    <section id="about" className="scroll-mt-16" style={{ maxWidth: "580px" }}>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="font-display text-body-l text-ink-primary"
          style={{ marginTop: i === 0 ? 0 : "1.5rem" }}
        >
          {p}
        </p>
      ))}
    </section>
  );
}
