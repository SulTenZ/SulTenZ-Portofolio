// src/sections/Hero.jsx
import EvervaultOrbHero from "../components-ui/EvervaultBackground";
import Orb from "../components-ui/Orb"; // pastikan sudah modif: tanpa bg
import { FlipWords } from "../components-ui/FlipWords";
import { ColourfulText } from "../components-ui/ColorfulText";

function Hero() {
  const flipWords = ["WEB DEVELOPMENT", "AND MOBILE DEVELOPMENT"];
  const flipWordClassMap = {
    "WEB DEVELOPMENT": "text-main font-bold",
    "AND MOBILE DEVELOPMENT": "text-secondary font-bold",
  };

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <EvervaultOrbHero className="absolute inset-0 w-full h-full">
        {/* --- ORB, visual-only layer --- */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Orb
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>
        {/* --- Konten utama hero --- */}
        <div className="w-full h-full flex items-center justify-center px-4 relative z-10">
          <div className="max-w-[900px] w-full mx-auto flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-jakarta font-extrabold mb-6 text-white flex flex-wrap items-center gap-3 justify-center text-center">
              <span className="text-white">HI ! I'M</span>
              <span>
                <ColourfulText text="SULTAN^^" />
              </span>
            </h1>
            <p className="font-dmsans text-lg md:text-2xl text-gray-200 mb-4 tracking-widest flex flex-col gap-2 items-center text-center">
              I DEVELOP & LEARNING ABOUT{" "}
              <FlipWords
                words={flipWords}
                duration={3000}
                classMap={flipWordClassMap}
              />
            </p>
          </div>
        </div>
      </EvervaultOrbHero>
    </section>
  );
}

export default Hero;
