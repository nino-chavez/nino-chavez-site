import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";

const isPublicLaunch = process.env.SITE_VISIBILITY === "public";

export const metadata: Metadata = {
  metadataBase: new URL("https://ninochavez.co"),
  title: {
    default: "Nino Chavez — Product architect and builder",
    template: "%s — Nino Chavez",
  },
  description:
    "Product architect and builder in Chicago. Software, volleyball operations, photography, writing, and music.",
  openGraph: {
    type: "website",
    title: "Nino Chavez — Product architect and builder",
    description:
      "I design products, build the software behind them, and run them in the real world.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nino Chavez — Product architect and builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nino Chavez — Product architect and builder",
    description:
      "I design products, build the software behind them, and run them in the real world.",
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
            <span>Portfolio redesign — production remains unchanged</span>
          </div>
        ) : null}
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
