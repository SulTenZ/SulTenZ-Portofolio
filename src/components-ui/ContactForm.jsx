// src/components-ui/ContactForm.jsx
"use client";
import React, { useState } from "react";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import Button from "../components/Button";
import { cn } from "../utils/util";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

export function ContactForm() {
  const submitMessage = useAction(api.message.sendMessage);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const result = await submitMessage(formData);
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-[#171717] border border-[#232323] shadow-none p-8">
      <h2 className="text-2xl font-bold text-white text-center mb-1">
        Contact Me
      </h2>
      <p className="mb-8 text-base text-neutral-400 text-center">
        Any questions, suggestions, or want to collaborate? Please fill out the form below!
      </p>

      {status === "success" && (
        <div className="mb-4 p-3 bg-green-900/30 border border-green-800 text-green-400 rounded-md text-sm text-center">
          Pesan berhasil dikirim!
        </div>
      )}
      
      {status === "error" && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-800 text-red-400 rounded-md text-sm text-center">
          Gagal mengirim pesan. Silakan coba lagi.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <LabelInputContainer>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            placeholder="Your Name" 
            required 
            value={formData.name}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="subject">Subject</Label>
          <Input 
            id="subject" 
            placeholder="Subject" 
            required 
            value={formData.subject}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            required
            placeholder="Type your message here..."
            value={formData.message}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "Send Message \u2192"}
        </Button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col gap-2", className)}>{children}</div>
);