import Link from "next/link";
import { Suspense } from "react";
import "../by-nino-library.css";
import "../building.css";
import { WorkLibrary } from "../components/WorkLibrary";
import { workItems } from "../data";
import { operatedProducts } from "../operated-products";

export const metadata = {
  alternates: { canonical: "/work" },
  title: "Building",
  description:
    "Products, tools, methods, operations, and collections by Nino Chavez.",
};

export default async function WorkPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filtering = ["q", "domain", "state", "form"].some((key) => Boolean(params[key]));
  return (
    <div className="work-page work-atlas-page building-page">
      <header className="building-page__header">
        <h1>Building</h1>
        <p>Products I build and run, plus public studies and guides.</p>
      </header>

      {!filtering ? <>
      <section className="building-section" aria-labelledby="products-title">
        <header className="assistive-text">
          <h2 id="products-title">Products</h2>
        </header>
        <div className="operated-products">
          {operatedProducts.map((product) => {
            const external = product.href.startsWith("http");
            const className = product.image
              ? `operated-product__media operated-product__media--${product.name.toLowerCase().replaceAll(" ", "-")}`
              : undefined;

            return (
              <article className="operated-product" key={product.name}>
                {product.image ? (
                  <figure className={className}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- static local product previews are served as-is. */}
                    <img src={product.image.src} alt={product.image.alt} />
                  </figure>
                ) : null}
                {product.image?.caption ? (
                  <p className="operated-product__caption">
                    {product.image.caption}
                  </p>
                ) : null}
                <p className="operated-product__availability">
                  {product.availability}
                </p>
                <h3>{product.name}</h3>
                <p className="operated-product__summary">{product.summary}</p>
                {external ? (
                  <a
                    className="operated-product__action"
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {product.action}
                    <span className="assistive-text"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link className="operated-product__action" href={product.href}>
                    {product.action}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="building-section" aria-labelledby="public-work-title">
        <header className="building-section__heading">
          <h2 id="public-work-title">Public studies and methods</h2>
        </header>
        <div className="building-resources">
          <article className="building-resource">
            <p className="building-resource__type">Public draft</p>
            <h3>One Cart Across Two Storefronts</h3>
            <p>
              A study of what BigCommerce multi-storefront permits when two
              storefronts need one cart. Published for inspection; source
              remains a draft.
            </p>
            <a
              href="https://library.ninochavez.co/commerce/bc-shared-cart-pattern"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the shared-cart study
              <span className="assistive-text"> (opens in a new tab)</span>
            </a>
          </article>
          <article className="building-resource">
            <p className="building-resource__type">Method</p>
            <h3>Blueprint</h3>
            <p>
              A practical method for planning, reviewing, and checking product
              work done with AI agents.
            </p>
            <Link href="/work/blueprint">Explore Blueprint</Link>
          </article>

        </div>
      </section>

      <nav className="building-routes" aria-label="More ways to explore Building">
        <Link className="building-route" href="/demos">
          <h2>Process</h2>
          <p>See complete sessions and applied techniques.</p>
        </Link>
        <Link className="building-route" href="/learn">
          <h2>Guides</h2>
          <p>Follow practical learning paths with examples and checkpoints.</p>
        </Link>
      </nav>

      </> : null}

      <section
        className="building-section work-library-stage"
        id="work-library"
        aria-labelledby="work-library-title"
      >
        <header className="building-section__heading">
          <h2 id="work-library-title">Browse all work</h2>
          <p>
            Search by name or purpose. Status says what is available today;
            type says what kind of work it is.
          </p>
        </header>
        <Suspense fallback={<p>Loading work…</p>}>
          <WorkLibrary items={workItems} />
        </Suspense>
      </section>
    </div>
  );
}
