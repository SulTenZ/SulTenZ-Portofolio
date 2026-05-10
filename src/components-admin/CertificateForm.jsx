// src/components-admin/CertificateForm.jsx
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function CertificateForm() {
  const getUploadUrl = useMutation(api.uploads.generateUploadUrl);
  const addCertificate = useMutation(api.certificates.add);

  const [file, setFile] = useState(null);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    date: "",
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

      await addCertificate({
        title: form.title,
        issuer: form.issuer,
        date: form.date,
        imageStorageId: storageId,
      });

      setForm({ title: "", issuer: "", date: "" });
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
        <label className="block text-sm font-medium text-gray-700">Judul Sertifikat</label>
        <input
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          value={form.title}
          onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
          required
          placeholder="Nama Sertifikat"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Penerbit (Issuer)</label>
        <input
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          value={form.issuer}
          onChange={(e) => setForm((s) => ({ ...s, issuer: e.target.value }))}
          required
          placeholder="Misal: Dicoding, Coursera"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tanggal</label>
        <input
          className="mt-1 w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900"
          value={form.date}
          onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
          required
          placeholder="Bulan Tahun (Misal: Jan 2024)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Gambar Sertifikat</label>
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
        {pending ? "Uploading..." : "Tambah Sertifikat"}
      </button>
    </form>
  );
}
