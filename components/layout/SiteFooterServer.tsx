import "server-only";

import SiteFooter from "@/components/layout/SiteFooter";
import { getContactPage, getSiteSettings } from "@/lib/cms";
import { toWhatsAppHref } from "@/lib/whatsapp";

export default async function SiteFooterServer() {
  const [settings, contact] = await Promise.all([
    getSiteSettings(),
    getContactPage()
  ]);
  const social = settings?.social || contact?.social;
  const whatsappNumber = contact?.whatsappNumber;
  const whatsappHref = whatsappNumber
    ? toWhatsAppHref(whatsappNumber, contact?.whatsappMessage)
    : "";

  return (
    <SiteFooter
      socialLinks={social}
      studioAddress={contact?.studioAddress}
      email={contact?.email}
      whatsappNumber={whatsappNumber}
      whatsappHref={whatsappHref}
    />
  );
}

