import { Timeline } from "../components-ui/Timeline";

function Skills() {
  const data = [
    {
      title: "Web Foundation",
      content: (
        <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">HTML</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">CSS</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">JavaScript</span>
        </div>
      ),
    },
    {
      title: "Front-End",
      content: (
        <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">React.js</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Next.js</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Tailwind CSS</span>
        </div>
      ),
    },
    {
      title: "Mobile Development",
      content: (
        <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Flutter</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Dart</span>
        </div>
      ),
    },
    {
      title: "Back-End & Database",
      content: (
        <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Node.js</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Express.js</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">MongoDB</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">PostgreSQL</span>
        </div>
      ),
    },
    {
      title: "Deployment & Tools",
      content: (
        <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Git & GitHub</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Vercel</span>
        </div>
      ),
    },
  ];

  return (
    <section className="w-full min-h-[200vh] py-32 px-0 bg-background" id="skills">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="font-jakarta text-4xl text-white font-bold mb-6">Skills</h2>
        <Timeline data={data} />
        {/* Dummy content bawah untuk memperbanyak area scroll, hapus kalau sudah cukup */}
        {/* <div className="h-[600px]" /> */}
      </div>
    </section>
  );
}

export default Skills;
