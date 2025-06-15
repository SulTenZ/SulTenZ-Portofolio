// src/sections/Skills.jsx
function Skills() {
  return (
    <section className="max-w-4xl mx-auto py-16 px-4" id="skills">
      <h2 className="font-jakarta text-2xl text-main font-bold mb-6">Skills</h2>
      <div className="flex flex-wrap gap-4">
        {/* Ganti/isi dengan skills kamu */}
        <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">React.js</span>
        <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Tailwind CSS</span>
        <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">JavaScript</span>
        <span className="bg-secondary text-background px-4 py-2 rounded font-jakarta">Node.js</span>
        {/* Tambah skill lain */}
      </div>
    </section>
  );
}
export default Skills;