# Open Practice

This prototype treats the site as a visit to a working practice, not a brochure
about one and not a control panel for operating it.

## Creative thesis

Nino is an operator-architect. The recurring act is not making one kind of
artifact; it is turning complicated human work into inspectable systems, then
living with those systems in real conditions. Software, tournaments, commerce,
media, photography, writing, and agent-assisted methods are different tests of
the same practice.

The site therefore exposes:

- the person and point of view immediately;
- a direct route to current attention without turning Home into a second Now page;
- artifacts in forms appropriate to the work;
- enough process to make the operating method visible;
- a complete, honestly labeled record rather than a prestige shortlist.

## Functional model

- **Home is a working stage.** Identity, portrait, claim, and one live proof
  surface share the first encounter. Current attention stays one move away on
  Now; Home does not reproduce that list as a second project shelf.
- **Work in the world proves range without becoming another inventory.** Three
  unlike forms — a published method, an ongoing publication, and a working
  photography archive — show how the practice changes shape. Each is named
  concretely and leads to the thing itself. The Rally HQ proof in the hero is
  not repeated.
- **Public proof requires something a visitor can inspect.** A live product, a
  maintained publication, a working archive, or a published method can all
  qualify; software is not the only valid proof form. A project with no public
  destination remains visible in Now and the complete Work library, but it does
  not borrow the visual authority of live proof. Under this rule, Signal
  Dispatch and Photography qualify. Film Room remains honestly labeled as
  building until it has a public surface that contains more than a claim about
  the work.
- **Work is an atlas before it is a registry.** The opening establishes the six
  domains and their relative weight so a first-time visitor can understand the
  range before meeting search, state, form, and thirty-two records. “Selected
  work” is not a content type. The complete record remains present, searchable,
  and honestly labeled beneath that orientation.
- **Demos are a sequence, not another registry skin.** Every published session
  and applied technique remains searchable under the apex site, but sessions
  retain their complete authored stories and publication order while
  techniques form a separate reusable toolkit. A demo is not a preview card,
  screenshot, or framed legacy page. It renders natively inside the shared
  shell while preserving the source story's palette, diagrams, excerpts,
  images, and chapter rhythm. Counts come from the Demos publisher instead of
  being copied into this document or the interface. The visual form explains
  the difference before a visitor has to read a label.
- **Writing remains the complete publication.** All published pieces stay in
  one searchable record. A persistent result rail keeps the count and a direct
  return to the filters available deep in the archive; completeness does not
  require making the visitor remember where the controls were.
- **Photography is an image field.** Search remains the first practical action,
  but the work is experienced through a full-bleed opening and an irregular
  contact sheet rather than translated into the site's record-row language.
- **Detail pages are records.** Context, public surface, current limit,
  relationships, and the next honest action stay close together.

### Content ownership and freshness

The unified site is the reader-facing index, not a second editorial system.
Signal Dispatch owns writing and series metadata. Ways of Working owns sessions,
techniques, relationships, complete story content, and source assets. Its
publisher exposes a versioned JSON index plus one complete story feed per
record. This site reads those feeds with five-minute revalidation, scopes each
story's visual rules to its native page, and rewrites internal series links to
the apex routes. Machine-to-machine reads and source assets use each
publisher's stable Cloudflare Pages origin because the visitor-facing custom
domains deliberately reject automated requests.

Every build also refreshes a bundled last-known-good snapshot from the local
source repository, or from the published index when that repository is not
present. A temporary source failure therefore does not erase the public record.
Counts in the interface are computed from the active snapshot; prose uses
timeless quantities instead of copied numbers.

The governing rule is: one source owns each complete record, freshness is
automated, and failure falls back to known content rather than silently
producing an empty collection. The retired Demos subdomain redirects visitors
to the matching apex route only after the apex pages ship; it never remains a
second public runtime.

## Page expression model

The site shares an identity, not a page template. Continuity comes from the
global shell, palette, grid, type roles, action language, focus treatment, and
motion rules. Opening composition, dominant medium, density, section rhythm,
and browsing model follow the visitor's job and the native form of the work.

- **Stage — Home, About, Now.** Human presence, current attention, and working
  artifacts lead. These pages may layer media and use depth because their job is
  to establish a person and a practice.
- **Atlas — Work.** Domain orientation leads into the complete registry.
  Proportional fields and grouped records make breadth legible without turning
  the page into a prestige shortlist.
- **Sequence — Demos, Learn.** Order, progression, and source artifacts drive
  the composition. A session should look temporal; a technique should look
  reusable.
- **Collection — Writing, Photography.** The medium determines the browsing
  form. Writing may privilege subjects and reading rhythm; photography
  privileges image scale and visual adjacency.
- **Utility — Search, Links, Privacy.** These pages remain quiet and direct.
  They inherit the identity without performing the expressive work of a
  portfolio route.

Page-level sameness is a defect when the visitor jobs differ. A new route must
choose an expression model before it chooses a hero treatment.

## Typography

The locked baseline inherits families already established across Nino Chavez
projects, then narrows each face to one job:

