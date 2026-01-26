import { getContactPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ContactPanel from "@/components/sections/ContactPanel";
import CinematicDivider from "@/components/sections/CinematicDivider";
import { resolveImage } from "@/lib/hero";
import { buildMetadata } from "@/lib/seo";
import { toWhatsAppHref } from "@/lib/whatsapp";

export async function generateMetadata() {
  const contact = await getContactPage();
  return buildMetadata(contact.seo);
}

export default async function ContactPage() {
  const contact = await getContactPage();
  const meetingLink =
    contact.meetingLink ||
    toWhatsAppHref(
      contact?.whatsappNumber || "+91 00000 00000",
      contact?.whatsappMessage ||
        "Hi Wallchemy, I'd like to connect about textures and finishes."
    );
  const dividerImage = resolveImage(contact.dividerImage, contact.heroPoster);

  return (
    <>
      <VideoHero
        headline="Contact"
        subheadline={contact.intro}
        videoSrc={contact.heroVideo}
        mobileVideoSrc={contact.heroVideoMobile}
        poster={contact.heroPoster}
      />
      <CinematicDivider
        image={dividerImage}
        eyebrow={contact.divider?.eyebrow}
        title={contact.divider?.title}
        subtitle={contact.divider?.subtitle}
      />
      <ContactPanel
        title={contact.title}
        intro={contact.intro}
        eyebrow={contact.panelEyebrow}
        enquiryCta={contact.enquiryCta}
        whatsappNumber={contact.whatsappNumber}
        studioAddress={contact.studioAddress}
        email={contact.email}
      />
      <section id="meeting" className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-lg border border-alabaster/10 bg-alabaster/5 p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-brass">
              {contact.meetingEyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">
              {contact.meetingTitle || "Book a meeting"}
            </h2>
            <p className="mt-4 max-w-2xl text-sm uppercase tracking-[0.18em] text-alabaster/70">
              {contact.meetingSubtitle ||
                "Schedule a discovery call to align on scale, intent, and finish direction."}
            </p>
            <div className="mt-8">
              <a
                href={meetingLink}
                className="inline-flex rounded-full border border-brass/60 px-6 py-3 text-xs uppercase tracking-[0.32em] text-brass/90"
              >
                {contact.meetingCtaLabel || "Schedule a call"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

