#!/usr/bin/env bash
# Blueprint Portal — prep for Cloudflare Pages deploy
#
# Copies strategic docs into portal/_docs/ so the Pages Function
# (functions/api/chat.js) can fetch them via the ASSETS binding, and so
# the docs viewer (docs/index.html) can render them as HTML.
#
# Customize the SOURCES table below for your project. Default assumes
# docs live one level up under blueprint/{research,docs}.

set -euo pipefail
PORTAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BLUEPRINT_DIR="$(cd "$PORTAL_DIR/.." && pwd)"
DOCS_OUT="$PORTAL_DIR/_docs"

mkdir -p "$DOCS_OUT"

# Customized for ninochavez.co v3 brownfield Pattern B initiative.
# Format: <source-path-relative-to-BLUEPRINT_DIR> -> <slug-without-.md>
declare -a SOURCES=(
  "research/01-diagnose.md:01-diagnose"
  "research/03-design-brief.md:03-design-brief"
  "research/_inventory.md:inventory"
  "research/_external-corpus.md:external-corpus"
  "research/competitive/peer-cohort.md:peer-cohort"
  "research/competitive/market-cohort.md:market-cohort"
  "research/personas/_index.md:personas-index"
  "research/personas/peer-architect.md:persona-peer-architect"
  "research/personas/prospective-client.md:persona-prospective-client"
  "research/personas/conference-circuit.md:persona-conference-circuit"
  "research/funnel/funnel-current-state.md:funnel-current-state"
)

count=0
for entry in "${SOURCES[@]}"; do
  src="${entry%%:*}"
  slug="${entry##*:}"
  if [ -f "$BLUEPRINT_DIR/$src" ]; then
    cp -f "$BLUEPRINT_DIR/$src" "$DOCS_OUT/$slug.md"
    count=$((count + 1))
  fi
done

echo "Copied $count docs into $DOCS_OUT/"
ls -1 "$DOCS_OUT" 2>/dev/null
