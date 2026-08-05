import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);
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
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return (await response.text()).replaceAll("<!-- -->", "");
}

test("server-renders the personal entrance and global navigation", async () => {
  const response = await render("/");
  const html = (await response.text()).replaceAll("<!-- -->", "");

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    response.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );

  assert.match(html, /Nino Chavez — Product architect and builder/);
  assert.match(html, /<span>Nino <\/span><span>Chavez<\/span>/);
  assert.match(html, /Product architect and builder in Chicago/);
  assert.match(
    html,
    /I design products, build the software behind them, and run them in the real world./,
  );
  assert.doesNotMatch(html, /Current working set/);
  assert.match(html, /From the photography archive/);
  assert.match(html, /Building since 1999/);
  assert.match(html, /See selected work/);
  assert.match(html, /About me/);
  assert.match(html, /On the court/);
  assert.match(html, /Selected work/);
  assert.match(html, /Four places to start/);
  assert.match(html, /Read about Blueprint/);
  assert.match(html, /Read Signal Dispatch/);
  assert.match(html, /Browse photography/);
  assert.match(html, /Explore the full body of work/);
  assert.match(html, /Signal Dispatch/);
  assert.match(html, /How the work gets done/);
  assert.match(html, /Ways of Working · Session 02/);
  assert.match(html, /Explore all work/);
  assert.match(html, /Full sessions/);
  assert.match(html, /Techniques/);
  assert.match(html, /href="\/work"/);
  assert.match(html, /href="\/demos"/);
  assert.match(html, /href="\/learn"/);
  assert.match(html, /href="\/blog"/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/search"/);
  assert.match(html, /mailto:nino@ninochavez\.co/);
});

test("preserves the canonical entity endpoints and generated root sitemap", async () => {
  const [person, expertise, experience, contact, sitemap] = await Promise.all([
    render("/api/person.json"),
    render("/api/expertise.json"),
    render("/api/experience.json"),
    render("/api/contact.json"),
    render("/sitemap.xml"),
  ]);

  for (const response of [person, expertise, experience, contact]) {
    assert.equal(response.status, 200);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^application\/ld\+json/i,
    );
    assert.equal(response.headers.get("access-control-allow-origin"), "*");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
  }

  const personData = await person.json();
  const expertiseData = await expertise.json();
  const experienceData = await experience.json();
  const contactData = await contact.json();
  assert.equal(personData.name, "Nino Chavez");
  assert.equal(expertiseData.about.name, "Nino Chavez");
  assert.equal(experienceData.about.name, "Nino Chavez");
  assert.equal(contactData.email, "nino@ninochavez.co");

  assert.equal(sitemap.status, 200);
  assert.match(
    sitemap.headers.get("content-type") ?? "",
    /^application\/xml/i,
  );
  const sitemapXml = await sitemap.text();
  assert.equal((sitemapXml.match(/<url>/g) ?? []).length, 60);
  assert.match(sitemapXml, /https:\/\/ninochavez\.co\/work\/film-room/);
  assert.doesNotMatch(sitemapXml, /\/work\/whitepapers/);
  assert.doesNotMatch(sitemapXml, /\/work\/presentations/);
  assert.match(sitemapXml, /https:\/\/ninochavez\.co\/demos\/browse-tool/);
  assert.match(sitemapXml, /https:\/\/ninochavez\.co\/learn\/enterprise/);
  assert.doesNotMatch(sitemapXml, /\/api\//);
});

