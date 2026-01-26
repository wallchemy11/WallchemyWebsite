export async function loadGsap() {
  const gsapModule = await import("gsap");
  const gsap = gsapModule.default;

  // ScrollTrigger is only needed for scroll-based animations,
  // but importing it here keeps callsites simple and still code-splits GSAP.
  const stModule = await import("gsap/ScrollTrigger");
  const ScrollTrigger = stModule.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  return { gsap, ScrollTrigger };
}

