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

# Edit this table to map your blueprint's docs into the portal _docs/ folder.
# Format: <source-path-relative-to-BLUEPRINT_DIR> -> <slug-without-.md>
declare -a SOURCES=(
  # Stage outputs
  "01-diagnose.md:01-diagnose"
  "02-prescription.yml:02-prescription"
  "03-design-brief.md:03-design-brief"
  "DESIGN-PRINCIPLES.md:design-principles"
  # ADRs (numeric order; 0005 was hard-deleted 2026-05-25 per ADR-0008)
  "decisions/0001-positioning-context-engineer.md:adr-0001-positioning"
  "decisions/0002-archetype-portfolio-brand-consulting.md:adr-0002-archetype"
  "decisions/0003-hero-claim-option-a.md:adr-0003-hero-claim"
  "decisions/0004-signature-schematic-diagram.md:adr-0004-signature"
  "decisions/0006-corpus-as-derived-state.md:adr-0006-corpus-derived"
  "decisions/0007-rag-on-vectorize.md:adr-0007-rag-vectorize"
  "decisions/0008-portal-shell-adoption.md:adr-0008-portal-shell"
  "decisions/0009-cluster-surfacing-pattern.md:adr-0009-cluster-surfacing"
  "decisions/0010-positioning-relative-to-harness-engineering-and-forge-framework.md:adr-0010-harness-and-forge"
  # Research substrate (Stage 1)
  "research/synthesis.md:research-synthesis"
  "research/current-state/repos-inventory.md:repos-inventory"
  "research/current-state/deploys-inventory.md:deploys-inventory"
  "research/current-state/writing-corpus.md:writing-corpus"
  # Content drafts (source-of-record for prose)
  "content/about.md:content-about"
  "content/hero.md:content-hero"
  "content/practice.md:content-practice"
  "content/work-data-refresh.md:content-work-data"
  "content/askdad-corpus-catalog.md:content-askdad-catalog"
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
