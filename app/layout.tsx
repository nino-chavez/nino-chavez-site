import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const isPublicLaunch = process.env.SITE_VISIBILITY === "public";

export const metadata: Metadata = {
  metadataBase: new URL("https://ninochavez.co"),
  title: {
    default: "Nino Chavez — Open Practice",
    template: "%s — Nino Chavez",
  },
  description:
    "The open practice of product architect and builder Nino Chavez.",
  openGraph: {
    type: "website",
    title: "Nino Chavez — Open Practice",
    description:
      "I build the system, run the operation, and keep the evidence.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nino Chavez — Open Practice",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nino Chavez — Open Practice",
    description:
      "I build the system, run the operation, and keep the evidence.",
    images: ["/og.png"],
  },
  robots: {
    index: isPublicLaunch,
    follow: isPublicLaunch,
    googleBot: {
      index: isPublicLaunch,
      follow: isPublicLaunch,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0a1220",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {!isPublicLaunch ? (
          <div className="prototype-banner">
            Private art-direction review{" "}
            <span>Open Practice — production remains unchanged</span>
          </div>
        ) : null}
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
