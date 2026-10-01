"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Preserve previously shared /work#work-library bookmarks. */
export function BrowseAllWorkLink() {
  const router = useRouter();
  useEffect(() => {
    const openLegacyBookmark = () => {
      if (window.location.hash === "#work-library") {
        const params = new URLSearchParams(window.location.search);
        params.set("view", "all");
        router.replace(`/work?${params}#work-library`);
      }
    };
    openLegacyBookmark();
    window.addEventListener("hashchange", openLegacyBookmark);
    return () => window.removeEventListener("hashchange", openLegacyBookmark);
  }, [router]);

  return <Link className="building-action" id="work-library" href="/work?view=all">
    Browse all work <span aria-hidden="true">→</span>
  </Link>;
}
