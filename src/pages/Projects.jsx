// src/pages/Projects.jsx
import ProjectCard from "../components/ProjectCard";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion } from "framer-motion";

function Projects() {
  // Data yang diterima sudah otomatis urut dari terbaru (desc) dari backend
  const projects = useQuery(api.projects.list) || [];

  return (
    <div className="relative w-full min-h-screen py-32 px-4 overflow-hidden z-10">
      {/* Background Glows identik seperti bagian About */}
      <div className="pointer-events-none absolute left-[-80px] top-64 md:top-80 w-60 h-60 md:w-80 md:h-80 rounded-full 
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
            from-main/70 via-main/40 to-transparent blur-2xl opacity-60 z-0" />
      <div className="pointer-events-none absolute right-0 top-0 w-48 h-48 md:w-72 md:h-72 rounded-full 
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
            from-secondary/70 via-secondary/40 to-transparent blur-2xl opacity-60 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h1 
          className="font-jakarta text-4xl font-bold text-white mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          All Projects
        </motion.h1>

        {/* Trik kompensasi p-8 & -m-8: Memberi ruang tak terlihat agar efek hover scale ProjectCard tidak terpotong tepi grid! */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 -m-5 md:p-8 md:-m-8">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.imageUrl}
                link={project.link}
                techStack={project.techStack}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;