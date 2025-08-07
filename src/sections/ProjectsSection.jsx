// src/sections/ProjectsSection.jsx
import ProjectCard from "../components/ProjectCard";
import Button from "../components/Button";
import { Link } from "react-router-dom";

import project1Image from "../assets/project-1.PNG";
import project2Image from "../assets/project-2.PNG";
import project3Image from "../assets/project-3.PNG";

function ProjectsSection() {
  const projects = [
    { 
      title: "VERDEX", 
      description: "VERDEX merupakan sebuah agensi digital yang berfokus pada penyediaan layanan teknologi dan kreatif, di mana halaman projects mereka berfungsi sebagai portofolio untuk menampilkan hasil karya dan studi kasus kepada calon klien.", 
      image: project1Image, 
      link: "https://www.verdex.id/",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Pocketbase"]
    },
    { 
      title: "Verdex Source", 
      description: "Verdex Source adalah sebuah platform marketplace digital di mana para kreator dapat menjual berbagai jenis aset digital buatan mereka. Platform ini memungkinkan transaksi untuk beragam produk seperti template desain, kode sumber, aset game, dan karya kreatif lainnya.", 
      image: project2Image, 
      link: "#",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Pocketbase"]
    },
    { 
      title: "SulTenZ AI", 
      description: "SulTenZAI adalah sebuah persona AI yang lahir dari sebuah eksperimen iseng untuk menjajaki kemampuan AI dari Groq Cloud. Proyek ini pada dasarnya adalah sebuah proyek pribadi yang dibungkus dalam antarmuka cerdas dan interaktif.", 
      image: project3Image, 
      link: "#",
      techStack: ["Next.js", "Tailwind CSS", "Groq Cloud"]
    },
  ];

  return (
    <section className="max-w-5xl mx-auto py-16 px-4" id="projects">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-jakarta text-4xl text-white font-bold">
          Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>

      {/* <div className="flex justify-center mt-8">
        <Link to="/projects">
          <Button className="w-48"> 
            See All Projects
          </Button>
        </Link>
      </div> */}
    </section>
  );
}

export default ProjectsSection;