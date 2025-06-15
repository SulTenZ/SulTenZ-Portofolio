// src/components/ProjectCard.jsx
function ProjectCard({ title, description, image, link }) {
  return (
    <div className="bg-[#232323] rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="font-jakarta text-xl font-bold text-main mb-2">{title}</h3>
      <p className="font-dmsans text-gray-300 mb-4 text-center">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-dmsans text-sm px-4 py-2 bg-main text-background rounded hover:bg-secondary hover:text-main transition"
      >
        View Project
      </a>
    </div>
  );
}
export default ProjectCard;
