import { PlatformDeploy } from "@/app/sections/deploy";
import { Footer } from "@/app/sections/footer";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Deploy CLARA — for platform teams",
  description:
    "Install CLARA once per environment: a single Markdown skill file, vendor-neutral and air-gap clean, running against whichever KB-aware LLM your platform already provides.",
};

export default function DeployPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
          <Link
            href="/"
            className="font-semibold tracking-tight text-fg text-base hover:text-accent transition-colors"
            aria-label="CLARA home"
          >
            CLARA
          </Link>
          <Link
            href="/#try"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-fg-muted hover:text-fg transition-colors rounded-md"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Quick start
          </Link>
        </div>
      </header>
      <main>
        <PlatformDeploy />
      </main>
      <Footer />
    </>
  );
}
