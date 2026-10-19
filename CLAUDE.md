@AGENTS.md

<!-- Shared instructions for every coding agent live in AGENTS.md; Claude Code loads them through the import above and Codex reads AGENTS.md directly. Add a line below only if it applies to Claude Code alone. -->

The SessionStart hook (`~/.claude/hooks/blueprint-session-start.py`, installed and
wired in `~/.claude/settings.json`) auto-loads `METHODOLOGY.md` +
`docs/variant-selection.md` + `docs/portal-and-tier-ladder.md` when working in any
directory under a `blueprint.yml` ancestor — which, with `blueprint.yml` at repo
root, is every session in this repo.
