// src/sections/Lanyard.jsx
import Lanyard from "../components-ui/Lanyard";
import MoreButton from "../components/MoreButton";

function LanyardSection() {
  return (
    <section
      id="section-lanyard"
      className="relative w-full h-screen flex flex-col items-center justify-center bg-background overflow-hidden"
    >
      <div className="w-full max-w-2xl flex items-center justify-center">
        <div className="w-full h-[350px] md:h-[450px] flex items-center justify-center">
          <Lanyard position={[0, 0, 22]} gravity={[0, -40, 0]} />
        </div>
      </div>
      {/* MoreButton scrolls to contact-anchor */}
      <div className="mt-12 flex items-center justify-center">
        <MoreButton targetName="contact-anchor" />
      </div>
    </section>
  );
}

export default LanyardSection;
