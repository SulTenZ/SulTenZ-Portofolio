// src/pages/Projects.jsx
import ProjectCard from "../components/ProjectCard";

function Projects() {
  // Ganti dengan fetch data aslinya nanti
  const projects = [
    { title: "Web Portfolio", description: "My personal website built with React & Tailwind.", image: "/assets/project1.png", link: "#" },
    { title: "Todo App", description: "A simple todo app using local storage.", image: "/assets/project2.png", link: "#" },
    { title: "Landing Page", description: "Landing page for a fictitious product.", image: "/assets/project3.png", link: "#" },
    // Tambah project lain di sini
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="font-jakarta text-3xl font-bold text-main mb-8">All Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </div>
  );
}
export default Projects;