- **Anton** owns the personal name and rare, short display words where physical
  scale is part of the page's meaning. It is a signature, not a compulsory
  collection-header treatment. It is never negatively tracked. Display type
  must remain inside its owning field at every supported width; it may meet an
  intentional stage edge, but it never paints over instructions, controls, or
  reading copy.
- **Inter** owns body copy, navigation, controls, claims, ordinary headings,
  section titles, and record names. One flexible family carries most of the
  site so the work—not the typography system—provides the variety.
- **Space Mono** is limited to dates, state, sequence, counts, and short
  evidence labels. It is not used as a general interface voice.

All three are delivered locally as WOFF2 assets. This supersedes System A
(Schibsted Grotesk / Inter / JetBrains Mono), whose broad display face and
high-contrast mono layer made the practice read more like a designed operating
manual than a personal portfolio.

**Typography status: locked.** Anton / Inter / Space Mono is the current
art-direction baseline and the reference for later comparisons. Anton is
display-only; its force depends on the rest of the interface remaining quiet.

## Copy and naming

The site's premise is a complete, honestly labeled record. A label the visitor
cannot decode fails that premise as surely as a false count does. These clauses
are testable claims, written so a reviewer can cite one rather than appeal to
taste. They were derived from the production copy audit of 2026-08-01
(`docs/audit/FINDINGS-copy-2026-08-01.md`).

- **Reader-facing nouns, not data-model names.** Rendered copy uses the words a
  visitor already owns. `work object`, `record` as a category name, `durable
  page`, `artifact`, `registry`, `snapshot`, and `review build` are internal
  vocabulary; they may appear in this repo's contracts and in `app/` identifiers,
  never in visitor-facing text. The registry's own `form` values — site, cli,
  app, service, docs, collection — are the reader-facing vocabulary for what a
  thing *is*. `record` remains correct in the detail-page metadata line, where it
  names the entry rather than the work.
