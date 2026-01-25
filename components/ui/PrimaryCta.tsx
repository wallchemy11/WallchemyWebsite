type PrimaryCtaProps = {
  label: string;
  href: string;
};

export default function PrimaryCta({ label, href }: PrimaryCtaProps) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-4 border-b border-brass/70 pb-2 text-xs uppercase tracking-[0.45em] text-brass/90"
      >
        {label}
        <span aria-hidden>↗</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex items-center gap-4 border-b border-brass/70 pb-2 text-xs uppercase tracking-[0.45em] text-brass/90"
    >
      {label}
      <span aria-hidden>↗</span>
    </a>
  );
}
