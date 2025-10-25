// src/sections/Skills.jsx
import { Timeline } from "../components-ui/Timeline";
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const SkillIcon = ({ src, name }) => (
  <div className="flex flex-col items-center gap-2 text-neutral-400 transition-all duration-300 hover:scale-110 hover:text-white">
    <img src={src} alt={name} width={75} height={75} className="opacity-80" />
    <p className="text-sm font-jakarta">{name}</p>
  </div>
);

export default function Skills() {
  const groups = useQuery(api.skills.listGroupsWithSkills) || [];

  const data = useMemo(() => {
    return groups.map((g) => ({
      title: g.name,
      content: (
        <div className="flex flex-wrap justify-end gap-6 md:gap-8 mb-4">
          {g.skills.map((s) => (
            <SkillIcon key={s.id} src={s.imageUrl} name={s.name} />
          ))}
        </div>
      ),
    }));
  }, [groups]);

  return (
    <section className="w-full min-h-screen py-32 px-0 bg-background" id="skills">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-jakarta text-4xl text-white font-bold mb-6">Skills</h2>
        <Timeline data={data} />
      </div>
    </section>
  );
}
