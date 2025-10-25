// src/pages/admin/AdminDashboard.jsx
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  // Ambil groups+skills (image-only) dan projects
  const groups = useQuery(api.skills.listGroupsWithSkills) ?? [];
  const projects = useQuery(api.projects.list) ?? [];

  // Derivasi ringkasan
  const { totalSkills, latestSkillName, flatSkills } = useMemo(() => {
    const flat = groups.flatMap((g) => g.skills || []);
    const total = flat.length;
    const latest = flat.at(-1)?.name ?? "—";
    return { totalSkills: total, latestSkillName: latest, flatSkills: flat };
  }, [groups]);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <header className="mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600">Ringkasan konten portofolio.</p>
      </header>

      {/* Stats (glass tiles) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg p-5">
          <p className="text-sm text-gray-600">Total Skills</p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900">
            {totalSkills}
          </p>
        </div>

        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg p-5">
          <p className="text-sm text-gray-600">Total Projects</p>
          <p className="mt-1 text-3xl font-extrabold text-gray-900">
            {projects.length}
          </p>
        </div>

        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg p-5">
          <p className="text-sm text-gray-600">Latest Skill</p>
          <p className="mt-1 font-semibold text-gray-900 truncate">
            {latestSkillName}
          </p>
        </div>

        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg p-5">
          <p className="text-sm text-gray-600">Latest Project</p>
          <p className="mt-1 font-semibold text-gray-900 truncate">
            {projects.at(-1)?.title ?? "—"}
          </p>
        </div>
      </section>

      {/* Lists */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills preview */}
        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
            <Link to="/admin/skills" className="text-sm text-blue-700 hover:underline">
              Kelola
            </Link>
          </div>

          {totalSkills === 0 ? (
            <p className="text-sm text-gray-600">
              Belum ada skill. Tambahkan via menu <span className="font-medium">Skills</span> atau buat grup di <span className="font-medium">Skill Groups</span>.
            </p>
          ) : (
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {flatSkills.slice(0, 12).map((s) => (
                <li
                  key={s.id}
                  className="rounded-lg bg-white/50 backdrop-blur-lg border border-white/60 p-3 text-center shadow"
                >
                  <img
                    src={s.imageUrl}
                    alt={s.name}
                    className="w-12 h-12 object-contain mx-auto"
                  />
                  <p className="mt-2 text-sm font-medium text-gray-900 truncate">
                    {s.name}
                  </p>
                  {s.level && (
                    <p className="text-xs text-gray-600">{s.level}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Projects list */}
        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
            <Link to="/admin/projects" className="text-sm text-blue-700 hover:underline">
              Kelola
            </Link>
          </div>

          {projects.length === 0 ? (
            <p className="text-sm text-gray-600">Belum ada project.</p>
          ) : (
            <ul className="space-y-3">
              {projects.slice(0, 8).map((p) => (
                <li
                  key={p._id}
                  className="flex gap-3 items-center rounded-lg bg-white/50 backdrop-blur-lg border border-white/60 p-3 shadow"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
