# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- A person arriving from a LinkedIn crosspost or another shared piece of writing, looking to understand Nino's thinking and open the related work.
- A person following a social photography link, looking to see the photographs and use the gallery's existing search, viewer, save, and download tools.
- A peer, collaborator, or potential employer looking for concrete examples of what Nino builds with AI and where those products or studies lead.
- A returning visitor looking for a specific public product, piece of writing, photograph, study, demo, or guide.

## Product Purpose

Nino Chavez's personal web presence introduces his practice and makes its public work reachable. Writing presents AI-assisted thinking. Building presents examples of how and what he builds with AI. Photography demonstrates his photography.

The homepage gives visitors a direct way into those three bodies of work. About supplies the durable profile behind them.

## Positioning

This is a personal practice site that connects writing, software and operated products, and action-sports photography while preserving each destination's own job. The current implementation keeps the publication, gallery, and independent products in their existing runtimes.

## Operating Context

The public shell has four global destinations: Writing, Building, Photography, and About. Search is a utility.

Building is the home for products, public studies, process, demos, and guides. Its routes include `/work`, `/demos`, and `/learn`. Writing is `/blog`; Photography is `/photography`; About is `/about`. Direct URLs, query filters, canonical sources, and private boundaries remain part of the visitor contract.

## Capabilities and Constraints

The main site is a React/VineNext application deployed as a Cloudflare Worker. The article publisher is an Astro application and the gallery is a SvelteKit application. Apex routing joins their public paths; the applications retain their separate runtimes and responsibilities.

Minder and The Rotation are independent products with their own task-focused navigation and destinations. They are represented in Building while their current runtimes remain separate. Work Library remains its own product and source authority; only public, source-authorized material may be represented here.

## Brand Commitments

The site uses Nino Chavez's name and presents the practice through real public work. Writing, Building, Photography, and About are the established global names. Product availability and destinations must be stated truthfully.

## Evidence on Hand

The repository contains public work records, writing metadata, demo content, and photography routes. The October 1, 2026 Concept A review and implementation record document the selected direction and the tested public-route behaviors at `docs/design/concepts/20260930/REVIEW.md` and `docs/design/concepts/20260930/implementation/RESULT.md`.

The homepage uses a real photograph credited to Nino Chavez. Building includes real public destinations for products and studies. Do not fabricate testimonials, analytics outcomes, product availability, personal history, or photography permissions.

## Product Principles

- Make the next useful destination clear from the visitor's arrival path.
- Keep the three kinds of proof distinct: writing, building, and photography.
- Preserve the specialized behavior and source authority of each connected application.
- Keep public discovery useful without exposing private work or inventing evidence.
- Treat direct links and query-based retrieval as durable visitor contracts.

## Accessibility & Inclusion

Keep the established keyboard navigation, visible focus treatment, responsive layout, and gallery recovery behavior. Preserve semantic content and the existing search, filter, viewer, save, and download interactions when changing public surfaces.
