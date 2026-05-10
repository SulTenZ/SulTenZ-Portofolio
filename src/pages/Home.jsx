// src/pages/Home.jsx
import { lazy, Suspense } from "react";
import Hero from "../sections/Hero";
import Slider from "../sections/Slider";

const About = lazy(() => import("../sections/About"));
const Skills = lazy(() => import("../sections/Skills"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));

function Home() {
  return (
    <>
      <main className="relative">
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
