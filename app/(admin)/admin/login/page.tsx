import Link from "next/link";

function Field({
  label,
  name,
  type,
  placeholder,
  autoComplete
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.32em] text-alabaster/60">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-alabaster/10 bg-ink/60 px-4 py-3 text-sm text-alabaster outline-none ring-0 placeholder:text-alabaster/30 focus:border-brass/50 focus:bg-ink/75"
      />
    </label>
  );
}

export default function AdminLoginPage({
  searchParams
}: {
  searchParams?: { error?: string; next?: string };
}) {
  const error = searchParams?.error === "1";
  const next = searchParams?.next || "/admin";

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-ink text-alabaster">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,167,107,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background:linear-gradient(90deg,rgba(242,237,228,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(242,237,228,0.06)_1px,transparent_1px)] [background-size:36px_36px]" />

      <div className="mx-auto flex min-h-[100dvh] max-w-6xl items-center px-6 py-16">
        <div className="grid w-full gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-14">
          <div className="animate-[fadeUp_700ms_ease-out_both]">
            <p className="text-xs uppercase tracking-[0.42em] text-brass/80">
              Admin Access
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.02em] md:text-6xl">
              Quiet control.
              <br />
              Refined edits.
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-alabaster/70 md:text-base">
              “Luxury is attention to detail.”
              <span className="block text-alabaster/45">
                Sign in to curate pages, projects, and the material narrative.
              </span>
            </p>
            <div className="mt-10 flex items-center gap-4 text-xs uppercase tracking-[0.32em] text-alabaster/55">
              <Link href="/" className="hover:text-brass/80">
                Return to site
              </Link>
              <span className="h-px w-10 bg-alabaster/15" />
              <span>Wallchemy Studio</span>
            </div>
          </div>

          <div className="animate-[fadeUp_700ms_ease-out_both] [animation-delay:120ms]">
            <div className="rounded-[28px] border border-alabaster/10 bg-ink/40 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-8">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.32em] text-alabaster/60">
                  Credentials
                </p>
                <p className="mt-2 text-sm text-alabaster/70">
                  Use your admin ID and password.
                </p>
              </div>

              {error ? (
                <div className="mb-5 rounded-2xl border border-ember/25 bg-ember/10 px-4 py-3 text-sm text-alabaster/85">
                  Incorrect credentials. Please try again.
                </div>
              ) : null}

              <form action="/admin/auth" method="post" className="space-y-5">
                <input type="hidden" name="next" value={next} />
                <Field
                  label="Admin ID"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="admin"
                />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                />
                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-brass px-5 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-ink transition-transform duration-200 ease-out hover:scale-[1.01] active:scale-[0.99]"
                >
                  Enter Studio
                </button>
              </form>

              <p className="mt-5 text-xs leading-relaxed text-alabaster/45">
                Tip: set <span className="text-alabaster/70">ADMIN_USERNAME</span>,{" "}
                <span className="text-alabaster/70">ADMIN_PASSWORD</span> and{" "}
                <span className="text-alabaster/70">ADMIN_SESSION_SECRET</span> in
                Vercel for production.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

