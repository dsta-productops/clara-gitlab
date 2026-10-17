import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// In-page anchors on the home page.
const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#why-clara", label: "Why CLARA" },
  { href: "#skills", label: "Skills" },
  { href: "#try", label: "Quick start" },
];

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
        <a
          href="#top"
          className="font-semibold tracking-tight text-fg text-base hover:text-accent transition-colors"
          aria-label="CLARA home"
        >
          CLARA
        </a>

        <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 text-sm text-fg-muted hover:text-fg transition-colors rounded-md"
            >
              {l.label}
            </a>
          ))}
          {/* Platform-team deployment lives on its own page, opened in a new tab. */}
          <Link
            href="/deploy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-2 text-sm text-fg-muted hover:text-fg transition-colors rounded-md"
          >
            For platform teams
            <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
          </Link>
        </nav>
      </div>
    </header>
  );
}
