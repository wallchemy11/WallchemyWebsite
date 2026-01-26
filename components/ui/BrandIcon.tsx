import {
  IconBrandBehance,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandYoutube
} from "@tabler/icons-react";

export type BrandIconName =
  | "whatsapp"
  | "instagram"
  | "behance"
  | "linkedin"
  | "youtube";

export default function BrandIcon({
  name,
  className
}: {
  name: BrandIconName;
  className?: string;
}) {
  const props = {
    className: className || "h-5 w-5",
    stroke: 1.65
  } as const;

  switch (name) {
    case "whatsapp":
      return <IconBrandWhatsapp {...props} aria-hidden="true" />;
    case "instagram":
      return <IconBrandInstagram {...props} aria-hidden="true" />;
    case "behance":
      return <IconBrandBehance {...props} aria-hidden="true" />;
    case "linkedin":
      return <IconBrandLinkedin {...props} aria-hidden="true" />;
    case "youtube":
      return <IconBrandYoutube {...props} aria-hidden="true" />;
  }
}

