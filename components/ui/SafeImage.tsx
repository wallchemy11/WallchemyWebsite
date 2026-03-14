"use client";

import { useState } from "react";
import Image from "next/image";

type SafeImageProps = {
  src?: string | null;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  quality?: number;
  className?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

export default function SafeImage({
  src,
  alt,
  width,
  height,
  sizes,
  quality = 75,
  className,
  priority,
  unoptimized
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      className={className}
      priority={priority}
      unoptimized={unoptimized}
      onError={() => setFailed(true)}
    />
  );
}
