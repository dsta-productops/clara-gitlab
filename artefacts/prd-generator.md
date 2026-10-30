---
title: "PRD generator"
phase: "research"
domain: "digital"
tool: "clara"
task: "draft a v0 PRD from the problem-impact ranking, research synthesis, and prior framing"
expectedOutput: "Markdown PRD with 8 standard sections — including a Scope table that rolls ranked problems up into product modules (module / rolls-up-ranks / core job) and prioritised user stories in two layers: a summary table (id·rank·priority / as-a / i-want / so-that / evidence) plus an expanded block for every story (Independent Test / robust unlabelled Gherkin acceptance scenarios covering happy path, invalid input, duplicate/conflict, boundary limits and their transitions, state/permission, and accessibility/non-functional / a per-story 'Needs validation' list of assumptions still to confirm). Clarifying questions where input is incomplete."
inputsFrom:
  - problem-impact-ranker
  - research-synthesiser
  - persona-generator
@@if confluence@@
confluenceContext:
@@endif@@
@@if plane@@
planeContext:
@@endif@@
  inputs:
    - what: "The problem to build for"
      description: "The top-ranked (or user-chosen) problem from `Knowledge Base/{{track}}/Problem-impact-analysis`. Falls back to programme-wide. If a ranking exists, the PRD is drafted for one problem lifted from it; if the user names a different rank, use that. When no ranking exists, fall back to the Research-synthesis problem statement directly."
    - what: "Problem statement and Success criteria"
      description: "Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis`. Falls back to `Knowledge Base/Programme-wide/Research-synthesis` when no track-level version exists."
    - what: "Persona for the PRD"
@@if confluence@@
      description: "Page under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Ask the user which persona if multiple."
@@endif@@
@@if plane@@
      description: "Page under `Knowledge Base/{{track}}/Personas/*` or `Knowledge Base/Programme-wide/Personas/*`. Ask the user which persona if multiple."
@@endif@@
    - what: "Themes from the Research synthesis (optional)"
      description: "Themes section of `Knowledge Base/{{track}}/Research-synthesis` or `Knowledge Base/Programme-wide/Research-synthesis`."
    - what: "Original stakeholder ask"
@@if confluence@@
      description: "Programme brief / charter / requesting note. Pages with 'brief', 'ask', 'charter' in titles."
@@endif@@
@@if plane@@
      description: "Programme brief / charter / requesting note. Pages with 'brief', 'ask', 'charter' in titles."
@@endif@@
  outputPathTemplate: "Knowledge Base/{{track}}/PRDs/{{prd-title}}"
visibility: "public"
status: "ready"
---

# intro

Use this prompt to draft a first-pass PRD from research synthesis and stakeholder context.

# context

- **PRD title** — short (e.g. "Incident-report capture v1"). Becomes `{{prd-title}}`.

# inputs

- Read `Knowledge Base/{{track}}/Problem-impact-analysis` (fall back to programme-wide). If a ranking exists, draft the PRD for the **top-ranked problem** unless the user names a different rank — confirm which problem before drafting. If no ranking exists, work from the Research-synthesis problem statement directly.
- Read the Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide when no track-level version exists).
- Look up the persona at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide). Ask the user which persona if multiple.
- Optionally read the Themes section of `Knowledge Base/{{track}}/Research-synthesis` (or programme-wide).
@@if confluence@@
- Find the original stakeholder ask — programme brief / charter / requesting note. Pages with `brief`, `ask`, `charter` in titles.
@@endif@@
@@if plane@@
- Find the original stakeholder ask — programme brief / charter / requesting note. Pages with `brief`, `ask`, `charter` in titles.
@@endif@@
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask the user for each of these inputs in turn.

# draft

Produce a PRD using this structure, one `##` heading per section:

1. **Problem statement** (1 paragraph) — framed as a problem, not a solution in disguise; names who has the problem.
2. **Target users / operators** — link to the specific persona page(s); no implicit "the user".
3. **Goals and non-goals** — what this release is trying to achieve, and what it is explicitly *not* doing (contested or out-of-evidence items go under non-goals, with the reason).
4. **Scope — modules** — roll the ranked problems up into product modules. Present as a table, one row per module, highest-impact modules first:

   | Module | Rolls up ranks | Core job |
   |---|---|---|
   | [module name] | [rank #s from the Problem-impact analysis, e.g. 1, 2, 3] | [one line — what this module does] |

   - Cluster the ranks using the Problem-impact analysis's own "Reading the ranking" clusters where present (problems that are one root cause seen from several seats belong in one module). A single high-impact root cause can be its own module; low-leverage or discovery-stage ranks either fold into a related module or drop to Out of scope.
   - Follow the table with a short **Out of scope** list — each excluded item names the rank and the reason (policy-not-product, back-stage-gated, discovery-stage, explicitly out per stakeholder). "Out of scope" usually shortens later debates.
5. **Prioritised user stories** — present in two layers: a summary table for at-a-glance priority, then an expanded block for **every** story in the table.

   **5a. Summary table** — ordered by priority (the top-ranked problems first), one row per story:

   | ID · rank · priority | As a… | I want… | So that… | Evidence it grounds to |
   |---|---|---|---|---|
   | #1 · R[rank] · P1 | [persona / role] | [capability, phrased as an outcome not a feature] | [the benefit] | [verbatim quote or observation + source ref + impact score; flag `[contested]` / `[research gap]` / `[assumption]` here rather than inventing] |

   - The `ID · rank · priority` cell ties each story back to the rank(s) it serves in the Problem-impact analysis (e.g. `#1 · R1/R3 · P1`), so priority is traceable to impact, not asserted. Priority (`P1`, `P2`, …) is the build order — usually tracking the impact rank, but a story may be re-prioritised if it is a prerequisite for, or superseded by, another; when it diverges from the rank, add a one-line note in the Evidence cell saying why.
   - Every row's Evidence cell must cite real grounding — a session verbatim, an observation, or a document — with its source ref. If a story has no recorded evidence, say so and flag it; do not invent a quote.

6. **Success criteria** — the outcome the product is being built to achieve, and the metric(s) that decide whether it's good enough. Measurable and decision-changing, not just observable. Full guidance below the expanded stories.
7. **Constraints and dependencies** — every external thing the work depends on; re-read with "what would block this?" in mind.
8. **Open questions** — honest unknowns; the first draft is meant to be wrong in interesting ways.

## 5b. Expanded user stories

Below the summary table, write a detailed block for **every** story in it, in priority order. No story is table-only: each row above gets a matching block below, so the PRD is a complete build spec rather than a v0 with follow-ups deferred.

**Every user story must be accompanied by at least one acceptance scenario.** The summary-table rows, the expanded blocks, and their scenario sets are strictly 1:1 — no story ships without a corresponding scenario. A story with no scenario is an incomplete story, not an acceptable state.

Use this block format per story, with `###` for the story heading:

### User Story [n] — [short name] (Priority: P[n])

As a [persona / role], I want [capability, phrased as an outcome] so that [the benefit].

**Independent Test:** [how this story can be verified on its own — the observable behaviour a tester would set up and check, without depending on other unbuilt stories.]

**Acceptance Scenarios:**

1. **Given** [the happy-path starting state], **When** [the primary action], **Then** [the specific observable success — a named screen, message, value, or state], **And** [any follow-on effect].
2. **Given** [an attempt with missing or invalid input], **When** [I submit], **Then** [a clear, specific validation error naming the field], **And** [the user can correct and retry].
3. **Given** [a conflicting or duplicate state — e.g. an entity already exists / already in the target status], **When** [I repeat the action], **Then** [the system prevents it and explains why].
4. **Given** [the system at exactly the soft limit / lower boundary], **When** [the boundary action occurs], **Then** [the last-allowed behaviour, e.g. permit-but-warn].
5. **Given** [the system at exactly the hard cap / upper boundary], **When** [the action occurs], **Then** [the first-disallowed behaviour, e.g. block with a named message].
6. **Given** [the boundary condition has cleared — e.g. count drops back below the cap], **When** [the action is retried], **Then** [normal behaviour resumes].
7. **Given** [a UI that surfaces status or thresholds], **When** [it is displayed], **Then** [the state is conveyed by text or icon in addition to colour (never colour alone) to satisfy WCAG 2.1 AA], **And** [indicator colours meet a minimum 4.5:1 contrast ratio against their background].

**Needs validation:** [the assumptions, thresholds, or decisions the scenarios above rest on that are not yet grounded in evidence and must be confirmed — by research, a stakeholder, or a design decision — before the acceptance scenarios can be treated as valid. One short bullet per item, naming *what* to confirm and *with whom / how*: e.g. "the 50/60 capacity limits — confirm with the clinic manager"; "the exact mandatory registration fields — confirm against the intake form"; "the confirmation-message wording — pending UX copy". Write "None — every scenario is grounded in cited evidence" when nothing is outstanding.]

Rules for the expanded stories:

- **Do not label scenarios.** Write each scenario as plain Gherkin only — no trailing `— happy path` / `— invalid input` tag. The coverage classes below are a checklist for deciding *what to write*, not text that appears in the PRD.
- **Independent Test** describes a self-contained check: the story should be verifiable without waiting on other unbuilt stories. If it genuinely can't be tested independently, say what it depends on rather than pretending it can.
- **Acceptance Scenarios use Gherkin.** Every scenario is one behaviour written as `Given … When … Then …`, with `And` / `But` for extra context, actions, or outcomes. Steps are declarative (describe the state and the observable outcome, not the UI mechanics). Number the scenarios.
- **Every story carries at least one scenario — the happy path is the floor.** No story is exempt. A story with genuinely no interactive behaviour still gets its one happy-path scenario asserting the observable outcome.
- **Be robust — cover all the grounds, not just the happy path.** For each story with real interactive behaviour, work through this checklist and write a scenario for every class the story actually has (these class names guide your reasoning; they do not appear in the output):
  - **Happy path** — valid inputs produce the specific, named success outcome (a confirmation screen, a queue position, a status change) — never a vague "it works".
  - **Invalid / missing input** — each mandatory field or malformed input yields a clear, specific validation error the user can act on, and a path to correct it.
  - **Duplicate / conflict / idempotency** — repeating the action, or acting on an entity already in the target state, is prevented and explained (e.g. re-registering an already-Active record).
  - **Boundary values and limits** — write scenarios at the *exact* edges: the last value that is allowed and the first that is not. Distinguish **soft** thresholds (permit-but-warn/track) from **hard** caps (block), and include the **transition back** across a threshold (the limit clears → normal behaviour resumes). Use concrete example counts (the 50th, 51st, 60th, 61st), not "many".
  - **State / permission / sequence** — who may act, in which state; blocked actions say why and what to do next; out-of-order actions are handled.
  - **Non-functional & accessibility** — whenever a story renders status, thresholds, or colour-coded indicators, add an accessibility scenario: status conveyed by **text or icon in addition to colour (never colour alone)** and indicator colours meeting **≥ 4.5:1 contrast** to satisfy **WCAG 2.1 AA**. Fold in other measurable non-functionals the story implies (latency, concurrency, audit).
- **Ground every threshold and value in evidence.** Pull limits, statuses and messages from the Success criteria, the ranking, or the research — do not invent a `50`/`60`/contrast figure the inputs don't support. Where a specific threshold is genuinely unspecified, write the scenario with a `[TBD — needs the actual limit]` placeholder and list it in that story's **Needs validation** section.
- **Every `Then` is observable and specific** — a named message, screen, field, value, count, or state a tester can assert against. No `Then the system works correctly`.
- **Thin evidence never means zero scenarios.** Where a story's evidence is too thin to specify every detail, still write at least the happy-path scenario as full Gherkin, using `[TBD — the specific value/decision still missing]` placeholders *inside* the `Given`/`When`/`Then` steps, and record each gap in that story's **Needs validation** section. Do not invent the missing specifics, and do not replace the scenario with a bare "TBD" line — every story keeps a real, structured scenario with the gaps named in place.

## 6. Success criteria

Success criteria state the **outcome the product is being built to achieve** and the **metric that tells you whether it's good enough** — not a list of things you happen to be able to observe. Start from three questions and answer them in order:

- **What outcome do we want?** What are we building this for? Name the change in the world this release is meant to produce — for the user or the mission, not for the team. If you can't say what would be different once this ships, there is no success criterion yet.
- **What metric measures that outcome?** For each outcome, name the specific metric that moves when the outcome is achieved. A metric earns its place only if it tells you what to **optimise**, not merely what to watch — pick the one you would actually steer the build by.
- **What is good enough?** Give each metric a threshold, because **a metric is only useful if it changes a decision**. State the number (or the direction and target) at which the solution is acceptable to ship, and — where you can — what result would mean "not there yet, keep iterating". A metric with no decision attached is an observation, not a criterion; drop it or give it a threshold.

Write each criterion so it names the outcome, the metric, and the good-enough threshold together, e.g. *"New hires complete onboarding without a support ticket — first-attempt completion rate ≥ 90% (baseline 62% from DASH); below 80% we redesign the flow."* Prefer criteria tied to a baseline from the research (e.g. the DASH baseline or the heuristic evaluation) so "better" is measurable, not asserted.

Avoid non-criteria: "users will feel more confident", "the UI is cleaner", or any statement with no metric and no threshold. If the right threshold isn't known yet, name the metric and mark the threshold `[TBD — needs baseline/target]` under Open questions rather than inventing a number.

Rules:
- Where input is incomplete, ask the user up to 3 clarifying questions BEFORE drafting. Don't invent details.
- Keep prose sections to 1-2 paragraphs; user stories are as many as the evidence supports, ordered by priority.
- If you'd be guessing, put a placeholder and flag it under "Open questions."
- **Emit only the PRD itself — never this prompt's scaffolding.** None of the instructional labels or descriptions from this prompt appear in the output: not `5a`/`5b`, not "Use this block format per story", not "one `###` block per story", not the coverage-class names, and not any sentence describing how the document is laid out. The reader sees the 8 `##` sections and, under Prioritised user stories, the summary table followed directly by the `### User Story …` blocks — the stories themselves, with no meta-commentary about them.

Output as markdown.

# filing

@@if confluence@@
- Create a new page at `Knowledge Base/{{track}}/PRDs/{{prd-title}}`. Link to the problem statement, success criteria, and persona pages.
- In copy-paste mode: return the markdown and the user will file it manually.
@@endif@@
@@if plane@@
- Create a new page at `Knowledge Base/{{track}}/PRDs/{{prd-title}}`. Link the page to the problem statement, success criteria, and persona pages.
- In copy-paste mode: return the markdown for pasting and the user will file the page manually.
@@endif@@

# tips

- CLARA asks clarifying questions when inputs are thin. Answer honestly even if it's "I don't know yet" — the Open questions section preserves the unknown.
- Treat CLARA's v0 PRD as a starting position, not a final document. Manual editing after generation is the norm, not the exception.
- Once the PRD is settled, run `product-strategy-one-pager` to turn it into the PMP product strategy one-pager.

## Before you circulate — self-review checklist

Before sharing the PRD with stakeholders, walk through these checks. Most teams will edit the draft directly to fix gaps; a few questions surface things the draft can't fix on its own.

- **Problem statement** is one paragraph, framed as a problem (not a solution in disguise). Has a clear "who has the problem."
- **Success criteria** each name an outcome (what we're building this for), the metric that measures it, and a good-enough threshold that changes a decision — ideally tied to a research baseline. A metric with no threshold is an observation, not a criterion. No "users will feel more confident" non-criteria.
- **Scope table** rolls every relevant rank up into a module (or explicitly drops it to Out of scope). No ranked problem is silently unaccounted for; "Out of scope" names the rank and the reason.
- **User-story summary table** is ordered by priority, every row's `ID · rank · priority` ties back to the ranking, and every Evidence cell cites a real verbatim/observation with its source ref. Stories describe outcomes, not features.
- **Expanded stories** exist for *every* story in the summary table (none is table-only), each with an **Independent Test** that is genuinely self-contained (or names what it depends on).
- **Every user story has at least one corresponding acceptance scenario** — table rows, expanded blocks, and scenario sets are strictly 1:1. No story is left without a scenario; a thin story still carries a full happy-path Gherkin scenario with `[TBD]` placeholders in its steps, never a bare "TBD" line.
- **Acceptance Scenarios are robust Gherkin.** Each is one behaviour in `Given … When … Then …` (with `And`/`But`), and — for every story with real interactive behaviour — the set covers the grounds the story actually has: happy path, invalid/missing input, duplicate/conflict, boundary limits at the *exact* edges (soft vs hard, plus the transition back across the threshold, using concrete example values), state/permission, and an accessibility/non-functional scenario wherever status or colour-coding is shown (status by text/icon not colour alone; contrast ≥ 4.5:1; WCAG 2.1 AA). Every `Then` is observable and specific — a named message, value, count, or state, never "it works". Scenarios carry **no** `— label` tags. No invented thresholds — unspecified limits are `[TBD]` placeholders inside the steps.
- **Every story has a "Needs validation" line** listing the assumptions/thresholds/decisions its scenarios rest on that are not yet grounded (each naming what to confirm and with whom/how), or "None — every scenario is grounded in cited evidence" when there's nothing outstanding.
- **Constraints and dependencies** name every external thing the work depends on. Re-read with "what would block this?" in mind.
- **Open questions** are honest. The first draft is supposed to be wrong in interesting ways; the open questions are where you flag what you don't know.
- **Persona references** link to specific persona pages — no implicit "the user".
