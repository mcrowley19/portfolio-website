export function Hero() {
  return (
    <section
      id="hero"
      className="relative w-full home-hero"
      style={{ paddingTop: "8vh" }}
    >
      <div style={{ maxWidth: "580px" }}>
        <h1
          className="font-display text-ink-primary"
          style={{ fontSize: "1.5rem", fontWeight: 300, lineHeight: 1.2 }}
        >
          Michael Crowley
        </h1>
      </div>
    </section>
  );
}
