"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import MobileNavOverlay from "./MobileNavOverlay";
import { getWhatsAppNumber, toWhatsAppHref } from "@/lib/whatsapp";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Textures", href: "/textures" },
  { label: "Process", href: "/process" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" }
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappHref = toWhatsAppHref(
    getWhatsAppNumber(),
    "Hi Wallchemy, I'd like to connect about textures and finishes."
  );

  const closeMenu = useCallback((restoreFocus: boolean = true) => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => {
        menuButtonRef.current?.focus();
      });
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-ink/80 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-6 py-4 md:py-5">
        <div className="grid grid-cols-3 items-center md:flex md:justify-between">
          <div className="flex items-center md:hidden">
            <button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="relative h-10 w-10 rounded-full border border-alabaster/15"
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
            className="col-start-2 text-center font-display text-sm font-semibold uppercase tracking-[0.35em] text-alabaster md:col-auto md:text-left md:text-lg"
          >
            Wallchemy
          </Link>

          <div className="flex justify-end md:hidden">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brass/60 text-brass/90"
              aria-label="WhatsApp"
            >
              ↗
            </a>
          </div>
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.32em] text-alabaster/70 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brass/90">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            href="/contact#enquiry"
            className="rounded-full border border-brass/60 px-4 py-2 text-xs uppercase tracking-[0.32em] text-brass/90"
          >
            Book a Meeting
          </Link>
        </div>
        </div>
      </div>
      <MobileNavOverlay
        isOpen={isOpen}
        onClose={closeMenu}
        items={navItems}
      />
    </header>
  );
}
