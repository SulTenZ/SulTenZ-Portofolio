// src/components-ui/Preloader.jsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Naikkan progress dari 0 ke 100
  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress(progress + 2), 15); // Speed bisa diatur
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsLoaded(true), 400); // Delay biar 100% ga langsung hilang
    }
  }, [progress]);

  // Beri sinyal ke parent kalau loading selesai
  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => onFinish(), 800); // Biar animasi slide up dulu
    }
  }, [isLoaded, onFinish]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="flex flex-col items-center">
            <span className="text-5xl font-extrabold text-main font-jakarta mb-2">
              {progress}%
            </span>
            <div className="w-40 h-2 bg-main/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-main rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs mt-4 text-gray-400 tracking-widest font-dmsans">
              Loading portfolio...
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