test("renders the full-volume work and demos collections", async () => {
  const demoSnapshot = JSON.parse(
    await readFile(
      new URL("../app/demo-data.json", import.meta.url),
      "utf8",
    ),
  );
  const sessionCount = demoSnapshot.sessions.length;
  const techniqueCount = demoSnapshot.techniques.length;
  const [
    workHtml,
    filteredWorkHtml,
    emptyWorkHtml,
    demosHtml,
    filteredDemosHtml,
    emptyDemosHtml,
  ] = await Promise.all([
    htmlFor("/work"),
    htmlFor("/work?domain=Writing&state=live"),
    htmlFor("/work?q=no-such-work"),
    htmlFor("/demos"),
    htmlFor("/demos?type=technique"),
    htmlFor("/demos?q=no-such-demo"),
  ]);

  assert.match(workHtml, /Projects, tools, and collections/);
  assert.match(workHtml, /<h1>Work<\/h1>/);
  assert.match(workHtml, /Browse all 26 items/);
  assert.equal(
    (workHtml.split('<script id="_R_">')[0].match(/ in this domain/g) ?? [])
      .length,
    6,
  );
  assert.match(workHtml, /Status says what is available today/);
  assert.match(workHtml, /26<\/strong> shown/);
  assert.doesNotMatch(workHtml, /Nothing selected/);
  assert.doesNotMatch(workHtml, /objects in view/);
  assert.match(workHtml, /Blueprint/);
  assert.match(workHtml, /Rally HQ/);
  assert.match(workHtml, /Commerce architecture/);
  assert.match(workHtml, /published/);
  assert.match(workHtml, /experience/);
  assert.match(workHtml, /maintained/);
  assert.match(workHtml, /28 Jul/);
  const filteredDocument = filteredWorkHtml.split('<script id="_R_">')[0];
  assert.match(filteredDocument, /2 active filters/);
  assert.match(filteredDocument, /Signal Dispatch/);
  assert.doesNotMatch(filteredDocument, /Blueprint/);
  assert.match(emptyWorkHtml, /No work matches these filters/);
  assert.match(emptyWorkHtml, /query “no-such-work”/);
  assert.match(emptyWorkHtml, /Search the whole site for “no-such-work”/);

  assert.match(demosHtml, /How the work gets done/);
  assert.match(demosHtml, /<h1>Sessions<\/h1>/);
  // The page may render from the live index, which can run ahead of the
  // bundled snapshot while a new record is mid-publish. Assert the rendered
  // counts are internally consistent and never behind the bundle.
  const heroCounts = Object.fromEntries(
    [...demosHtml.matchAll(
      /<strong>(\d+)<\/strong><span>(Sessions|Techniques)<\/span>/g,
    )].map((m) => [m[2], Number(m[1])]),
  );
  assert.ok(heroCounts.Sessions >= sessionCount);
  assert.ok(heroCounts.Techniques >= techniqueCount);
  assert.match(demosHtml, /See the work as it happened/);
  assert.match(demosHtml, /Reuse a tested technique/);
  assert.match(
    demosHtml,
    new RegExp(
      `${heroCounts.Sessions + heroCounts.Techniques}<\\/strong> sessions and techniques in view`,
    ),
  );
  assert.match(demosHtml, /Full sessions/);
  assert.match(demosHtml, /Techniques/);
  assert.match(demosHtml, /S01/);
  assert.match(
    demosHtml,
    new RegExp(`A${String(techniqueCount).padStart(2, "0")}`),
  );
  assert.match(demosHtml, /S01[\s\S]*Twelve Messages/);
  assert.match(demosHtml, /A01[\s\S]*Two Ways to Draw a System/);
  assert.match(demosHtml, /The Sycophancy Was in the Config/);
  assert.match(demosHtml, /One Component I Didn&#x27;t Already Have/);
  assert.match(demosHtml, /Run the Subtraction Before You Install/);
  assert.match(demosHtml, /Two Ways to Draw a System/);
  assert.match(demosHtml, /href="\/demos\/config-probe"/);
  assert.match(demosHtml, /href="\/demos\/applied\/config-probe"/);
  assert.match(demosHtml, /href="\/demos\/adopt-or-skip"/);
  assert.match(demosHtml, /href="\/demos\/applied\/adopt-or-skip"/);
  assert.doesNotMatch(demosHtml, /Three sessions, shown in their own form/);
  assert.doesNotMatch(
    demosHtml,
    /href="https:\/\/demos\.ninochavez\.co/,
  );

  const filteredDemosDocument = filteredDemosHtml.split(
    '<script id="_R_">',
  )[0];
  assert.match(
    filteredDemosDocument,
    new RegExp(
      `${heroCounts.Techniques}<\\/strong> of <strong>${heroCounts.Sessions + heroCounts.Techniques}`,
    ),
  );
  assert.match(filteredDemosDocument, /1 active filter/);
  assert.match(filteredDemosDocument, /Two Ways to Draw a System/);
  assert.doesNotMatch(
    filteredDemosDocument,
    /The Sycophancy Was in the Config/,
  );
  assert.match(
    emptyDemosHtml,
    /No sessions or techniques match these filters/,
  );
  assert.match(emptyDemosHtml, /query “no-such-demo”/);
  assert.match(emptyDemosHtml, /Search the whole site for “no-such-demo”/);
});

test("keeps the complete demo corpus available as native stories", async () => {
  const [index, stories] = await Promise.all([
    readFile(new URL("../app/demo-data.json", import.meta.url), "utf8").then(
      JSON.parse,
    ),
    readFile(
      new URL("../app/demo-stories.json", import.meta.url),
      "utf8",
    ).then(JSON.parse),
  ]);

  assert.equal(stories.schemaVersion, 1);
  assert.equal(stories.sessionCount, index.sessionCount);
  assert.equal(stories.techniqueCount, index.techniqueCount);
  assert.deepEqual(
    stories.sessions.map((story) => story.slug),
    index.sessions.map((entry) => entry.slug),
  );
  assert.deepEqual(
    stories.techniques.map((story) => story.slug),
    index.techniques.map((entry) => entry.slug),
  );
  assert.equal(
    [...stories.sessions, ...stories.techniques].reduce(
      (total, story) => total + story.sectionCount,
      0,
    ),
    172,
  );

  for (const story of [...stories.sessions, ...stories.techniques]) {
    assert.match(story.sourceHash, /^[a-f0-9]{64}$/);
    assert.match(story.sourceRevision, /^[a-f0-9]{40}$/);
    assert.equal(story.sectionCount, story.sections.length);
    assert.equal(
      new Set(story.sections.map((section) => section.id)).size,
      story.sections.length,
      `${story.kind}/${story.slug} should have unique chapter IDs`,
    );
    assert.ok(story.style.includes(".slide"));
    assert.ok(
      story.sections.every((section) => !/<script\b/i.test(section.html)),
      `${story.kind}/${story.slug} should not ship executable source markup`,
    );
  }
});

test("server-renders every session and applied technique as a native route", async () => {
  const index = JSON.parse(
    await readFile(
      new URL("../app/demo-data.json", import.meta.url),
      "utf8",
    ),
  );
  const routes = [
    ...index.sessions.map((entry) => ({
      entry,
      path: `/demos/${entry.slug}`,
      storyKey: `session-${entry.slug}`,
    })),
    ...index.techniques.map((entry) => ({
      entry,
      path: `/demos/applied/${entry.slug}`,
      storyKey: `technique-${entry.slug}`,
    })),
  ];

  await Promise.all(
    routes.map(async ({ entry, path, storyKey }) => {
      const html = await htmlFor(path);
      assert.ok(
        html.includes(`<title>${entry.title} — Nino Chavez`) ||
          html.includes(
            `<title>${entry.title.replaceAll("'", "&#x27;")} — Nino Chavez`,
          ),
        `${path} should use the story title in metadata`,
      );
      assert.match(html, new RegExp(`id="story-${storyKey}"`));
      assert.match(html, /Scroll to read/);
      assert.match(html, /Skip to the record/);
      assert.doesNotMatch(html, /<iframe\b/i);
      assert.doesNotMatch(html, /class="demo-source-frame"/);
    }),
  );
});

test("preserves late chapters, diagrams, and rewritten internal demo links", async () => {
  const [sessionHtml, techniqueHtml] = await Promise.all([
    htmlFor("/demos/agentic-gates"),
    htmlFor("/demos/applied/two-ways"),
  ]);

  assert.equal(
    (
      sessionHtml.match(
        /id="story-session-agentic-gates-s\d+"/g,
      ) ?? []
    ).length,
    9,
  );
  assert.match(sessionHtml, /Make artifacts declare themselves/);
  assert.match(sessionHtml, /Gates lag failures, by definition/);
  assert.match(sessionHtml, /href="\/demos\/said-it-checked"/);

  assert.equal(
    (
      techniqueHtml.match(
        /id="story-technique-two-ways-s\d+"/g,
      ) ?? []
    ).length,
    8,
  );
  assert.match(techniqueHtml, /<svg id="mmd-arch"/);
  assert.match(techniqueHtml, /Audience &times; change-rate/);
  assert.match(techniqueHtml, /href="\/demos\/browse-tool"/);
  assert.doesNotMatch(techniqueHtml, /<iframe\b/i);
});

test("renders seven grounded learning paths without positional placeholders", async () => {
  const learnHtml = await htmlFor("/learn");

  assert.match(learnHtml, /Learn \/ guided paths/);
  assert.match(learnHtml, /aria-label="Start with what you need to make\."/);
  assert.match(learnHtml, /Explorer/);
  assert.match(learnHtml, /Enterprise/);
  assert.doesNotMatch(learnHtml, /L0[1-7]/);
  assert.match(learnHtml, /Personal cognitive mirror and bridge to creation/);
  assert.match(learnHtml, /Reusable team skill with quality gates/);
  assert.doesNotMatch(learnHtml, /This seven-way fork belongs here/);

  for (const slug of [
    "explorer",
    "builder",
    "architect",
    "strategist",
    "author",
    "voice",
    "enterprise",
  ]) {
    const html = await htmlFor(`/learn/${slug}`);
    assert.match(html, /See the work behind the path/);
    assert.match(html, /Know whether this is your path/);
    assert.match(html, /5(?:<!-- -->)?\s*stages to the finished work/);
    assert.equal(
      (html.match(/class="learn-level-title"/g) ?? []).length,
      5,
      `${slug} should render five stages`,
    );
    assert.doesNotMatch(html, /Relationship slots|prototype.{0,20}sample/i);
  }

  const builderHtml = await htmlFor("/learn/builder");
  assert.match(builderHtml, /href="\/work\/rally-hq"/);
  assert.match(builderHtml, /href="\/demos\/browse-tool"/);
  assert.match(
    builderHtml,
    /href="\/blog#the-scaffolding-the-agent-doesnt-build"/,
  );
  assert.match(builderHtml, /Deployed production application/);
  assert.doesNotMatch(builderHtml, /create-specchain|Ask BC/);

  const enterpriseHtml = await htmlFor("/learn/enterprise");
  assert.match(
    enterpriseHtml,
    /href="https:\/\/github\.com\/nino-chavez\/ai-champions-kit"[^>]*target="_blank"/,
  );
  assert.doesNotMatch(enterpriseHtml, /href="\/work\/ai-champions-kit"/);

  const source = await readFile(
    new URL("../app/learn/[track]/page.tsx", import.meta.url),
    "utf8",
  );
  assert.doesNotMatch(source, /index\s*%\s*\w+\.length/);
});

test("renders the complete Signal Dispatch publication and real article handoffs", async () => {
  const writingSnapshot = JSON.parse(
    await readFile(
      new URL("../app/writing-data.json", import.meta.url),
      "utf8",
    ),
  );
  const [writingHtml, whitepapersHtml, emptyHtml, searchHtml] =
    await Promise.all([
      htmlFor("/blog"),
      htmlFor("/blog?type=Whitepaper"),
      htmlFor("/blog?q=no-such-writing"),
      htmlFor("/search?q=Scaffolding"),
    ]);

  assert.match(writingHtml, /Writing \/ Signal Dispatch/);
  assert.match(writingHtml, /<h1>Signal <em>Dispatch<\/em><\/h1>/);
  assert.match(
    writingHtml,
    new RegExp(
      `${writingSnapshot.publicPieceCount}<\\/strong> published pieces in view`,
    ),
  );
  assert.doesNotMatch(writingHtml, /class="record-number"/);
  assert.match(writingHtml, /Nothing Broke\. It Just Wasn&#x27;t There\./);
  assert.match(writingHtml, /One Component I Didn&#x27;t Already Have/);
  assert.match(writingHtml, /Every Link Resolves\. Nothing Checks the Number\./);
  assert.match(writingHtml, /The Taste Gap/);
  assert.match(
    writingHtml,
    new RegExp(`${writingSnapshot.series.length} authored sequences`),
  );
  assert.match(writingHtml, /The Taste Test/);
  assert.match(writingHtml, /href="https:\/\/ninochavez\.co\/blog\/the-taste-gap"/);
  assert.match(writingHtml, /href="https:\/\/ninochavez\.co\/blog\/series\/the-taste-test"/);
  assert.doesNotMatch(writingHtml, /Representative content/);
  assert.doesNotMatch(writingHtml, /Shared shell test/);
  assert.doesNotMatch(writingHtml, /240\+/);
  assert.doesNotMatch(writingHtml, /may remain a separate application/);

  assert.match(
    whitepapersHtml,
    new RegExp(
      `${writingSnapshot.kindCounts.Whitepaper}<\\/strong> of <strong>${writingSnapshot.publicPieceCount}`,
    ),
  );
  assert.match(whitepapersHtml, /1 active filter/);
  assert.match(whitepapersHtml, /Lie-Surface/);
  assert.doesNotMatch(
    whitepapersHtml,
    /Nothing Broke\. It Just Wasn&#x27;t There\./,
  );

  assert.match(emptyHtml, /No published pieces match these filters/);
  assert.match(emptyHtml, /query “no-such-writing”/);
  assert.match(emptyHtml, /Search the whole site for “no-such-writing”/);

  assert.match(searchHtml, /The Scaffolding the Agent Doesn&#x27;t Build/);
  assert.match(
    searchHtml,
    /href="https:\/\/ninochavez\.co\/blog\/the-scaffolding-the-agent-doesnt-build"/,
  );
  assert.match(searchHtml, /Essay · Reflection · 2026/);

  assert.equal(
    Object.values(writingSnapshot.kindCounts).reduce(
      (total, count) => total + count,
      0,
    ),
    writingSnapshot.publicPieceCount,
  );
  assert.ok(
    writingSnapshot.items.some((item) => item.slug === "the-taste-gap"),
  );
  assert.ok(
    writingSnapshot.items.some(
      (item) => item.slug === "one-component-i-didnt-already-have",
    ),
  );
  assert.ok(
    writingSnapshot.items.some(
      (item) => item.slug === "every-link-resolves-nothing-checks-the-number",
    ),
  );
  assert.ok(
    writingSnapshot.items.some(
      (item) => item.slug === "grade-an-agent-tool-before-you-install-it",
    ),
  );
  assert.ok(
    writingSnapshot.items.some((item) => item.slug === "claim-classes"),
  );
  assert.ok(
    !writingSnapshot.items.some(
      (item) => item.slug === "the-muscle-memory-of-expensive-things",
    ),
  );
});

test("renders About as a personal profile instead of a services or route-design page", async () => {
  const [aboutHtml, searchHtml] = await Promise.all([
    htmlFor("/about"),
    htmlFor("/search?q=commerce.com"),
  ]);

  assert.match(aboutHtml, /About Nino Chavez/);
  assert.match(
    aboutHtml,
    /<h1 aria-label="Nino Chavez"><span aria-hidden="true">Nino<\/span><span aria-hidden="true">Chavez<\/span><\/h1>/,
  );
  assert.match(aboutHtml, /more than 25 years/);
  assert.match(aboutHtml, /Building since 1999/);
  assert.match(aboutHtml, /Product Architect at commerce\.com/);
  assert.match(aboutHtml, /Let’s Pepper/);
  assert.match(aboutHtml, /Rally HQ/);
  assert.match(aboutHtml, /Flickday Media/);
  assert.match(aboutHtml, /Signal Dispatch/);
  assert.match(aboutHtml, /How I work with agents/);
  assert.match(aboutHtml, /what can be published/);
  assert.match(aboutHtml, /href="\/work\/blueprint"/);
  assert.match(aboutHtml, /href="\/demos"/);
  assert.match(aboutHtml, /href="\/photography"/);
  assert.match(
    aboutHtml,
    /href="https:\/\/soundcloud\.com\/ni-no-cha-vez"/,
  );
  assert.match(aboutHtml, /Where to go next[\s\S]*Now/);
  assert.match(aboutHtml, /href="\/work"[\s\S]*Work/);
  assert.doesNotMatch(aboutHtml, /P0[1-3]/);
  assert.equal(
    (aboutHtml.match(/class="about-section/g) ?? []).length,
    4,
  );
  assert.match(aboutHtml, /type="application\/ld\+json"/);
  assert.match(aboutHtml, /"@type":"Person"/);
  assert.match(aboutHtml, /"jobTitle":"Product Architect"/);
  assert.doesNotMatch(aboutHtml, /Durable biography stays separate/);
  assert.doesNotMatch(aboutHtml, /Human-authorized, agent-executed/);
  assert.doesNotMatch(aboutHtml, /book a call|services/i);

  assert.match(searchHtml, /href="\/about"/);
  assert.match(searchHtml, /<span>Profile<\/span>/);
  assert.match(searchHtml, /About Nino Chavez/);
});

test("ranks and caps broad site searches", async () => {
  const html = (await htmlFor("/search?q=agent")).split('<script id="_R_">')[0];
  const summary = html.match(
    /Showing <strong>(\d+)<\/strong> of <strong>(\d+)<\/strong> matches/,
  );

  assert.ok(summary);
  assert.ok(Number(summary[1]) < Number(summary[2]));
  assert.ok(Number(summary[1]) <= 36);
  assert.match(html, /Agentic Ways of Working/);
});

test("renders Now as current work and Links as direct destinations", async () => {
  const [nowHtml, linksHtml, attributedLinksHtml, invalidSourceHtml, searchHtml] =
    await Promise.all([
      htmlFor("/now"),
      htmlFor("/links"),
      htmlFor("/links?src=ig-photo"),
      htmlFor("/links?src=Not%20Valid"),
      htmlFor("/search?q=Flickday%20Media"),
    ]);

  assert.match(nowHtml, /What I’m working on now/);
  assert.match(nowHtml, /dateTime="2026-07-30">30 July 2026/);
  assert.match(nowHtml, /Four things have my attention/);
  assert.match(nowHtml, /Product architecture at commerce\.com/);
  assert.match(nowHtml, /Maintaining the public site/);
  assert.match(nowHtml, /Making AI-assisted work easier to verify/);
  assert.match(nowHtml, /Running the volleyball products together/);
  assert.doesNotMatch(nowHtml, /N0[1-4]/);
  assert.match(nowHtml, /Blueprint, Film Room/);
  assert.match(nowHtml, /Let’s Pepper events, Rally HQ/);
  assert.match(nowHtml, /Current, not exhaustive/);
  assert.equal(
    (nowHtml.match(/class="now-register__content"/g) ?? []).length,
    4,
  );
  assert.equal(
    (nowHtml.match(/class="now-register__entry"/g) ?? []).length,
    4,
  );
  assert.match(
    nowHtml,
    /href="\/about" class="now-register__entry"[\s\S]*About Nino/,
  );
  assert.doesNotMatch(nowHtml, /second work inventory|professional timeline/i);

  assert.match(linksHtml, /Direct links/);
  assert.match(linksHtml, /11(?:<!-- -->)?\s*destinations/);
  assert.match(linksHtml, /Checked 30 July 2026/);
  assert.match(linksHtml, /Go to the thing itself/);
  assert.match(linksHtml, /Products and ventures/);
  assert.match(linksHtml, /Source and publishing/);
  assert.match(linksHtml, /Images and sound/);
  assert.match(linksHtml, /Direct/);
  assert.match(linksHtml, /Rally HQ/);
  assert.match(linksHtml, /Flickday Media/);
  assert.match(linksHtml, /Signal X Studio/);
  assert.match(linksHtml, /Signal Dispatch/);
  assert.match(
    linksHtml,
    /href="https:\/\/www\.linkedin\.com\/in\/nino-chavez\/"/,
  );
  assert.match(
    linksHtml,
    /href="https:\/\/www\.instagram\.com\/nino\.chavez\.photo\/"/,
  );
  assert.match(linksHtml, /href="\/photography\?src=links"/);
  assert.match(
    attributedLinksHtml,
    /href="\/photography\?src=ig-photo"/,
  );
  assert.match(invalidSourceHtml, /href="\/photography\?src=links"/);
  assert.doesNotMatch(linksHtml, /<span>L(?:0[1-9]|1[01])<\/span>/);
  assert.match(
    linksHtml,
    /href="https:\/\/rallyhq\.app" target="_blank" rel="noopener noreferrer"/,
  );
  assert.doesNotMatch(
    linksHtml,
    /href="mailto:nino@ninochavez\.co"[^>]*target="_blank"/,
  );

  assert.match(searchHtml, /href="\/now"/);
  assert.match(searchHtml, /href="\/links"/);
  assert.match(searchHtml, /Current context/);
  assert.match(searchHtml, /Directory/);
});

test("renders Photography as an owned image collection with live archive paths", async () => {
  const [photographyHtml, attributedHtml, searchHtml] = await Promise.all([
    htmlFor("/photography"),
    htmlFor("/photography?src=ig-photo"),
    htmlFor("/search?q=jersey%20number"),
  ]);
  const photographyDocument = photographyHtml.split('<script id="_R_">')[0];

  assert.match(photographyDocument, /Nino Chavez \/ Photography/);
  assert.match(photographyDocument, /Volleyball and action sports/);
  assert.match(
    photographyDocument,
    /Find the frame you came for/,
  );
  assert.match(
    photographyDocument,
    /action="\/photography\/explore"/,
  );
  assert.match(photographyDocument, /name="src" value="profile"/);
  assert.match(
    attributedHtml,
    /name="src" value="ig-photo"/,
  );
  assert.match(
    attributedHtml,
    /\/photography\/albums\?src=ig-photo/,
  );
  assert.match(photographyDocument, /Events[\s\S]*Browse by date/);
  assert.match(photographyDocument, /Browse by date[\s\S]*Collections/);
  assert.match(photographyDocument, /Collections[\s\S]*Your saved photos/);
  assert.match(photographyDocument, /Find photos in the full archive/);
  assert.doesNotMatch(photographyDocument, /<strong>Search<\/strong>/);
  assert.doesNotMatch(photographyDocument, />P0[1-5]</);
  assert.match(
    photographyDocument,
    /Contact sheet \/ (?:<!-- -->)?12(?:<!-- -->)?\s*frames/,
  );
  assert.equal(
    (photographyDocument.match(/class="photography-frame-grid"/g) ?? [])
      .length,
    1,
  );
  assert.equal(
    (photographyDocument.match(/<figure>/g) ?? []).length,
    12,
  );
  assert.match(photographyDocument, /\/media\/photography\/p-01\.webp/);
  assert.doesNotMatch(
    photographyDocument,
    /\b(?:src|srcset)="\/photography\/[^"]+\.webp/,
  );
  assert.match(
    photographyDocument,
    /https:\/\/ninochavez\.co\/photography\/og\.png/,
  );
  assert.match(
    photographyDocument,
    /rel="canonical" href="https:\/\/ninochavez\.co\/photography"/,
  );
  assert.match(photographyDocument, /Started courtside\. Never left\./);
  for (const route of ["explore", "albums", "timeline", "collections", "favorites"]) {
    assert.doesNotMatch(
      photographyDocument,
      new RegExp(`<a(?=[^>]*href="/photography/${route})(?=[^>]*target="_blank")`, "i"),
    );
  }
  assert.doesNotMatch(photographyDocument, /photography\.ninochavez\.co/);
  assert.doesNotMatch(
    photographyDocument,
    /Image 0|Gallery structure placeholders|separate runtime|shared shell/i,
  );

  assert.match(searchHtml, /href="\/photography"/);
  assert.match(searchHtml, /<span>Collection<\/span>/);
  assert.match(searchHtml, /Photography/);
});

test("renders representative detail, runtime, context, and search routes", async () => {
  for (const path of [
    "/work/blueprint",
    "/work/film-room",
    "/demos/config-probe",
    "/demos/applied/config-probe",
    "/learn",
    "/learn/builder",
    "/blog",
    "/photography",
    "/about",
    "/now",
    "/links",
    "/privacy",
    "/search?q=agent",
    "/search?q=not-a-result",
  ]) {
    await htmlFor(path);
  }
});

test("keeps an unknown route inside the site shell", async () => {
  const response = await render("/route-that-does-not-exist");
  const html = (await response.text()).replaceAll("<!-- -->", "");

  assert.equal(response.status, 404);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /<main\b/);
  assert.match(html, /This path does not resolve/);
  assert.match(html, /href="\/work"/);
  assert.match(html, /href="\/blog"/);
  assert.match(html, /href="\/search"/);
});

test("renders the current privacy policy and makes it globally searchable", async () => {
  const [privacyHtml, searchHtml] = await Promise.all([
    htmlFor("/privacy"),
    htmlFor("/search?q=tracking+cookies"),
  ]);

  assert.match(privacyHtml, /Privacy \/ current policy/);
  assert.match(privacyHtml, /No ads\. No data sales\. No cross-site profiling\./);
  assert.match(privacyHtml, /What the site receives/);
  assert.match(privacyHtml, /What the gallery records/);
  assert.match(privacyHtml, /one-way session identifier/);
  assert.match(privacyHtml, /automatically removed after 90 days/);
  assert.match(privacyHtml, /Search records do not currently expire automatically/);
  assert.match(privacyHtml, /What stays on your device/);
  assert.match(privacyHtml, /People in photographs/);
  assert.match(privacyHtml, /submit an athlete tag/);
  assert.match(privacyHtml, /parent or legal guardian/);
  assert.match(privacyHtml, /nino@ninochavez\.co/);
  assert.match(
    privacyHtml,
    /https:\/\/developers\.cloudflare\.com\/web-analytics\/about\//,
  );
  assert.match(privacyHtml, /https:\/\/supabase\.com\/privacy/);
  assert.doesNotMatch(
    privacyHtml,
    /structural prototype|production policy must cover|Vercel Analytics|Cal\.com/i,
  );
  assert.match(
    privacyHtml,
    /href="https:\/\/supabase\.com\/privacy" target="_blank" rel="noopener noreferrer"/,
  );

  assert.match(searchHtml, /href="\/privacy"/);
  assert.match(searchHtml, /<span>Policy<\/span>/);
  assert.match(searchHtml, /What the public site receives/);
});

test("keeps the global shell and removes route-level review placeholders", async () => {
  for (const path of [
    "/",
    "/work",
    "/demos",
    "/learn",
    "/blog",
    "/photography",
    "/about",
    "/now",
    "/links",
    "/privacy",
  ]) {
    const html = await htmlFor(path);
    assert.match(html, /aria-label="Primary navigation"/);
    assert.match(html, /aria-label="Footer primary navigation"/);
    assert.match(html, /href="\/privacy"/);
    assert.equal(
      (html.split('<script id="_R_">')[0].match(/<main\b/g) ?? []).length,
      1,
      `${path} should expose one main landmark`,
    );
    assert.doesNotMatch(
      html,
      /structural prototype|production policy must cover|gallery structure placeholders|separate runtime|shared shell/i,
      `${path} should not expose implementation or review placeholder copy`,
    );
  }
});

test("representative records show evidence and remove prototype placeholders", async () => {
  const demoSnapshot = JSON.parse(
    await readFile(
      new URL("../app/demo-data.json", import.meta.url),
      "utf8",
    ),
  );
  const [blueprintHtml, waysHtml, demoHtml, guardrailHtml, provenanceHtml] =
    await Promise.all([
      htmlFor("/work/blueprint"),
      htmlFor("/work/ways-of-working"),
      htmlFor("/demos/browse-tool"),
      htmlFor("/demos/applied/guardrails"),
      htmlFor("/demos/applied/provenance"),
    ]);

  assert.match(blueprintHtml, /Project mark/);
  assert.match(blueprintHtml, /\/work\/blueprint\.png/);
  assert.match(
    blueprintHtml,
    /href="https:\/\/blueprint\.ninochavez\.co" target="_blank" rel="noopener noreferrer"/,
  );
  assert.doesNotMatch(
    blueprintHtml,
    /Why this exists|What is available|What this record does not claim|Created and maintained by Nino Chavez/,
  );
  assert.doesNotMatch(blueprintHtml, /This neutral page proves/);
  assert.match(waysHtml, /href="\/demos"/);
  assert.doesNotMatch(waysHtml, /href="\/demos"[^>]*target="_blank"/);

  assert.equal(demoSnapshot.sessions.length, 12);
  assert.match(demoHtml, /Session S02 · 10 chapters/);
  assert.match(demoHtml, /<dt>Record<\/dt><dd>S02<\/dd>/);
  assert.match(demoHtml, /class="native-demo-story"/);
  assert.match(demoHtml, /The browser is[\s\S]*a shell command/);
  assert.match(demoHtml, /Every conversation pays for the manual up front/);
  assert.match(demoHtml, /Audit the tax, then build the verbs/);
  assert.match(demoHtml, /href="\/demos\/twelve-messages"/);
  assert.doesNotMatch(
    demoHtml,
    /<img[^>]*src="https:\/\/demos\.ninochavez\.co/i,
  );
  assert.match(demoHtml, /Who this is for/);
  assert.match(demoHtml, /What the session shows/);
  assert.match(demoHtml, /What to reuse/);
  assert.doesNotMatch(demoHtml, /<iframe\b/i);
  assert.doesNotMatch(demoHtml, /class="demo-source-frame"/);
  assert.doesNotMatch(demoHtml, /Existing deck content lives here/);

  assert.match(guardrailHtml, /class="native-demo-story"/);
  assert.match(guardrailHtml, /Use the lowest enforcement rung that holds/);
  assert.match(guardrailHtml, /Ship every guardrail with an escape hatch/);
  assert.match(guardrailHtml, /href="\/demos\/enforced-forever"/);
  assert.doesNotMatch(guardrailHtml, /<iframe\b/i);
  assert.match(
    provenanceHtml,
    /Distinguish a source you read from a search result about it/,
  );
  assert.match(provenanceHtml, /Prefer an honest downgrade/);
  assert.match(provenanceHtml, /href="\/demos\/four-questions"/);

  const signalHtml = await htmlFor("/work/signal-dispatch");
  assert.match(
    signalHtml,
    /\/work\/signal-dispatch\.webp\?v=372a9501/,
  );
});

test("grounds Work pages in public proof or an explicit private record", async () => {
  const [flickdayHtml, volleyHtml, filmRoomHtml, specchainHtml, commerceHtml] =
    await Promise.all([
      htmlFor("/work/flickday"),
      htmlFor("/work/volleyrx"),
      htmlFor("/work/film-room"),
      htmlFor("/work/specchain"),
      htmlFor("/work/commerce-architecture"),
    ]);

  assert.match(flickdayHtml, /Flickday Media/);
  assert.match(flickdayHtml, /Tournament coverage/);
  assert.ok(flickdayHtml.includes("/work/flickday.jpg"));
  assert.match(
    flickdayHtml,
    new RegExp('href="https://www\\.flickdaymedia\\.com/" target="_blank" rel="noopener noreferrer"'),
  );
  assert.match(
    flickdayHtml,
    /href="https:\/\/github\.com\/nino-chavez\/flickdaymedia"[^>]*target="_blank"/,
  );

  assert.match(volleyHtml, /Professionally organized volleyball tournaments/);
  assert.match(volleyHtml, /Upcoming tournaments/);
  assert.ok(volleyHtml.includes("/work/volleyrx.webp"));
  assert.match(
    volleyHtml,
    new RegExp('href="https://www\\.volleyrx\\.com/" target="_blank" rel="noopener noreferrer"'),
  );

  assert.match(filmRoomHtml, /Private product, public summary/);
  assert.match(filmRoomHtml, /public summary/);
  assert.match(filmRoomHtml, /Review board/);
  assert.match(filmRoomHtml, /Ask about this work/);
  assert.match(specchainHtml, /Public README and source/);
  assert.match(specchainHtml, /Recovery and remediation/);
  assert.match(
    specchainHtml,
    new RegExp('href="https://github\\.com/nino-chavez/specchain" target="_blank" rel="noopener noreferrer"'),
  );
  assert.match(commerceHtml, /25\+ years designing and delivering/);
  assert.match(commerceHtml, /Professional experience/);
  assert.match(commerceHtml, /What this experience covers/);
  assert.match(commerceHtml, /public summary/);
  assert.match(commerceHtml, /\$25M multi-brand transformation/);
  assert.match(commerceHtml, /100\+ person global delivery/);
  assert.match(commerceHtml, /20\+ commerce implementations/);
  assert.match(commerceHtml, /Discuss a commerce problem/);
  assert.doesNotMatch(commerceHtml, /Commerce practice/);
  assert.doesNotMatch(commerceHtml, /publication-safe/);
  assert.doesNotMatch(commerceHtml, /private record/);

  const legacyCommerce = await render("/work/commerce-practice");
  assert.ok([301, 307, 308].includes(legacyCommerce.status));
  assert.equal(
    new URL(legacyCommerce.headers.get("location")).pathname,
    "/work/commerce-architecture",
  );

  const whitepapers = await render("/work/whitepapers");
  assert.ok([301, 307, 308].includes(whitepapers.status));
  const whitepapersLocation = new URL(whitepapers.headers.get("location"));
  assert.equal(
    whitepapersLocation.pathname + whitepapersLocation.search,
    "/blog?type=Whitepaper",
  );

  const presentations = await render("/work/presentations");
  assert.ok([301, 307, 308].includes(presentations.status));
  const presentationsLocation = new URL(presentations.headers.get("location"));
  assert.equal(
    presentationsLocation.pathname + presentationsLocation.search,
    "/blog?type=Presentation",
  );

  const unsupported = await render("/work/cortex");
  assert.equal(unsupported.status, 404);
});

test("opens every external surface in a new tab across the complete route set", async () => {
  const sitemap = await render("/sitemap.xml");
  const sitemapXml = await sitemap.text();
  const paths = [...sitemapXml.matchAll(/<loc>https:\/\/ninochavez\.co([^<]*)<\/loc>/g)]
    .map((match) => match[1] || "/");

  for (const path of paths) {
    const html = await htmlFor(path);
    const externalAnchors =
      html.match(/<a\b[^>]*href="https?:\/\/[^"]+"[^>]*>/g) ?? [];

    for (const anchor of externalAnchors) {
      assert.match(anchor, /target="_blank"/, `${path}: ${anchor}`);
      assert.match(
        anchor,
        /rel="noopener noreferrer"/,
        `${path}: ${anchor}`,
      );
    }
  }
});

test("keeps retired AI routes connected to their canonical destinations", async () => {
  for (const [from, to] of [
    ["/ai", "/"],
    ["/ai/work", "/work"],
    ["/ai/learn", "/learn"],
    ["/ai/learn/builder", "/learn/builder"],
  ]) {
    const response = await render(from);
    assert.ok(
      [301, 307, 308].includes(response.status),
      `${from} should redirect permanently in production`,
    );
    assert.equal(new URL(response.headers.get("location")).pathname, to);
  }
});

test("keeps same-slug demo types distinct in global search", async () => {
  const html = await htmlFor("/search?q=config");
  assert.match(html, /href="\/demos\/config-probe"/);
  assert.match(html, /href="\/demos\/applied\/config-probe"/);
  assert.match(html, /The Sycophancy Was in the Config/);
  assert.match(html, /Bare-Arm Test Your Agent Config/);
});

test("keeps private review and public launch modes explicit", async () => {
  const [layout, css, readme, direction, data, demos, packageJson] =
    await Promise.all([
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
      readFile(new URL("../README.md", import.meta.url), "utf8"),
      readFile(
        new URL("../docs/OPEN-PRACTICE-ART-DIRECTION.md", import.meta.url),
        "utf8",
      ),
      readFile(new URL("../app/data.ts", import.meta.url), "utf8"),
      readFile(new URL("../app/demos.ts", import.meta.url), "utf8"),
      readFile(new URL("../package.json", import.meta.url), "utf8"),
    ]);

  await assert.rejects(
    access(new URL("../app/_sites-preview/SkeletonPreview.tsx", import.meta.url)),
  );
  await assert.rejects(
    access(new URL("../app/_sites-preview/preview.css", import.meta.url)),
  );

  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|Geist/);
  assert.match(layout, /Private art-direction review/);
  assert.match(layout, /production remains unchanged/);
  assert.match(layout, /SITE_VISIBILITY === "public"/);
  assert.match(layout, /index:\s*isPublicLaunch/);
  assert.match(layout, /!isPublicLaunch/);
  assert.match(layout, /summary_large_image/);
  assert.match(layout, /\/og\.png/);
  assert.match(css, /dialog\[open\]/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(
    css,
    /Open Practice functional prototype — personal display voice, normalized/,
  );
  assert.match(css, /Open Practice Hero/);
  assert.match(css, /anton-400\.woff2/);
  assert.match(css, /--hero-tracking:\s*0\.02em/);
  assert.match(css, /--hero-leading-lockup:\s*0\.94/);
  assert.match(css, /--hero-leading-stack:\s*1/);
  // claude-design-system budget: Anton appears only inside photographs, so
  // its rule count stays small and no rule tightens it into display tracking.
  const antonRules =
    css.match(/[^{}]+\{[^{}]*font-family:\s*var\(--hero\);[^{}]*\}/g) ?? [];
  assert.ok(antonRules.length >= 1);
  assert.ok(antonRules.length <= 12);
  for (const rule of antonRules) {
    assert.doesNotMatch(rule, /letter-spacing:\s*-/);
  }
  assert.match(css, /space-mono-latin-400-normal\.woff2/);
  assert.match(css, /space-mono-latin-700-normal\.woff2/);
  assert.match(readme, /Open Practice/);
  assert.match(direction, /working practice, not a brochure/);
  assert.match(direction, /complete, honestly labeled record/);
  assert.match(direction, /Typography status: locked/);
  assert.match(direction, /Anton \/ Inter \/ Space Mono/);
  assert.match(direction, /hero remains responsive HTML and CSS/);
  assert.match(direction, /Action-object contract/);
  assert.match(direction, /one perceived object maps to one behavioral object/);
  assert.doesNotMatch(
    css,
    /\.record-open\s*\{[^}]*display:\s*none/,
  );
  assert.match(data, /export const domains/);
  assert.match(demos, /export const demoSessions/);
  assert.match(demos, /revalidate:\s*300/);
  assert.match(data, /export const learnTracks/);
  assert.match(packageJson, /"prebuild":\s*"npm run sync:content"/);

  await access(new URL("public/work/nino-illustrated-v1.png", templateRoot));
  await access(new URL("public/work/photography.webp", templateRoot));
  await access(
    new URL("public/media/photography/fd-12.webp", templateRoot),
  );
  await access(
    new URL("public/media/photography/fd-12-mobile.webp", templateRoot),
  );
  await Promise.all(
    [
      "p-01.webp",
      "p-02.webp",
      "p-03.webp",
      "p-04.webp",
      "p-05.webp",
      "p-06.webp",
      "p-07.webp",
      "p-08.webp",
      "p-09.webp",
      "p-10.webp",
      "p-11.webp",
      "p-13.webp",
    ].map((filename) =>
      access(new URL(`public/media/photography/${filename}`, templateRoot)),
    ),
  );
  await access(new URL("public/work/signal-dispatch.webp", templateRoot));
  await Promise.all(
    [
      "demo-twelve-messages.jpg",
      "demo-browser.jpg",
      "demo-enforced-forever.jpg",
      "demo-session-corpus.jpg",
      "demo-feedback-loop.jpg",
      "demo-landmine-registry.jpg",
      "demo-said-it-checked.jpg",
      "demo-gates.jpg",
      "demo-beautifier.jpg",
      "demo-four-questions.jpg",
      "demo-config-probe.jpg",
    ].map((filename) =>
      access(new URL(`public/work/${filename}`, templateRoot)),
    ),
  );
  await access(new URL("public/favicon.png", templateRoot));
  await access(new URL("public/og.png", templateRoot));
  await access(new URL("public/fonts/anton-400.woff2", templateRoot));
  await access(new URL("public/fonts/inter-latin.woff2", templateRoot));
  await access(
    new URL("public/fonts/space-mono-latin-400-normal.woff2", templateRoot),
  );
  await access(
    new URL("public/fonts/space-mono-latin-700-normal.woff2", templateRoot),
  );
});
