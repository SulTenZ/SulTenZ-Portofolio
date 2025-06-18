// src/sections/About.jsx
import { AnimatedTestimonials } from "../components-ui/AnimatedTestimonial";
import about1 from "../assets/about-1.jpg";
import about2 from "../assets/about-2.jpg";
import about3 from "../assets/about-3.jpg";

const aboutSections = [
  {
    name: "Introduction",
    designation: "Hi :)",
    quote:
      "Hello! I'm Sultan, passionate about web development and digital creation. I love building things with React, Tailwind, and modern web technologies. Always open for new challenges and collaboration opportunities.",
    src: about1,
  },
  {
    name: "My Campus Life",
    designation: "UTY Informatika Semester 6",
    quote:
      "I'm currently a 6th semester Informatics student at Universitas Teknologi Yogyakarta (UTY). My daily life is all about coding, learning, and growing as a web developer. Campus projects and building real-world apps keep me busy and motivated.",
    src: about2,
  },
  {
    name: "My Other Side",
    designation: "Deadlift lu berapa kg bos?",
    quote:
      "Beyond coding, I'm (trying to be) a gym addict. Sometimes lifting, sometimes just lifting spirits :>",
    src: about3,
  },
];

function About() {
  return (
    <section className="relative w-full min-h-screen py-32 px-0 bg-background" id="about">
      {/* Bola gradient main kiri bawah */}
      <div className="pointer-events-none absolute left-[-80px] bottom-[-80px] w-60 h-60 md:w-80 md:h-80 rounded-full 
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
            from-main/70 via-main/40 to-transparent blur-2xl opacity-60 z-0" />
      {/* Bola gradient secondary kanan atas */}
      <div className="pointer-events-none absolute right-0 top-0 w-48 h-48 md:w-72 md:h-72 rounded-full 
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
            from-secondary/70 via-secondary/40 to-transparent blur-2xl opacity-60 z-0" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <h2 className="font-jakarta text-4xl text-white font-bold mb-8">About Me</h2>
        <AnimatedTestimonials testimonials={aboutSections} autoplay />
      </div>
    </section>
  );
}
export default About;
