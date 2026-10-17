# CLARA — GitLab

CLARA for programmes whose knowledge base lives in the **GitLab project wiki**.

This repo builds the **self-contained install bundle** for environments with no
internet access. The hosted skill on the CLARA website fetches each artefact
brief on demand, which a disconnected install cannot do. The bundle inlines all
15 briefs into one file.

## Where the content comes from

The skill and briefs are authored in
[`clara`](https://github.com/dsta-productops/clara) under
`site/public/skill/` (`clara-gitlab.md` and `briefs/gitlab/`). This repo
vendors that repo under [`core/`](core/) via `git subtree`. **Do not copy or edit
the skill and briefs here.** Change them in `clara`, then pull.

## Build

```bash
pnpm install
pnpm build          # → dist/
```

Emits:

- `dist/SKILL.md` — the skill with front matter, briefs inlined (skill-protocol hosts)
- `dist/system-prompt.md` — the same content without front matter (flat system prompt)

The build stops with an error if the skill's catalogue and the briefs disagree,
or if the skill's shape changes upstream.

## Updating

```bash
pnpm core:pull      # git subtree pull from dsta-productops/clara
pnpm build
```

CI (`.github/workflows/build-dist.yml`) rebuilds `dist/` when `core/` or
`scripts/` change on `main`.

See [`core/DEPLOYMENT.md`](core/DEPLOYMENT.md) for install guidance.
