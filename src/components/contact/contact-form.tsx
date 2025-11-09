"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate success (in real app, handle actual API call)
    setStatus("success");

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" });
      setStatus("idle");
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm"
    >
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Send a Message</h2>
        <p className="text-muted-foreground">
          Fill out the form below and I&apos;ll get back to you shortly
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Email Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              disabled={status === "submitting"}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              disabled={status === "submitting"}
              className="transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Subject */}
        <div className="space-y-2">
          <Label htmlFor="subject">
            Subject <span className="text-destructive">*</span>
          </Label>
          <Input
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="How can we help you?"
            required
            disabled={status === "submitting"}
            className="transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your inquiry..."
            rows={6}
            required
            disabled={status === "submitting"}
            className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-xs text-muted-foreground">
            {formData.message.length} / 1000 characters
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting" || status === "success"}
            className="min-w-[140px] group"
          >
            {status === "submitting" && (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Sending...
              </>
            )}
            {status === "success" && (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Sent!
              </>
            )}
            {status === "idle" && (
              <>
                <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                Send Message
              </>
            )}
            {status === "error" && (
              <>
                <AlertCircle className="w-4 h-4 mr-2" />
                Try Again
              </>
            )}
          </Button>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm text-green-600 dark:text-green-400"
            >
              Message sent successfully!
            </motion.p>
          )}
        </div>
      </form>
    </motion.div>
  );
}
