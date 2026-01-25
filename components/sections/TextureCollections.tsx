import ScrollReveal from "@/components/animations/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ParallaxImage from "@/components/animations/ParallaxImage";

type Collection = {
  title: string;
  slug: string;
  heroImage: string;
  shortDescription: string;
};

type TextureCollectionsProps = {
  title: string;
  intro?: string;
  collections: Collection[];
};

export default function TextureCollections({
  title,
  intro,
  collections
}: TextureCollectionsProps) {
  return (
    <section className="bg-ink py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Collections"
            title={title}
            subtitle={intro}
          />
          <div className="mt-12 grid gap-10 md:gap-12">
            {collections.map((collection) => (
              <article
                key={collection.slug}
                className="grid gap-6 md:grid-cols-[1.1fr_1fr]"
              >
                <div data-reveal="image">
                  <ParallaxImage
                    src={collection.heroImage}
                    alt={collection.title}
                    className="h-80 w-full overflow-hidden"
                    sizes="(max-width: 768px) 100vw, 55vw"
                    quality={70}
                  />
                </div>
                <div data-reveal className="space-y-4">
                  <h3 className="font-display text-xl uppercase tracking-[0.18em] sm:text-2xl md:tracking-[0.2em]">
                    {collection.title}
                  </h3>
                  <p className="text-xs text-alabaster/70 sm:text-sm">
                    {collection.shortDescription}
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
