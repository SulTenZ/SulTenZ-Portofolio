// src/pages/admin/AdminProjects.jsx
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProjectForm from "../../components-admin/ProjectForm";

export default function AdminProjectsPage() {
  const projects = useQuery(api.projects.list) ?? [];
  const removeProject = useMutation(api.projects.remove);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
        <p className="text-sm text-gray-600">
          Kelola data project untuk portofolio.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <ProjectForm />

        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Daftar Project</h3>
          {projects.length === 0 ? (
            <p className="text-sm text-gray-600">Belum ada data.</p>
          ) : (
            <div className="space-y-4">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="rounded-lg bg-white/50 backdrop-blur-lg border border-white/60 p-4 shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{p.title}</p>
                      <p className="text-sm text-gray-700 line-clamp-3">
                        {p.description}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {p.techStack?.join(", ")}
                      </p>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-blue-700 hover:underline"
                      >
                        {p.link}
                      </a>
                    </div>
                    <button
                      onClick={() => removeProject({ id: p._id })}
                      className="text-red-600 text-sm hover:text-red-700"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
