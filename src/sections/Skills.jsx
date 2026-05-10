// src/sections/Skills.jsx
import { Timeline } from "../components-ui/Timeline";
import { useMemo, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "../components-ui/TextReveal";

const itemVariants = {
  hidden: { opacity: 0, x: 30, scale: 0.8 },
  visible: {
    opacity: 1, x: 0, scale: 1,
    transition: { type: "spring", mass: 1, stiffness: 120, damping: 15 }
  }
};

const SkillIcon = ({ src, name }) => (
  <motion.div
    variants={itemVariants}
    className="relative w-[90px] h-[115px] text-neutral-400 group cursor-pointer"
    style={{ perspective: "1000px" }}
  >
    <div className="absolute top-0 inset-x-0 mx-auto w-[75px] h-[75px] flex items-center justify-center transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-110 transform-gpu">
      <img src={src} alt={name} className="w-[75px] h-[75px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="absolute top-[85px] inset-x-0 w-full text-center">
      <p className="text-sm font-jakarta leading-tight m-0 inline-block transition-colors duration-300 group-hover:text-white">{name}</p>
    </div>
  </motion.div>
);

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const groups = useQuery(api.skills.listGroupsWithSkills) || [];

  const premiumVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.9, rotateX: 15 },
    visible: {
      opacity: 1, y: 0, scale: 1, rotateX: 0,
      transition: { type: "spring", mass: 1.2, stiffness: 80, damping: 15 }
    }
  };

  const data = useMemo(() => {
    return groups.map((g) => ({
      title: g.name,
      content: (
        <motion.div
          className="flex flex-wrap justify-end gap-6 md:gap-8 mb-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                type: "spring", stiffness: 80, damping: 20,
                staggerChildren: 0.1, delayChildren: 0.1
              }
            },
          }}
        >
          {g.skills.map((s) => (
            <SkillIcon key={s.id} src={s.imageUrl} name={s.name} />
          ))}
        </motion.div>
      ),
    }));
  }, [groups]);

  return (
    <section ref={ref} className="w-full min-h-screen py-32 px-0 z-0" id="skills" style={{ perspective: "1000px" }}>
      <motion.div
        className="max-w-5xl mx-auto px-4"
        style={{ scale: parallaxScale }}
        variants={premiumVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <TextReveal
          text="Skills"
          className="font-jakarta text-4xl text-white font-bold mb-6 justify-center md:justify-start"
        />
        <Timeline data={data} />
      </motion.div>
    </section>
  );
}
