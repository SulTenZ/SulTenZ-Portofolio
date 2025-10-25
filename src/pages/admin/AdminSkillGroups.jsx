// src/pages/admin/AdminSkillGroups.jsx
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AdminSkillGroupsPage() {
  const groups = useQuery(api.skillsGroup.list) ?? [];
  const addGroup = useMutation(api.skillsGroup.add);
  const updateGroup = useMutation(api.skillsGroup.update);
  const removeGroup = useMutation(api.skillsGroup.remove);

  const [form, setForm] = useState({ name: "", order: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    await addGroup({ name: form.name, order: form.order ? Number(form.order) : undefined });
    setForm({ name: "", order: "" });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Skill Groups</h2>
        <p className="text-sm text-gray-600">Kelola kelompok: Web Foundation, Front-End, dst.</p>
      </header>

      <form onSubmit={onSubmit} className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama Group</label>
          <input
            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Front-End Development"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Order <span className="text-gray-400">(opsional)</span></label>
          <input
            type="number"
            min={0}
            className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
            value={form.order}
            onChange={(e) => setForm((s) => ({ ...s, order: e.target.value }))}
            placeholder="1"
          />
        </div>
        <button className="px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold">Tambah Group</button>
      </form>

      <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg p-6">
        {groups.length === 0 ? (
          <p className="text-sm text-gray-600">Belum ada group.</p>
        ) : (
          <ul className="space-y-2">
            {groups.map((g) => (
              <li key={g._id} className="flex items-center gap-3 justify-between rounded-lg bg-white/50 border border-white/60 p-3">
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{g.name}</p>
                  <p className="text-xs text-gray-600">Order: {g.order ?? "—"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newOrder = prompt("Set order (angka):", String(g.order ?? 0));
                      if (newOrder == null) return;
                      updateGroup({ id: g._id, order: Number(newOrder) });
                    }}
                    className="text-xs px-2 py-1 rounded bg-gray-900 text-white"
                  >
                    Set Order
                  </button>
                  <button
                    onClick={() => removeGroup({ id: g._id })}
                    className="text-xs text-red-600 hover:text-red-700"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
