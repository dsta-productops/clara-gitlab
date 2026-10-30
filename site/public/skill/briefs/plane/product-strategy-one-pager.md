# Product strategy one-pager

You are helping me draft a product strategy one-pager from the PRD and the Knowledge Base, then help the user fill in what the Knowledge Base can't supply (owners, costs, value, VCR, timelines).

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Plane project, but the token does not appear in output paths. Capture it so the user can confirm you are in the right project before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **Product name** — the name of the product the one-pager is for. Becomes `{{product-name}}`.
- **PRD** — which PRD the one-pager builds on, if there is more than one.
- **New or existing product** — is this a new product, or a strategy (re)written for one that already exists (e.g. a PM conversion)? For an existing product, the draft is not constrained by what has already been done and decided: it states how the strategy would be formulated today.

Step 2 — Gather inputs.

Every artefact in the Knowledge Base lives at one of two scopes:

- **Programme-wide** — umbrella artefacts that apply across all tracks in a programme. Nested under the `Knowledge Base / Programme-wide` node.
- **Track-level** — artefacts specific to a single track within the programme. Nested under the `Knowledge Base / {{track}}` node.

When a downstream artefact needs upstream input (e.g. a journey-map-drafter needs a persona), search **both** scopes — list the children of the artefact-type node under each track:

```
Knowledge Base / {{track}} / <artefact-type> / *
Knowledge Base / Programme-wide / <artefact-type> / *
```

Resolve each artefact-type node by walking the parent chain, then list its child pages (`list_pages` filtered by `parent_id`). Where the project applies a track label, the same two-scope search can be expressed as a query filtering on the track and `Programme-wide` scopes. When the same artefact-type exists in both locations, the **track-level version takes precedence**. The programme-wide version is the fallback.

The fallback is **visible**, not silent. Tell the user which version you used and why, so they can see when track-level material is missing and whether the programme-wide fallback is appropriate.

