import Orb from "../components-ui/Orb";
import { FlipWords } from "../components-ui/FlipWords";
import { ColourfulText } from "../components-ui/ColorfulText";
import { motion } from "framer-motion";
import { useLoading } from "../context/LoadingContext";

function Hero() {
  const { appLoaded } = useLoading();
  const flipWords = ["WEB DEVELOPMENT", "AND MOBILE DEVELOPMENT"];
  const flipWordClassMap = {
    "WEB DEVELOPMENT": "text-main font-bold",
    "AND MOBILE DEVELOPMENT": "text-secondary font-bold",
  };

  return (
    <section id="home" className="w-full h-screen min-h-[540px] relative overflow-hidden flex items-center justify-center">
      <motion.div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={appLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5, duration: 2 }}
      >
        <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
      </motion.div>
      <div className="w-full h-full flex items-center justify-center px-3 md:px-4 relative z-10">
        <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[900px] w-full mx-auto flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={appLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-6xl font-jakarta font-extrabold mb-5 md:mb-6 text-white flex flex-wrap items-center gap-2 md:gap-3 justify-center text-center"
          >
            <span className="text-white">HI ! I'M</span>
            <span>
              <ColourfulText text="SULTAN^^" />
            </span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={appLoaded ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="font-dmsans text-sm sm:text-lg md:text-2xl text-gray-200 mb-3 md:mb-4 tracking-widest flex flex-col gap-2 items-center text-center"
          >
            I BUILD & LEARN ABOUT{" "}
            <FlipWords
              words={flipWords}
              duration={3000}
              classMap={flipWordClassMap}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;