import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import BookingCTA from "@/components/contact/BookingCTA";

export const metadata: Metadata = {
  title: "Book Online | Beauty & Polish - 618 US Route 1, Scarborough, ME",
  description:
    "Book your nail or waxing appointment at Beauty & Polish in Scarborough, Maine. Online booking via Fresha. Walk-ins welcome.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="pt-8 sm:pt-16 pb-12 sm:pb-16 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Let's get you on the books."
          subtitle="Book online through Fresha anytime — it takes about 30 seconds. Walk-ins are also welcome when availability allows. For custom nail art or special requests, booking ahead gives Bebe time to prepare your design."
        />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </section>

      <BookingCTA />
    </PageTransition>
  );
}
