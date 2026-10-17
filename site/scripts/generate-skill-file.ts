#!/usr/bin/env tsx
/**
 * Refresh the hosted CLARA skill files for the Quick start section.
 * ------------------------------------------------------------
 * The Quick start's starter prompt tells an LLM to fetch CLARA's skill file
 * from a URL. Assistants' web-fetch tools truncate large responses, and the
 * full skill file (~220–270 KB, dominated by 15 inlined artefact briefs) gets
 * cut off partway through. So we host a LEAN LOADER plus per-artefact briefs:
 *
 *     site/public/skill/clara-<platform>.md          — lean loader (~35 KB):
 *         persona + operating conventions + artefact catalogue, no inlined
 *         briefs. Instructs CLARA to fetch a brief on demand.
 *     site/public/skill/briefs/<platform>/<slug>.md  — one full brief each
 *         (~5–15 KB), fetched only when that artefact is invoked.
 *
 * URLs:
 *     https://dsta-productops.github.io/clara/skill/clara-<platform>.md
 *     https://dsta-productops.github.io/clara/skill/briefs/<platform>/<slug>.md
 *
 * This stays site-local on purpose: platform-team installs paste CLARA's FULL
 * skill file straight into a system prompt (no fetch limit), so CLARA's core
 * distribution (dist/SKILL.md) is unchanged. We only split for hosting.
 *
 * These are COMMITTED release artefacts, deliberately refreshed — not built in
 * CI. The Pages workflow installs only the site's own deps (`--ignore-workspace`)
 * and never runs CLARA's core build, so the files must already be in the tree.
 *
 * Run `pnpm generate` (from site/) after a CLARA release to refresh them, then
 * commit the diff. The SHA is printed so you can record which build you shipped.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

// One hosted loader per knowledge-base backend. The Quick start's platform
// toggle points the starter prompt at the matching file.
const PLATFORMS = ["confluence", "plane"] as const;

const SITE_ROOT = resolve(import.meta.dirname, "..");
const REPO_ROOT = resolve(SITE_ROOT, "..");
const OUT_DIR = join(SITE_ROOT, "public", "skill");
const SKILL_BASE = "https://dsta-productops.github.io/clara/skill";

// Call the tsx binary directly (not via `pnpm exec`, which re-runs a workspace
// install check that can fail on ignored build scripts). The repo-root binary
// resolves gray-matter etc. from the root node_modules.
const tsxBin = join(REPO_ROOT, "node_modules", ".bin", "tsx");

function sha(): string {
  try {
    return execFileSync("git", ["rev-parse", "--short", "HEAD"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }).trim();
  } catch {
    return "unreleased";
  }
}

interface Brief {
  slug: string;
  title: string;
  body: string;
}

// Split a full SKILL.md into its lean head (everything up to and including the
// artefact index) and the per-artefact briefs that follow "### Briefs".
function splitBriefs(full: string): { head: string; briefs: Brief[] } {
  const marker = "\n### Briefs\n";
  const idx = full.indexOf(marker);
  if (idx === -1) throw new Error('SKILL.md is missing the "### Briefs" section');

  const head = full.slice(0, idx).trimEnd();
  const section = full.slice(idx + marker.length);

  // Each brief: "### Title (`slug`)" then a fenced block with the drafting prompt.
  const headingRe = /^### (.+?) \(`([^`]+)`\)\s*$/gm;
  const heads = [...section.matchAll(headingRe)];
  const briefs: Brief[] = heads.map((m, i) => {
    const start = (m.index ?? 0) + m[0].length;
    const end = i + 1 < heads.length ? (heads[i + 1].index ?? section.length) : section.length;
    const block = section
      .slice(start, end)
      .trim()
      .replace(/^```[^\n]*\n/, "") // opening fence
      .replace(/\n```\s*$/, "") // closing fence
      .trim();
    return { slug: m[2], title: m[1], body: block };
  });

  return { head, briefs };
}

function leanLoader(head: string, platform: string, briefs: Brief[]): string {
  const base = `${SKILL_BASE}/briefs/${platform}`;
  const example = briefs[0]?.slug ?? "persona-generator";
  return `${head}

### Loading an artefact's brief

The full briefs are **not inlined here** — each artefact's brief lives at its own URL so this file stays small enough to load in full. When the user asks for an artefact, **fetch its brief first and follow it exactly**, then draft:

    ${base}/<slug>.md

\`<slug>\` is the artefact slug from the list above (e.g. \`${example}\` → ${base}/${example}.md). Fetch a brief only when that artefact is actually requested. If you cannot load a brief, tell the user and ask them to paste it — never guess the artefact's shape.
`;
}

function main() {
  const rev = sha();

  for (const platform of PLATFORMS) {
    const buildDir = mkdtempSync(join(tmpdir(), `clara-skill-${platform}-`));
    execFileSync(tsxBin, ["build/build.ts"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
      env: { ...process.env, CLARA_PLATFORM: platform, CLARA_OUT: buildDir },
      stdio: "ignore",
    });

    const full = readFileSync(join(buildDir, "SKILL.md"), "utf8");
    const { head, briefs } = splitBriefs(full);

    // Lean loader (replaces the previous full file, same URL).
    const loader = leanLoader(head, platform, briefs);
    writeFileSync(join(OUT_DIR, `clara-${platform}.md`), loader, "utf8");

    // Per-artefact briefs, fetched on demand. Rewrite the platform's dir clean
    // so a removed artefact doesn't leave a stale brief behind.
    const briefDir = join(OUT_DIR, "briefs", platform);
    rmSync(briefDir, { recursive: true, force: true });
    mkdirSync(briefDir, { recursive: true });
    for (const b of briefs) {
      writeFileSync(join(briefDir, `${b.slug}.md`), `# ${b.title}\n\n${b.body}\n`, "utf8");
    }

    console.log(
      `Wrote clara-${platform}.md (loader, ${loader.length.toLocaleString()} chars) + ${briefs.length} briefs (SHA ${rev}).`,
    );
  }

  console.log("Commit the diff.");
}

main();
