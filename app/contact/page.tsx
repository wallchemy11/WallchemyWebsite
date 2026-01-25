import { getContactPage } from "@/lib/cms";
import VideoHero from "@/components/ui/VideoHero";
import ContactPanel from "@/components/sections/ContactPanel";
import SplitText from "@/components/ui/SplitText";
import CinematicDivider from "@/components/sections/CinematicDivider";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const contact = await getContactPage();
  return buildMetadata(contact.seo);
}

export default async function ContactPage() {
  const contact = await getContactPage();

  return (
    <>
      <VideoHero
        headline="Contact"
        subheadline={contact.intro}
        videoSrc="https://media.w3.org/2010/05/sintel/trailer.mp4"
        poster="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SplitText
            text={contact.intro}
            className="font-display max-w-4xl text-3xl leading-relaxed text-alabaster/90 md:text-5xl"
          />
        </div>
      </section>
      <CinematicDivider
        image="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=2000&q=80"
        eyebrow="Enquiry"
        title="Begin the conversation."
        subtitle="Share the scale, intent, and atmosphere you want to create."
      />
      <ContactPanel
        title={contact.title}
        intro={contact.intro}
        enquiryCta={contact.enquiryCta}
        whatsappNumber={contact.whatsappNumber}
        studioAddress={contact.studioAddress}
        email={contact.email}
      />
    </>
  );
}
