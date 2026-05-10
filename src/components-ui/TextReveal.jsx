// src/components-ui/TextReveal.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLoading } from "../context/LoadingContext";

export const TextReveal = ({ text, className = "" }) => {
  const { appLoaded } = useLoading();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  // Split the text into words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.05 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(5px)",
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={appLoaded && isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="mr-[0.3em] inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};
