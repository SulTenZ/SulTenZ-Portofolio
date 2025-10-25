// src/sections/ProjectsSection.jsx
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

function ProjectsSection() {
  const projects = useQuery(api.projects.list) || [];

  // Urutkan dari terbaru (opsional, bisa disesuaikan)
  const topThree = [...projects].slice(0, 3);

  return (
    <section className="max-w-5xl mx-auto py-16 px-4" id="projects">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-jakarta text-4xl text-white font-bold">
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {topThree.map((project) => (
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

      <div className="flex justify-center mt-8">
        <Link to="/projects">
          <Button className="w-48">
            See All Projects
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default ProjectsSection;
