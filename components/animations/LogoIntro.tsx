"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { loadGsap } from "@/components/animations/loadGsap";

// 4-pointed star polygon. irFactor controls how spiky it looks (0.09 = very spiky).
// R_max must be large enough that ir_max = R_max * irFactor >= screen corner distance.
function buildStarPoints(cx: number, cy: number, R: number): string {
  const ir = R * 0.09;
  const d  = ir * Math.SQRT2 / 2;
  return [
    cx,     cy - R,
    cx + d, cy - d,
    cx + R, cy,
    cx + d, cy + d,
    cx,     cy + R,
    cx - d, cy + d,
    cx - R, cy,
    cx - d, cy - d,
  ].join(" ");
}

export default function LogoIntro() {
  const [visible, setVisible] = useState(false);
  const polygonRef = useRef<SVGPolygonElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);

  useEffect(() => { setVisible(true); }, []);

  useEffect(() => {
    if (!visible) return;

    let cancelled = false;

    (async () => {
      const { gsap } = await loadGsap();
      if (cancelled) return;

      const poly = polygonRef.current;
      const logo = logoRef.current;
      if (!poly || !logo) return;

      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;

      // Compute max R so inner corner (ir = R * 0.09) clears every screen corner.
      // Inner corner distance from center = ir = R * 0.09
      // Screen corner distance = hypot(cx, cy)
      // So: R_max = hypot(cx, cy) / 0.09 * 1.3  (30% safety margin)
      const screenCorner = Math.hypot(cx, cy);
      const R_max = Math.ceil((screenCorner / 0.09) * 1.3);

      poly.setAttribute("points", buildStarPoints(cx, cy, 1));

      const proxy = { R: 1 };
      const tl    = gsap.timeline();

      tl.to(logo, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" });
      tl.to({}, { duration: 0.75 });
      tl.to(logo, { opacity: 0, duration: 0.35, ease: "power2.in" });
      tl.to(
        proxy,
        {
          R: R_max,
          duration: 1.35,
          ease: "expo.in",
          onUpdate() {
            poly.setAttribute("points", buildStarPoints(cx, cy, proxy.R));
          },
        },
        "-=0.05"
      );
      tl.call(() => {
        if (!cancelled) {
          setVisible(false);
          window.dispatchEvent(new CustomEvent("wc:intro-done"));
        }
      });
    })();

    return () => { cancelled = true; };
  }, [visible]);

  if (!visible) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <mask id="wc-star-mask">
            <rect width="100%" height="100%" fill="white" />
            <polygon ref={polygonRef} fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="#3e3630" mask="url(#wc-star-mask)" />
      </svg>

      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-5"
        style={{ opacity: 0, transform: "translateY(14px)" }}
      >
        <Image
          src="/brand/mark-white-200.png"
          alt=""
          width={72}
          height={72}
          priority
          className="logo-campagne h-16 w-16 sm:h-20 sm:w-20"
        />
        <Image
          src="/brand/wordmark-white-600.png"
          alt="Wallchemy"
          width={180}
          height={20}
          priority
          className="logo-campagne h-4 w-auto sm:h-5"
        />
      </div>
    </div>
  );
}
