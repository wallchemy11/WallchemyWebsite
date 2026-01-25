import { siBehance, siInstagram, siLinkedin, siWhatsapp, siYoutube } from "simple-icons";

const ICONS = {
  whatsapp: siWhatsapp,
  instagram: siInstagram,
  behance: siBehance,
  linkedin: siLinkedin,
  youtube: siYoutube
} as const;

export type BrandIconName = keyof typeof ICONS;

export default function BrandIcon({
  name,
  className
}: {
  name: BrandIconName;
  className?: string;
}) {
  const icon = ICONS[name];
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className || "h-5 w-5"}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );
}

