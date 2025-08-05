// src/components/Button.jsx
"use client";
import { cn } from "../utils/util";

function BottomGradient() {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full 
        bg-gradient-to-r from-transparent via-[#A287F4] to-transparent 
        opacity-0 transition duration-500 group-hover/btn:opacity-100"
      />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 
        bg-gradient-to-r from-transparent via-[#A287F4] to-transparent 
        opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
      />
    </>
  );
}

function Button({ children, className = "", ...props }) {
  return (
    <button
      className={cn(
        "group/btn relative block h-12 w-full rounded-lg bg-zinc-800 font-semibold text-lg text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] transition",
        className
      )}
      {...props}
    >
      {children}
      <BottomGradient />
    </button>
  );
}
export default Button;
