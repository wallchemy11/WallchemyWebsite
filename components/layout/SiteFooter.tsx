import Link from "next/link";
import BrandIcon from "@/components/ui/BrandIcon";

type SocialLinks = {
  instagram?: string;
  behance?: string;
  linkedin?: string;
  youtube?: string;
};

export default function SiteFooter({ socialLinks }: { socialLinks?: SocialLinks }) {
  const instagram = socialLinks?.instagram;
  const behance = socialLinks?.behance;
  const linkedin = socialLinks?.linkedin;
  const youtube = socialLinks?.youtube;

  return (
    <footer className="border-t border-alabaster/10 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brass">
            Wallchemy
          </p>
          <p className="mt-4 text-sm text-alabaster/70">
            Premium texture and surface studio crafting immersive walls for
            luxury residences, hospitality, and retail.
          </p>
          {(instagram || behance || linkedin || youtube) ? (
            <div className="mt-6 flex items-center gap-3">
              {instagram ? (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-alabaster/10 bg-alabaster/5 text-alabaster/80 transition-colors hover:bg-alabaster/10 hover:text-alabaster"
                  aria-label="Instagram"
                >
                  <BrandIcon name="instagram" className="h-5 w-5" />
                </a>
              ) : null}
              {behance ? (
                <a
                  href={behance}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-alabaster/10 bg-alabaster/5 text-alabaster/80 transition-colors hover:bg-alabaster/10 hover:text-alabaster"
                  aria-label="Behance"
                >
                  <BrandIcon name="behance" className="h-5 w-5" />
                </a>
              ) : null}
              {linkedin ? (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-alabaster/10 bg-alabaster/5 text-alabaster/80 transition-colors hover:bg-alabaster/10 hover:text-alabaster"
                  aria-label="LinkedIn"
                >
                  <BrandIcon name="linkedin" className="h-5 w-5" />
                </a>
              ) : null}
              {youtube ? (
                <a
                  href={youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-alabaster/10 bg-alabaster/5 text-alabaster/80 transition-colors hover:bg-alabaster/10 hover:text-alabaster"
                  aria-label="YouTube"
                >
                  <BrandIcon name="youtube" className="h-5 w-5" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <div className="text-sm text-alabaster/70">
          <p className="uppercase tracking-[0.25em] text-alabaster">
            Credentials
          </p>
          <p className="mt-4">Founded 2026 · Boutique studio</p>
          <p>Panipat · New Delhi · International projects</p>
        </div>
        <div className="text-sm text-alabaster/70">
          <p className="uppercase tracking-[0.25em] text-alabaster">Explore</p>
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/textures" className="hover:text-brass">
              Texture Collections
            </Link>
            <Link href="/projects" className="hover:text-brass">
              Selected Projects
            </Link>
            <Link href="/contact" className="hover:text-brass">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
