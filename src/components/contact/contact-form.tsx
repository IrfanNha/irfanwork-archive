"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";

// -----------------
// VALIDATION
// -----------------

const MAX_MESSAGE_LENGTH = 500;

const ContactSchema = z.object({
  name: z.string().min(2, "Name is too short."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message is too short.").max(MAX_MESSAGE_LENGTH),
  honeypot: z.string().optional(),
  "h-captcha-response": z.string().min(1, "Please complete the captcha."),
});

type ContactType = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [interactionStart, setInteractionStart] = useState<number | null>(null);

  const captchaRef = useRef<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactType>({
    resolver: zodResolver(ContactSchema),
    mode: "onBlur",
  });

  const messageValue = watch("message") ?? "";

  const handleFirstInteraction = () => {
    if (!interactionStart) setInteractionStart(Date.now());
  };

  // --------------------------------
  // Captcha callback
  // --------------------------------
  const onHCaptchaChange = (token: string) => {
    setValue("h-captcha-response", token, { shouldValidate: true });
  };

  // --------------------------------
  // SUBMIT
  // --------------------------------

  const onSubmit = async (data: ContactType) => {
    if (data.honeypot) return; // bot

    setStatus("sending");

    const formData = new FormData();
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY!);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("h-captcha-response", data["h-captcha-response"]);
    formData.append(
      "interactionDuration",
      String(Date.now() - (interactionStart || Date.now()))
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        reset();
        captchaRef.current?.resetCaptcha();
      } else {
        setStatus("error");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
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
          Fill out the form below and I&apos;ll get back to you shortly.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        onFocusCapture={handleFirstInteraction}
        className="space-y-6"
      >
        {/* Honeypot */}
        <div className="sr-only">
          <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
        </div>

        {/* Row: Name + Email */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              aria-invalid={!!errors.name}
              className="transition-all focus:ring-2 focus:ring-primary/20"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
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
              aria-invalid={!!errors.email}
              className="transition-all focus:ring-2 focus:ring-primary/20"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
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
            rows={6}
            placeholder="Tell me more about your inquiry..."
            maxLength={MAX_MESSAGE_LENGTH}
            className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
            {...register("message")}
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Minimum 10 characters.</span>
            <span>
              {messageValue.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
          {errors.message && (
            <p className="text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        {/* --------------------- */}
        {/* hCaptcha */}
        {/* --------------------- */}
        <div className="pt-2">
          <HCaptcha
            ref={captchaRef}
            sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
            reCaptchaCompat={false}
            onVerify={onHCaptchaChange}
          />
          {errors["h-captcha-response"] && (
            <p className="text-sm text-destructive mt-2">
              {errors["h-captcha-response"].message}
            </p>
          )}
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              <AlertCircle className="h-4 w-4" />
              Something went wrong. Try again.
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2 rounded-md bg-emerald-500/10 px-3 py-2 text-sm text-emerald-500"
            >
              <CheckCircle className="h-4 w-4" />
              Your message was sent successfully!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer + Button */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            I usually reply within 24 hours.
          </p>

          <Button
            type="submit"
            disabled={isSubmitting || status === "sending"}
            className="inline-flex items-center gap-2"
          >
            {isSubmitting || status === "sending" ? (
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
