// src/components-ui/CursorOrbs.jsx
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLoading } from "../context/LoadingContext";

export default function CursorOrbs() {
  const { appLoaded } = useLoading();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig1 = { damping: 25, stiffness: 300, mass: 0.5 };
  const springConfig2 = { damping: 40, stiffness: 200, mass: 0.8 };

  const x1 = useSpring(cursorX, springConfig1);
  const y1 = useSpring(cursorY, springConfig1);
  const x2 = useSpring(cursorX, springConfig2);
  const y2 = useSpring(cursorY, springConfig2);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    
    // Only active on devices with a fine pointer (mouse)
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("mousemove", moveCursor);
    }

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={appLoaded ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 2.0, duration: 1.5 }}
      className="pointer-events-none fixed inset-0 z-[9999] hidden sm:block overflow-hidden"
    >
      <motion.div
        className="absolute left-[-20px] top-[-20px] w-10 h-10 rounded-full bg-main/60 blur-[15px] mix-blend-screen"
        style={{ x: x1, y: y1 }}
      />
      <motion.div
        className="absolute left-[-40px] top-[-40px] w-20 h-20 rounded-full bg-secondary/30 blur-[30px] mix-blend-screen"
        style={{ x: x2, y: y2 }}
      />
    </motion.div>
  );
}
