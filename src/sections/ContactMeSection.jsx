// src/sections/ContactMe.jsx
import { Element } from "react-scroll";
import { ContactForm } from "../components-ui/ContactForm";

function ContactMeSection() {
  return (
    <Element name="contact-anchor">
      <section
        id="section-contact"
        className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background px-4"
      >
        <ContactForm />
      </section>
    </Element>
  );
}

export default ContactMeSection;
