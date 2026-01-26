import "server-only";

import SiteFooter from "@/components/layout/SiteFooter";
import { getSiteSettings } from "@/lib/cms";

export default async function SiteFooterServer() {
  const settings = await getSiteSettings();
  return <SiteFooter socialLinks={settings?.social} />;
}

