import Link from "next/link";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Textures", href: "/textures" },
  { label: "Process", href: "/process" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" }
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-lg font-semibold uppercase tracking-[0.35em] text-alabaster"
        >
          Wallchemy
        </Link>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.32em] text-alabaster/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brass/90">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="rounded-full border border-brass/60 px-4 py-2 text-xs uppercase tracking-[0.32em] text-brass/90"
        >
          Book a Meeting
        </Link>
      </div>
    </header>
  );
}
