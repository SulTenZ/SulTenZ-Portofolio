// src/components/ProjectCard.jsx
import Button from "./Button";

function ProjectCard({ title, description, image, link, techStack = [] }) {
  const handleRedirect = () => {
    if (link && link !== "#") {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-[#171717] border border-[#232323] rounded-xl p-6 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/10 hover:bg-white/[0.02]">
      <img src={image} alt={title} loading="lazy" className="w-full h-40 object-cover rounded-md mb-4 flex-shrink-0" />
      <h3 className="font-jakarta text-xl font-bold text-white mb-2 text-left">
        {title}
      </h3>
      <p className="font-dmsans text-gray-300 mb-4 text-sm text-left flex-grow">
        {description}
      </p>
      <div className="flex-shrink-0">
        <p className="font-jakarta text-white font-bold mb-2 text-left">Tech Stack:</p>
        <div className="flex flex-wrap justify-start gap-2 mb-6">
          {techStack.map((tech, index) => (
            <span key={index} className="bg-zinc-700 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto flex-shrink-0">
        <Button onClick={handleRedirect}>
          Go to Project
        </Button>
      </div>
    </div>
  );
}

export default ProjectCard;