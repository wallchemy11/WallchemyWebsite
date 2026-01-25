import Link from "next/link";

type PrimaryCtaProps = {
  label: string;
  href: string;
};

export default function PrimaryCta({ label, href }: PrimaryCtaProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-4 border-b border-brass/70 pb-2 text-xs uppercase tracking-[0.45em] text-brass/90"
    >
      {label}
      <span aria-hidden>↗</span>
    </Link>
  );
}
