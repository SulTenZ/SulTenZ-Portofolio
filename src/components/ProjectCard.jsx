// src/components/ProjectCard.jsx
import Button from "./Button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function ProjectCard({ title, description, image, link, techStack = [] }) {
  const handleRedirect = () => {
    if (link && link !== "#") {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.15}
      whileTap={{ cursor: "grabbing" }}
      className="cursor-grab bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-6 flex flex-col h-full transition-colors duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 hover:bg-white/[0.05]"
    >
      <div style={{ transform: "translateZ(30px)" }} className="flex-shrink-0 mb-4">
        <img src={image} alt={title} loading="lazy" className="w-full h-40 object-cover rounded-md pointer-events-none" />
      </div>
      <h3 style={{ transform: "translateZ(20px)" }} className="font-jakarta text-xl font-bold text-white mb-2 text-left">
        {title}
      </h3>
      <p style={{ transform: "translateZ(15px)" }} className="font-dmsans text-gray-300 mb-4 text-sm text-left flex-grow">
        {description}
      </p>
      <div style={{ transform: "translateZ(25px)" }} className="flex-shrink-0">
        <p className="font-jakarta text-white font-bold mb-2 text-left">Tech Stack:</p>
        <div className="flex flex-wrap justify-start gap-2 mb-6">
          {techStack.map((tech, index) => (
            <span key={index} className="bg-zinc-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div style={{ transform: "translateZ(20px)" }} className="mt-auto flex-shrink-0">
        <Button onClick={handleRedirect}>
          Go to Project
        </Button>
      </div>
    </motion.div>
  );
}

export default ProjectCard;