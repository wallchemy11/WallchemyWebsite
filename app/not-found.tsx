import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink text-alabaster">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-8 text-lg">Page not found</p>
      <Link
        href="/"
        className="rounded border border-alabaster/20 px-6 py-3 transition-colors hover:bg-alabaster/10"
      >
        Return Home
      </Link>
    </div>
  );
}
