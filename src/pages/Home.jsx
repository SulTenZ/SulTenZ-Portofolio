import { useState } from "react";
import Preloader from "../components-ui/Preloader";
import Hero from "../sections/Hero";
import Slider from "../sections/Slider";
import About from "../sections/About";
import Skills from "../sections/Skills";
import ProjectsSection from "../sections/ProjectsSection";

function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onFinish={() => setLoaded(true)} />}
      <main className={loaded ? "opacity-100 transition-opacity duration-500" : "opacity-0"}>
        <Hero />
        <Slider />
        <About />
        <Skills />
        <ProjectsSection />
      </main>
    </>
  );
}
export default Home;
