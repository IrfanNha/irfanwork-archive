"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, MessageSquare } from "lucide-react";

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
    description: "Mon-Fri from 9am to 6pm",
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
    icon: "🐙",
    link: PERSONAL_INFO.socialLinks.github,
    color: "hover:text-purple-500",
  },
  {
    name: "LinkedIn",
    icon: "💼",
    link: PERSONAL_INFO.socialLinks.linkedin,
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: "𝕏",
    link: PERSONAL_INFO.socialLinks.twitter || "https://twitter.com",
    color: "hover:text-blue-400",
  },
  {
    name: "Instagram",
    icon: "📷",
    link: PERSONAL_INFO.socialLinks.instagram,
    color: "hover:text-pink-500",
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Contact Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card border border-border rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Contact Information
        </h3>

        <div className="space-y-5">
          {contactDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <detail.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {detail.title}
                  </p>
                  {detail.link ? (
                    <a
                      href={detail.link}
                      className="font-semibold text-foreground hover:text-primary transition-colors break-words"
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
                    <p className="font-semibold text-foreground">
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
        className="bg-card border border-border rounded-lg p-6 shadow-sm"
      >
        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Stay connected on social media
        </p>

        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-md group ${social.color}`}
            >
              <span className="text-2xl">{social.icon}</span>
              <span className="text-sm font-medium">{social.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Quick Response Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border border-primary/20 rounded-lg p-6"
      >
        <h3 className="text-lg font-bold mb-2">Quick Response</h3>
        <p className="text-sm text-muted-foreground">
          I typically respond within 24 hours during business days. For urgent
          matters, please reach out via email or phone directly.
        </p>
      </motion.div>
    </div>
  );
}
