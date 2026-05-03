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
            same edge as the prose. */}
        <img
          src={heroPhoto}
          className="pointer-events-none"
          style={{
            display: "block",
            width: "240px",
            maxWidth: "240px",
            height: "auto",
            marginTop: "3rem",
            marginBottom: "2.5rem",
          }}
          alt=""
          aria-hidden
        />

        {/* Mobile: name → portrait → first two paragraphs → rocket → remaining
            paragraphs → contact. The rocket appears inline after the second
            paragraph, full mobile width.
            Desktop (lg+): prose in main column, rocket in a right-hand column
            aligned to the top of the prose. */}
        <div className="lg:hidden">
          <About range={[0, 2]} />
          <div style={{ marginTop: "2.5rem", marginBottom: "2.5rem", maxWidth: "420px" }}>
            <ArtemisVideo width="100%" />
          </div>
          <About range={[2, 4]} marginTopOnFirst />
        </div>

        <div className="hidden lg:flex lg:items-start lg:gap-32">
          <div style={{ flex: "0 0 auto" }}>
            <About />
          </div>
          <div style={{ flex: "0 0 auto", marginLeft: "3rem" }}>
            <ArtemisVideo width={240} />
          </div>
        </div>

        <div style={{ maxWidth: "580px", marginTop: "5rem" }}>
          <Contact />
        </div>
      </main>
    </>
  );
}
