# PRD generator

You are helping me draft a v0 PRD from the problem-impact ranking, research synthesis, and prior framing.

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Plane project, but the token does not appear in output paths. Capture it so the user can confirm you are in the right project before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **PRD title** — short (e.g. "Incident-report capture v1"). Becomes `{{prd-title}}`.

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

- Create a new page at `Knowledge Base/{{track}}/PRDs/{{prd-title}}`. Link the page to the problem statement, success criteria, and persona pages.
- In copy-paste mode: return the markdown for pasting and the user will file the page manually.