- Read the PRD at `Knowledge Base/{{track}}/PRDs/*` (fall back to programme-wide). This is the primary source. If no PRD exists, say so and suggest running `prd-generator` first; proceed without one only if the user asks, working from the Research synthesis and flagging the gaps.
- Read the Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide when no track-level version exists).
- Read `Knowledge Base/{{track}}/Problem-impact-analysis` (fall back to programme-wide).
- Look up the personas the PRD links to under `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide).
- Optionally read `Knowledge Base/{{track}}/Prior-knowledge` (fall back to programme-wide) and find the original stakeholder ask — pages with `brief`, `ask`, `charter` in titles.
- Check for an existing one-pager at `Knowledge Base/{{track}}/One-pagers/{{product-name}}`. If one exists, this run revises it: keep every value the user has already filled in or edited directly in the Knowledge Base, and only fill remaining gaps or update what the sources have changed.
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask the user to paste the PRD, then each other input in turn.

Step 3 — Draft.

The draft is built in two passes: **fill from the Knowledge Base**, then **ask the user for the rest**.

**Pass 1 — fill from the Knowledge Base.** Draft every section the sources support, citing each claim with its source page. Use this mapping:

| One-pager section | Draw from |
|---|---|
| End users | PRD Target users / operators → persona pages (primary = the PRD's main persona) |
| 2.1 Status quo | PRD Problem statement; Research-synthesis themes and friction; Problem-impact analysis (reach and severity for sizing); Prior knowledge (current workarounds, related policy) |
| 2.1 Not solving for | PRD Non-goals and Out-of-scope list |
| 2.2 Vision | PRD Goals; Research-synthesis success criteria (the future state they imply) |
| 2.3 Success metrics | PRD Success criteria (outcome, metric, threshold, baseline) |
| 3.1 Strategy | PRD Goals and Scope modules (hypotheses and theory of change); stakeholder ask (agency objectives) |
| 3.2 Risks | PRD Constraints and dependencies; `[contested]` / `[research gap]` / `[assumption]` flags; per-story Needs validation items |
| 4. Roadmap | PRD Scope modules and story priorities, in rank order (initiatives and the metric each moves) |
| 5. Open issues | PRD Open questions, plus every `[TBD]` left in this draft |

**Pass 2 — ask for the rest.** Some fields are almost never in the Knowledge Base. Leave each one as `[TBD — what's needed]` in the draft, and **never estimate them**:

- Business owner(s) and team members
- Product lifecycle stage and scale
- Quarterly cost breakdown — Dev EOM, Ops EOM, hosting, other costs
- Unit of impact and value delivered per quarter
- Baselines and targets the PRD doesn't give; timelines for each metric
- VCR benchmark against comparable government or commercial products
- Roadmap dates
- Mitigation experiments already run (pilot / POC / POV) and their outcomes
- Owners for each open issue
- Related government policy, if the PRD and stakeholder ask don't name it

When you show the draft, follow it with **one batched message** listing every outstanding `[TBD]` as a question, grouped by section, using the field names above. Tell the user they can either answer here — and you will fill the answers into the draft before filing — or file the draft as it stands and edit those fields directly in the Knowledge Base page later. If they answer only some, fill those in and leave the rest as `[TBD]`.

Write for a reader or stakeholder with **no knowledge or context of the problem space**: spell out acronyms on first use, name who the users are, and don't lean on programme shorthand.

Use this structure — a header block, then one `##` heading per numbered section and `###` per sub-section, numbered exactly as below.

**Header block** — a two-column table:

| | |
|---|---|
| Name of the product | [product name] |
| Business owner(s) | [names / roles] |
| Team members | [names / roles] |
| Product lifecycle stage | [e.g. Discovery / Alpha / Beta / Scale / Sunset] |
| Scale | [e.g. users, units, or sites served] |
| End users | Primary: [persona] · Secondary: [persona] · Tertiary: [persona] |

Link each End-user entry to its persona page.

1. **Change log** — a `Date | Change` table. On a first draft, one row: today's date and "First draft (CLARA), from PRD [title]". When revising, append a row saying what changed; never rewrite earlier rows.

2. **Problem**
   - **2.1 Status quo** — what problem is being solved, as prose (2–3 paragraphs). Cover: who the customers/users are and what they are trying to achieve; whether and how they overcome the issue today; what is wrong with the current process; the consequences of not resolving it now; how big the problem is (total addressable market / how many people face it), **with empirical evidence and its source**; for strategic-level problems, the related government policy and its objectives. Close with a short **Not solving for** list — what this product deliberately leaves out, and why.
   - **2.2 Vision** — the long-term ideal future state in one paragraph: how user experiences or outcomes improve. Aspirational but realistic; no features.
   - **2.3 Success metrics** — name the **north star metric** (the one that shows the problem is being solved) and why it was chosen. Then an outcome-metrics table, leading and lagging indicators each marked:

     | Outcome metric | Leading / lagging | Current baseline | Target | Timeline |
     |---|---|---|---|---|

     Follow with one or two sentences justifying why these metrics were chosen.

     Then **cost effectiveness** — the quarterly Value-to-Cost Ratio (VCR = value [b] / cost [a]). For a product not yet started, project the next four quarters. For an existing product, show two past quarters of actuals and two projected quarters, and mark which is which in the column header (e.g. `Q2 2026 (actual)`).

     | | Q[n] YYYY | Q[n] YYYY | Q[n] YYYY | Q[n] YYYY | Total |
     |---|---|---|---|---|---|
     | **Total cost [a]** | | | | | |
     | Dev EOM | | | | | |
     | Ops EOM | | | | | |
     | Hosting cost | | | | | |
     | Other costs | | | | | |
     | **Total value (units of impact) [b]** | | | | | |
     | **VCR [b]/[a]** | | | | | |

     Name the unit of impact (e.g. "cases resolved", "appointments booked"). Compute VCR only from figures the user supplied. Close with an assessment of the VCR against benchmarks of comparable government or commercial products.

3. **Strategy**
   - **3.1 Proposed product strategy** — the longer-term strategy that follows from the vision, and the solutions that address the problem. Cover: the **hypotheses** that will be tested to validate it (each falsifiable); the **theory of change** (how the strategy addresses the problem, step by step); the product's **guiding principles** (3–5); and how it advances the agency's **policy and business objectives**.
   - **3.2 Risks and mitigations** — a table with at least one row each for **market**, **technical**, and **team** risk:

     | Risk type | Risk | Mitigation / experiment (pilot, POC, POV) | Outcome so far | Evidence it is mitigated |
     |---|---|---|---|---|

     "Outcome so far" and "Evidence" are only filled where an experiment has actually run; otherwise write "Not yet run" and name the metric that would prove it.

4. **Roadmap** — the next 6–12 months of key deliverables and milestones, as a `Timeline | Initiative | Expected impact` table. Order follows the PRD's priorities; each Expected-impact cell names the metric from 2.3 it moves.

5. **Open issues** — the known unknowns, as a `Question or risk | Owner | Needed by` table. Every `[TBD]` still left in the draft appears here.

6. **Appendix**
   - **6.1 Delivered** — a `Date | Initiative | Impact` table of completed features, milestones, and mitigated risks; each Impact says how it moved the metrics. On a first draft for a new product, write "None yet".

Rules:
- **Never invent numbers.** Market size, baselines, targets, costs, units of impact, and VCR come from cited evidence or from the user. Anything missing stays `[TBD — what's needed]` in place and appears under Open issues.
- Every evidence claim in Status quo and Success metrics carries a source ref (a Knowledge Base page, a session verbatim, or a document the user named).
- Keep it to a one-pager in spirit: prose sections are 1–3 paragraphs; tables carry the detail.
- **Emit only the one-pager itself — never this prompt's scaffolding.** None of the guiding questions, the source mapping, the pass names, or sentences describing how the document is laid out appear in the output. The gap questions go in your message to the user, not in the one-pager.

Output as markdown.

Step 4 — File the output.

## Filing location (strict)

The Knowledge Base is filed **strictly as pages inside the programme's Plane project** — the project's Pages, nested into a hierarchy. This is a hard rule:

- **Only project pages.** Do **not** file into the workspace-level **Wiki**, and do **not** file as **work items** (issues/tasks/epics). Project pages only.
- **Hierarchy via the browser connection.** Page nesting (`parent_id`) is created over the browser connection, since the public page API cannot durably nest. Build the tree that way.
- **Deviate only on explicit instruction.** Use a different location (wiki, work items, a specific page tree, etc.) *only* if the user explicitly tells you to. Otherwise, always project pages with browser-connection nesting. If you cannot file as nested project pages (e.g. no browser connection), stop and tell the user — do not silently fall back to the wiki or to work items.

Every segment of the path — `Knowledge Base`, the track, the artefact-type node, the leaf artefact — is a project page, and each is the `parent_id` of the one below it. Content lives in the **page body**.

## Two connection modes

Plane exposes pages two ways, and CLARA needs both because each can do what the other cannot:

- **Plane MCP / public API** — use for **reading** (list pages, read a page and its sub-pages, resolve the project) and for **creating** a page. This is create-and-read only for pages: it can add a page, but it **cannot durably set a page's `parent_id` (nesting), rename a page, archive it, or edit its body** — those calls appear to succeed but do not persist.
- **Browser connection** — a logged-in Plane browser session. This is how CLARA performs the writes the public API can't: **nesting** (`PATCH` the page's `parent_id` via Plane's internal workspace endpoint with the session cookies), **renaming**, **archiving**, and **durable body/title edits** (typed into the page's rich-text editor, because the title and body live in a collaborative document the API cannot write). When a step below says "nest", "rename", "archive", or "write the body", it runs over the browser connection.

