// src/sections/Skills.jsx
import { Timeline } from "../components-ui/Timeline";
import {
  DiHtml5,
  DiCss3,
  DiJavascript1,
  DiReact,
  DiNodejsSmall,
  DiMongodb,
  DiPostgresql,
  DiGit,
  DiGithubBadge,
} from "react-icons/di";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFlutter,
  SiDart,
  SiExpress,
  SiVercel,
} from "react-icons/si";

const SkillIcon = ({ icon, name }) => (
  <div className="flex flex-col items-center gap-2 text-neutral-400 transition-all duration-300 hover:scale-110 hover:text-white">
    {icon}
    <p className="text-sm font-jakarta">{name}</p>
  </div>
);

function Skills() {
  const data = [
    {
      title: "Web Foundation",
      content: (
        <div className="flex flex-wrap gap-6 md:gap-8 mb-4">
          <SkillIcon icon={<DiHtml5 size={75} />} name="HTML" />
          <SkillIcon icon={<DiCss3 size={75} />} name="CSS" />
          <SkillIcon icon={<DiJavascript1 size={75} />} name="JavaScript" />
        </div>
      ),
    },
    {
      title: "Front-End Development",
      content: (
        <div className="flex flex-wrap gap-6 md:gap-8 mb-4">
          <SkillIcon icon={<DiReact size={75} />} name="React.js" />
          <SkillIcon icon={<SiNextdotjs size={75} />} name="Next.js" />
          <SkillIcon icon={<SiTailwindcss size={75} />} name="Tailwind CSS" />
        </div>
      ),
    },
    {
      title: "Mobile Development",
      content: (
        <div className="flex flex-wrap gap-6 md:gap-8 mb-4">
          <SkillIcon icon={<SiFlutter size={75} />} name="Flutter" />
          <SkillIcon icon={<SiDart size={75} />} name="Dart" />
        </div>
      ),
    },
    {
      title: "Back-End & Database",
      content: (
        <div className="flex flex-wrap gap-6 md:gap-8 mb-4">
          <SkillIcon icon={<DiNodejsSmall size={75} />} name="Node.js" />
          <SkillIcon icon={<SiExpress size={75} />} name="Express.js" />
          <SkillIcon icon={<DiMongodb size={75} />} name="MongoDB" />
          <SkillIcon icon={<DiPostgresql size={75} />} name="PostgreSQL" />
        </div>
      ),
    },
    {
      title: "Deployment & Tools",
      content: (
        <div className="flex flex-wrap gap-6 md:gap-8 mb-4">
          <SkillIcon icon={<DiGit size={75} />} name="Git" />
          <SkillIcon icon={<DiGithubBadge size={75} />} name="GitHub" />
          <SkillIcon icon={<SiVercel size={75} />} name="Vercel" />
        </div>
      ),
    },
  ];

  return (
    <section className="w-full min-h-screen py-32 px-0 bg-background" id="skills">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-jakarta text-4xl text-white font-bold mb-6">Skills</h2>
        <Timeline data={data} />
      </div>
    </section>
  );
}

export default Skills;