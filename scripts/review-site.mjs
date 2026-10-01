// Local, read-only review of the three existing applications on one origin.
// Start the production previews first. ROUTER_SOURCE must point to the owned
// router's src/routing.ts; run Node with --experimental-strip-types on Node 22.
import http from "node:http";
import { pathToFileURL } from "node:url";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

if (!process.env.ROUTER_SOURCE) throw new Error("Set ROUTER_SOURCE to ninochavez-router/src/routing.ts");
const { resolveDestination, resolvePathRedirect } = await import(pathToFileURL(process.env.ROUTER_SOURCE).href);
const origins = {
  main: process.env.REVIEW_MAIN_ORIGIN || "http://localhost:4344",
  blog: process.env.REVIEW_BLOG_ORIGIN || "http://127.0.0.1:4341",
  photography: process.env.REVIEW_GALLERY_ORIGIN || "http://127.0.0.1:4342",
};
for (const origin of Object.values(origins)) {
  if (!["localhost", "127.0.0.1", "[::1]"].includes(new URL(origin).hostname)) throw new Error("Review upstreams must be loopback");
}
const navigation = `document.addEventListener('click',function(event){if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;const a=event.target.closest('a[href]');if(!a||a.download||a.target==='_blank')return;const u=new URL(a.href);if(u.origin==='https://ninochavez.co'){event.preventDefault();event.stopImmediatePropagation();window.location.assign(u.pathname+u.search+u.hash)}},true);`;
const server = http.createServer(async (request, response) => {
  response.setHeader("x-robots-tag", "noindex, nofollow");
  response.setHeader("cache-control", "no-store");
  if (!["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    response.writeHead(403, {"content-type":"text/plain"});response.end("This local review accepts read requests only.");return;
  }
  const url = new URL(request.url, "http://127.0.0.1");
  if (url.pathname === "/_review/navigation.js") {
    response.writeHead(200,{"content-type":"text/javascript"});response.end(navigation);return;
  }
  const redirect = resolvePathRedirect(url.pathname, url.search);
  if (redirect) {
    const target = new URL(redirect);
    response.writeHead(302,{location:target.pathname+target.search+target.hash});response.end();return;
  }
  const destination = resolveDestination(url.pathname);
  try {
    const upstream = await fetch(origins[destination.app] + destination.path + url.search, {
      method: request.method, redirect: "manual",
      headers: {accept:request.headers.accept || "*/*", ...(request.headers.range ? {range:request.headers.range} : {})},
      signal: AbortSignal.timeout(30000),
    });
    upstream.headers.forEach((value,key) => {
      if (!["content-length","content-encoding","transfer-encoding","connection","set-cookie","cache-control","x-robots-tag"].includes(key)) response.setHeader(key,value);
    });
    const location = upstream.headers.get("location");
    if (location) {
      const target = new URL(location,origins[destination.app]);
      if (Object.values(origins).includes(target.origin)||target.origin==="https://ninochavez.co") response.setHeader("location",target.pathname+target.search+target.hash);
    }
    response.statusCode=upstream.status;
    if (request.method === "HEAD" || !upstream.body) { response.end();return; }
    if ((upstream.headers.get("content-type")||"").includes("text/html")) {
      const html=await upstream.text();
      response.end(html.replace("</head>",'<script src="/_review/navigation.js" defer></script></head>'));
    } else await pipeline(Readable.fromWeb(upstream.body),response);
  } catch (error) {
    if (!response.headersSent) response.writeHead(502,{"content-type":"text/plain"});
    response.end(`Local ${destination.app} preview unavailable: ${error.message}`);
  }
});
const port=Number(process.env.REVIEW_PORT||4343);
server.listen(port,"127.0.0.1",()=>console.log(`Read-only combined review: http://127.0.0.1:${port}`));
