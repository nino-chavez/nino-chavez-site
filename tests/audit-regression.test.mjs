// Regression cases derived from the site audits.
//   F* — docs/audit/FINDINGS.md (d0cfd0e, local build)
//   C* — docs/audit/FINDINGS-copy-2026-08-01.md (production copy pass)
// Each test names the finding it locks down.
//
// These tests assert the post-fix behavior that closes mechanically testable
// findings. They remain separate from the main suite so the audit ledger stays
// explicit without turning every historical finding into a product invariant.
//
//   npm run test:audit
//
// Layout defects (F2, F5, C15) are not represented here — they need a browser,
// not a rendered-HTML assertion. Those are covered by the capture script in
// docs/audit/AUDIT-PLAN.md Phase 1.
//
// Copy findings that are judgment, not assertion, and are therefore NOT here:
// whether the homepage lede answers "what does this person do" (C1), whether a
// coined term's definition is a good one (C2), framing tone (C13), and the
// numbering-scheme and vocabulary questions left at S4 (C17, C19, C20, C21).
// A green suite does not mean the copy is good. It means the copy has not
// regressed on the parts a machine can check.

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  getPhotographyArchiveStats,
  getRecentPhotographyAlbums,
  PHOTOGRAPHY_RECENT_ALBUMS_ENDPOINT,
  PHOTOGRAPHY_STATS_ENDPOINT,
} from "../app/photography-stats.mjs";

let worker;

async function render(path = "/") {
  if (!worker) {
    const workerUrl = new URL("../dist/server/index.js", import.meta.url);
    workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
    ({ default: worker } = await import(workerUrl.href));
  }

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function htmlFor(path) {
  const response = await render(path);
  assert.equal(response.status, 200, `${path} should render`);
  return (await response.text()).replaceAll("<!-- -->", "");
}

// Count distinct record links on the FULL document. Do not split on the RSC
// script tag and do not infer from page size — a client-rendered collection
// keeps its records in the flight payload, and a smaller page is not evidence
// of a working filter. That mistake produced three wrong readings during the
// audit itself.
function recordCount(html, pattern) {
  return new Set(html.match(pattern) ?? []).size;
}

const WORK_RECORDS = /\/work\/[a-z0-9-]+/g;

test("F1 — collection filters accept any casing", async () => {
  const [canonical, lowered, uppered] = await Promise.all([
    htmlFor("/work?domain=Commerce"),
    htmlFor("/work?domain=commerce"),
    htmlFor("/work?state=Live"),
  ]);

  const expected = recordCount(canonical, WORK_RECORDS);
  assert.ok(expected > 0, "the canonical-cased URL should return records");
  assert.equal(
    recordCount(lowered, WORK_RECORDS),
    expected,
    "?domain=commerce should match ?domain=Commerce",
  );

  const liveLower = await htmlFor("/work?state=live");
  assert.equal(
    recordCount(uppered, WORK_RECORDS),
    recordCount(liveLower, WORK_RECORDS),
    "?state=Live should match ?state=live",
  );
});

test("F1 — the IA contract's own documented filter URLs return records", async () => {
  // IA-NAVIGATION.md lines 267-271 publish these as the illustration of
  // URL-backed filtering. Every one must return a non-empty collection.
  for (const url of [
    "/work?q=capture",
    "/work?domain=volleyball",
    "/work?state=building",
    "/work?form=app",
    "/work?domain=developer%20tools&state=maintained",
  ]) {
    const html = await htmlFor(url);
    assert.ok(
      recordCount(html, WORK_RECORDS) > 0,
      `${url} is documented in the IA contract and must return records`,
    );
  }
});

test("every collection explains an empty result set", async () => {
  // Lock the reader-facing behavior, not an implementation term. Each
  // collection names the thing that failed to match and points back to the
  // filters the visitor can change.
  const EXPLAINS_EMPTY = /No [^<.]{1,40}match(es)? these filters/i;
  const [work, demos, blog] = await Promise.all([
    htmlFor("/work?q=zzz-no-such-record"),
    htmlFor("/demos?q=zzz-no-such-demo"),
    htmlFor("/blog?q=zzz-no-such-piece"),
  ]);
  assert.match(work, EXPLAINS_EMPTY, "/work must say when nothing matched");
  assert.match(demos, EXPLAINS_EMPTY, "/demos must say when nothing matched");
  assert.match(blog, EXPLAINS_EMPTY, "/blog must say when nothing matched");
});

test("F15a — every filter option maps to at least one record", async () => {
  const source = await readFile(
    new URL("../app/data.ts", import.meta.url),
    "utf8",
  );
  const held = (key) =>
    new Set(
      [...source.matchAll(new RegExp(`${key}: "([^"]+)"`, "g"))].map(
        (m) => m[1],
      ),
    );
  const forms = held("form");
  const states = held("state");
  const domains = held("domain");

  const html = await htmlFor("/work");
  const offered = new Set(
    [...html.matchAll(/<option value="([^"]+)"/g)].map((m) =>
      m[1].replaceAll("&amp;", "&"),
    ),
  );

  const orphans = [...offered].filter(
    (value) => !forms.has(value) && !states.has(value) && !domains.has(value),
  );
  assert.deepEqual(
    orphans,
    [],
    "these filter options match no record in the registry",
  );
});

