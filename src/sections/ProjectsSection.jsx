// src/sections/ProjectsSection.jsx
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.15 });

  const projectsQuery = useQuery(api.projects.getRecent);
  const projects = projectsQuery || [];
  const isLoading = projectsQuery === undefined;

  const premiumVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15, filter: "blur(15px)" },
    visible: { 
      opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)",
      transition: { 
        type: "spring", mass: 1.2, stiffness: 80, damping: 15,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { type: "spring", mass: 1, stiffness: 80, damping: 15 }
    }
  };

  return (
    <section ref={ref} className="relative w-full max-w-5xl mx-auto py-16 px-4" id="projects" style={{ perspective: "1000px" }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 rounded-3xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div
        variants={premiumVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-jakarta text-4xl font-bold text-white">
            Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-5 -m-5 md:p-8 md:-m-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <motion.div variants={cardVariants} key={i} className="animate-pulse bg-white/5 rounded-xl h-64 w-full"></motion.div>
          ))
        ) : (
          projects.map((project) => (
            <motion.div variants={cardVariants} key={project._id} className="h-full">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.imageUrl}
                link={project.link}
                techStack={project.techStack}
              />
            </motion.div>
          ))
        )}
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/projects">
            <Button className="w-48">
              See All Projects
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default ProjectsSection;