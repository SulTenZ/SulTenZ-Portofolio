// src/components-admin/ProjectForm.jsx
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ProjectForm() {
  const getUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const addProject = useMutation(api.projects.add);

  const [file, setFile] = useState(null);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    link: "",
    techStack: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih gambar terlebih dahulu");
    setPending(true);
    try {
      const uploadUrl = await getUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();

      await addProject({
        title: form.title,
        description: form.description,
        imageStorageId: storageId,
        link: form.link,
        techStack: form.techStack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });

      setForm({ title: "", description: "", link: "", techStack: "" });
      setFile(null);
      e.target.reset();
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg p-6 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Judul</label>
        <input
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          required
          placeholder="Nama project"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea
          className="mt-1 w-full min-h-28 rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          value={form.description}
          onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          required
          placeholder="Ringkasan singkat project"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Link</label>
        <input
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          value={form.link}
          onChange={(e) => setForm((s) => ({ ...s, link: e.target.value }))}
          required
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tech Stack <span className="text-gray-400">(pisahkan koma)</span>
        </label>
        <input
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          value={form.techStack}
          onChange={(e) => setForm((s) => ({ ...s, techStack: e.target.value }))}
          placeholder="React, Tailwind, Convex"
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

      <button
        disabled={pending}
        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold disabled:opacity-60"
      >
        {pending ? "Uploading..." : "Tambah Project"}
      </button>
    </form>
  );
}
