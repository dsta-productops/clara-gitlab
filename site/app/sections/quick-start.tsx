"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { ArrowUpRight, MessageSquareText, Plug } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SKILL_BASE = "https://dsta-productops.github.io/clara/skill";

// Bump when the hosted skill files change shape, to bust any cached fetch of a
// prior version (GitHub Pages ignores the query, but it changes the cache key).
const SKILL_VERSION = "4";

// CLARA ships one skill file per knowledge-base backend (see
// scripts/generate-skill-file.ts). The toggle points the starter prompt at the
// matching file and swaps the "connect" guidance; every other step is shared.
const PLATFORMS = {
  confluence: {
    label: "Confluence",
    skillFile: "clara-confluence.md",
    connectTitle: "Full — connect Confluence",
    connectBody:
      "Add the Atlassian (Confluence) connector in your assistant so CLARA can read from and file back into your own space.",
    guideUrl: "https://github.com/sooperset/mcp-atlassian",
    guideLabel: "Atlassian MCP (mcp-atlassian)",
  },
  plane: {
    label: "Plane",
    skillFile: "clara-plane.md",
    connectTitle: "Full — connect Plane",
    connectBody:
      "Add the Plane MCP connector in your assistant so CLARA can read from and file back into your own project.",
    guideUrl: "https://developers.plane.so/dev-tools/mcp-server",
    guideLabel: "Plane MCP setup guide",
  },
  gitlab: {
    label: "GitLab",
    skillFile: "clara-gitlab.md",
    connectTitle: "Full — connect GitLab",
    connectBody:
      "Add the GitLab MCP connector so CLARA can search your projects, and give her a shell with git credentials that can push to your project's wiki so she can file back into it.",
    guideUrl: "https://docs.gitlab.com/user/gitlab_duo/model_context_protocol/mcp_server/",
    guideLabel: "GitLab MCP server guide",
  },
} as const;

type PlatformKey = keyof typeof PLATFORMS;

function StepNumber({ n }: { n: number }) {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg text-xs font-semibold"
      aria-hidden
    >
      {n}
    </span>
  );
}

export function QuickStart() {
  const [platform, setPlatform] = useState<PlatformKey>("confluence");
  const p = PLATFORMS[platform];

  const skillUrl = `${SKILL_BASE}/${p.skillFile}?v=${SKILL_VERSION}`;
  const starterPrompt = `Read ${skillUrl} and follow it as your instructions for the rest of this chat. Then introduce yourself and ask what I'd like to create.`;

  return (
    <section id="try" className="border-b border-border bg-bg-subtle scroll-mt-20">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 py-20 sm:py-24 lg:py-28 space-y-8">
        <div className="max-w-2xl space-y-3">
          <Text
            size="sm"
            variant="muted"
            weight="medium"
            className="uppercase tracking-[0.18em] text-accent"
          >
            Try it yourself
          </Text>
          <Heading as="h2" size="3xl" className="text-balance">
            Quick start
          </Heading>
          <Text size="md" variant="muted" className="leading-relaxed">
            Run CLARA on your own machine.
          </Text>
        </div>

        <Card>
          <CardContent className="space-y-8 pt-6">
            {/* Platform toggle — picks which build the steps below target */}
            <div className="flex flex-wrap items-center gap-3">
              <Text size="sm" weight="medium" className="text-fg">
                Where your knowledge base lives
              </Text>
              <div
                className="inline-flex rounded-md border border-border bg-bg-muted p-0.5"
                role="group"
                aria-label="Knowledge-base platform"
              >
                {(Object.keys(PLATFORMS) as PlatformKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPlatform(key)}
                    aria-pressed={platform === key}
                    className={cn(
                      "rounded px-3 py-1 text-sm transition-colors",
                      platform === key
                        ? "bg-accent text-accent-fg font-medium"
                        : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {PLATFORMS[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 1 — copy the starter prompt */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <StepNumber n={1} />
                <Text size="sm" weight="medium" className="text-fg">
                  Copy the starter prompt
                </Text>
              </div>
              <div className="pl-9">
                <CodeBlock className="whitespace-pre-wrap break-words">
                  <code>{starterPrompt}</code>
                </CodeBlock>
              </div>
            </div>

            {/* Step 2 — paste it into any web-capable assistant */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <StepNumber n={2} />
                <Text size="sm" weight="medium" className="text-fg">
                  Paste it into your AI assistant
                </Text>
              </div>
              <Text size="sm" variant="muted" className="leading-relaxed pl-9">
                Open a new chat and paste the prompt.
              </Text>
            </div>

            {/* Step 3 — give her a knowledge base */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <StepNumber n={3} />
                <Text size="sm" weight="medium" className="text-fg">
                  Connect CLARA to a knowledge base
                </Text>
              </div>
              <div className="pl-9 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-md border border-border bg-bg-muted px-4 py-3 space-y-1">
                  <div className="flex items-center gap-2 text-accent">
                    <MessageSquareText className="h-4 w-4" aria-hidden />
                    <Text size="sm" weight="medium" className="text-fg">
                      Fastest — paste-in, no MCP
                    </Text>
                  </div>
                  <Text size="sm" variant="muted" className="leading-relaxed">
                    Skip the connector. When CLARA asks for inputs, paste your source material
                    into the chat and she drafts against it. Best for a first look.
                  </Text>
                </div>
                <div className="rounded-md border border-border bg-bg-muted px-4 py-3 space-y-1">
                  <div className="flex items-center gap-2 text-accent">
                    <Plug className="h-4 w-4" aria-hidden />
                    <Text size="sm" weight="medium" className="text-fg">
                      {p.connectTitle}
                    </Text>
                  </div>
                  <Text size="sm" variant="muted" className="leading-relaxed">
                    {p.connectBody}
                  </Text>
                  <a
                    href={p.guideUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    {p.guideLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Text size="sm" variant="muted" className="leading-relaxed">
          Rolling CLARA out to a whole team?{" "}
          <Link
            href="/deploy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            Read the platform deployment guide
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </Text>
      </div>
    </section>
  );
}
