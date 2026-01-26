import "server-only";

import SiteHeader from "@/components/layout/SiteHeader";
import { getContactPage } from "@/lib/cms";
import { toWhatsAppHref } from "@/lib/whatsapp";

export default async function SiteHeaderServer() {
  const contact = await getContactPage();

  const whatsappNumber = contact?.whatsappNumber || "+91 00000 00000";
  const whatsappMessage =
    contact?.whatsappMessage ||
    "Hi Wallchemy, I'd like to connect about textures and finishes.";

  const whatsappHref = toWhatsAppHref(whatsappNumber, whatsappMessage);
  const meetingLabel = contact?.meetingCtaLabel || "Book a Meeting";
  const meetingHref =
    contact?.meetingLink ||
    toWhatsAppHref(whatsappNumber, whatsappMessage);

  return (
    <SiteHeader
      whatsappHref={whatsappHref}
      socialLinks={contact?.social}
      meetingLabel={meetingLabel}
      meetingHref={meetingHref}
    />
  );
}

