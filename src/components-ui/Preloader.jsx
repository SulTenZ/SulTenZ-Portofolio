// src/components-ui/Preloader.jsx
"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

export default function Preloader({ onFinish }) {
  const [phase, setPhase] = useState("reveal");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const pulseTimer = setTimeout(() => setPhase("pulse"), 1500);
    const exitTimer = setTimeout(() => setPhase("exit"), 2200);
    const hideTimer = setTimeout(() => setIsVisible(false), 2200);
    const finishTimer = setTimeout(() => onFinish(), 3200);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  // Staggered letter reveal for "SULTENZ"
  const brandName = "SULTENZ";
  const letterVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.6 + i * 0.06,
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Logo */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 1.5, filter: "blur(20px)", opacity: 0 }}
            animate={
              phase === "reveal"
                ? { scale: 1, filter: "blur(0px)", opacity: 1 }
                : phase === "pulse"
                ? { scale: 1, filter: "blur(0px)", opacity: 1 }
                : { scale: 0.9, filter: "blur(0px)", opacity: 0 }
            }
            transition={
              phase === "reveal"
                ? { duration: 1.4, ease: [0.33, 1, 0.68, 1] }
                : phase === "pulse"
                ? { duration: 0.3 }
                : { duration: 0.4, ease: "easeIn" }
            }
          >
            <img
              src={logo}
              alt="SulTenZ Logo"
              className="w-28 h-28 md:w-40 md:h-40 object-contain"
            />
          </motion.div>

          {/* Brand name with staggered letter reveal */}
          <div className="flex overflow-hidden mt-6">
            {brandName.split("").map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="text-sm md:text-base font-dmsans tracking-[0.4em] text-white/60"
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
