import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type ContactPanelProps = {
  title: string;
  intro: string;
  enquiryCta: string;
  whatsappNumber: string;
  studioAddress: string;
  email: string;
};

export default function ContactPanel({
  title,
  intro,
  enquiryCta,
  whatsappNumber,
  studioAddress,
  email
}: ContactPanelProps) {
  return (
    <section className="bg-ink py-24">
      <ScrollReveal>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={title}
              subtitle={intro}
            />
            <div data-reveal className="mt-10 space-y-3 text-sm text-alabaster/70">
              <p>{studioAddress}</p>
              <p>{email}</p>
              <p>WhatsApp: {whatsappNumber}</p>
            </div>
          </div>
          <div data-reveal className="rounded-none border border-alabaster/10 p-8">
            <form className="space-y-6">
              <div data-reveal>
                <label className="text-xs uppercase tracking-[0.3em] text-alabaster/70">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-2 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster outline-none focus:border-brass"
                  placeholder="Your full name"
                />
              </div>
              <div data-reveal>
                <label className="text-xs uppercase tracking-[0.3em] text-alabaster/70">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-2 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster outline-none focus:border-brass"
                  placeholder="you@studio.com"
                />
              </div>
              <div data-reveal>
                <label className="text-xs uppercase tracking-[0.3em] text-alabaster/70">
                  Project Summary
                </label>
                <textarea
                  className="mt-2 h-32 w-full border border-alabaster/10 bg-transparent px-4 py-3 text-sm text-alabaster outline-none focus:border-brass"
                  placeholder="Tell us about the space, scale, and intent."
                />
              </div>
              <button
                type="submit"
                className="w-full border border-brass px-6 py-3 text-xs uppercase tracking-[0.35em] text-brass"
              >
                {enquiryCta}
              </button>
            </form>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