test("F3 — every detail route sets its own title", async () => {
  const home = await htmlFor("/");
  const homeTitle = home.match(/<title>([^<]*)<\/title>/)?.[1];
  assert.ok(homeTitle, "the homepage should have a title");

  for (const path of [
    "/work/rally-hq",
    "/work/browse-tool",
    "/demos/twelve-messages",
    "/demos/applied/config-probe",
  ]) {
    const html = await htmlFor(path);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    assert.ok(title, `${path} should have a title`);
    assert.notEqual(
      title,
      homeTitle,
      `${path} must not reuse the homepage title (WCAG 2.4.2, Level A)`,
    );
  }
});

test("F4 and F4c — a session route contains the complete native story it promises", async () => {
  const html = await htmlFor("/demos/twelve-messages");
  assert.match(html, /id="story-session-twelve-messages"/);
  assert.match(html, /Every message, verbatim/);
  assert.match(html, /Five things that make this repeatable/);
  assert.match(html, /What actually runs/);
  assert.match(html, /Two failures worth more than the demo/);
  assert.doesNotMatch(html, /<iframe\b/i);
  assert.doesNotMatch(html, /class="demo-source-frame"/);
});

test("F4a — no rendered demo image points at the retired 403 origin", async () => {
  // The current publisher is nc-demos.pages.dev. The retired Demos subdomain
  // will become a route-preserving redirect at launch and must not remain an
  // image origin.
  for (const path of ["/demos/twelve-messages", "/demos/browse-tool", "/demos"]) {
    const html = await htmlFor(path);
    assert.doesNotMatch(
      html,
      /<img[^>]*src="https:\/\/demos\.ninochavez\.co/i,
      `${path} renders an image from the retired 403 origin`,
    );
  }
});

test("F4a — applied techniques open into their complete visual stories", async () => {
  const html = await htmlFor("/demos/applied/two-ways");
  assert.match(html, /id="story-technique-two-ways"/);
  assert.match(html, /<svg id="mmd-arch"/);
  assert.match(html, /Audience &times; change-rate/);
  assert.doesNotMatch(html, /<iframe\b/i);
});

test("F4b — every detail route names its maker", async () => {
  for (const path of [
    "/work/rally-hq",
    "/demos/twelve-messages",
    "/demos/applied/two-ways",
  ]) {
    const html = await htmlFor(path);
    assert.match(
      html,
      /(?:Created and (?:maintained|presented|documented) by )?Nino Chavez/i,
      `${path} must identify the person responsible for the record`,
    );
  }
});

