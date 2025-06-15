// src/pages/Contacts.jsx
import Form from "../components/Form";
import Input from "../components/Input";
import Button from "../components/Button";

function Contacts() {
  return (
    <div className="max-w-lg mx-auto py-16 px-4">
      <h1 className="font-jakarta text-3xl font-bold text-main mb-8">Contact Me</h1>
      <Form>
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Input type="text" placeholder="Subject" required />
        <textarea
          className="font-dmsans px-4 py-2 rounded bg-[#232323] border border-secondary text-white focus:outline-none focus:ring-2 focus:ring-main transition min-h-[100px]"
          placeholder="Your Message"
          required
        />
        <Button type="submit">Send Message</Button>
      </Form>
    </div>
  );
}
export default Contacts;
