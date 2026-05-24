let cached: Promise<{
  gsap: typeof import("gsap").default;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
}> | null = null;

export function loadGsap() {
  if (!cached) {
    cached = (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    })();
  }
  return cached;
}