test("F6 — an unknown route renders the site shell", async () => {
  const response = await render("/no-such-route-anywhere");
  assert.equal(response.status, 404);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
    "a 404 must be HTML, not text/plain",
  );
  const html = await response.text();
  assert.match(html, /<title>Page not found — Nino Chavez<\/title>/);
  assert.match(html, /<main/, "a 404 must carry the shell");
  assert.match(html, /href="\/work"/, "a 404 must offer a way back");
});

test("F7 WITHDRAWN — writing links must stay absolute", async () => {
  // The audit filed the /blog list's 297 absolute https://ninochavez.co links as
  // a defect. It is not one. This app has no article routes — only /blog itself.
  // /blog/the-taste-gap returns 404 here; the articles are served by a separate
  // property at the apex. Making those links relative would 404 all 281 pieces.
  //
  // The main suite already asserted this and caught the mistaken "fix" on the
  // first run. Kept as a test so the finding cannot be re-litigated from the
  // ledger alone.
  const response = await render("/blog/the-taste-gap");
  assert.equal(
    response.status,
    404,
    "if this app starts serving articles, revisit whether links should be relative",
  );

  const html = await htmlFor("/blog");
  assert.match(
    html,
    /href="https:\/\/ninochavez\.co\/blog\//,
    "article links must remain absolute — this app does not serve them",
  );
});

// ---------------------------------------------------------------------------
// C* — production copy pass, docs/audit/FINDINGS-copy-2026-08-01.md
//
// These five cases assert the post-fix behavior. They were written as `todo`
// because the copy pass reported and did not fix, per the audit plan's role
// rule — so the debt stayed visible in the suite output instead of living only
// in a document.
//
// C8, C11, and C12 were remediated by bd20957 and are now live gates. C10 and
// C14 remain `todo`. Drop the flag as each is fixed; a case that passes while
// still marked todo is reported by node:test, so the flag cannot go stale
// silently — which is how the three above were caught.
// ---------------------------------------------------------------------------

// Model and process names that belong in this repo's contracts and in app/
// identifiers, never in text a visitor reads. See
// OPEN-PRACTICE-ART-DIRECTION.md §Copy and naming.
//
// `reader-contract.json` `denyTerms` is the source of record for this list.
// The full five-term list is safe to enforce against visible text because
// visibleText() strips scripts, styles, and tags — identifiers and the flight
// payload can no longer false-positive (the 2026-08-04 copy screen confirmed
// "registry" and "snapshot" reach rendered copy nowhere). Notably absent:
// "prototype", which appears only as the `prototype-banner` class name, and
// "artifact", which /learn uses as a visitor-facing field label (see C22).
const INTERNAL_VOCABULARY = [
  "work object",
  "durable page",
  "review build",
  "registry",
  "snapshot",
];

// Visible text only. Class names, data attributes, and the RSC flight payload
// are not copy, and matching them produces a gate that fails for reasons
// unrelated to its finding — which would survive the remediation it is meant to
// verify. This test caught exactly that on its first run.
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ");
}

test(
  "C8 — no internal vocabulary reaches visitor-facing copy",
  async () => {
    for (const path of [
      "/",
      "/work",
      "/search",
      "/now",
      "/demos",
      "/learn",
      "/about",
      "/links",
      "/photography",
      "/work/ways-of-working",
      "/learn/architect",
      "/demos/browse-tool",
    ]) {
      const text = visibleText(await htmlFor(path));
      for (const term of INTERNAL_VOCABULARY) {
        assert.doesNotMatch(
          text,
          new RegExp(term, "i"),
          `${path} renders the internal term "${term}" to visitors`,
        );
      }
    }
  },
);

test(
  "C12 — every rendered record count agrees with its own noun",
  async () => {
    // The homepage and /work both render per-domain counts. /work pluralizes
    // correctly; the homepage does not. Assert the invariant on both so the fix
    // cannot regress on one page while the other stays right.
    for (const path of ["/", "/work"]) {
      const html = await htmlFor(path);
      const text = visibleText(html);
      for (const [match, n, noun] of text.matchAll(
        /\b(\d+)\s+(records?)\b/gi,
      )) {
        const expected = Number(n) === 1 ? "record" : "records";
        assert.equal(
          noun.toLowerCase(),
          expected,
          `${path} renders "${match.trim()}" — ${n} takes "${expected}"`,
        );
      }
    }
  },
);

