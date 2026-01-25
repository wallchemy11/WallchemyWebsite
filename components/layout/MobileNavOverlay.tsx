"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandIcon from "@/components/ui/BrandIcon";

type NavItem = { label: string; href: string };

function Icon({
  name,
  className
}: {
  name: "x";
  className?: string;
}) {
  const common = {
    className: className || "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };

  switch (name) {
    case "x":
      return (
        <svg {...common}>
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

type MobileNavOverlayProps = {
  isOpen: boolean;
  onClose: (restoreFocus?: boolean) => void;
  items: NavItem[];
  whatsappHref: string;
  socialLinks?: {
    instagram?: string;
    behance?: string;
    linkedin?: string;
    youtube?: string;
  };
};

export default function MobileNavOverlay({
  isOpen,
  onClose,
  items,
  whatsappHref,
  socialLinks
}: MobileNavOverlayProps) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const instagramHref = socialLinks?.instagram;
  const behanceHref = socialLinks?.behance;
  const linkedinHref = socialLinks?.linkedin;
  const youtubeHref = socialLinks?.youtube;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    setRendered(true);
    setVisible(false);
    // Double rAF ensures the initial opacity-0 frame paints before animating in.
    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setVisible(true);
        closeButtonRef.current?.focus();
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;
    if (!rendered) return;
    setVisible(false);
    const id = window.setTimeout(() => setRendered(false), 280);
    return () => window.clearTimeout(id);
  }, [isOpen, rendered]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    onClose(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!mounted || typeof document === "undefined" || !rendered) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <div
        className={`absolute inset-0 bg-alabaster transition-opacity duration-400 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => onClose()}
      />
      <div
        className={`absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(11,10,9,0.05),transparent_55%)] transition-opacity duration-400 ease-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative flex h-full flex-col px-6 pb-8 pt-[calc(env(safe-area-inset-top)+14px)] transition-all duration-400 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink"
            ref={closeButtonRef}
            onClick={() => onClose()}
            aria-label="Close navigation"
          >
            <Icon name="x" />
          </button>
          <span className="font-display text-sm uppercase tracking-[0.32em] text-ink">
            Wallchemy
          </span>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-alabaster transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.98]"
            onClick={() => onClose(false)}
            aria-label="WhatsApp"
          >
            <BrandIcon name="whatsapp" className="h-5 w-5" />
          </a>
        </div>

        <nav className="flex flex-1 flex-col justify-center">
          <div className="mx-auto w-full max-w-xs text-center">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block font-sans text-5xl font-extrabold leading-[0.88] tracking-[-0.035em] text-ink"
                onClick={() => onClose(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-8 flex items-center justify-center gap-3 pb-[calc(env(safe-area-inset-bottom)+6px)]">
          {instagramHref ? (
            <a
              href={instagramHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-ink/5 text-ink transition-colors hover:bg-ink/10"
              aria-label="Instagram"
              onClick={() => onClose(false)}
            >
              <BrandIcon name="instagram" className="h-5 w-5" />
            </a>
          ) : null}
          {behanceHref ? (
            <a
              href={behanceHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-ink/5 text-ink transition-colors hover:bg-ink/10"
              aria-label="Behance"
              onClick={() => onClose(false)}
            >
              <BrandIcon name="behance" className="h-5 w-5" />
            </a>
          ) : null}
          {linkedinHref ? (
            <a
              href={linkedinHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-ink/5 text-ink transition-colors hover:bg-ink/10"
              aria-label="LinkedIn"
              onClick={() => onClose(false)}
            >
              <BrandIcon name="linkedin" className="h-5 w-5" />
            </a>
          ) : null}
          {youtubeHref ? (
            <a
              href={youtubeHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-ink/5 text-ink transition-colors hover:bg-ink/10"
              aria-label="YouTube"
              onClick={() => onClose(false)}
            >
              <BrandIcon name="youtube" className="h-5 w-5" />
            </a>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}

