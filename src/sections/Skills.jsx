// src/sections/Skills.jsx
function Skills() {
  return (
    <section className="w-full min-h-screen py-16 px-0 bg-background" id="skills">
      {/* Konten di tengah */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-jakarta text-2xl text-main font-bold mb-6">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {/* Tambahkan skill di sini */}
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">React.js</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Tailwind CSS</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">JavaScript</span>
          <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Node.js</span>
          {/* Skill tambahan */}
        </div>
      </div>
    </section>
  );
}
export default Skills;
