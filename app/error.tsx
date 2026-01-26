"use client";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink text-alabaster">
      <h1 className="mb-4 text-4xl font-bold">Something went wrong</h1>
      <p className="mb-8 text-lg text-alabaster/80">{error.message}</p>
      <button
        onClick={reset}
        className="rounded border border-alabaster/20 px-6 py-3 transition-colors hover:bg-alabaster/10"
      >
        Try again
      </button>
    </div>
  );
}
