"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/validation";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ContactFormValues = z.infer<typeof contactSchema>;
type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormError {
  message: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<FormError | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const formStartRef = useRef<number>(Date.now());
  const hasInteractedRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
      honeypot: "",
    },
  });

  const messageValue = watch("message") ?? "";
  const MAX_MESSAGE_LENGTH = 2000;

  const handleFirstInteraction = () => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      formStartRef.current = Date.now();
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setFormError(null);
    setSuccessMessage(null);

    try {
      const interactionDuration = Date.now() - formStartRef.current;
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          interactionDuration,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result?.message ?? "Unable to send your message.");
      }

      setStatus("success");
      setSuccessMessage(result.message ?? "Message sent successfully!");
      reset();
      hasInteractedRef.current = false;
      formStartRef.current = Date.now();
    } catch (error) {
      setStatus("error");
      setFormError({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending your message.",
      });
    }
  });

  const isButtonDisabled = !isValid || status === "submitting" || isSubmitting;

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

      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-6"
        onFocusCapture={handleFirstInteraction}
      >
        {/* Honeypot field for bots */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            tabIndex={-1}
            autoComplete="off"
            {...register("honeypot")}
          />
        </div>

        {/* Name and Email Row */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="transition-all focus:ring-2 focus:ring-primary/20"
              {...register("name")}
            />
            {errors.name && (
              <p
                id="name-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="transition-all focus:ring-2 focus:ring-primary/20"
              {...register("email")}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us more about your inquiry..."
            rows={6}
            aria-invalid={Boolean(errors.message)}
            aria-describedby="message-help message-error"
            maxLength={MAX_MESSAGE_LENGTH}
            className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
            {...register("message")}
          />
          <div
            id="message-help"
            className="flex items-center justify-between text-sm text-muted-foreground"
          >
            <span>Minimum 10 characters.</span>
            <span>
              {messageValue.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
          {errors.message && (
            <p
              id="message-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.message.message}
            </p>
          )}
        </div>

        <AnimatePresence>
          {formError && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
              role="alert"
            >
              <AlertCircle className="h-4 w-4" />
              <span>{formError.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === "success" && successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2 rounded-md bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500"
              role="status"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            I usually reply within 24 hours.
          </p>
          <Button
            type="submit"
            disabled={isButtonDisabled}
            className="inline-flex items-center gap-2"
          >
            {status === "submitting" || isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
