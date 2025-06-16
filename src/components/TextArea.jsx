// src/components/TextArea.jsx
"use client";
import * as React from "react";
import { cn } from "../utils/util";
import { useMotionTemplate, useMotionValue, motion } from "motion/react";

const TextArea = React.forwardRef(({ className, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            #A287F4,
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-lg p-[2px] transition duration-300"
    >
      <textarea
        ref={ref}
        className={cn(
          `shadow-input flex w-full rounded-md border-none
          bg-zinc-800 px-3 py-2 text-sm text-white
          transition duration-400 group-hover/input:shadow-none
          placeholder:text-neutral-400
          focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none
          disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[100px]`,
          className
        )}
        {...props}
      />
    </motion.div>
  );
});
TextArea.displayName = "TextArea";

export { TextArea };
