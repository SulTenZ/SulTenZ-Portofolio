// src/pages/Projects.jsx
import ProjectCard from "../components/ProjectCard";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function Projects() {
  const projects = useQuery(api.projects.list) || [];
  const sorted = [...projects]; // terbaru duluan

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="font-jakarta text-4xl font-bold text-white mb-8">
        All Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sorted.map((project) => (
          <ProjectCard
            key={project._id}
            title={project.title}
            description={project.description}
            image={project.imageUrl}
            link={project.link}
            techStack={project.techStack}
          />
        ))}
      </div>
    </div>
  );
}

export default Projects;
