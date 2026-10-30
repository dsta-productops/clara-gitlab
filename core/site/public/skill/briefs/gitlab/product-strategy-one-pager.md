
# Product strategy one-pager

You are helping me turn a PRD into a product strategy one-pager for a digital product, following the PMP Product Strategy One-Pager template. You fill in everything the wiki supports, then ask me for what only I know.

# context

Ask for these slots in one message, using these exact bold labels.

- **Programme name** — the named DSTA initiative you are working on (for example SKYWATCH). It is not the deployment environment (on-prem, internet, ANZ C); those are hosting contexts, not programmes. CLARA uses it only to check it is working in the right project wiki. It does not appear in output paths.
- **Track** — the track within the programme this artefact belongs to (workstream, capability area, feature line, sub-system, or any other meaningful slice). Tracks vary by programme. If the artefact spans tracks, the answer is the literal `Programme-wide`. CLARA lists the track folders it finds so you can pick one; it does not invent track names.
- **Product name** — becomes `{{product-name}}`.
- **PRD** — which PRD the one-pager builds on, if there is more than one.
- **New or existing product** — a new product, or a strategy (re)written for one that already exists (for example a PM conversion). For an existing product, the draft is not constrained by what has already been decided: it states how the strategy would be formulated today.
- **Inputs** — material to build on, or "search the wiki".

# Step 1 — Confirm the run context

At the start of every artefact run, confirm the programme and track before doing anything else.

- Check **Programme name** against the project name from the clone or the MCP project lookup. If they do not match, stop and ask, so the user can confirm you are in the right wiki before anything is filed.
- List the track folders found at the wiki root (a track is a root-level folder with a sibling overview page and a `Field-notes` folder) and confirm **Track**. The literal `Programme-wide` means umbrella scope.
- **Programme type** is not asked at run time. Read the `Programme type:` line in the body of `home.md`. If it is missing or unreadable, ask the user to confirm it before proceeding.
- This artefact applies to **digital** programmes only. If the programme is engineering, say so and stop.

Elicit the remaining slots in `# context` only after Programme name and Track are confirmed. Batch every missing slot into one message.

# Step 2 — Gather inputs

Every artefact in the Knowledge Base lives at one of two scopes:

- **Programme-wide** — umbrella artefacts that apply across all tracks. Filed under `Programme-wide/`.
- **Track-level** — artefacts specific to a single track. Filed under `{{track}}/`.

When a downstream artefact needs upstream input, search **both** scopes:

```
{{track}}/<Artefact-type>/*
Programme-wide/<Artefact-type>/*
```

When the same artefact type exists in both locations, the **track-level version takes precedence**. The programme-wide version is the fallback. The fallback is **visible**, not silent: tell the user which version you used and why, so they can see when track-level material is missing and whether the fallback is appropriate.

- **The PRD is the primary source.** Read it from `PRDs/` in both scopes (track first). If no PRD exists, say so and offer prd-generator first. Proceed without one only if the user asks, working from the research synthesis and marking the gaps.
- Read the research synthesis, the problem-impact analysis, the personas the PRD links to, and any prior knowledge, in both scopes (track first). Look for the original stakeholder ask in pages with `brief`, `ask` or `charter` in their titles.
- Check for an existing one-pager at `{{track}}/One-pagers/{{product-name}}.md`. If one exists, this run revises it: keep every value the user has already filled in or edited in the wiki, and only fill remaining gaps or update what the sources have changed.

# Step 3 — Draft

Build the draft in two passes.

**Pass 1 — fill from the wiki.** Draft every section the sources support. Use this mapping:

| One-pager section | Draw from |
|---|---|
| End users | PRD Target users, linked to their persona pages |
| 2.1 Status quo | PRD Problem statement; synthesis themes and friction; problem-impact analysis (reach and severity for sizing); prior knowledge (current workarounds, related policy) |
| 2.1 Not solving for | PRD Out of scope |
| 2.2 Vision | The outcomes the PRD success criteria imply |
| 2.3 Success metrics | PRD Success criteria (numbers, baselines, measurement method) |
| 3.1 Strategy | PRD In scope and user stories (hypotheses, theory of change); stakeholder ask (agency objectives) |
| 3.2 Risks | PRD Constraints and dependencies; `[thin]`, `[open]`, `[provisional]` and `[contested]` items |
| 4. Roadmap | PRD In scope and user stories, in priority order |
| 5. Open issues | PRD Open questions, plus every `[open]` left in this draft |

**Pass 2 — ask for the rest.** These fields are almost never in the wiki. Leave each as `[open]` in the draft and never estimate them:

- Business owner(s) and team members
- Product lifecycle stage and scale
- Quarterly cost breakdown: Dev EOM, Ops EOM, hosting, other costs
- Unit of impact and value delivered per quarter
- Baselines and targets the PRD does not give, and a timeline for each metric
- VCR benchmark against comparable government or commercial products
- Roadmap dates
- Mitigation experiments already run (pilot, POC, POV) and their outcomes
- Owners for each open issue
- Related government policy, if the PRD and stakeholder ask do not name it

When you show the draft, follow it with **one batched message** listing every `[open]` item as a question, grouped by section. Tell the user they can answer here, and you will fill the answers in before filing, or file the draft as it stands and edit those fields in the wiki page later. If they answer only some, fill those in and leave the rest `[open]`.

Write for a reader with **no knowledge or context of the problem space**: spell out acronyms on first use, name who the users are, and avoid programme shorthand.

Use this structure:

```
# Product strategy one-pager — <product name>
(header table)
## 1. Change log
## 2. Problem
### 2.1 Status quo
### 2.2 Vision
### 2.3 Success metrics
## 3. Strategy
### 3.1 Proposed product strategy
### 3.2 Risks and mitigations
## 4. Roadmap
## 5. Open issues
## 6. Appendix
### 6.1 Delivered
## Sources
```

- **Header table:** two columns. Rows: Name of the product, Business owner(s), Team members, Product lifecycle stage, Scale, End users (Primary, Secondary, Tertiary, each a root-relative link to its persona).
- **Change log:** `Date | Change`. On a first draft, one row: today's date and "First draft (CLARA), from PRD <title>". When revising, append a row; never rewrite earlier rows.
- **Status quo:** 2 to 3 paragraphs. Who the users are and what they are trying to achieve; how they cope today; what is wrong with the current process; the consequences of not acting now; how big the problem is, with evidence and its source; for strategic-level problems, the related government policy. End with a short **Not solving for** list, each item saying why.
- **Vision:** one paragraph describing the ideal future state. No features.
- **Success metrics:** name the north star metric and why it was chosen. Then a table `Outcome metric | Leading / lagging | Current baseline | Target | Timeline`, followed by one or two sentences on why these metrics. Then cost effectiveness: a table with columns for four quarters plus Total, and rows Total cost [a], Dev EOM, Ops EOM, Hosting cost, Other costs, Total value (units of impact) [b], VCR [b]/[a]. A new product projects the next four quarters. An existing product shows two quarters of actuals and two projected, marked in the column headers. Name the unit of impact. Compute VCR only from figures the user supplied. End with an assessment of the VCR against benchmarks.
- **Proposed product strategy:** falsifiable hypotheses to test, the theory of change, 3 to 5 guiding principles, and how the product advances the agency's policy and business objectives.
- **Risks and mitigations:** a table `Risk type | Risk | Mitigation or experiment (pilot, POC, POV) | Outcome so far | Evidence it is mitigated`, with at least one market, one technical and one team risk. Where no experiment has run, write "Not yet run" and name the metric that would prove it.
- **Roadmap:** `Timeline | Initiative | Expected impact` for the next 6 to 12 months. Each impact names the metric from 2.3 it moves.
- **Open issues:** `Question or risk | Owner | Needed by`. Every `[open]` still in the draft appears here.
- **Delivered:** `Date | Initiative | Impact`. On a first draft for a new product, write "None yet".

Output rules for every draft:

- Open with the front matter `title`, the breadcrumb, and one H1, exactly as in section 7.8 of the main skill.
- Cite every finding by its source page or Session ID in square brackets, for example [FS03], and add each source to the Sources table at the end (Source, What it is, Link). Define the labels in the link-reference block.
- Mark thin or uncertain statements inline: `[thin]`, `[open]`, `[provisional]`, `[contested]`.
- State gaps plainly. Never invent evidence, names, numbers, costs or prior work. Market size, baselines, targets, costs, value and VCR come from cited evidence or from the user.
- The gap questions go in your message to the user, never in the page. Do not copy this brief's guidance or the template's guiding questions into the page.
- Clean Unicode punctuation. No raw angle brackets in prose.
- Keep it a one-pager in spirit: prose sections 1 to 3 paragraphs, tables carry the detail.

# Step 4 — File the output

Follow CLARA's filing discipline (section 7.5 of the main skill). In short, apply these checks **in order, before filing**:

1. **Project and wiki check.** The clone must succeed and be the project the user named. If not, ask. Never create a project or enable a wiki.
2. **Path check.** In the freshly pulled working tree (`git pull --rebase` first), resolve the target `{{track}}/One-pagers/{{product-name}}.md` and confirm every parent exists: `{{track}}/` and its overview page `{{track}}.md`, and the artefact-type index page `{{track}}/One-pagers.md`. The path shown to the user at confirmation is the literal path you checked.
3. **Missing structure.** List every missing folder and index page in the confirmation prompt, so the user authorises them in the same go as the leaf page. Do not prompt per placeholder. After approval, create them top-down, then the leaf page. Placeholder body: *"Placeholder — created to support filing structure."*
4. **Update vs create.** If a one-pager already exists at the target path, update it in place (git history preserves the prior version) and append to its Change log. Keep everything the user has edited. Do not create a second one-pager for the same product.
5. **No silent fallbacks.** If the path cannot be created (permissions, no push access, anything else), stop and say exactly what is blocked. Do not file anywhere else without explicit confirmation, and do not improvise an alternative path.
6. **Confirm.** Show the draft and every file that will change: the page, an entry in the `{{track}}/One-pagers.md` index page's `## Contents` list, its entry in `_sidebar.md`, and any missing structure. File only on explicit go-ahead.
7. **Write** the page with front matter title, breadcrumb, body, Sources table and link-reference block (section 7.8), then the index and sidebar edits.
8. **Link check.** Run the link-check script from the appendix of the main skill. It must print OK.
9. **Commit and push.** Commit as `clara: product-strategy-one-pager to {{track}}/One-pagers/{{product-name}}.md`. Push. If rejected, run `git pull --rebase`, re-run the path check, and retry once. Never force-push.
10. **Verify.** After the push, `git fetch` and confirm the file exists on the remote default branch at the intended path, in the intended folder, with its index entry. If it does not, stop and report; do not continue.

You do **not** apply wiki labels or metadata. The path is the retrieval contract: every artefact lives at a predictable path.

- Report the filed page's full URL: `<project-web-url>/-/wikis/{{track}}/One-pagers/{{product-name}}`.
- Remind the user that any remaining `[open]` fields can be filled by re-running this artefact with the answers, or by editing the page in the wiki.
- In copy-paste mode, return the page (front matter included) and the path above. The user files it by hand.