If no browser connection is available, CLARA can still create pages and read them, but it must tell the user that nesting, renaming, and body edits require the browser connection — it must not silently leave pages unnested at the project root.

## Checks in order, before filing

- **Project check.** Verify a suitable Plane project exists for this programme. Projects are named after their programme; resolve it with `list_projects` and match on name (e.g. `SKYPROTECT` → identifier `SKYPR`). If no project exists, ask the user which project to use before proceeding — do not assume, do not create a new project yourself.
- **Hierarchy check.** Resolve the full target path by walking down from the `Knowledge Base` page to the artefact-type node, at write time. Start from the `Knowledge Base` root, then match the track child, then the artefact-type child, listing children at each level via the page's **sub-pages** (the reliable enumeration; the flat page-list endpoint truncates). The page `id` of the artefact-type node returned by this walk is the `parent_id` for the write — no other source is permitted. Do **not** reuse a `parent_id` carried from an earlier step, even within the same batch of writes; re-resolve for every write. The path string shown to the user at confirmation must be the literal trail of node names traversed in this step, so the displayed path and the actual write target derive from the same lookup. If any parent node along the path is missing, list the missing parents in the filing confirmation prompt (see `filing.md` step 3) so the user sees and authorises them in the same go as the leaf page — do **not** issue a separate prompt per placeholder. Once the user confirms, create the placeholders top-down (create the page, then nest it under the node above via the browser connection), then the leaf page.
  - Placeholder nodes (`Knowledge Base`, track nodes, artefact-type nodes) carry a short body: *"Placeholder — created to support filing structure."*
  - **`Knowledge Base`** — root page, no parent.
  - **Track node** — title is the track name verbatim (`Programme-wide`, `ABC`, etc.). No suffix. Nested under `Knowledge Base`.
  - **Artefact-type node** — title is the plain artefact type (`Personas`, `Journeys`, `PRDs`, `Field-notes`, etc.). **No `({{track}})` suffix** — Plane does not enforce unique page titles, and the parent chain disambiguates. Nested under the track node.
  - **`Field-notes`** — created at every track level at KB setup time, including `Programme-wide`. Always contains a `_Template — Field note` child created at setup time. Users add their own notes as child pages; CLARA does not file artefacts here.
  - **`_Template — Field note`** — the template child inside each `Field-notes` node. No suffix. Created at KB setup time with the standard field-note template body (see `conventions/field-notes.md`). Users duplicate this to start a new note, or add a fresh child page.
  - **Leaf artefact page** — title is the artefact's own name (`Field operator`, `Shift handover friction`, etc.). The artefact content lives in the page body. Disambiguate only if a real conflict comes up — never preemptively.
