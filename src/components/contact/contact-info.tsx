"use client";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { PERSONAL_INFO } from "@/constants/home";

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    content: PERSONAL_INFO.email,
    link: `mailto:${PERSONAL_INFO.email}`,
    description: "Send me an email anytime",
  },
  {
    icon: Phone,
    title: "Phone",
    content: PERSONAL_INFO.contact.phoneDisplay,
    link: `tel:${PERSONAL_INFO.contact.phone}`,
    description: "Mon–Fri from 9am to 6pm",
  },
  {
    icon: MapPin,
    title: "Location",
    content: PERSONAL_INFO.location,
    link: "https://maps.google.com/?q=Semarang,Indonesia",
    description: "Based in Central Java",
  },
  {
    icon: Clock,
    title: "Working Hours",
    content: PERSONAL_INFO.contact.workingHours.weekdays,
    description: `Weekend: ${PERSONAL_INFO.contact.workingHours.weekend}`,
  },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    link: PERSONAL_INFO.socialLinks.github,
    color: "hover:text-gray-400",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    link: PERSONAL_INFO.socialLinks.linkedin,
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter (X)",
    icon: Twitter,
    link: PERSONAL_INFO.socialLinks.twitter || "https://twitter.com",
    color: "hover:text-sky-500",
  },
  {
    name: "Instagram",
    icon: Instagram,
    link: PERSONAL_INFO.socialLinks.instagram,
    color: "hover:text-pink-500",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-5 sm:space-y-6 w-full">
      {/* Contact Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-6 md:p-7 w-full overflow-hidden"
      >
        <h3 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <span>Contact Information</span>
        </h3>
        <div className="space-y-4 sm:space-y-5">
          {contactDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <detail.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">
                    {detail.title}
                  </p>
                  {detail.link ? (
                    <a
                      href={detail.link}
                      className="text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors break-words block"
                      target={
                        detail.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        detail.link.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {detail.content}
                    </a>
                  ) : (
                    <p className="text-sm sm:text-base font-semibold text-foreground break-words">
                      {detail.content}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {detail.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Social Links Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-xl border border-border/60 bg-card/80 p-4 shadow-sm sm:p-6 md:p-7"
      >
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
          <span>Follow Me</span>
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6">
          Stay connected on social media
        </p>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              className={`flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md group ${social.color}`}
            >
              <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-current transition-colors flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium truncate">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Quick Response Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-xl border border-primary/30 bg-primary/5 p-4 sm:p-6 text-center sm:text-left"
      >
        <h3 className="text-base sm:text-lg font-bold mb-2">Quick Response</h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          I typically respond within 24 hours during business days. For urgent
          matters, please reach out via email or phone directly.
        </p>
      </motion.div>
    </div>
  );
}
