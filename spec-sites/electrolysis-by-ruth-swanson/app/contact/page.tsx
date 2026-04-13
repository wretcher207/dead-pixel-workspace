'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react'
import PageHero from '@/components/PageHero'
import ContactCard from '@/components/ContactCard'
import HoursCard from '@/components/HoursCard'
import { business } from '@/content/business'

interface FormState {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate submission (replace with real endpoint)
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
  }

  const serviceOptions = [
    'Free Consultation',
    'Facial Electrolysis',
    'Body Electrolysis',
    'Sensitive Area Treatment',
    'Gender-Affirming Electrolysis',
    'General Question',
    'Other',
  ]

  return (
    <>
      <PageHero
        label="Contact"
        title="Get in Touch"
        subtitle="New clients always start with a free consultation. Call, email, or fill out the form below — Ruth will be in touch promptly."
        align="left"
      />

      <section className="section-padding bg-ivory">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-5">
              <ContactCard
                icon={Phone}
                label="Phone"
                value={business.phoneFormatted}
                href={`tel:${business.phone}`}
                subValue="Best reached by phone or form"
              />
              <ContactCard
                icon={Mail}
                label="Email"
                value={business.email}
                href={`mailto:${business.email}`}
                subValue="Replies within 1–2 business days"
              />
              <ContactCard
                icon={MapPin}
                label="Location"
                value={business.address.full}
                href={business.address.mapUrl}
                subValue="Private studio — directions provided at booking"
              />

              <HoursCard />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-blush-light/40 rounded-2xl border border-blush/30 p-6"
              >
                <MessageSquare size={18} strokeWidth={1.5} className="text-rose mb-3" />
                <h3 className="font-serif text-lg text-charcoal mb-2">New Clients</h3>
                <p className="font-sans text-sm font-300 text-warm-gray leading-relaxed">
                  {business.appointmentPolicy}
                </p>
              </motion.div>

              {/* Quick FAQ links */}
              <div className="bg-ivory-200 rounded-2xl border border-parchment/60 p-5">
                <p className="font-sans text-xs font-500 tracking-[0.1em] uppercase text-mist mb-4">Quick Resources</p>
                <div className="space-y-2">
                  {[
                    { label: 'How electrolysis works', href: '/journal/understanding-permanent-hair-removal' },
                    { label: 'Your first consultation', href: '/journal/what-to-expect-first-consultation' },
                    { label: 'FAQ', href: '/faq' },
                    { label: 'Services & pricing', href: '/services' },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between font-sans text-sm text-warm-gray hover:text-charcoal transition-colors duration-150 group py-1"
                    >
                      <span>{link.label}</span>
                      <ArrowRight size={13} strokeWidth={1.5} className="text-mist group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-ivory-200 rounded-2xl border border-parchment/60 p-8 shadow-soft"
              >
                {status === 'success' ? (
                  <div className="py-12 text-center">
                    <div className="w-14 h-14 rounded-full bg-blush-light flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={24} strokeWidth={1.5} className="text-rose" />
                    </div>
                    <h2 className="font-serif text-2xl text-charcoal mb-3">Message Received</h2>
                    <p className="font-sans text-sm font-300 text-warm-gray max-w-sm mx-auto leading-relaxed">
                      Ruth will be in touch with you shortly. If your matter is urgent, call directly at{' '}
                      <a href={`tel:${business.phone}`} className="text-rose hover:underline">
                        {business.phoneFormatted}
                      </a>
                      .
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h2 className="font-serif text-2xl text-charcoal mb-2">
                      Book a Consultation or Ask a Question
                    </h2>
                    <p className="font-sans text-sm font-300 text-warm-gray mb-8">
                      Fill out the form and Ruth will follow up directly. Free consultations for all new clients.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-sans text-xs font-500 tracking-[0.1em] uppercase text-warm-gray mb-2"
                        >
                          Name <span className="text-rose" aria-hidden="true">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full bg-ivory border border-parchment rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder:text-mist/60 focus:outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-sans text-xs font-500 tracking-[0.1em] uppercase text-warm-gray mb-2"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="(207) 000-0000"
                          className="w-full bg-ivory border border-parchment rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder:text-mist/60 focus:outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/20 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block font-sans text-xs font-500 tracking-[0.1em] uppercase text-warm-gray mb-2"
                      >
                        Email <span className="text-rose" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className="w-full bg-ivory border border-parchment rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder:text-mist/60 focus:outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/20 transition-colors"
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="service"
                        className="block font-sans text-xs font-500 tracking-[0.1em] uppercase text-warm-gray mb-2"
                      >
                        Area of Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full bg-ivory border border-parchment rounded-xl px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/20 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="">Select a service or topic</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-7">
                      <label
                        htmlFor="message"
                        className="block font-sans text-xs font-500 tracking-[0.1em] uppercase text-warm-gray mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell Ruth a bit about what you're hoping to accomplish, or ask whatever questions are on your mind."
                        className="w-full bg-ivory border border-parchment rounded-xl px-4 py-3 font-sans text-sm text-charcoal placeholder:text-mist/60 focus:outline-none focus:border-rose/60 focus:ring-2 focus:ring-rose/20 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full bg-charcoal text-ivory font-sans text-sm font-500 tracking-[0.08em] uppercase py-4 rounded-full hover:bg-rose-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? 'Sending…' : 'Send Message'}
                    </button>
                    <p className="font-sans text-xs text-mist text-center mt-4">
                      Your information is private and will not be shared.
                    </p>
                  </form>
                )}
              </motion.div>

              {/* Map placeholder */}
              <div className="mt-5 rounded-2xl overflow-hidden border border-parchment/60 shadow-soft h-48 bg-ivory-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={20} strokeWidth={1.5} className="text-rose mx-auto mb-2" />
                  <p className="font-sans text-sm font-300 text-warm-gray">262 Main St, Waterville, ME 04901</p>
                  <a
                    href={business.address.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-rose hover:text-rose-dark mt-1 block"
                  >
                    Open in Google Maps →
                  </a>
                  <p className="font-sans text-[0.65rem] text-mist mt-2">Map embed goes here (Google Maps iframe)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
