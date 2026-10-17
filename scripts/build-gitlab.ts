// CLARA GitLab build: one self-contained file for installs with no internet.
//
// The hosted skill (core/site/public/skill/clara-gitlab.md) is a lean loader
// that fetches each brief from the website on demand. Disconnected installs
// cannot fetch, so this script inlines all 15 briefs into the skill.
//
// Single source: the skill and briefs come from the vendored clara repo
// (core/site/public/skill/). Never copy them here; pull them with `pnpm core:pull`.
//
// Emits:
//   dist/SKILL.md         — skill with front matter, briefs inlined.
//   dist/system-prompt.md — the same content without front matter, for hosts
//                           that take a flat system prompt.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'core', 'site', 'public', 'skill');
const OUT = path.join(ROOT, 'dist');

// The hosted skill tells the model to fetch briefs. Replace that one sentence.
const FETCH_LINE =
  /^Fetch each brief from `[^`]+` only when requested\. If a brief cannot load, ask the user to paste it\.$/m;
const INLINE_LINE =
  'Every brief is included in full in section 9. When an artefact is requested, use its brief from section 9. Do not fetch anything: this install has no network access.';

const APPENDIX = '\n## Appendix: link check';

function fail(msg: string): never {
  console.error(`build-gitlab: ${msg}`);
  process.exit(1);
}

function splitFrontMatter(text: string): { front: string; body: string } {
  const m = text.match(/^---\n[\s\S]*?\n---\n/);
  if (!m) fail('clara-gitlab.md has no front matter');
  return { front: m[0], body: text.slice(m[0].length).trim() };
}

async function main() {
  const skill = (await fs.readFile(path.join(SRC, 'clara-gitlab.md'), 'utf8')).replace(/\r\n/g, '\n');
  const { front, body } = splitFrontMatter(skill);

  if (!FETCH_LINE.test(body)) fail('could not find the "Fetch each brief" line in section 8; the skill changed shape');
  if (!body.includes(APPENDIX)) fail('could not find "## Appendix: link check"; the skill changed shape');

  // Briefs on disk must match the catalogue table exactly.
  const briefDir = path.join(SRC, 'briefs', 'gitlab');
  const files = (await fs.readdir(briefDir)).filter((f) => f.endsWith('.md')).sort();
  const onDisk = files.map((f) => f.replace(/\.md$/, ''));
  const inTable = [...body.matchAll(/^\| `([a-z-]+)` \|/gm)].map((m) => m[1]).sort();
  const missing = inTable.filter((s) => !onDisk.includes(s));
  const extra = onDisk.filter((s) => !inTable.includes(s));
  if (missing.length || extra.length) {
    fail(`briefs and catalogue differ. In catalogue but no file: [${missing}]. File but not in catalogue: [${extra}]`);
  }

  const sections: string[] = [
    '## 9. Briefs',
    '',
    'One brief per artefact, in catalogue order. Each is the complete instruction set for that slug.',
    '',
  ];
  for (const slug of inTable) {
    const brief = (await fs.readFile(path.join(briefDir, `${slug}.md`), 'utf8')).replace(/\r\n/g, '\n').trim();
    // Briefs contain ``` fences, so wrap them in a longer fence.
    if (brief.includes('````')) fail(`brief "${slug}" contains a four-backtick fence`);
    sections.push(`### \`${slug}\``, '', '````markdown', brief, '````', '');
  }

  const full = body
    .replace(FETCH_LINE, INLINE_LINE)
    .replace(APPENDIX, `\n${sections.join('\n')}${APPENDIX}`);

  await fs.mkdir(OUT, { recursive: true });
  // Remove output from earlier builds (portal pages, old layouts).
  await fs.rm(path.join(OUT, 'portal'), { recursive: true, force: true });
  await fs.rm(path.join(OUT, 'briefs'), { recursive: true, force: true });

  await fs.writeFile(path.join(OUT, 'SKILL.md'), `${front}\n${full}\n`, 'utf8');
  await fs.writeFile(path.join(OUT, 'system-prompt.md'), `${full}\n`, 'utf8');

  const kb = (n: number) => `${Math.round(n / 1024)} KB`;
  console.log(`  build  dist/SKILL.md          ${kb(Buffer.byteLength(full) + front.length)}`);
  console.log(`  build  dist/system-prompt.md  ${kb(Buffer.byteLength(full))}`);
  console.log(`Inlined ${inTable.length} briefs.`);
}

main().catch((e) => fail(String(e)));
