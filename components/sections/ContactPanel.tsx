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
  const safeTitle = resolveText(title);
  const safeIntro = resolveText(intro);
  const safeEyebrow = resolveText(eyebrow, "Contact");
  const safeCta = resolveText(enquiryCta, "Send an enquiry");
  const safeWhatsapp = resolveText(whatsappNumber);
  const safeAddress = resolveText(studioAddress);
  const safeEmail = resolveText(email);
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
            <form className="space-y-6">
              <div data-reveal>
                <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-2 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/40 outline-none focus:border-brass"
                  placeholder="Full name"
                />
              </div>
              <div data-reveal>
                <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-2 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/40 outline-none focus:border-brass"
                  placeholder="Email address"
                />
              </div>
              <div data-reveal>
                <label className="text-[10px] uppercase tracking-[0.28em] text-alabaster/70 sm:text-xs sm:tracking-[0.3em]">
                  Project Summary
                </label>
                <textarea
                  className="mt-2 h-32 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/40 outline-none focus:border-brass"
                  placeholder="Tell us about the space, scale, timeline, and desired finish."
                />
              </div>
              <button
                type="submit"
                className="w-full border border-brass px-6 py-3 text-[10px] uppercase tracking-[0.32em] text-brass sm:text-xs sm:tracking-[0.35em]"
              >
                {safeCta}
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
