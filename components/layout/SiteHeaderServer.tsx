import "server-only";

import SiteHeader from "@/components/layout/SiteHeader";
import { getSiteSettings } from "@/lib/cms";
import { toWhatsAppHref } from "@/lib/whatsapp";

export default async function SiteHeaderServer() {
  const settings = await getSiteSettings();

  const whatsappNumber = settings?.whatsappNumber || "+91 00000 00000";
  const whatsappMessage =
    settings?.whatsappMessage ||
    "Hi Wallchemy, I'd like to connect about textures and finishes.";

  const whatsappHref = toWhatsAppHref(whatsappNumber, whatsappMessage);

  return (
    <SiteHeader
      whatsappHref={whatsappHref}
      socialLinks={settings?.social}
    />
  );
}

