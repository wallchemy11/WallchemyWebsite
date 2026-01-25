"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getWhatsAppNumber, toWhatsAppHref } from "@/lib/whatsapp";

type NavItem = { label: string; href: string };

function Icon({
  name,
  className
}: {
  name: "x" | "chat" | "instagram" | "behance" | "linkedin" | "youtube";
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
    case "chat":
      return (
        <svg {...common}>
          <path
            d="M20 12c0 3.866-3.582 7-8 7a9.3 9.3 0 0 1-2.6-.36L4 20l1.37-3.42A6.4 6.4 0 0 1 4 12c0-3.866 3.582-7 8-7s8 3.134 8 7Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 12h.01M12 12h.01M15.8 12h.01"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path
            d="M7.5 3.8h9A3.7 3.7 0 0 1 20.2 7.5v9a3.7 3.7 0 0 1-3.7 3.7h-9A3.7 3.7 0 0 1 3.8 16.5v-9A3.7 3.7 0 0 1 7.5 3.8Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 16.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M17.2 6.8h.01"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "behance":
      return (
        <svg {...common}>
          <path
            d="M8.2 11.6h4a2.2 2.2 0 0 1 0 4.4h-4V7.9h3.6a2.05 2.05 0 0 1 0 4.1H8.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M14.4 10.2h5.1M15.4 7.2h3.3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M15.2 14.1c.2 1.1 1.1 1.9 2.3 1.9 1 0 1.8-.5 2.2-1.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path
            d="M6.6 9.6v8.2M6.6 6.6v.2M10.2 9.6v8.2m0-4.6c0-2 1.1-3.6 3.2-3.6 2 0 3.1 1.3 3.1 3.5v4.7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common}>
          <path
            d="M20 12s0-3.2-.4-4.2c-.2-.6-.7-1.1-1.3-1.3C17.2 6 12 6 12 6s-5.2 0-6.3.5c-.6.2-1.1.7-1.3 1.3C4 8.8 4 12 4 12s0 3.2.4 4.2c.2.6.7 1.1 1.3 1.3C6.8 18 12 18 12 18s5.2 0 6.3-.5c.6-.2 1.1-.7 1.3-1.3.4-1 .4-4.2.4-4.2Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 9.8v4.4l4-2.2-4-2.2Z"
            fill="currentColor"
          />
        </svg>
      );
  }
}

type MobileNavOverlayProps = {
  isOpen: boolean;
  onClose: (restoreFocus?: boolean) => void;
  items: NavItem[];
};

export default function MobileNavOverlay({
  isOpen,
  onClose,
  items
}: MobileNavOverlayProps) {
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const whatsappHref = toWhatsAppHref(
    getWhatsAppNumber(),
    "Hi Wallchemy, I'd like to connect about textures and finishes."
  );

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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-alabaster"
            onClick={() => onClose(false)}
            aria-label="WhatsApp"
          >
            <Icon name="chat" className="h-5 w-5" />
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
          <a
            href="#"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink"
            aria-label="Instagram"
          >
            <Icon name="instagram" />
          </a>
          <a
            href="#"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink"
            aria-label="Behance"
          >
            <Icon name="behance" />
          </a>
          <a
            href="#"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink"
            aria-label="LinkedIn"
          >
            <Icon name="linkedin" />
          </a>
          <a
            href="#"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink"
            aria-label="YouTube"
          >
            <Icon name="youtube" />
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

