"use client";

import { useMemo, useState, type FormEvent } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { resolveText } from "@/lib/text";

type ContactPanelProps = {
  title?: string;
  intro?: string;
  eyebrow?: string;
  enquiryCta?: string;
  whatsappNumber?: string;
  studioAddress?: string;
  email?: string;
};

export default function ContactPanel({
  title,
  intro,
  eyebrow,
  enquiryCta,
  whatsappNumber,
  studioAddress,
  email
}: ContactPanelProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budgetRange: "",
    timeline: "",
    message: "",
    website: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const safeTitle = resolveText(title);
  const safeIntro = resolveText(intro);
  const safeEyebrow = resolveText(eyebrow, "Contact");
  const safeCta = resolveText(enquiryCta, "Send an enquiry");
  const safeWhatsapp = resolveText(whatsappNumber);
  const safeAddress = resolveText(studioAddress);
  const safeEmail = resolveText(email);
  const projectTypes = useMemo(
    () => ["Residential", "Retail", "Hospitality", "Office", "Showroom", "Other"],
    []
  );
  const budgetRanges = useMemo(
    () => ["< ₹2L", "₹2L - ₹5L", "₹5L - ₹10L", "₹10L+", "Undecided"],
    []
  );
  const timelines = useMemo(
    () => ["ASAP", "1-3 months", "3-6 months", "6+ months", "Flexible"],
    []
  );

  function validate() {
    const nextErrors: Record<string, string> = {};
    if (form.name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email.";
    }
    if (form.message.trim().length < 10) {
      nextErrors.message = "Please add a short project summary.";
    }
    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sourcePage: typeof window !== "undefined" ? window.location.pathname : ""
        })
      });
      if (!res.ok) {
        let data: any = {};
        try {
          data = await res.json();
        } catch {
          data = {};
        }
        setErrors(data?.fields || {});
        setServerMessage(data?.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budgetRange: "",
        timeline: "",
        message: "",
        website: ""
      });
    } catch (error) {
      setServerMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }
  return (
    <section className="bg-ink py-24">
      <ScrollReveal>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:gap-12 md:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow={safeEyebrow}
              title={safeTitle}
              subtitle={safeIntro}
            />
            <div data-reveal className="mt-8 space-y-3 text-xs text-alabaster/70 sm:text-sm md:mt-10">
              <p>{safeAddress}</p>
              <p>{safeEmail}</p>
              <p>WhatsApp: {safeWhatsapp}</p>
            </div>
          </div>
          <div id="enquiry" data-reveal className="scroll-mt-28 rounded-none border border-alabaster/10 p-6 sm:p-8">
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="hidden"
                autoComplete="off"
                tabIndex={-1}
              />
              <div data-reveal>
                <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-2 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/40 outline-none focus:border-brass"
                  placeholder="Full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "lead-name-error" : undefined}
                />
                {errors.name ? (
                  <p id="lead-name-error" className="mt-2 text-xs text-ember">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div data-reveal>
                <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-2 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/40 outline-none focus:border-brass"
                  placeholder="Email address"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "lead-email-error" : undefined}
                />
                {errors.email ? (
                  <p id="lead-email-error" className="mt-2 text-xs text-ember">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div data-reveal className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="mt-2 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/40 outline-none focus:border-brass"
                    placeholder="+91 ..."
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                    Company / Studio (optional)
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="mt-2 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/40 outline-none focus:border-brass"
                    placeholder="Company name"
                  />
                </div>
              </div>
              <div data-reveal className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                    Project type
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="mt-2 w-full border border-alabaster/10 bg-ink px-4 py-3 text-sm text-alabaster outline-none focus:border-brass"
                  >
                    <option value="">Select</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                    Budget
                  </label>
                  <select
                    value={form.budgetRange}
                    onChange={(e) => setForm({ ...form, budgetRange: e.target.value })}
                    className="mt-2 w-full border border-alabaster/10 bg-ink px-4 py-3 text-sm text-alabaster outline-none focus:border-brass"
                  >
                    <option value="">Select</option>
                    {budgetRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                    Timeline
                  </label>
                  <select
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className="mt-2 w-full border border-alabaster/10 bg-ink px-4 py-3 text-sm text-alabaster outline-none focus:border-brass"
                  >
                    <option value="">Select</option>
                    {timelines.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div data-reveal>
                <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                  Project Summary
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-2 h-32 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/40 outline-none focus:border-brass"
                  placeholder="Tell us about the space, scale, timeline, and desired finish."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "lead-message-error" : undefined}
                />
                {errors.message ? (
                  <p id="lead-message-error" className="mt-2 text-xs text-ember">
                    {errors.message}
                  </p>
                ) : null}
              </div>
              {serverMessage ? (
                <p className="text-xs text-ember">{serverMessage}</p>
              ) : null}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full border border-brass px-6 py-3 text-[10px] uppercase tracking-[0.32em] text-brass transition-opacity sm:text-xs sm:tracking-[0.35em] disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : status === "success" ? "Sent" : safeCta}
              </button>
              {status === "success" ? (
                <p className="text-xs text-alabaster/70">
                  Thanks for reaching out. Our studio will respond shortly.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
