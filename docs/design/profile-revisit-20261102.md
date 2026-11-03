# Profile design comparison — November 2, 2026

## Intent

Compare two original color and presentation directions for the existing Profile
home and Links surfaces. This is a refit, not a structural rethink: the same
real content, typography, navigation, destinations, and Work in view hierarchy
remain in place.

**Selected structure:** [ADR 0006 — Put the person and work in view](../decisions/0006-profile-work-in-view.md).

## Reader job

A visitor arriving from a referral or project link should quickly understand who
Nino is, inspect three real products, open Writing or Photography, and find a
route to more context or contact. Links should keep each destination name with
its explanation, without making the visitor assemble them across columns.

## Traits and anti-goals

Both directions are personal, clear, practical, and calm. Product previews are
treated as evidence, not decoration. They must not become a hero replacement,
a card collection, a gallery treatment, a dashboard, a badge system, or a
palette borrowed from Blog or Photography.

## Preserve

- The Work in view page sequence and three-column desktop to single-column phone hierarchy.
- Schibsted Grotesk for headings; existing Inter-backed prose and control face.
- Every word, URL, target, semantic element, data attribute, privacy behavior,
  visible navigation item, and existing new-tab behavior.
- Real project images and their current purpose and caption; no replacement,
  tint, recolor, or new media.
- Underlined links, native semantics, visible keyboard focus, and the existing
  no-new-animation and reduced-motion behavior.
- Profile ownership only. Writing and Photography keep their independent
  application styles and navigation.

## Directions

### Apricot & ink

`#FBF1E4` ground, `#28384A` ink, `#8B413F` action, `#F4E2CF` surface,
`#5D6068` muted text, and `#D3C4B5` rules. The blue-black ink gives the soft
apricot ground a crisp editorial contrast; the muted red is reserved for active
and interactive emphasis rather than spread over the interface.

### Sage & cocoa

`#EDF1E8` ground, `#35312C` ink, `#496650` action, `#DFE6D7` surface,
`#62665C` muted text, and `#C4CEBD` rules. This makes the same structure quieter
and more workshop-like. Cocoa preserves text weight while sage marks actions
without turning the home into a product-brand surface.

### Shared presentation refinement

The work section begins with a slightly firmer rule. Each existing product
image receives a simple surface frame without inner padding, and no image
filter or replacement. This makes tall and wide screenshots easier to inspect
at a glance while retaining their native UI. The only crop-related compromise is
the existing `object-fit: contain`: it protects the complete screenshot rather
than filling the frame with a more dramatic but less honest crop.

## Surfaces

| Surface | Reader sees | Check still owed |
| --- | --- | --- |
| Home — desktop | Compact identity and cross-site routes, then three equal product proofs and biography. | 1440px visual comparison; title wrap, image clarity, link and focus states. |
| Home — mobile | Portrait/name introduction followed by one product proof per row. | 390px reading order, touch targets, and image framing. |
| Links — desktop | Two readable groups with linked names directly above explanations. | Palette contrast, long destination names, and active/focus treatment. |
| Links — mobile | One reading column with the same grouped relationships. | 390px wrap and no clipped descriptions. |
| 320px stress | The header, quick links, and about actions retain wrap-safe gaps. | No horizontal overflow or obscured focus outline at 320px. |

## Interaction states

The active navigation item and project category use the direction's action
color. Hovering a product frame switches only its outline and surface to the
existing quiet-action tone; there is no new motion. Keyboard focus remains a
clear offset outline in that action color. Link underlines remain the primary
non-color affordance.

## Limits and status

This review stylesheet is isolated at `public/__profile_review/directions.css`.
It does not select a direction, alter production CSS or application code, or
claim a rendered result. A parent review still needs to load each direction,
inspect Home and Links at the listed widths, check 320px overflow and contrast,
and choose or reject a palette before any production change.

Parent refinement: removed inner padding after measurement showed it reduced the wide screenshots. The frame keeps the full available width; the taller aspect ratio gives Minder and The Rotation more image area without cropping. Capture checks wait for the computed palette to settle before reading or saving the frame.
