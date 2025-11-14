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
    <div className="min-h-screen w-full overflow-x-hidden">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Header Section */}
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16 px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Have a question or want to collaborate? I&apos;d love to hear from
              you. Send me a message and I&apos;ll respond as soon as possible.
            </p>
          </div>

          {/* Main Content */}
          <div className="mx-auto max-w-6xl w-full">
            <div className="grid gap-6 sm:gap-8 lg:gap-10 lg:grid-cols-[1fr,2fr]">
              {/* Contact Info - Order reversed on mobile for better UX */}
              <div className="order-2 lg:order-1 w-full">
                <ContactInfo />
              </div>

              {/* Contact Form */}
              <div className="order-1 lg:order-2 w-full">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
