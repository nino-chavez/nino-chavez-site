One confirmed regression: the refit flattens tutorial-specific guidance states into one blue/gray treatment. No confirmed loss was found in the four rendered states for archive, fiction prose, or presentation controls.

The opened frames show:

- Archive phone: a readable essay archive with search, subject filters, and featured content.
- Presentation desktop and phone: intact dark slide canvases, visible previous/next controls, counter, and progress.
- Fiction body: preserved serif prose, paragraph rhythm, and readable dark text on a light ground.

### Confirmed regression

**Tutorial semantic controls lose their distinct meanings.** Tutorial routes receive `publication-theme` by default, while the new broad stylesheet maps amber, emerald, cyan, and other authored color classes to the same blue action color; maps their borders to gray; removes gradients; and maps colored backgrounds to the same pale-blue surface. This affects actual `Exercise`, `Checkpoint`, and copyable `Template` blocks used throughout current tutorial MDX.

Before: `HEAD` left those authored variants intact on the dark body—for example amber exercises, green checkpoints, and cyan templates.  
After: the reader sees visually similar blue/gray boxes, so exercise, completion/checkpoint, and reusable-copy material are harder to distinguish while scanning a tutorial.

- Current cause: [publication.css](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/styles/publication.css:105), [publication.css](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/styles/publication.css:149), [BaseLayout.astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/layouts/BaseLayout.astro:67).
- Affected authored controls: [Exercise.tsx](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/components/tutorials/Exercise.tsx:12), [Checkpoint.tsx](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/components/tutorials/Checkpoint.tsx:10), [Template.tsx](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/components/tutorials/Template.tsx:11).
- Smallest repair: scope the broad color/gradient overrides to route chrome and generic collection cards, excluding tutorial content blocks (or give tutorial detail routes an owned theme). Do not remove the control-specific classes.
- Browser reproduction for the parent: open `/blog/tutorials/measure-your-own-token-waste`; compare an Exercise, Checkpoint, and Template block. This interaction/appearance check was not run here.

### Retained controls and boundaries

- Archive search, all category filters, topic link, tag filters, result status, clear action, row links, and load-more remain in [BlogList.tsx](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/components/BlogList.tsx:109). `HEAD` contrast: “Other” was replaced by individual category filters; no content is omitted.
- Article navigation context remains: table of contents, series navigation, counterpoint notice, tags, sharing, and LinkedIn-original link remain present in [[slug].astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/pages/blog/[slug].astro:123).
- Fiction’s rendered prose remains serif and readable; the actual story `<Content />` remains intact in [fiction/[slug].astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/pages/blog/fiction/[slug].astro:146).
- Presentations explicitly retain `presentation-theme`, keeping authored deck colors outside the publication overrides; the rendered desktop and phone frames support that result. See [presentations/[slug].astro](/Users/nino/Workspace/dev/sites/nino/blog/.worktrees/codex/referral-design-b-20260930/astro-build/src/pages/blog/presentations/[slug].astro:52).
- Private routes remain excluded from the publication-theme selector. No prose, MDX, canonical URL logic, or private-route source was changed in the examined diff.

### Unresolved risks, not confirmed defects

- Archive filtering, tag clicks, load-more, copied-link behavior, mobile section menu, table-of-contents collapse, and deck keyboard/swipe/fullscreen behavior were not runtime-tested; source alone does not prove them.
- No rendered article, series, or tutorial-detail frame was supplied, so their final appearance needs the parent’s runtime pass.
- The same broad stylesheet would recolor a future fiction content-warning panel, but no current fiction frontmatter declares `contentWarnings`; this is a future-safety risk, not a present regression.

No files, processes, tabs, or fixtures were created or left running.