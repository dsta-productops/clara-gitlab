---
title: "Product strategy one-pager"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a product strategy one-pager from the PRD and the Knowledge Base, then help the user fill in what the Knowledge Base can't supply (owners, costs, value, VCR, timelines)"
expectedOutput: "Markdown one-pager following the PMP Product Strategy One-Pager template: a header block (product name, business owners, team, lifecycle stage, scale, end users), then 6 numbered sections — Change log; Problem (Status quo, Vision, Success metrics with an outcome-metrics table and a quarterly cost / value / VCR table); Strategy (Proposed product strategy, Risks and mitigations covering market, technical and team risk); Roadmap (6–12 month table); Open issues (with owners); Appendix (Delivered). Everything the PRD and Knowledge Base support is filled in with source refs; everything they can't supply is a [TBD] placeholder, and CLARA asks the user for those items in one batch so she can fill them in."
inputsFrom:
  - prd-generator
  - research-synthesiser
  - problem-impact-ranker
  - persona-generator
  - prior-knowledge-summariser
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "The PRD"
      description: "Page under `Knowledge Base/{{track}}/PRDs/*` (falls back to programme-wide). The primary source: problem statement, target users, goals and non-goals, scope modules, success criteria, constraints, and open questions all map into the one-pager. Ask the user which PRD if multiple."
    - what: "Problem statement and Success criteria"
      description: "Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis`. Falls back to `Knowledge Base/Programme-wide/Research-synthesis` when no track-level version exists."
    - what: "Problem-impact ranking"
      description: "`Knowledge Base/{{track}}/Problem-impact-analysis` (falls back to programme-wide). Sizes the problem and orders the roadmap."
    - what: "Personas for End users"
      description: "Pages under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`."
    - what: "Prior knowledge (optional)"
      description: "`Knowledge Base/{{track}}/Prior-knowledge` (falls back to programme-wide). Used for status-quo workarounds, related policy, and earlier decisions."
    - what: "Original stakeholder ask"
      description: "Programme brief / charter / requesting note. Pages with 'brief', 'ask', 'charter' in titles."
    - what: "Existing one-pager (when revising)"
      description: "`Knowledge Base/{{track}}/One-pagers/{{product-name}}`. When it exists, keep everything the user has already filled in or edited, and update it rather than starting over."
  outputPathTemplate: "Knowledge Base/{{track}}/One-pagers/{{product-name}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt after the PRD to draft the product strategy one-pager — the core artefact a PM uses to declare the product's problem and solution — following the PMP Product Strategy One-Pager template. CLARA fills in everything the PRD and Knowledge Base can support, then asks you for what only you know (owners, costs, value, timelines) so she can complete it with you.

# context

- **Product name** — the name of the product the one-pager is for. Becomes `{{product-name}}`.
- **PRD** — which PRD the one-pager builds on, if there is more than one.
- **New or existing product** — is this a new product, or a strategy (re)written for one that already exists (e.g. a PM conversion)? For an existing product, the draft is not constrained by what has already been done and decided: it states how the strategy would be formulated today.

# inputs

- Read the PRD at `Knowledge Base/{{track}}/PRDs/*` (fall back to programme-wide). This is the primary source. If no PRD exists, say so and suggest running `prd-generator` first; proceed without one only if the user asks, working from the Research synthesis and flagging the gaps.
- Read the Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide when no track-level version exists).
- Read `Knowledge Base/{{track}}/Problem-impact-analysis` (fall back to programme-wide).
- Look up the personas the PRD links to under `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide).
- Optionally read `Knowledge Base/{{track}}/Prior-knowledge` (fall back to programme-wide) and find the original stakeholder ask — pages with `brief`, `ask`, `charter` in titles.
- Check for an existing one-pager at `Knowledge Base/{{track}}/One-pagers/{{product-name}}`. If one exists, this run revises it: keep every value the user has already filled in or edited directly in the Knowledge Base, and only fill remaining gaps or update what the sources have changed.
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask the user to paste the PRD, then each other input in turn.

# draft

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

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/One-pagers/{{product-name}}`. Link to the PRD, research synthesis, problem-impact analysis, and persona pages it draws on.
- When a one-pager for this product already exists, update that page (appending to the Change log) instead of creating a second one.
- After filing, remind the user that any remaining `[TBD]` fields can be filled by re-running this artefact with the answers, or by editing the page directly.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new page at `Knowledge Base/{{track}}/One-pagers/{{product-name}}`. Link the page to the PRD, research synthesis, problem-impact analysis, and persona pages it draws on.
- When a one-pager for this product already exists, update that page (appending to the Change log) instead of creating a second one.
- After filing, remind the user that any remaining `[TBD]` fields can be filled by re-running this artefact with the answers, or by editing the page directly.
- In copy-paste mode: return the markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- Run this after `prd-generator`. Most of the one-pager comes straight from the PRD; CLARA only asks you for what the Knowledge Base doesn't have.
- Have your cost breakdown (Dev EOM, Ops EOM, hosting, other), your unit of impact, and your business owners ready — CLARA will ask for them and will not estimate them.
- You don't have to answer every question in one sitting. File the draft with `[TBD]`s, then fill them in on the page yourself or re-run CLARA with the answers; she keeps what you've already edited.
- Feedback on the one-pager template itself goes to the PMP: https://go.gov.sg/pmp-artifact-feedback

## Before you circulate — self-review checklist

- **Readable cold** — someone with no context of the problem space can follow it: acronyms spelled out, users named, no programme shorthand.
- **Status quo** says who has the problem, how they cope today, what it costs not to act, and how big it is — with evidence and a source for the sizing. It names what you are **not** solving for.
- **Vision** describes a future state, not a feature list.
- **North star metric** is named and justified; every outcome metric has a baseline, target, and timeline, and is marked leading or lagging.
- **VCR table** uses only real or user-supplied figures, names the unit of impact, distinguishes actuals from projections, and is assessed against a benchmark.
- **Strategy** states falsifiable hypotheses, a theory of change, and guiding principles, and ties to agency policy and business objectives.
- **Risks** cover market, technical, and team at minimum, each with a mitigation experiment and the metric that would prove it worked.
- **Roadmap** covers 6–12 months and each initiative names the metric it moves.
- **No `[TBD]` left** unless it is listed under Open issues with an owner.