test(
  "C10 — quantities are not rendered as zero-padded ordinals",
  async () => {
    // Sequence positions may be padded (`01 / 06`). Quantities may not — a
    // padded count is indistinguishable from a position in the same visual
    // family. AD §Copy.
    const text = visibleText(await htmlFor("/"));
    const COUNT_LABELS =
      /\b0\d\s+(Operating sessions|Applied techniques|Learning paths|records?|sessions|techniques|paths)\b/i;
    assert.doesNotMatch(
      text,
      COUNT_LABELS,
      "a quantity on / is zero-padded, which reads as a sequence position",
    );
  },
);

test(
  "C11 — record badges follow the order the records are displayed in",
  async () => {
    // WorkLibrary assigns each badge from the record's position in the full
    // registry, then renders groups sorted by date. The two orders agree only
    // until records are added. A badge that disagrees with its own list carries
    // no information the visitor can use. AD §Copy.
    const html = await htmlFor("/work");
    const groups = html.match(
      /class="library-group"[\s\S]*?(?=class="library-group"|<\/main)/g,
    );
    assert.ok(groups?.length, "/work should render domain groups");

    for (const group of groups) {
      const heading = group.match(/<h2[^>]*>([^<]+)<\/h2>/)?.[1] ?? "unknown";
      const badges = [
        ...group.matchAll(/class="record-number"[^>]*>\s*(\d+)\s*</g),
      ].map((m) => Number(m[1]));
      const ascending = [...badges].sort((a, b) => a - b);
      assert.deepEqual(
        badges,
        ascending,
        `${heading}: badges ${badges.join(", ")} do not follow display order`,
      );
    }
  },
);

test(
  "C14 — every work status is explained where visitors first meet it",
  async () => {
    const [workHtml, detailHtml, searchHtml] = await Promise.all([
      htmlFor("/work"),
      htmlFor("/work/blueprint"),
      htmlFor("/search?q=blueprint"),
    ]);
    const renderedGlosses = [
      "Live — available to use now",
      "Maintained — public and kept current",
      "Published — available to read",
      "In development — not yet released",
    ];
    for (const gloss of renderedGlosses) {
      assert.match(
        visibleText(workHtml),
        new RegExp(gloss),
        `the Work filter does not explain “${gloss.split(" — ")[0]}”`,
      );
    }
    const dataSource = await readFile(
      new URL("../app/data.ts", import.meta.url),
      "utf8",
    );
    assert.match(dataSource, /paused:\s*"not actively developed"/);
    assert.match(visibleText(detailHtml), /Maintained — public and kept current/);
    assert.match(visibleText(searchHtml), /Maintained — public and kept current/);
  },
);

