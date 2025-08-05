// src/sections/Footer.jsx
import { TextHoverEffect } from "../components-ui/TextHoverEffect";

function Footer() {
  return (
    <footer className="w-full py-8 bg-[#181818] flex flex-col items-center justify-center gap-4">
      <div className="w-full flex items-center justify-center" style={{ minHeight: 110 }}>
        <TextHoverEffect text="SULTAN A.G" duration={0.5} width={320} height={90} />
      </div>
      <div className="text-gray-400 font-dmsans text-sm text-center">
        &copy; {new Date().getFullYear()} Sultan Akmal Ghiffari. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;
