import { motion } from "framer-motion";
import { scroller } from "react-scroll";

export default function MoreButton({ targetName = null, offset = 0 }) {
  const handleClick = () => {
    if (targetName) {
      scroller.scrollTo(targetName, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: offset, // bisa atur offset jika perlu
      });
    } else {
      window.scrollBy({
        top: window.innerHeight + offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.93 }}
      whileHover={{ y: 4 }}
      className="
        flex items-center justify-center
        w-14 h-14 rounded-full
        bg-background
        hover:bg-main/100
        transition-all duration-200
        shadow-lg
        border-2 border-white
        cursor-pointer
        ring-2 ring-background/80
        backdrop-blur
      "
      aria-label="Scroll ke bawah"
      type="button"
    >
      {/* Chevron Down Icon */}
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </motion.button>
  );
}
