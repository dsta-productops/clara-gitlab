# Test-plan generator

You are helping me draft a complete test plan with scenarios, participants, measurement, and analysis.

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Confluence space, but the token does not appear in output paths. Capture it so the user can confirm you are in the right space before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **Test type** — what kind of test this is. Examples: usability test on interactive prototype, moderated walk-through of a clickable prototype with operators, instrumented A/B on a deployed feature, capability rehearsal in scripted exercise.
- **Test name** — short (e.g. "Console-v1-usability-test", "Tank-crew-alerting-rehearsal"). Becomes `{{test-name}}`.
- **Test focus (optional)** — describe what this round of testing should cover. Leave blank to test against all the artefact's success criteria. Otherwise narrow the scope: a specific user story (e.g. "submit-incident-report"), one or two success criteria, the features shipping in this PI, or the storyboard beats being rehearsed.
- **Constraints (optional)** — time budget, recruiting limits, environment, classification, secrecy.

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

- Identify the artefact being tested. For digital: a PRD page. For engineering: an operational-scenario + capability-spec pair. Confirm the path(s) with the user before reading in detail.
- Read the Success-criteria section of the relevant Research-synthesis page (track-level, fall back to programme-wide).
- Optionally scan field notes for material that scenarios can be seeded from — anonymised alert content, ambiguity that operators experienced, recurring edge cases. Reference the field-note IDs in the scenarios you write.
- Show the user what you found and confirm test type, test focus, and constraints before drafting. If the user didn't name a focus, restate the success criteria you found and confirm "all of these" is the intent.
- In copy-paste mode: ask the user for the artefact, success criteria, test type, test focus, and constraints in turn.

Step 3 — Draft.

**Objective checkpoint (before drafting the rest).** Propose the test objective in one sentence — what question this test is supposed to answer — and show it to the user. If you can't compress it to one sentence, tell the user the test focus is too broad and ask them to narrow it before proceeding. Only continue to the full draft after the user confirms (or refines) the objective. The confirmed sentence becomes the Objective section of the output.

A good test plan:
- States the objective in one sentence — what question this test is supposed to answer.
- Derives 3–6 scenarios that, together, exercise the success criteria. Each scenario has setup, steps, expected result, and evidence to capture.
- Names the participants: how many, what type, recruiting source, exclusion criteria.
- Structures the session: pre-task, scenarios, post-task, total duration.
- Names what gets measured: behavioural observations, metrics, post-session questions, planned DASH survey type (prototype survey or system survey).
- Names how findings will translate into design adjustments.
- Lists what could invalidate the test (and the mitigations).

Output as markdown:

## Test plan: [name]

### Objective
[One sentence — what question this test answers]

### Success criteria tested
- [criterion] — covered by scenario(s): [refs]

### Scenarios

#### Scenario 1: [name]
- **Setup:** [pre-conditions, system state, participant context]
- **Steps:** [numbered actions the participant takes]
- **Expected:** [what success looks like]
- **Evidence to capture:** [observations, metrics, artefacts]
- **Maps to:** [success criteria refs]

#### Scenario 2: [name]
[same structure]

[3–6 scenarios total, ordered from foundational to complex]

### Participants
- **Number:** [N]
- **Profile:** [who they are — operators, end users, SMEs]
- **Recruiting source:** [how you'll find them]
- **Exclusions:** [who NOT to include and why]

### Session structure
- **Pre-task (5–10 min):** [briefing, consent, warmup]
- **Scenarios:** [refs, in order, with time budget per scenario]
- **Post-task (10 min):** [debrief questions, planned DASH survey]
- **Total duration:** [N minutes]

### Measurement
- **Behavioural observations:** [task completion, hesitation, errors, recovery, where they look for help]
- **Metrics:** [if instrumented — what to log]
- **DASH survey:** [prototype survey (post-iteration) OR system survey (post-deployment) — name which and why]
- **Open questions:** [what to ask in the debrief]

### Analysis
- [how raw observations turn into design adjustments]
- [who reviews the DASH output; how findings flow back into the next design iteration]

### Validity risks
- **[risk]:** [mitigation]
- **[risk]:** [mitigation]

Rules:
- Every scenario must map to at least one success criterion **within the test focus**. Criteria outside the focus are out of scope for this round — note them under "Success criteria tested" as "deferred to a later round" rather than inventing scenarios for them.
- If a scenario is seeded from a field note, reference the field-note ID (e.g. `S03`, `Field Alpha 2`) so readers can trace it back.
- Don't invent participant counts or recruiting sources. If the user hasn't named one, ask or leave a flagged placeholder.

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

- Create a new page at `Knowledge Base/{{track}}/Test-plans/{{test-name}}`. Link to the artefact being tested (PRD or operational-scenario + capability-spec) and the Research-synthesis page the success criteria come from.
- In copy-paste mode: return the markdown and the user will file it manually.