- **A coined term carries its gloss at first use.** Any term the site invents, or
  uses in a sense a visitor would not predict, is defined in the same section
  where it first appears. This applies with most force to `state`, whose values
  the `/work` filter glosses well ("Live — running now", "Internal — exists, not
  public") and which appears bare on detail pages and search results that
  visitors reach first. A site-level frame appearing in the `<title>` or the
  first viewport is a coined term and must be defined on the page that carries
  it.
- **Say what the reader gets, not what the site refuses to do.** Copy does not
  negate a norm the visitor was never told about. "Nothing is hidden for failing
  to look finished" asks the reader to first believe hiding is normal here.
  State the affordance instead: unfinished work is listed, and the state label
  says what can be opened today.
- **First person, everywhere Nino speaks.** The site is "presented by the person
  responsible for it" (`PRODUCT.md` §Product). Third-person self-reference in
  body copy is a defect, not a register choice. Third person remains correct in
  `<meta>` description text and structured data, where the audience is a machine.
- **Counts never render as ordinals.** Sequence positions may be zero-padded
  (`01 / 06`); quantities never are. `08 Applied techniques` and `01 Practice`
  in the same visual family make a count indistinguishable from a position. A
  sequence badge must also match the order the items are displayed in — a badge
  that disagrees with its own list carries no information the visitor can use.
  Counts themselves are governed by §Content ownership and freshness: computed
  from the active snapshot, never copied into prose.
- **A duration or effort claim names its basis.** The site's authority rests on
  sourced evidence. An unattributed estimate — a week range on a self-directed
  path, a time-to-complete — is the weakest claim on any page it appears on.
  Either ground it in something real ("this took me N weeks") or express it as
  effort rather than elapsed calendar time.

Judgment, not clause: whether a given rewrite reads well. These clauses catch
decodability and honesty failures. They do not adjudicate voice, and a reviewer
citing one to argue about tone is over-reading it.

## First encounter

The opening salvages the useful behavior of the earlier profile composition
without restoring its campaign-page excess:

- the name is large enough to behave as structure, not a masthead;
- the illustrated portrait occupies the right half of the stage as an
  intentional image field rather than pretending an opaque asset is a cutout;
- the name leads the hierarchy, the portrait supplies presence, and a smaller
  Rally HQ surface provides immediate, actionable proof without becoming a
  third hero;
- the visible grid aligns the composition and the work that follows it;
- the claim and direct library action remain readable HTML, not words baked
  into an image or video.

The proof surface is singular. A collage of several tilted project frames would
turn the encounter back into staged promotional creative and make the work less
legible.

## Motion and rendered media

The hero remains responsive HTML and CSS. Render Kit is useful for deterministic
review captures, and HyperFrames could previsualize or produce a separate
launch asset, but neither should turn the primary encounter into an autoplaying
movie. A rendered loop would freeze the composition to one aspect ratio,
duplicate accessible text, and make the evidence decorative rather than
actionable.

If motion is added after the static hierarchy is approved, it should be a
native progressive enhancement: a short wordmark reveal or proof-surface
settle, no continuous loop, no scroll choreography, and no motion when the
visitor requests reduced motion.

### Expressive layer

The approved expressive layer is **evidence kinetics**: movement and graphics
make structure, quantity, affordance, or spatial origin easier to perceive.
They do not become a second identity system.

- The homepage name, portrait, claim, and live proof settle once in hierarchy
  order. Collection-title lines use the same short reveal.
- The compact menu enters from the right edge it occupies, so the transition
  explains where the temporary navigation surface came from.
- Arrows travel only when their owning link is hovered or keyboard-focused.
  Media moves only enough to confirm that the frame is actionable.
- Domain rows double as proportional data bars. Their width encodes each
  domain's share of the complete work record without adding a separate chart
  or duplicating navigation.
- All motion remains native CSS, completes quickly, and disappears under the
  visitor's reduced-motion preference.

Generic icon sets, looping status pulses, cursor effects, parallax, scroll
reveals, marquees, decorative dashboards, and autoplaying media remain out of
scope. They would make the practice look busier without making it more
legible.

## Color and material

- Ink `#091426` is the working surface and primary figure-ground anchor.
- Ink soft `#111F34` holds media without introducing another palette.
- Bone `#F1EADF` is the reading ground.
- Surface `#FBF6ED` distinguishes library zones without using card elevation.
- Cobalt `#4051ED` carries identity and action.
- Copper `#9F4F30` annotates light surfaces; `#D07A4E` is reserved for dark
  surfaces where the darker value loses contrast.
- Rules `#CEC5B8` and text-weight borders describe true boundaries or sequence;
  they do not supply hierarchy by repetition. Filled fields, spacing, and tonal
  contrast do the primary grouping work. Depth is reserved for literal media
  planes on the working stage; it is not a generic card effect.

## Cognition and Gestalt contract

- **Proximity:** a state, count, caption, or constraint stays beside the object
  it qualifies.
- **Similarity:** repeated objects mean repeated behavior. Unlike work keeps an
  unlike visual form, even when it shares the same data and action grammar.
- **Figure and ground:** ink introduces identity and active practice; bone
  carries inspection and reading.
- **Continuity:** shared alignment, type roles, palette, navigation, and action
  language connect the routes. Repeating one ruled composition across unlike
  pages is not continuity.
- **Edge behavior:** the opening stage and construction grid are viewport-wide.
  A responsive gutter aligns language without turning the
  composition back into a centered brochure shell; proof objects may meet or
  crop at the edge.
- **Text containment:** display copy and action language remain inside the
  surface that supplies their contrast. Images and decorative fields may crop;
  readable text may wrap but may not paint across, hide behind, or escape its
  owning region.
- **Chunking:** no major page begins with more than one identity statement and
  one immediate decision surface.
- **Affordance:** one perceived object maps to one behavioral object and one
  primary action. Internal moves use a right arrow; external destinations use
  the northeast arrow. Search and filters look like controls, not decoration.
- **Economy of rules:** a line appears only when it communicates a boundary,
  sequence, or control state that spacing and figure-ground cannot express more
  clearly.
- **Progressive disclosure:** the homepage links to current attention, shows
  three concrete forms of public work, and keeps the complete library one move
  away.

## Interaction contract

Global navigation is always available. The complete library is one direct move
away. Work and About remain parent sections for Photography, Now, and Links;
navigation distinguishes the current page from its current parent section
instead of marking both as the same destination. Work and Demos search and
filters write their state to the URL and preserve an accurate result count.
Long records keep a persistent route back to their controls. The compact menu
is a modal navigation surface, exposes its expanded state, and returns focus to
its trigger when closed. Reduced-motion preferences are respected.

### Action-object contract

- **Persistent discovery:** a primary action remains identifiable without
  hover, animation, cursor changes, or color alone.
- **Redundant signification:** an unfamiliar compound link uses at least two
  persistent cues: a boundary or common region, an explicit action phrase, a
  conventional link treatment, or a directional mark.
- **Target correspondence:** the region that looks actionable is the region
  that acts. A small nested link does not borrow hover feedback from a larger
  passive container.
- **Behavioral consistency:** visually equivalent objects behave equivalently
  across routes and breakpoints. Responsive compression may shorten an action
  label, but it does not remove the only action cue.
- **Honest feedback:** only interactive objects receive interactive hover,
  focus, or pressed feedback. Hover, keyboard focus, and touch activation
  identify the same owning object.

The recurring patterns apply the contract as follows:

- **Action cards** use a complete frame or perceptible common region, an
  explicit destination or action, and feedback on the whole card.
- **Action rows** keep a verb or directional cue visible at every supported
  width.
- **Filter controls** look editable before focus and keep their label, value,
  and control indicator grouped.
- **Passive panels** do not react like links.

Review these patterns at desktop and mobile widths, with hover unavailable and
with color removed. Compare every perceived boundary with the actual click
target, then verify hover, focus-visible, and pressed states. Responsive
acceptance includes the longest real label and the width immediately below, at,
and above every layout breakpoint.

This is a private art-direction prototype. It does not authorize publication of
internal work or replace the production content audit.
