// src/sections/Lanyard.jsx
import Lanyard from "../components-ui/Lanyard";
import MoreButton from "../components/MoreButton";

function LanyardSection() {
  return (
    <section
      id="section-lanyard"
      className="relative w-full h-screen flex flex-col items-center justify-center bg-background"
    >
      <div className="w-full flex-1 flex items-center justify-center">
        <Lanyard position={[0, 0, 22]} gravity={[0, -40, 0]} />
      </div>

      <div className="pb-56 flex items-center justify-center">
        <MoreButton targetName="contact-anchor" />
      </div>
    </section>
  );
}

export default LanyardSection;