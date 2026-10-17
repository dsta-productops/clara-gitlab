# Research synthesiser

You are helping me turn interview transcripts and field observations into a single Research synthesis page covering themes, friction, problem statement, and success criteria.

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Confluence space, but the token does not appear in output paths. Capture it so the user can confirm you are in the right space before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **Outcome question** — what the research was trying to answer (one line — taken from the interview guide if one exists).

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

- Search the programme's space broadly for interview transcripts, field-notes, observation pages, and exercise debriefs. Pages under folders/pages named *Interviews*, *Field notes*, *Sessions*, *Exercises* (or with `interview`, `transcript`, `session-notes`, `observation`, `field-notes`, `exercise` in titles).
- Search both `Knowledge Base/{{track}}/Prior-knowledge/*` and `Knowledge Base/Programme-wide/Prior-knowledge/*` for prior-knowledge summaries that should ground the synthesis.
- Search both `Knowledge Base/{{track}}/Interview-guides/*` and `Knowledge Base/Programme-wide/Interview-guides/*` for the interview guide used in the field — the guide's outcome question tells you what the synthesis is meant to answer.
- Search both `Knowledge Base/{{track}}/Heuristic-evaluations/*` and `Knowledge Base/Programme-wide/Heuristic-evaluations/*` for a heuristic evaluation of an existing or competitor product. Where one exists, treat its severity-rated findings as evidence — they surface friction and inform the problem statement, so fold them in alongside the field notes (cite them by finding ID).
- Show the user everything you found — separately for the track folder, the Programme-wide folder, and the broader space — and ask them to confirm or refine the set before reading in detail.
- **Stamp Session IDs first — before synthesising.** Once the field-note set is confirmed, ensure every note in it carries a Session ID. For any note the user created that does not yet have one, auto-assign and stamp it **now**, without prompting (the Session-ID write-back carve-out in `persona.md` and `field-notes.md`). This is a required step that runs *before* any synthesis is drafted, so every piece of evidence is citable by a stable Session ID from the first draft onward. If a stamp fails (e.g. permissions), stop and report — do not synthesise with an unstamped note.
- In copy-paste mode: ask the user to paste transcripts and observation notes. Mark sessions with `--- Session [N] / [role] / [date] ---` so citations stay traceable.

Step 3 — Draft.

Produce a single page with four sections, in this order. The sections are produced together because each builds on the previous — themes inform friction, friction informs problem, problem informs success criteria.

Output as markdown:

# Research synthesis

**Outcome question:** [the one-line question the research was trying to answer]
**Sources:** [list of session refs / page links — these are referenced throughout]

## Themes

Recurring patterns across the sources. Not bullet points of what people said — the patterns *underneath* what people said.

- **[Theme name]** — [one-line description]. Evidence: [session refs / page links]

Aim for 4–7 themes. Fewer means the synthesis is too coarse; more means you're listing observations instead of clustering them.

## Friction points

Where users / operators struggle. Each ranked by severity × frequency and grounded in evidence.

| Friction | Severity (1–5) | Frequency | Type | Evidence |
|---|---|---|---|---|
| [pain] | [N] | [observed in X of Y sessions] | [design / training / systemic] | [session refs] |

Sort by severity × frequency descending.

## Problem statement

One paragraph. Articulates *the problem*, not a solution in disguise. Frames who has the problem, what the impact is, and why the current state persists.

> [Problem statement, 3–5 sentences. Start with "[Role] needs to / cannot / struggles to ..." — never "We need to build ...".]

**Alternatives considered:** [if multiple framings surfaced during synthesis, name them and say why the chosen framing wins]

## Success criteria

What would have to be true for work on this problem to count as a win. Measurable and capability-focused — describe what the capability or product has to be able to do, and to what threshold.

- [Criterion] — [how it would be measured / observed]

Aim for 3–5 criteria. Each criterion ties back to the problem statement and to one or more friction points.

## Open questions

Things the data didn't answer — for the next round of field engagement, or for stakeholder confirmation.

- [Open question]

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

- Create or update a page at `Knowledge Base/{{track}}/Research-synthesis`. Link back to source pages. Confirm and show the link.
- In copy-paste mode: return the full markdown and the user will file it manually.
