# Before/after journey mapper

You are helping me map a phase-by-phase before/after user journey — today's current-state steps beside the future-state with the product — each phase tagged with the ranked problems it addresses, so stakeholders can see what the PRD changes.

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Confluence space, but the token does not appear in output paths. Capture it so the user can confirm you are in the right space before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **Journey scope** — the journey being compared (e.g. "ICT cycle", "Handling a contradiction-class alert"). Becomes `{{journey-scope}}`.
- **PRD to compare against** — which PRD's solution defines the AFTER column. Its Scope-module table is the AFTER vocabulary.

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

- Read the current-state journey at `Knowledge Base/{{track}}/Journeys/*` — its phases/stages and steps are the BEFORE column.
- Read the PRD at `Knowledge Base/{{track}}/PRDs/*` — its Scope-module table names the modules the AFTER column is written in. Do not introduce any capability the PRD does not scope.
- Read `Knowledge Base/{{track}}/Problem-impact-analysis` (fall back to programme-wide) — for the per-phase "Addresses Ranks · Impact" tags and the final coverage check.
- Optionally read the persona at `Knowledge Base/{{track}}/Personas/*` to keep steps grounded in one operator's reality.
- Show the user the journey, the PRD modules, and the ranking you found, and ask them to confirm the phase set and the pairing before you draft.
- In copy-paste mode: ask the user to paste the current-state journey and the PRD scope; ask for each in turn.

Step 3 — Draft.

Produce a single page. One section per journey phase, in journey order. Output as markdown:

# [Journey scope] — Before / After user journey

Phase-by-phase comparison across [scope], grounded in the ranked problems each phase replaces. The AFTER column reflects the solution scoped in [PRD link] — no capability beyond it.
**Sources:** [current-state journey, PRD, Problem-impact analysis links]

## Phase N — [phase name] ([time window, if the journey has one])

**Addresses Ranks [x, y] · Impact [scores]** — via [the PRD module(s) that act in this phase]

**BEFORE — today**

1. [current-state step, taken from the journey]
2. …

**AFTER — with [product / module]**

1. [future-state step, expressed in the PRD's module vocabulary]
2. …

*(Repeat per phase.)*

## Coverage & caveats

- **Rank coverage** — confirm every problem in the Problem-impact analysis, especially the high-ranked ones, appears as an AFTER in some phase. Name any rank that has no "after" — that's either a PRD scope gap or a missing journey phase, and it belongs in the PRD's Open questions, not papered over here.
- **Illustrative, not measured** — note that step counts show the *mechanism* change (fewer manual handoffs, fewer full-rebuild triggers), not measured time savings. Point to the PRD's success metrics / the ranking's drafted measures as what would validate the actual reduction.

Rules:
- BEFORE steps come only from the current-state journey and its evidence. Never invent a current-state step to make the delta look bigger.
- AFTER steps come only from what the PRD scopes. If a phase's improvement isn't covered by any module, say so under Coverage — do not invent an AFTER.
- Tag every phase with the rank(s) and impact from the Problem-impact analysis. If a phase maps to no ranked problem, question whether it belongs in the comparison.
- Keep the two step lists parallel and short — the value is the delta, not prose.
- Never claim a quantified time saving the PRD or ranking doesn't already carry.

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

- Create or update a page at `Knowledge Base/{{track}}/Before-after-journeys/{{journey-scope}}`. Link back to the current-state journey, the PRD, and the Problem-impact analysis. Confirm and show the link.
- In copy-paste mode: return the full markdown and the user will file it manually.
