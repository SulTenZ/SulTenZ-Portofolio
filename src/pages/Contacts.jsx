// src/pages/Contacts.jsx
import Lanyard from "../components-ui/Lanyard";
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";

function Contacts() {
  return (
    <section className="w-full min-h-screen bg-background flex flex-col items-center justify-center py-0 px-0 relative overflow-hidden">
      {/* Lanyard 3D Card */}
      <div className="w-full flex items-center justify-center pt-16 pb-8 md:pb-12 md:pt-24 z-10">
        {/* 
          - Untuk mobile: scale down.
          - Untuk desktop: normal scale.
        */}
        <div className="w-full max-w-2xl h-[350px] md:h-[450px] flex items-center justify-center">
          <Lanyard position={[0, 0, 22]} gravity={[0, -40, 0]} />
        </div>
      </div>

      {/* Contact Form */}
      <div className="relative z-20 w-full flex justify-center">
        <div className="max-w-lg w-full bg-[#191919]/80 rounded-xl shadow-lg p-8 md:p-10 border border-[#232323]">
          <h1 className="font-jakarta text-3xl font-bold text-main mb-8 text-center">
            Contact Me
          </h1>
          <Form>
            <Input type="text" placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Input type="text" placeholder="Subject" required />
            <textarea
              className="font-dmsans px-4 py-2 rounded bg-[#232323] border border-secondary text-white focus:outline-none focus:ring-2 focus:ring-main transition min-h-[100px] resize-none"
              placeholder="Your Message"
              required
            />
            <Button type="submit">Send Message</Button>
          </Form>
        </div>
      </div>
    </section>
  );
}
export default Contacts;
