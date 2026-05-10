// src/pages/Certificates.jsx
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const TiltCard = ({ cert }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col transition-colors duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/20 h-full cursor-pointer"
    >
      <div style={{ transform: "translateZ(30px)" }} className="flex-shrink-0 mb-4 h-56 md:h-48 overflow-hidden rounded-md">
        <img src={cert.imageUrl} alt={cert.title} loading="lazy" className="w-full h-full object-cover pointer-events-none" />
      </div>
      <h3 style={{ transform: "translateZ(20px)" }} className="font-jakarta text-xl font-bold text-white mb-1">
        {cert.title}
      </h3>
      <p style={{ transform: "translateZ(15px)" }} className="font-dmsans text-gray-400 text-sm">
        {cert.issuer} • {cert.date}
      </p>
    </motion.div>
  );
};

export default function Certificates() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certificates = useQuery(api.certificates.list) || [];

  return (
    <div className="relative w-full min-h-screen py-32 px-4 overflow-hidden z-10">
      {/* Background glow effects identical to Projects.jsx */}
      <div className="pointer-events-none absolute left-[-80px] top-64 md:top-80 w-60 h-60 md:w-80 md:h-80 rounded-full 
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
            from-main/70 via-main/40 to-transparent blur-2xl opacity-60 z-0" />
      <div className="pointer-events-none absolute right-0 top-0 w-48 h-48 md:w-72 md:h-72 rounded-full 
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
            from-secondary/70 via-secondary/40 to-transparent blur-2xl opacity-60 z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.h1 
          className="font-jakarta text-4xl font-bold text-white mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Certificates
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-5 -m-5 md:p-8 md:-m-8" style={{ perspective: "1000px" }}>
          {certificates.map((cert) => (
            <motion.div
              key={cert._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="h-full"
            >
              <TiltCard cert={cert} />
            </motion.div>
          ))}
          {certificates.length === 0 && (
            <p className="text-gray-400 col-span-full">Belum ada sertifikat yang diunggah.</p>
          )}
        </div>
      </div>
    </div>
  );
}
