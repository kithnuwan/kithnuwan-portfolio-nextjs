'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import {
    ChevronRight,
    Mail,
    MapPin,
    Phone,
    Aperture,
  } from "lucide-react";
import Card from "./common/Card";
import Section from "./common/Section";

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

const profile = {
    location: "Colombo, Sri Lanka",
  };

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionResult(null);

        const formData = new FormData(e.target);
        formData.append("access_key", "820ad35d-3e02-4bcd-9fba-8ee0920068c8");

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          if (data.success) {
            setSubmissionResult("success");
            e.target.reset();
          } else {
            console.error("Error from Web3Forms:", data);
            setSubmissionResult("error");
          }
        } catch (error) {
          console.error("Submission Error:", error);
          setSubmissionResult("error");
        } finally {
          setIsSubmitting(false);
        }
      };


    return (
      <Section id="contact" title="Let’s talk" eyebrow="Get in touch">
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div {...fadeUp} className="md:col-span-2">
            <Card>
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                 <div>
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input id="name" name="name" required className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" />
                </div>
                <div>
                  <label htmlFor="company" className="text-sm font-medium">Company</label>
                  <input id="company" name="company" className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input id="email" type="email" name="email" required className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" />
                </div>
                <div>
                  <label htmlFor="budget" className="text-sm font-medium">Budget (USD)</label>
                  <input id="budget" name="budget" className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" placeholder="e.g., 25,000–80,000" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="type" className="text-sm font-medium">Project type</label>
                  <select id="type" name="type" className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2">
                    <option>Microsoft Teams Room</option>
                    <option>Boardroom / Conference</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea id="message" name="message" rows={4} className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/5 px-3 py-2" placeholder="Tell me about your use‑case, location, and timeline…" />
                </div>
                <div className="sm:col-span-2 flex flex-col items-start gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : "Send inquiry"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  {submissionResult === 'success' && <div className="text-sm text-green-600">Thank you! Your message has been sent.</div>}
                  {submissionResult === 'error' && <div className="text-sm text-red-600">Something went wrong. Please try again.</div>}
                </div>
              </form>
            </Card>
          </motion.div>
          <motion.div {...fadeUp}>
            <Card>
              <div className="text-sm text-gray-700 dark:text-gray-200 space-y-3">
                <div className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 flex-shrink-0" /> <a className="hover:underline break-all" href="mailto:Kithnuwan@gmail.com">Kithnuwan@gmail.com</a></div>
                <div className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" /> {profile.location}</div>
                <div className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 flex-shrink-0" /><a className="hover:underline" href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer">+94 77 123 4567 (WhatsApp)</a></div>
                <div className="flex items-start gap-2"><Aperture className="h-4 w-4 mt-0.5 flex-shrink-0" /> Available for Sri Lanka & remote consulting</div>
              </div>
              <div className="mt-6">
                <a href="#" className="inline-flex items-center gap-2 text-sm font-semibold rounded-xl ring-1 ring-black/10 dark:ring-white/20 px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10">Download Solutions (PDF)</a>
              </div>
            </Card>
          </motion.div>
        </div>
      </Section>
    );
  }