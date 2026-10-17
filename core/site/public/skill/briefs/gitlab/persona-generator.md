# Persona generator

You are helping me build an evidence-backed persona for a user role.

# context

Ask for these slots in one message, using these exact bold labels.

- **Programme name** — the named DSTA initiative you are working on (for example SKYWATCH). It is not the deployment environment (on-prem, internet, ANZ C); those are hosting contexts, not programmes. CLARA uses it only to check it is working in the right project wiki. It does not appear in output paths.
- **Track** — the track within the programme this artefact belongs to (workstream, capability area, feature line, sub-system, or any other meaningful slice). Tracks vary by programme. If the artefact spans tracks, the answer is the literal `Programme-wide`. CLARA lists the track folders it finds so you can pick one; it does not invent track names.
- **Persona name** — a role-based name (for example "Fleet supervisor"). Never a fictional person's name. Becomes `{{persona-name}}`.
- **Persona role in the product** — optional: primary or secondary user.
- **Inputs** — field notes for this role and any related material, or "search the wiki".

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

- **Field notes.** Before reading any notes, stamp Session IDs (main skill, section 7.7). Then read the notes in `{{track}}/Field-notes/` and `Programme-wide/Field-notes/`, track first. Cite every note by its Session ID in square brackets, for example [FS03]. Never cite an unstamped note.
- Look for existing personas in both scopes, and read the research synthesis for the scope.
- Select the field notes whose participants fit this role. If fewer than three sessions involve the role, mark the persona `[thin]` and tell the user before drafting.

# Step 3 — Draft

Draft the persona from the evidence. Use this structure:

```
# <Persona name>
- **Summary:**
- **Goals (n):**
- **Pains (n):**
- **Context:**
- **Real quote:**
- **Non-obvious trait:**
- **Evidence sources:**
## Sources
```

- **Summary:** one or two sentences on who they are, their experience, and how they use the product.
- **Goals and Pains:** each item cites the notes it comes from, as *evidence: [FS01], [FS02].* The counts follow the evidence, typically three to six each.
- **Context:** where they work, shift pattern and tools, limited to what the notes support.
- **Real quote:** one verbatim quote, attributed to its Session ID.
- **Non-obvious trait:** a counterintuitive pattern that holds across several notes, with a provenance label and its evidence.
- **Evidence sources:** every Session ID used.

Output rules for every draft:

- Open with the front matter `title`, the breadcrumb, and one H1, exactly as in section 7.8 of the main skill.
- Cite every finding by Session ID in square brackets, for example [FS03], and add each source to the Sources table at the end (Source, What it is, Link). Define the labels in the link-reference block.
- Label every theme, hypothesis, requirement, trait or step with a provenance label — **[Inherited]**, **[Adapted]**, **[Validated]** or **[New]** — as defined in section 4 of the main skill. Only this programme's field notes make something **[Validated]**.
- Mark thin or uncertain statements inline: `[thin]`, `[open]`, `[provisional]`, `[contested]`.
- State gaps plainly. If the inputs do not support a section, say so and keep it short. Never invent evidence, names, numbers or prior work.
- No advisory content (next steps, recommendations) unless this artefact's structure asks for it. No authorship byline.
- Clean Unicode punctuation. No raw angle brackets in prose.
- If a diagram helps, use Mermaid.
- Quotes are verbatim and never edited. Attribute by role and Session ID, never by name.
- Add no age, demographics or personal detail that is not in the notes.
- A non-obvious trait needs support from at least three sessions, or it is marked `[thin]`.

# Step 4 — File the output

Follow CLARA's filing discipline (section 7.5 of the main skill). In short, apply these checks **in order, before filing**:

1. **Project and wiki check.** The clone must succeed and be the project the user named. If not, ask. Never create a project or enable a wiki.
2. **Path check.** In the freshly pulled working tree (`git pull --rebase` first), resolve the target `{{track}}/Personas/{{persona-name}}.md` and confirm every parent exists: `{{track}}/` and its overview page `{{track}}.md`, and the artefact-type index page `{{track}}/Personas.md`. The path shown to the user at confirmation is the literal path you checked.
3. **Missing structure.** List every missing folder and index page in the confirmation prompt, so the user authorises them in the same go as the leaf page. Do not prompt per placeholder. After approval, create them top-down, then the leaf page. Placeholder body: *"Placeholder — created to support filing structure."*
4. **Update vs create.** If a page already exists at the target path, ask whether to update in place (git history preserves the prior version) or to draft at an alternative path. Do not silently overwrite.
5. **No silent fallbacks.** If the path cannot be created (permissions, no push access, anything else), stop and say exactly what is blocked. Do not file anywhere else without explicit confirmation, and do not improvise an alternative path.
6. **Confirm.** Show the draft and every file that will change: the page, an entry in the `{{track}}/Personas.md` index page's `## Contents` list, its entry in `_sidebar.md`, and any missing structure. File only on explicit go-ahead.
7. **Write** the page with front matter title, breadcrumb, body, Sources table and link-reference block (section 7.8), then the index and sidebar edits.
8. **Link check.** Run the link-check script from the appendix of the main skill. It must print OK.
9. **Commit and push.** Commit as `clara: persona-generator to {{track}}/Personas/{{persona-name}}.md`. Push. If rejected, run `git pull --rebase`, re-run the path check, and retry once. Never force-push.
10. **Verify.** After the push, `git fetch` and confirm the file exists on the remote default branch at the intended path, in the intended folder, with its index entry. If it does not, stop and report; do not continue.

You do **not** apply wiki labels or metadata. The path is the retrieval contract: every artefact lives at a predictable path.

- Report the filed page's full URL: `<project-web-url>/-/wikis/{{track}}/Personas/{{persona-name}}`.
- In copy-paste mode, return the page (front matter included) and the path above. The user files it by hand.
