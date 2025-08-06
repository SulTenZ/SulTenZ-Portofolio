// src/components-ui/ContactForm.jsx
"use client";
import React from "react";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { TextArea } from "../components/TextArea";
import Button from "../components/Button";
import { cn } from "../utils/util";

export function ContactForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl bg-[#171717] border border-[#232323] shadow-none p-8">
      <h2 className="text-2xl font-bold text-white text-center mb-1">
        Contact Me
      </h2>
      <p className="mb-8 text-base text-neutral-400 text-center">
        Any questions, suggestions, or want to collaborate? Please fill out the form below!
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <LabelInputContainer>
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your Name" required />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="you@example.com" required />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Subject" required />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            required
            placeholder="Type your message here....."
          />
        </LabelInputContainer>
        <Button type="submit">
          Send Message &rarr;
        </Button>
      </form>
    </div>
  );
}

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col gap-2", className)}>{children}</div>
);
