// src/sections/SliderTextHover.jsx
import React from "react";
import { TextHoverEffect } from "../components-ui/TextHoverEffect";

function SliderTextHover() {
  return (
    <section className="w-full min-h-[350px] flex items-center justify-center bg-background">
      <div className="w-full flex items-center justify-center py-16">
        <TextHoverEffect text="MY SKILLS" duration={0.5} />
      </div>
    </section>
  );
}

export default SliderTextHover;
