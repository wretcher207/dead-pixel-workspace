import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import OwnerStory from "@/components/about/OwnerStory";
import AwardShowcase from "@/components/about/AwardShowcase";
import ClayCard from "@/components/ui/ClayCard";
import BookingCTA from "@/components/contact/BookingCTA";

export const metadata: Metadata = {
  title: "About Beauty & Polish | Women-Owned Nail Salon",
  description:
    "Meet Bebe and Lindsay at Beauty & Polish in Dunstan, Scarborough. Women-owned, Fresha Best in Class 2026, and 100% recommended on 48 reviews.",
};

const values = [
  {
    icon: (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 text-white shadow-clay-button">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
      </div>
    ),
    title: "Women-Owned",
  },
  {
    icon: (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-clay-button">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </div>
    ),
    title: "Attention to Detail",
  },
  {
    icon: (
      <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-clay-button">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>
      </div>
    ),
    title: "Warm Welcome",
  },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <section className="pt-8 sm:pt-16 pb-12 sm:pb-16 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading title="The artist behind the chair." />
      </section>

      <OwnerStory />
      <AwardShowcase />

      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value) => (
            <ClayCard key={value.title} hover variant="glass">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{value.icon}</div>
                <h3
                  className="text-lg font-bold text-clay-foreground"
                  style={{ fontFamily: "var(--font-nunito), sans-serif" }}
                >
                  {value.title}
                </h3>
              </div>
            </ClayCard>
          ))}
        </div>
      </section>

      <BookingCTA />
    </PageTransition>
  );
}
