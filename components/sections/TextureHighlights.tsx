import Image from "next/image";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";

type TextureHighlight = {
  title: string;
  slug: string;
  heroImage: string;
  shortDescription: string;
};

type TextureHighlightsProps = {
  textures: TextureHighlight[];
};

export default function TextureHighlights({ textures }: TextureHighlightsProps) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Textures"
            title="Curated surfaces for expressive interiors."
            subtitle="From breathable lime plasters to crafted concrete, each collection is bespoke."
          />
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {textures.map((texture) => (
              <article key={texture.slug} className="space-y-6">
                <div data-reveal="image" className="overflow-hidden rounded-none">
                  <Image
                    src={texture.heroImage}
                    alt={texture.title}
                    width={600}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 30vw"
                    quality={70}
                    className="h-[260px] w-full object-cover sm:h-[320px] md:h-80"
                  />
                </div>
                <div data-reveal className="space-y-3">
                  <h3 className="font-display text-lg uppercase tracking-[0.18em] sm:text-xl md:tracking-[0.2em]">
                    {texture.title}
                  </h3>
                  <p className="text-xs text-alabaster/70 sm:text-sm">
                    {texture.shortDescription}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