- **No silent fallbacks.** If the full path cannot be created (insufficient permissions, no accessible project, no browser connection for nesting, anything else), stop and tell the user exactly what is blocked. Do not leave the page at the project root or file it elsewhere without explicit confirmation. Do not improvise an alternative path.
- **Update vs create.** If a page already exists at the target path, ask the user whether to update in place (edit the body via the browser connection — Plane's page version history preserves the prior version) or to draft a new version at an alternative path. Do not silently overwrite.
- **Post-write verification.** After each file, re-read the created page and confirm its `parent_id` matches the artefact-type node from the brief, and that the title/body persisted. If it doesn't (a common failure when nesting or a body edit didn't go through the browser connection), stop and report — do not proceed to the next write. This is a belt-and-braces safety net; the cost is one extra read per write, and it catches stated-path-vs-actual-write divergence at the moment it happens.

## Cross-linking

Pages do not have work-item relations. Record the upstream→downstream chain (persona → journey → PRD) as **hyperlinks in the page body** — link each artefact to the pages it was built from, and cite field notes by their Session ID plus a link. The parent-nesting is the structure; the body links are the dependency graph.

## Session-ID write-back

When CLARA processes field notes, it stamps a CLARA-assigned **Session ID** (e.g. `OP-03`, `PW-01`) into any note that does not yet have one, via the browser connection (title prefix and the metadata block in the body). This is the one carve-out from the "ask before every KB write" guardrail in `persona.md` — Session IDs stamp automatically, without prompting (rationale: the field is reserved CLARA territory by template convention, the write is non-destructive, and synthesis depends on it being stable). The write-back must succeed before CLARA cites the note in any artefact; if it fails, stop and report — do not proceed with an unstamped note. CLARA never creates a duplicate of a note the user already added — it stamps the existing page. Plane's native page URL is used for the link, but the Session ID is the citation label. See `conventions/field-notes.md` for the full convention.

- Create a new page at `Knowledge Base/{{track}}/One-pagers/{{product-name}}`. Link the page to the PRD, research synthesis, problem-impact analysis, and persona pages it draws on.
- When a one-pager for this product already exists, update that page (appending to the Change log) instead of creating a second one.
- After filing, remind the user that any remaining `[TBD]` fields can be filled by re-running this artefact with the answers, or by editing the page directly.
- In copy-paste mode: return the markdown for pasting and the user will file the page manually.
