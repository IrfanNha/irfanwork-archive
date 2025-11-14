"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormError {
  message: string;
  remainingTime?: number;
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<FormError | null>(null);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const recaptchaScriptRef = useRef<HTMLScriptElement | null>(null);

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  // Load reCAPTCHA script
  useEffect(() => {
    if (!recaptchaSiteKey) {
      console.warn("NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set");
      return;
    }

    // Check if script is already loaded
    if (window.grecaptcha) {
      setRecaptchaLoaded(true);
      return;
    }

    // Check if script element already exists
    const existingScript = document.querySelector('script[src*="recaptcha"]');
    if (existingScript) {
      // Wait for it to load
      const checkInterval = setInterval(() => {
        if (window.grecaptcha) {
          setRecaptchaLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    // Create and inject script
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setRecaptchaLoaded(true);
        });
      }
    };
    document.head.appendChild(script);
    recaptchaScriptRef.current = script;

    return () => {
      // Cleanup: remove script if component unmounts
      if (recaptchaScriptRef.current && recaptchaScriptRef.current.parentNode) {
        recaptchaScriptRef.current.parentNode.removeChild(recaptchaScriptRef.current);
      }
    };
  }, [recaptchaSiteKey]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Clear error when user starts typing
    if (error) {
      setError(null);
      setStatus("idle");
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    // Validate reCAPTCHA is loaded
    if (!recaptchaLoaded || !window.grecaptcha) {
      setError({
        message: "reCAPTCHA is not loaded. Please refresh the page and try again.",
      });
      setStatus("error");
      return;
    }

    try {
      // Get reCAPTCHA token
      let recaptchaToken = "";
      try {
        recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, {
          action: "contact_form",
        });
      } catch (recaptchaError) {
        console.error("reCAPTCHA execution error:", recaptchaError);
        setError({
          message: "Failed to verify you're human. Please try again.",
        });
        setStatus("error");
        return;
      }

      // Send to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle rate limiting
        if (response.status === 429) {
          setError({
            message: data.error || "Too many requests. Please wait a moment.",
            remainingTime: data.remainingTime,
          });
        } else {
          // Show detailed error in development, generic in production
          const errorMessage = data.details && process.env.NODE_ENV === 'development'
            ? `${data.error || "Failed to send message"}: ${data.details}`
            : data.error || "Failed to send message. Please try again.";
          
          console.error("Contact form error:", {
            status: response.status,
            error: data.error,
            details: data.details,
            fullResponse: data,
          });
          
          setError({
            message: errorMessage,
          });
        }
        setStatus("error");
        return;
      }

      // Success
      setStatus("success");
      
      // Clear form after a short delay
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setStatus("idle");
      }, 3000);
    } catch (fetchError) {
      console.error("Form submission error:", fetchError);
      setError({
        message: "Network error. Please check your connection and try again.",
      });
      setStatus("error");
    }
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
            minLength={10}
            disabled={status === "submitting"}
            className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
          />
          <p className="text-xs text-muted-foreground">
            {formData.message.length} / 5000 characters
            {formData.message.length > 0 && formData.message.length < 10 && (
              <span className="text-destructive ml-2">
                (minimum 10 characters)
              </span>
            )}
          </p>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive">
                  {error.message}
                </p>
                {error.remainingTime && (
                  <p className="text-xs text-destructive/80 mt-1">
                    Please wait {error.remainingTime} seconds before trying again.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Message sent successfully! I&apos;ll get back to you soon.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting" || status === "success" || !recaptchaLoaded}
            className="min-w-[140px] group"
          >
            {status === "submitting" && (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
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
        </div>

        {/* reCAPTCHA Compliance Notice */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          This site is protected by reCAPTCHA and the Google{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </form>
    </motion.div>
  );
}
