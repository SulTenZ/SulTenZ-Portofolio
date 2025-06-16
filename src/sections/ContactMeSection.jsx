// src/sections/ContactMe.jsx
import { Element } from "react-scroll";
import { ContactForm } from "../components-ui/ContactForm"; // pastikan path-nya benar

function ContactMeSection() {
  return (
    <Element name="contact-anchor">
      <section
        id="section-contact"
        className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background px-4"
      >
        {/* Form sudah mengandung box + heading */}
        <ContactForm />
      </section>
    </Element>
  );
}

export default ContactMeSection;
