// src/pages/Contact.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Facebook, Send } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/home/Footer";

const container = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.06 * i, duration: 0.3 } }) };

export default function ContactPage() {
  const [toast, setToast] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    await new Promise((r) => setTimeout(r, 650));
    setToast("Message sent ✉️ Thanks! We'll get back to you shortly.");
    setTimeout(() => setToast(null), 2800);
    form.reset();
  }

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-fire-red-98 overflow-hidden text-dark">
        <motion.div aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-fire-red/10 blur-3xl" />
          <div className="absolute bottom-[-120px] right-1/4 h-72 w-72 rounded-full bg-fire-red/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-yellow-50/10 blur-3xl" />
        </motion.div>

        {toast && (
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full bg-white text-dark px-4 py-2 shadow-lg border border-outline-default">
            <span className="text-sm">{toast}</span>
          </motion.div>
        )}

        <section className="relative z-10 mx-auto max-w-6xl px-4 pb-6 pt-28 md:px-6 md:pb-10">
          <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start gap-5 md:gap-6">
            <motion.h1 variants={item} custom={0} className="text-4xl font-bold tracking-tight md:text-5xl">
              Let's get in touch
            </motion.h1>
            <motion.p variants={item} custom={1} className="max-w-2xl text-base leading-relaxed md:text-lg">
              Questions, feedback, or a custom catering request? Send us a note — we'd love to hear from you.
            </motion.p>
          </motion.div>
        </section>

        <section className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-24 md:grid-cols-5 md:px-6">
          <div className="order-2 grid grid-cols-1 gap-4 md:order-1 md:col-span-2">
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <div className="rounded-2xl bg-white shadow-sm border border-outline-default">
                <div className="border-b border-outline-default px-5 py-4">
                  <h3 className="text-xl font-semibold">Contact details</h3>
                </div>
                <div className="space-y-2 p-5">
                  <InfoRow icon={<Mail className="h-5 w-5" />} label="Email" value="hello@pepper.com" href="mailto:hello@pepper.com" />
                  <InfoRow icon={<MapPin className="h-5 w-5" />} label="Address" value="Manhattan, New York" />
                </div>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <div className="rounded-2xl bg-white shadow-sm border border-outline-default">
                <div className="border-b border-outline-default px-5 py-4">
                  <h3 className="text-xl font-semibold">Follow us</h3>
                </div>
                <div className="flex items-center gap-3 p-5">
                  <SocialLink href="#" label="Instagram" Icon={Instagram} />
                  <SocialLink href="#" label="Facebook" Icon={Facebook} />
                </div>
              </div>
            </motion.div>

            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-outline-default">
                <div className="border-b border-outline-default px-5 py-4">
                  <h3 className="text-xl font-semibold">Find us on the map</h3>
                </div>
                <div className="p-5">
                  <div className="relative overflow-hidden rounded-xl border border-outline-default">
                    <iframe title="Map" className="h-60 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=NewYork&output=embed" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={container} initial="hidden" animate="show" className="order-1 md:order-2 md:col-span-3">
            <div className="rounded-2xl bg-white shadow-sm border border-outline-default">
              <div className="border-b border-outline-default px-5 py-4">
                <h3 className="text-xl font-semibold">Send a message</h3>
              </div>
              <div className="p-5">
                <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field id="name" label="Your name">
                      <input id="name" name="name" placeholder="Jane Doe" required className={inputClass} />
                    </Field>
                    <Field id="email" label="Email">
                      <input id="email" type="email" name="email" placeholder="you@example.com" required className={inputClass} />
                    </Field>
                  </div>

                  <Field id="subject" label="Subject">
                    <input id="subject" name="subject" placeholder="Reservation, feedback, catering…" className={inputClass} />
                  </Field>

                  <Field id="message" label="Message">
                    <textarea id="message" name="message" placeholder="Write your message…" className={`${inputClass} min-h-[140px] resize-y`} required />
                  </Field>

                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs">By sending this form you agree to our processing of your data to handle your request.</p>
                    <button type="submit" className="rounded-full bg-fire-red px-5 py-2 text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-fire-red-98">
                      <span className="inline-flex items-center gap-2">
                        <Send className="h-4 w-4" /> Send
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const inputClass =
  "w-full rounded-xl border border-outline-default bg-white px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-fire-red focus:ring-2 focus:ring-fire-red/20";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-sm">
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const Inner = (
    <div className="flex items-center gap-3 rounded-xl border border-transparent p-2 transition hover:border-outline-default hover:bg-fire-red-98">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-fire-red-98 text-dark">
        {icon}
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-xs uppercase tracking-wide">{label}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block">{Inner}</a>
  ) : (
    Inner
  );
}

function SocialLink({ href, label, Icon }: { href: string; label: string; Icon: React.ComponentType<any> }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="inline-flex items-center gap-2 rounded-full border border-outline-default bg-white px-3 py-2 text-sm transition hover:bg-fire-red-98 hover:text-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-red focus-visible:ring-offset-2 focus-visible:ring-offset-fire-red-98"
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}
