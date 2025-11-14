"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import HCaptcha from "@hcaptcha/react-hcaptcha";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react";

import { contactSchema, type ContactFormData } from "@/lib/validation";

const MAX_MESSAGE_LENGTH = 500;

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
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const messageValue = watch("message") ?? "";

  const handleFirstInteraction = () => {
    if (!interactionStart) setInteractionStart(Date.now());
  };

  const onHCaptchaChange = (token: string) => {
    setValue("h-captcha-response", token, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return;

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
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-6 md:p-8 w-full overflow-hidden"
    >
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <h2 className="text-xl font-bold sm:text-2xl md:text-3xl">
          Send a Message
        </h2>
        <p className="text-sm text-muted-foreground sm:text-base">
          Fill out the form below and I&apos;ll get back to you shortly
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        onFocusCapture={handleFirstInteraction}
        className="space-y-5 sm:space-y-6"
      >
        <div className="sr-only">
          <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              aria-invalid={!!errors.name}
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
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="message"
            rows={6}
            maxLength={MAX_MESSAGE_LENGTH}
            className="resize-none"
            {...register("message")}
          />
          <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
            <span>Minimum 10 characters.</span>
            <span>
              {messageValue.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>

          {errors.message && (
            <p className="text-sm text-destructive">{errors.message.message}</p>
          )}
        </div>

        <HCaptcha
          ref={captchaRef}
          sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
          reCaptchaCompat={false}
          onVerify={onHCaptchaChange}
        />

        {errors["h-captcha-response"] && (
          <p className="text-sm text-destructive mt-2 text-center sm:text-left px-2">
            {errors["h-captcha-response"].message}
          </p>
        )}

        <AnimatePresence>
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>Something went wrong. Try again.</span>
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
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Your message was sent successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            I usually reply within 24 hours.
          </p>

          <Button
            type="submit"
            disabled={isSubmitting || status === "sending"}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto"
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
