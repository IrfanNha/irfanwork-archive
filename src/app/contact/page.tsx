import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactInfo } from "@/components/contact/contact-info";
import { PERSONAL_INFO } from "@/constants/home";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${PERSONAL_INFO.name}. I'd love to hear from you and answer any questions you may have.`,
  openGraph: {
    title: `Contact | ${PERSONAL_INFO.name}`,
    description: `Get in touch with ${PERSONAL_INFO.name}. I'd love to hear from you and answer any questions you may have.`,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Container>
        <div className="py-12 md:py-16 lg:py-20">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Have a question or want to collaborate? I&apos;d love to hear from
              you. Send me a message and I&apos;ll respond as soon as possible.
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
              {/* Contact Form - Takes 2 columns */}
              <div className="lg:col-span-2">
                <ContactForm />
              </div>

              {/* Contact Info Sidebar - Takes 1 column */}
              <div className="lg:col-span-1">
                <ContactInfo />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
