# Problem-impact ranker

You are helping me consolidate the captured problems for a programme into a single ranked Problem-impact analysis — each problem scored on reach, severity, evidence and leverage, grouped into leverage tiers, so the team knows which problem to build for first.

Step 1 — Confirm the run context.

At the start of every artefact run, elicit the programme and track tokens before doing anything else.

- **Ask which programme this is for** (`{{programme}}`). The programme is the named DSTA initiative the user is working on (e.g. SKYPROTECT). It is **not** the deployment environment (ANZ C, on-prem, internet) — those are LLM-hosting contexts, not programmes; do not confuse them. This is a **sanity check** — you are operating inside that programme's Confluence space, but the token does not appear in output paths. Capture it so the user can confirm you are in the right space before you file anything.
- **Ask which track within the programme this artefact belongs to** (`{{track}}`). Tracks vary by programme — workstream, capability area, feature line, sub-system, or any other meaningful slice. The user knows the track names for their own programme; you do not invent them. If the artefact spans tracks (umbrella scope), the literal answer is **`Programme-wide`**.

The artefact brief may ask for additional tokens (a topic, a persona name, a journey scope). Elicit those after `{{programme}}` and `{{track}}` are confirmed.

**Programme type** is not elicited at run time. Once `{{programme}}` is confirmed, CLARA reads the `Programme type` field from the `Knowledge Base` page body to determine whether the programme is digital or engineering. This was set once during `setup-kb` and does not need to be asked again. If the field is missing or unreadable, CLARA asks the user to confirm the programme type before proceeding.

- **Problem set scope** — which body of problems you're ranking (e.g. "all pre-, during-, and post-ICT problems", or one track's friction). One line.
- **Source of the problems** — where the captured problems come from (the Research synthesis friction table, a workshop board, a pasted list). Named in the output so the ranking is traceable.

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

- Read the **Friction-points table, Themes, and Problem-statement** sections of `Knowledge Base/{{track}}/Research-synthesis` (fall back to programme-wide). The friction table is the seed: each friction row becomes a candidate problem, and its Severity / Frequency / Evidence columns feed the score directly.
- Look up the **persona(s)** at `Knowledge Base/{{track}}/Personas/*` (fall back to programme-wide) to score Reach — which roles each problem hits, and how often.
- Search `Knowledge Base/{{track}}/Prior-knowledge/*` and programme-wide for **prior-knowledge summaries** — what's already proven or already in flight. This grounds the Evidence and Value scores.
- Gather the **raw sources** the problems came from — field notes, workshop/board exports, or a pasted list — for the verbatims and evidence each entry must cite.
- Search `Knowledge Base/{{track}}/Heuristic-evaluations/*` and programme-wide for a **heuristic evaluation** of an existing or competitor product. Each finding is a candidate problem already scored for severity and tied to a screen — fold them into the register and cite the finding ID as evidence.
- Optionally read **journeys and service blueprints** in the space to judge Leverage — which problems are one root cause seen from several seats.
- Show the user everything you found — the friction table, personas, prior-knowledge, and raw sources — and ask them to confirm or refine the problem set before you score it.
- In copy-paste mode: ask the user to paste the captured problems (or the board/workshop export), plus any verbatims and evidence they have. Ask for each missing input in turn.

Step 3 — Draft.

Produce a single page. Score every problem, rank them, tier them, then read the ranking back. Output as markdown:

# Problem-impact analysis

**Scope:** [the problem set being ranked]
**Sources:** [links to the Research synthesis, personas, prior-knowledge, and raw sources — referenced throughout]

## How impact was scored

Each problem is rated **1–5 on four dimensions**, giving a total out of 20. Nothing is invented — where the source records no evidence, the item scores low on Evidence and is flagged discovery-stage rather than dropped.

- **Reach** — how many roles are affected and how often (name the roles).
- **Severity** — the effort cost, accuracy/safety risk, or morale consequence recorded in the evidence.
- **Evidence** — strength of what backs the claim: 💻 document / 🧪 research = strong (4–5); 💬 discussion / interview verbatim = moderate (2–3); nothing recorded = weak (1).
- **Leverage** — whether fixing it removes a root cause other problems depend on (high) versus a self-contained fix (low).

## Ranking at a glance

| # | Problem statement (short) | Source ref | Reach | Sev | Evid | Lev | Total |
|---|---|---|---|---|---|---|---|
| 1 | [short statement] | [ref] | [1–5] | [1–5] | [1–5] | [1–5] | [/20] |

Sort strictly by Total descending. Break ties by Leverage (a shared root cause outranks a self-contained fix at the same score).

## Ranked problems

Group the entries into leverage tiers, highest-leverage first. Use the tier headings that fit the set — typically:

- **Tier 1 — Systemic root causes** — fix these and several items below shrink on their own.
- **Tier 2 — High-volume process friction** — narrower blast radius, but the strongest hard numbers and clearest fixes.
- **Tier 3 — Validated but narrower** — real pain, contained to one role or one moment.
- **Tier 4 — Discovery-stage or engagement-led** — need evidence before they can be prioritised against the above.

For each problem, one entry in this shape:

### RANK N · [source ref] · IMPACT [total]/20 — [short title]

[One paragraph. Frame it as a *problem*, not a solution in disguise. Name who has the problem, what the impact is, and why the current state persists — the same discipline as the Research synthesis problem statement.]

- **Whose pain** — the roles carrying it (workload, accuracy risk, or morale), most-affected first.
- **Grounded in** — the verbatims and evidence, each with a strength marker (💻 / 🧪 / 💬) and a citable Session ID or page link. If a claim has no recorded evidence, say so plainly and score Evidence low — never fabricate a source or a number.
- **Value** — what fixing it yields (whose jobscope shrinks, what accuracy/experience improves).
- **Research status** — is the *issue* proven, or only the *scale*? Note the maturity (prove-issue vs prove-value/scale), any metric already drafted, and — at most one line — the candidate direction if it proves out. Do not design the solution here.

## Reading the ranking

Step back from the individual scores and surface what the ranking makes visible:

- **Clusters** — problems that are one root cause seen from several seats. Name them and argue whether to scope them as a single effort rather than N separate fixes.
- **Where evidence is thin** — high-ranked items resting on 💬 discussion only, and what piece of research would move them from persuasive to defensible.
- **Policy vs product** — items whose recorded preferred fix is a policy change, not a build. Separate these so they aren't judged on shippability.
- **Constraints carried over** — assumptions declared out of scope, and open impetus questions that would reshuffle the ranking if answered differently.

Rules:
- Score only from recorded evidence. Where the source records nothing for a dimension, score it low and flag the gap — do not invent reach, severity, or numbers.
- Keep each problem statement to one paragraph, framed as a problem.
- **Don't solution here.** "Value" and an optional one-line candidate direction are the ceiling; the PRD generator picks up the top-ranked problem and does the design.
- Where the problem set or evidence is incomplete, ask the user up to 3 clarifying questions BEFORE scoring. If you'd be guessing a score, mark it provisional and note it under "Where evidence is thin."

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

- Create or update a page at `Knowledge Base/{{track}}/Problem-impact-analysis`. Link back to the Research synthesis, the personas, prior-knowledge summaries, and the raw source pages. Confirm and show the link.
- In copy-paste mode: return the full markdown and the user will file it manually.
