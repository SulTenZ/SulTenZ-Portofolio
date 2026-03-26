// src/pages/Home.jsx
import { useState, lazy, Suspense } from "react";
import Preloader from "../components-ui/Preloader";
import Hero from "../sections/Hero";
import Slider from "../sections/Slider";

const About = lazy(() => import("../sections/About"));
const Skills = lazy(() => import("../sections/Skills"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));

function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onFinish={() => setLoaded(true)} />}
      <main className={loaded ? "opacity-100 transition-opacity duration-500 relative" : "opacity-0 relative"}>
        <Hero />
        <Slider />
        <Suspense fallback={<div className="h-screen bg-background" />}>
          <About />
          <Skills />
          <ProjectsSection />
        </Suspense>
      </main>
    </>
  );
}
export default Home;
