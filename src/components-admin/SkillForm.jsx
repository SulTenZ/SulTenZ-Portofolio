// src/components-admin/SkillForm.jsx
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function SkillForm() {
  const groups = useQuery(api.skillsGroup.list) ?? [];
  const getUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const addSkill = useMutation(api.skills.addSkill);

  const [file, setFile] = useState(null);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({ name: "", level: "", groupId: "", order: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih gambar terlebih dahulu");
    if (!form.groupId) return alert("Pilih grup skill");

    setPending(true);
    try {
      const uploadUrl = await getUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();

      await addSkill({
        groupId: form.groupId,
        name: form.name,
        imageStorageId: storageId,
        level: form.level ? form.level : undefined,
        order: form.order ? Number(form.order) : undefined,
      });

      setForm({ name: "", level: "", groupId: "", order: "" });
      setFile(null);
      e.target.reset();
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Group</label>
        <select
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          value={form.groupId}
          onChange={(e) => setForm((s) => ({ ...s, groupId: e.target.value }))}
          required
        >
          <option value="">— pilih group —</option>
          {groups.map((g) => (
            <option key={g._id} value={g._id}>{g.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nama</label>
        <input
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          placeholder="Contoh: React, Tailwind, Flutter"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Level <span className="text-gray-400">(opsional)</span></label>
        <input
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          placeholder="Beginner, Intermediate, Advanced"
          value={form.level}
          onChange={(e) => setForm((s) => ({ ...s, level: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Order <span className="text-gray-400">(opsional)</span></label>
        <input
          type="number"
          min={0}
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          placeholder="Urutan tampil (angka kecil tampil dulu)"
          value={form.order}
          onChange={(e) => setForm((s) => ({ ...s, order: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="mt-1 block w-full text-sm text-gray-700"
          required
        />
      </div>

      <button disabled={pending} className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold disabled:opacity-60">
        {pending ? "Uploading..." : "Tambah Skill"}
      </button>
    </form>
  );
}
