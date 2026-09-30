"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Notify the shared tracker after React has committed the visible route. */
export function SiteActivity() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.dataset.analyticsPath = path;
    window.dispatchEvent(new Event("nino:page-ready"));
  }, [path]);
  return <script defer data-site-navigation="react" src="/photography/site-activity.js?v=1" />;
}