test("C23 — the photography story lives on the section landing", async () => {
  const text = visibleText(await htmlFor("/photography"));
  assert.match(text, /Started courtside\. Never left\./);
  assert.match(text, /What started as a way to capture my own kid(?:'|&#x27;)s volleyball games/);
  assert.match(text, /I look for the moments players will want back/);
});

test("C24 — photography archive entrances stay on the apex in the same tab", async () => {
  const html = (await htmlFor("/photography")).split('<script id="_R_">')[0];
  assert.doesNotMatch(html, /photography\.ninochavez\.co/);
  assert.match(html, /action="\/photography\/explore"/);
  for (const route of ["explore", "albums", "timeline", "collections", "favorites"]) {
    assert.match(html, new RegExp(`href="/photography/${route}`));
    assert.doesNotMatch(
      html,
      new RegExp(`<a(?=[^>]*href="/photography/${route})(?=[^>]*target="_blank")`, "i"),
    );
  }
});

test("C25 — the canonical privacy policy carries the youth tag consent gate", async () => {
  const text = visibleText(await htmlFor("/privacy"));
  assert.match(text, /submit an athlete tag/);
  assert.match(text, /athlete(?:'|&#x27;)s permission/);
  assert.match(text, /under 18/);
  assert.match(text, /parent or legal guardian/);
});

test("C26 — photography scale is read from the publisher-owned stats endpoint", async () => {
  assert.equal(
    PHOTOGRAPHY_STATS_ENDPOINT,
    "https://nino-chavez-photography.pages.dev/photography/api/ai/stats",
  );
  const stats = await getPhotographyArchiveStats(async (url) => {
    assert.equal(url, PHOTOGRAPHY_STATS_ENDPOINT);
    return new Response(
      JSON.stringify({
        total_photos: 20655,
        total_videos: 481,
        total_albums: 251,
      }),
      { headers: { "content-type": "application/json" } },
    );
  });
  assert.deepEqual(stats, {
    totalPhotos: 20655,
    totalVideos: 481,
    totalAlbums: 251,
  });

  const source = await readFile(
    new URL("../app/photography/page.tsx", import.meta.url),
    "utf8",
  );
  assert.match(source, /await getPhotographyArchiveStats\(\)/);
  assert.match(source, /stats\.totalPhotos/);
  assert.match(source, /stats\.totalVideos/);
  assert.match(source, /stats\.totalAlbums/);
});

test("photography recent events are read from the publisher-owned catalogue", async () => {
  assert.equal(
    PHOTOGRAPHY_RECENT_ALBUMS_ENDPOINT,
    "https://nino-chavez-photography.pages.dev/photography/api/ai/albums?limit=4&sort=date",
  );
  const albums = await getRecentPhotographyAlbums(async (url) => {
    assert.equal(url, PHOTOGRAPHY_RECENT_ALBUMS_ENDPOINT);
    return new Response(
      JSON.stringify({
        albums: [
          {
            key: "abc123",
            name: "Chicago Open",
            url: "https://ninochavez.co/photography/albums/chicago-open-abc123",
            photo_count: 267,
            video_count: 4,
            cover_image: "https://imagedelivery.net/example/cover/public",
            date_range: { start: "2026-07-25", end: "2026-07-25" },
          },
        ],
      }),
      { headers: { "content-type": "application/json" } },
    );
  });

  assert.deepEqual(albums, [
    {
      key: "abc123",
      name: "Chicago Open",
      href: "/photography/albums/chicago-open-abc123",
      photoCount: 267,
      videoCount: 4,
      coverImage: "https://imagedelivery.net/example/cover/public",
      latestDate: "2026-07-25",
    },
  ]);
});

test("C29 — the photography landing publishes its canonical URL", async () => {
  const html = await htmlFor("/photography");
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/ninochavez\.co\/photography"/,
  );
});

test("C30 — Photography is a top-level global navigation item", async () => {
  const html = await htmlFor("/photography");
  const primary = html.match(
    /<nav class="desktop-navigation"[\s\S]*?<\/nav>/,
  )?.[0];
  assert.ok(primary, "primary navigation should render");
  assert.match(primary, /Work[\s\S]*Sessions[\s\S]*Learn[\s\S]*Writing[\s\S]*Photography[\s\S]*About/);
  assert.match(primary, /href="\/photography" aria-current="page"/);
});

test("F8 — the homepage body offers entrances to Learn and About", async () => {
  const html = await htmlFor("/");
  // Strip the site header and footer — the chrome that appears on every route.
  // What remains is the homepage's own content. Chrome navigation does not
  // satisfy the IA contract's requirement that the homepage provide entrances to
  // every top-level route. Content `<nav>` elements inside the page body (the
  // domain index, the Ways of Working routes) are page content and do count.
  const body = html
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "");
  assert.match(body, /href="\/learn"/, "the homepage body must enter Learn");
  assert.match(body, /href="\/about"/, "the homepage body must enter About");
});
