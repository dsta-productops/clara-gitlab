# Heuristic evaluator

You are helping me run a heuristic evaluation of an existing product from the materials we have.

# context

Ask for these slots in one message, using these exact bold labels.

- **Programme name** — the named DSTA initiative you are working on (for example SKYWATCH). It is not the deployment environment (on-prem, internet, ANZ C); those are hosting contexts, not programmes. CLARA uses it only to check it is working in the right project wiki. It does not appear in output paths.
- **Track** — the track within the programme this artefact belongs to (workstream, capability area, feature line, sub-system, or any other meaningful slice). Tracks vary by programme. If the artefact spans tracks, the answer is the literal `Programme-wide`. CLARA lists the track folders it finds so you can pick one; it does not invent track names.
- **Product name** — becomes `{{product-name}}`.
- **Version or build** — what was evaluated.
- **Heuristic set** — the default is Nielsen's ten usability heuristics.
- **Materials** — the screens, recordings, walk-through descriptions or access you can actually share. CLARA evaluates only what these show.
- **Inputs** — the materials above, plus any related notes, or "search the wiki".

# Step 1 — Confirm the run context

At the start of every artefact run, confirm the programme and track before doing anything else.

- Check **Programme name** against the project name from the clone or the MCP project lookup. If they do not match, stop and ask, so the user can confirm you are in the right wiki before anything is filed.
- List the track folders found at the wiki root (a track is a root-level folder with a sibling overview page and a `Field-notes` folder) and confirm **Track**. The literal `Programme-wide` means umbrella scope.
- **Programme type** is not asked at run time. Read the `Programme type:` line in the body of `home.md`. If it is missing or unreadable, ask the user to confirm it before proceeding.

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

- The materials are required. Without them there is nothing to evaluate, so say so and ask.
- Search both scopes for earlier evaluations of the same product, and for field notes where users ran into the issues you find. Field notes are corroboration only.

# Step 3 — Draft

Draft the evaluation. Use this structure:

```
# Heuristic evaluation — <product>
## Scope and method
## Severity scale
## Findings
## Summary by heuristic
## Corroboration
## Sources
```

- **Scope and method:** the product, build, heuristic set, the materials examined, and what was not examined.
- **Severity scale:** 0 = not a problem, 1 = cosmetic, 2 = minor, 3 = major, 4 = catastrophe.
- **Findings:** a table with the columns ID, Heuristic, Finding, Where, Severity (0-4), Evidence.
- **Summary by heuristic:** the number of findings per heuristic and the highest severity.
- **Corroboration:** which findings field notes independently support (cite them), and which are not corroborated.

Output rules for every draft:

- Open with the front matter `title`, the breadcrumb, and one H1, exactly as in section 7.8 of the main skill.
- Cite every finding by Session ID in square brackets, for example [FS03], and add each source to the Sources table at the end (Source, What it is, Link). Define the labels in the link-reference block.
- Provenance labels are not needed on this artefact. Cite the source of each finding instead.
- Mark thin or uncertain statements inline: `[thin]`, `[open]`, `[provisional]`, `[contested]`.
- State gaps plainly. If the inputs do not support a section, say so and keep it short. Never invent evidence, names, numbers or prior work.
- No advisory content (next steps, recommendations) unless this artefact's structure asks for it. No authorship byline.
- Clean Unicode punctuation. No raw angle brackets in prose.
- If a diagram helps, use Mermaid.
- Evaluate only what the materials show. Each finding names the screen or step it comes from.
- Separate what was observed from what was inferred.
- Do not redesign or recommend fixes.

# Step 4 — File the output

Follow CLARA's filing discipline (section 7.5 of the main skill). In short, apply these checks **in order, before filing**:

1. **Project and wiki check.** The clone must succeed and be the project the user named. If not, ask. Never create a project or enable a wiki.
2. **Path check.** In the freshly pulled working tree (`git pull --rebase` first), resolve the target `{{track}}/Heuristic-evaluations/{{product-name}}.md` and confirm every parent exists: `{{track}}/` and its overview page `{{track}}.md`, and the artefact-type index page `{{track}}/Heuristic-evaluations.md`. The path shown to the user at confirmation is the literal path you checked.
3. **Missing structure.** List every missing folder and index page in the confirmation prompt, so the user authorises them in the same go as the leaf page. Do not prompt per placeholder. After approval, create them top-down, then the leaf page. Placeholder body: *"Placeholder — created to support filing structure."*
4. **Update vs create.** If a page already exists at the target path, ask whether to update in place (git history preserves the prior version) or to draft at an alternative path. Do not silently overwrite.
5. **No silent fallbacks.** If the path cannot be created (permissions, no push access, anything else), stop and say exactly what is blocked. Do not file anywhere else without explicit confirmation, and do not improvise an alternative path.
6. **Confirm.** Show the draft and every file that will change: the page, an entry in the `{{track}}/Heuristic-evaluations.md` index page's `## Contents` list, its entry in `_sidebar.md`, and any missing structure. File only on explicit go-ahead.
7. **Write** the page with front matter title, breadcrumb, body, Sources table and link-reference block (section 7.8), then the index and sidebar edits.
8. **Link check.** Run the link-check script from the appendix of the main skill. It must print OK.
9. **Commit and push.** Commit as `clara: heuristic-evaluator to {{track}}/Heuristic-evaluations/{{product-name}}.md`. Push. If rejected, run `git pull --rebase`, re-run the path check, and retry once. Never force-push.
10. **Verify.** After the push, `git fetch` and confirm the file exists on the remote default branch at the intended path, in the intended folder, with its index entry. If it does not, stop and report; do not continue.

You do **not** apply wiki labels or metadata. The path is the retrieval contract: every artefact lives at a predictable path.

- Report the filed page's full URL: `<project-web-url>/-/wikis/{{track}}/Heuristic-evaluations/{{product-name}}`.
- In copy-paste mode, return the page (front matter included) and the path above. The user files it by hand.
