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
        className="inline-flex min-h-11 items-center gap-3 border-b border-brass/70 pb-2 pr-1 text-[11px] uppercase tracking-[0.32em] text-brass/90 sm:text-xs sm:tracking-[0.4em]"
      >
        {label}
        <span aria-hidden>↗</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      className="inline-flex min-h-11 items-center gap-3 border-b border-brass/70 pb-2 pr-1 text-[11px] uppercase tracking-[0.32em] text-brass/90 sm:text-xs sm:tracking-[0.4em]"
    >
      {label}
      <span aria-hidden>↗</span>
    </a>
  );
}
