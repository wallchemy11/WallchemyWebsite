"use client";

import Image from "next/image";

export default function FixedStar() {
  return (
    <div className="pointer-events-none fixed bottom-8 right-8 z-30">
      <div style={{ animation: "wallchemy-spin 18s linear infinite" }}>
        <Image
          src="/brand/mark-white-200.png"
          alt=""
          width={56}
          height={56}
          className="logo-campagne h-14 w-14 opacity-25"
        />
      </div>
    </div>
  );
}
