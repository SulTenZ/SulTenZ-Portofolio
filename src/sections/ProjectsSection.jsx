// src/sections/ProjectsSection.jsx
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function ProjectsSection() {
  // Dummy data project
  const projects = [
    { title: "Web Portfolio", description: "My personal website built with React & Tailwind.", image: "/assets/project1.png", link: "#" },
    { title: "Todo App", description: "A simple todo app using local storage.", image: "/assets/project2.png", link: "#" },
    { title: "Landing Page", description: "Landing page for a fictitious product.", image: "/assets/project3.png", link: "#" },
  ];

  return (
    <section className="max-w-5xl mx-auto py-16 px-4" id="projects">
      <h2 className="font-jakarta text-2xl text-main font-bold mb-6">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/projects">
          <Button>See All Projects</Button>
        </Link>
      </div>
    </section>
  );
}
export default ProjectsSection;
