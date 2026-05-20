import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Contact } from "../sections/Contact";
import { ArtemisVideo } from "../components/ArtemisVideo";
import heroPhoto from "../assets/hero-photo.webp";

export function HomePage() {
  return (
    <>
      <Hero />

      <main className="home-main w-full pb-24">
        {/* Portrait — first image, sits below the name, left-aligned to the
            same edge as the prose. */}
        <img
          src={heroPhoto}
          className="pointer-events-none home-portrait"
          alt=""
          aria-hidden
        />

        {/* Mobile (<lg): first paragraph runs the full prose width, then the
            remaining paragraphs share a row with the rocket on the right.
            Mirrors the desktop relationship — rocket anchored in the same
            horizontal sweep as the prose, top-aligned with the second
            paragraph — at smaller scale. */}
        <div className="lg:hidden">
          <About range={[0, 1]} />
          <div className="home-prose-row">
            <div className="home-prose-col">
              <About range={[1, 4]} marginTopOnFirst />
            </div>
            <div className="home-rocket-col">
              <ArtemisVideo width="100%" />
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:items-start lg:gap-32">
          <div style={{ flex: "0 0 auto" }}>
            <About />
          </div>
          <div style={{ flex: "0 0 auto", marginLeft: "3rem" }}>
            <ArtemisVideo width={240} />
          </div>
        </div>

        <div className="home-contact">
          <Contact />
        </div>
      </main>
    </>
  );
}
