import Link from "next/link";

export default function SiteFooter() {
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
