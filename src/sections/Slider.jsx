// src/sections/Slider.jsx
import ScrollVelocity from "../components-ui/ScrollVelocity";

function Slider() {
  return (
    <section className="w-full bg-background py-4 relative overflow-hidden">
      <ScrollVelocity
        texts={[
          "Sultan Akmal Ghiffari",
          "Front-End King",
        ]}
        className="text-white text-3xl md:text-5xl font-extrabold px-4"
        velocity={100}
        numCopies={6}
        parallaxClassName="h-[3.5rem] md:h-[5rem] flex items-center"
        scrollerClassName=""
        parallaxStyle={{}}
        scrollerStyle={{}}
      />
    </section>
  );
}

export default Slider;
