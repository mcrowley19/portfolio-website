import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Contact } from "../sections/Contact";
import { ArtemisVideo } from "../components/ArtemisVideo";
import heroPhoto from "../assets/hero-photo.png";
export function HomePage() {
  return (
    <>
      <Hero />

      <main
        className="w-full pb-24"
        style={{ paddingLeft: "12vw", paddingRight: "1.5rem" }}
      >
        {/* Portrait — first image, sits below the name, left-aligned to the
            same edge as the prose. Swap the div for an <img> to drop in the
            real photo. */}
        <img
          src={heroPhoto}
          className="portrait-photo pointer-events-none"
          style={{
            width: "280px",
            height: "360px",
            objectFit: "cover",
            marginTop: "3rem",
            marginBottom: "2.5rem",
          }}
          alt=""
          aria-hidden
        />

        {/* About + rocket sit side by side on lg+: prose in the main column,
            rocket in a right-hand column aligned to the top of the prose. On
            smaller widths the rocket stacks below the prose so mobile keeps a
            single linear flow with no horizontal scroll. */}
        <div className="lg:flex lg:items-start lg:gap-32">
          <div style={{ flex: "0 0 auto" }}>
            <About />
          </div>
          <div
            className="mt-24 lg:mt-0"
            style={{ flex: "0 0 auto", marginLeft: "3rem" }}
          >
            <ArtemisVideo width={200} />
          </div>
        </div>

        <div style={{ maxWidth: "580px", marginTop: "5rem" }}>
          <Contact />
        </div>
      </main>
    </>
  );
}
