## Regression report

Three source-level losses remain beyond the known album-opening and date-rail defects. The first two are unambiguous. The third needs browser confirmation because the old sticky bars may already have conflicted with the newer shared header.

### 1. High: “Popular in this album” is buried below the photo page

Current source renders the photo grid first at [album page:328](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/routes/albums/[slug]/+page.svelte:328>), followed by Load More, and only then renders the popularity rail at [album page:367](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/routes/albums/[slug]/+page.svelte:367>).

Previous `HEAD` placed the popularity rail before the photo grid. The initial page contains up to 48 photos, so the curated highlights now sit below an entire contact sheet and its Load More control. The existing desktop capture confirms that the opening viewport proceeds directly into the ordinary grid.

Reproduce:

1. Open an album with at least three `popularInAlbum` records.
2. Scroll past the search/download tools.
3. Confirm that the regular grid appears first and “Popular in this album” appears only after the initial photo page.

Smallest repair: move the existing popularity block back above the photo-grid block. No logic or copy change is needed.

### 2. Medium: album cards now hide per-photo category information

The album route passes `showMetadata={false}` at [album page:338](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/routes/albums/[slug]/+page.svelte:338>). That suppresses the entire metadata overlay beginning at [PhotoCard.svelte:122](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/lib/components/gallery/PhotoCard.svelte:122>), including both sport and category.

Previous `HEAD` rendered that overlay on every album card. Suppressing the album-wide sport is defensible, but the category is photo-specific and can vary throughout one event. The current comment incorrectly treats sport and category as equally repetitive.

Reproduce:

1. Open an album containing more than one photo category.
2. Hover a card or focus it with the keyboard.
3. No category appears.
4. Open the same photo from Explore or a collection; its category overlay remains available there.

Smallest repair: remove `showMetadata={false}`. If repeated sport labels are still unwanted, split the control so album cards hide sport but retain category.

### 3. Medium, browser confirmation required: long-page utility controls lost sticky positioning

The refit replaced sticky utility headers with ordinary document-flow sections:

- Explore filters: [explore page:446](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/routes/explore/+page.svelte:446>)
- Event search, filters, and sorting: [events page:138](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/routes/albums/+page.svelte:138>)
- Album search and bulk download: [album page:268](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/routes/albums/[slug]/+page.svelte:268>)
- Shared-album bulk download: [share page:92](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/routes/share/[token]/+page.svelte:92>)

Previous `HEAD` explicitly gave each corresponding header `sticky top-0`. Current source contains no sticky replacement, so the controls scroll away on long galleries.

The uncertainty: the shared site header is now 64px high and the photography subnav is another 50px, at [Header.svelte:274](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/lib/components/layout/Header.svelte:274>) and [Header.svelte:358](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/lib/components/layout/Header.svelte:358>). The old `top-0` utility bars may therefore have been partially or fully covered already. Source proves that sticky positioning was removed, but only browser comparison can prove how usable the prior behavior remained.

Reproduce by scrolling each long page until the first grid rows leave the viewport and checking whether its filters, search, share, or download action remains reachable.

Smallest repair: restore stickiness to the compact utility row—not the large opening—and position it below the 114px shared chrome. Do not reinstate the old `top-0` value blindly.

## Uncertain visual risk

[CollectionCard.svelte:107](</Users/nino/Workspace/dev/sites/nino/nino-chavez-photography/.worktrees/codex/referral-entry-20260930/src/lib/components/gallery/CollectionCard.svelte:107>) changes collection covers from portrait `3:4` to landscape `4:3` while retaining `object-fit: cover`. The current collection capture shows the resulting crop, but there is no same-content old frame available to prove that subjects or action were cut off. This needs a cold comparison, not a source-only verdict.

## Reviewed scope

Reviewed current source against `HEAD` for:

- Public routes: error, Events, album detail and loader, Collections, collection detail, Explore, FAQ, Saved, Links, photo detail, month gallery, accessibility settings, shared album, Timeline, and the untracked analytics-preferences page.
- Components: `AlbumCard`, `CollectionCard`, `PhotoCard`, `Header`, `Footer`, `Pagination`, and `TimelineV2`.
- Dependent album-name display utility and its new tests.
- Untracked Svelte CSS and the read-only preview configuration.
- Existing album, photo, and collection desktop/phone captures.

No additional query, pagination, privacy, cache, invalid-link, or viewer-action regression was proven from this source comparison. The known album whitespace and date-rail changes were excluded. No files were written, and no runtime, build, network, or browser automation was used.