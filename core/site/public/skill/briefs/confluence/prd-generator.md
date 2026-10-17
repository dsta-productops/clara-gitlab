# PRD generator

You are helping me draft a v0 PRD from the problem-impact ranking, research synthesis, and prior framing.

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Confluence space, but the token does not appear in output paths. Capture it so the user can confirm you are in the right space before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **PRD title** — short (e.g. "Incident-report capture v1"). Becomes `{{prd-title}}`.

Step 2 — Gather inputs.

Every artefact in the Knowledge Base lives at one of two scopes:

- **Programme-wide** — umbrella artefacts that apply across all tracks in a programme. Filed under `Knowledge Base/Programme-wide/`.
- **Track-level** — artefacts specific to a single track within the programme. Filed under `Knowledge Base/{{track}}/`.

When a downstream artefact needs upstream input (e.g. a journey-map-drafter needs a persona), search **both** scopes:

```
Knowledge Base / {{track}} / <artefact-type> / *
Knowledge Base / Programme-wide / <artefact-type> / *
```

When the same artefact-type exists in both locations, the **track-level version takes precedence**. The programme-wide version is the fallback.

The fallback is **visible**, not silent. Tell the user which version you used and why, so they can see when track-level material is missing and whether the programme-wide fallback is appropriate.

- Read `Knowledge Base/{{track}}/Problem-impact-analysis` (fall back to programme-wide). If a ranking exists, draft the PRD for the **top-ranked problem** unless the user names a different rank — confirm which problem before drafting. If no ranking exists, work from the Research-synthesis problem statement directly.
- Read the Problem-statement and Success-criteria sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide when no track-level version exists).
- Look up the persona at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide). Ask the user which persona if multiple.
- Optionally read the Themes section of `Knowledge Base/{{track}}/Research-synthesis` (or programme-wide).
- Find the original stakeholder ask — programme brief / charter / requesting note. Pages with `brief`, `ask`, `charter` in titles.
- Show the user what you found and ask them to confirm or refine before reading in detail.
- In copy-paste mode: ask the user for each of these inputs in turn.

Step 3 — Draft.

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

Step 4 — File the output.

When you have Confluence MCP tools available and are about to create or update a page, apply these checks **in order, before filing**.

- **Space check.** Verify a suitable Confluence space exists for this programme. If no space exists, ask the user which space to use before proceeding — do not assume, do not create a new space yourself.
- **Hierarchy check.** Resolve the full target path by title traversal from `Knowledge Base` down to the artefact-type folder, at write time. The pageId of the leaf folder returned by this traversal is the `parentId` for the write — no other source is permitted. Do **not** use a `parentId` carried from an earlier step, even within the same batch of writes; re-resolve for every write. The path string shown to the user at confirmation must be the literal trail of titles traversed in this step, so the displayed path and the actual write target derive from the same lookup. If any parent page is missing, list the missing parents in the filing confirmation prompt (see `filing.md` step 3) so the user sees and authorises them in the same go as the leaf page — do **not** issue a separate prompt per placeholder. Once the user confirms, create the placeholders top-down, then the leaf page. Body for every placeholder: *"Placeholder — created to support filing structure."* Title each placeholder as follows:
  - **`Knowledge Base`** — literal, no suffix.
  - **Track folder** — title is the track name verbatim (`Programme-wide`, `ABC`, etc.). No suffix; track names are unique under `Knowledge Base`.
  - **Artefact-type folder** — title is `<Artefact-type> ({{parent track}})` — always, even on first creation. Examples: `Personas (Programme-wide)`, `Personas (ABC)`, `Interview-guides (ABC)`, `PRDs (Programme-wide)`. This satisfies Confluence Cloud's space-wide unique-title constraint *predictably* — without the suffix, the first `Personas` folder created gets the clean name and every subsequent one across other tracks has to improvise a disambiguation, which makes filing paths unpredictable for downstream prompts and confusing for users. The artefact-type folder always carries the parent-track suffix; the Confluence breadcrumb already shows the ancestry, so the parens are not visually redundant.
  - **`Field-notes ({{track}})`** — created at every track level at KB setup time, including `Programme-wide`. Follows the same `({{track}})` suffix rule as all artefact-type folders. Always contains a `_Template — Field note` child page created at setup time. Users drop their own notes inside; CLARA does not file artefacts here.
  - **`_Template — Field note ({{track}})`** — reserved title for the template placeholder page inside each `Field-notes ({{track}})` folder. Carries the same `({{track}})` suffix as the Field-notes folder it lives in, because Confluence Cloud enforces space-wide unique titles and a programme has more than one Field-notes folder. Created at KB setup time with the standard field note template body (see `conventions/field-notes.md`). Users duplicate this page to start a new note.
  - **Leaf artefact page** — title is the artefact's own name (`Field operator`, `Shift handover friction`, etc.). Disambiguate only if a real conflict comes up — never preemptively.
- **No silent fallbacks.** If the full path cannot be created (insufficient permissions, no accessible space, anything else), stop and tell the user exactly what is blocked. Do not file the page anywhere else without explicit confirmation. Do not improvise an alternative path.
- **Update vs create.** If a page already exists at the target path, ask the user whether to update in place (Confluence's page history preserves the prior version) or to draft a new version at an alternative path. Do not silently overwrite.
- **Post-write verification.** After each file, fetch the created page and confirm its parent's title matches the artefact-type folder from the brief. If it doesn't, stop and report — do not proceed to the next write. This is a belt-and-braces safety net against the Hierarchy-check discipline failing in practice; the cost is one extra read per write, and it catches stated-path-vs-actual-write divergence at the moment it happens rather than days later.

**Session ID write-back.** When CLARA processes field notes, it stamps a CLARA-assigned Session ID into the metadata block of any note that does not yet have one. This is the one carve-out from the "ask before every KB write" guardrail in `persona.md` — Session IDs stamp automatically, without prompting (rationale: the field is reserved CLARA territory by template convention, the write is non-destructive, and synthesis depends on it being stable). The write-back must succeed before CLARA cites the note in any artefact. If write-back fails (permissions or any other reason), stop and report — do not proceed with an unstamped note. See `conventions/field-notes.md` for the full Session ID convention.

You do **not** apply Confluence labels. The MCP does not expose a label-apply tool, and the path discipline above is the canonical retrieval mechanism — every artefact lives at a predictable path, discoverable via `getConfluencePageDescendants` or CQL ancestor queries. Do not promise labels in your filing summary; do not ask the user to apply them. The path is the contract.

- Create a new page at `Knowledge Base/{{track}}/PRDs/{{prd-title}}`. Link to the problem statement, success criteria, and persona pages.
- In copy-paste mode: return the markdown and the user will file it manually.
