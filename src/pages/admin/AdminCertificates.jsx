// src/pages/admin/AdminCertificates.jsx
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import CertificateForm from "../../components-admin/CertificateForm";

export default function AdminCertificatesPage() {
  const certificates = useQuery(api.certificates.list) ?? [];
  const removeCertificate = useMutation(api.certificates.remove);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Certificates</h2>
        <p className="text-sm text-gray-600">
          Kelola data sertifikat untuk portofolio.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <CertificateForm />

        <div className="rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Daftar Sertifikat</h3>
          {certificates.length === 0 ? (
            <p className="text-sm text-gray-600">Belum ada data.</p>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert._id}
                  className="rounded-lg bg-white/50 backdrop-blur-lg border border-white/60 p-4 shadow"
                >
                  <div className="flex gap-4">
                    <img
                      src={cert.imageUrl}
                      alt={cert.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{cert.title}</p>
                      <p className="text-sm text-gray-700">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {cert.date}
                      </p>
                    </div>
                    <button
                      onClick={() => removeCertificate({ id: cert._id })}
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
