// src/pages/admin/AdminSkills.jsx
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import SkillForm from "../../components-admin/SkillForm";

export default function AdminSkillsPage() {
  const groups = useQuery(api.skills.listGroupsWithSkills) ?? [];
  const removeSkill = useMutation(api.skills.removeSkill);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <p className="text-sm text-gray-600">Kelola data skill per grup.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <SkillForm /> {/* form baru dengan dropdown group */}

        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg p-6 space-y-6">
          <h3 className="font-semibold text-gray-900">Daftar Skill per Group</h3>

          {groups.length === 0 ? (
            <p className="text-sm text-gray-600">Belum ada group. Buat dulu di menu Skill Groups.</p>
          ) : (
            groups.map((g) => (
              <div key={g.id}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-900">{g.name}</p>
                  <span className="text-xs text-gray-500">{g.skills?.length || 0} skill</span>
                </div>

                {g.skills?.length ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {g.skills.map((s) => (
                      <div key={s.id} className="rounded-lg bg-white/50 backdrop-blur-lg border border-white/60 p-3 text-center shadow">
                        <img src={s.imageUrl} alt={s.name} className="w-16 h-16 object-contain mx-auto" />
                        <p className="mt-2 text-sm font-medium text-gray-900">{s.name}</p>
                        {s.level && <p className="text-xs text-gray-600">{s.level}</p>}
                        <button
                          onClick={() => removeSkill({ id: s.id })}
                          className="mt-2 text-xs text-red-600 hover:text-red-700"
                        >
                          Hapus
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 mb-6">Belum ada skill di grup ini.</p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
