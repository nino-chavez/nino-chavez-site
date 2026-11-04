import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./profile.css";
import "./masthead.css";
import { SiteActivity } from "./components/SiteActivity";
import { ProfileShell } from "./components/ProfileShell";

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
  colorScheme: "dark",
  themeColor: "#07070F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="profile-site">
        <link rel="preload" href="/fonts/anton-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {!isPublicLaunch ? (
          <div className="prototype-banner">
            Private art-direction review{" "}
            <span>Portfolio redesign — production remains unchanged</span>
          </div>
        ) : null}
        <ProfileShell>{children}</ProfileShell>
        {isPublicLaunch ? <SiteActivity /> : null}
      </body>
    </html>
  );
}
