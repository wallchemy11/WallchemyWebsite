"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import MobileNavOverlay from "./MobileNavOverlay";
import BrandIcon from "@/components/ui/BrandIcon";

function fireNavStart(href: string, currentPath: string | null) {
  // Only cover for cross-page navigations; anchors / same-page clicks don't need it
  const target = href.split("#")[0] || "/";
  if (target !== currentPath) {
    window.dispatchEvent(new CustomEvent("wc:nav-start"));
  }
}

const navItems = [
  { label: "About", href: "/about" },
  { label: "Textures", href: "/textures" },
  { label: "Process", href: "/process" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" }
];

type SocialLinks = {
  instagram?: string;
  behance?: string;
  linkedin?: string;
  youtube?: string;
};

export default function SiteHeader({
  whatsappHref,
  socialLinks,
  meetingLabel,
  meetingHref
}: {
  whatsappHref: string;
  socialLinks?: SocialLinks;
  meetingLabel?: string;
  meetingHref?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const closeMenu = useCallback((restoreFocus: boolean = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-ink/92 [--site-header-h:72px] md:bg-ink/80 md:[--site-header-h:84px] md:backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-5 py-3 md:px-6 md:py-5">
        <div className="grid grid-cols-3 items-center md:flex md:justify-between">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="relative h-11 w-11 rounded-full border border-alabaster/15"
              ref={menuButtonRef}
              onClick={() => setIsOpen((open) => !open)}
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-alabaster transition-transform duration-300 ${
                  isOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-alabaster transition-transform duration-300 ${
                  isOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>

          <Link
            href="/"
            aria-label="Wallchemy — home"
            className="col-start-2 inline-flex items-center justify-center md:col-auto md:justify-start"
            onClick={() => fireNavStart("/", pathname)}
          >
            <Image
              src="/brand/mark-white-200.png"
              alt=""
              width={20}
              height={20}
              priority
              className="logo-campagne h-5 w-5 md:hidden"
            />
            <Image
              src="/brand/wordmark-white-600.png"
              alt="Wallchemy"
              width={132}
              height={14}
              priority
              className="logo-campagne hidden h-3.5 w-auto md:block"
            />
          </Link>

          <div className="flex justify-end md:hidden">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-alabaster/35 text-alabaster transition-colors hover:bg-alabaster/10"
              aria-label="WhatsApp"
            >
              <BrandIcon name="whatsapp" className="h-[18px] w-[18px]" />
            </a>
          </div>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.32em] text-alabaster md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-alabaster/85 transition-colors hover:text-alabaster"
              onClick={() => fireNavStart(item.href, pathname)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            href={meetingHref || "/contact#enquiry"}
            className="rounded-full border border-alabaster/35 bg-alabaster/5 px-4 py-2 text-xs uppercase tracking-[0.32em] text-alabaster transition-colors hover:bg-alabaster/15"
            onClick={() => fireNavStart(meetingHref || "/contact", pathname)}
          >
            {meetingLabel || "Book a Meeting"}
          </Link>
        </div>
        </div>
      </div>
      <MobileNavOverlay
        isOpen={isOpen}
        onClose={closeMenu}
        items={navItems}
        whatsappHref={whatsappHref}
        socialLinks={socialLinks}
        meetingLabel={meetingLabel}
        meetingHref={meetingHref}
      />
    </header>
  );
}
