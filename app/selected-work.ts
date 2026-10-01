import type { Domain, WorkForm, WorkState } from "./data";

export type SelectedWork = {
  slug: string;
  domain: Domain;
  state: WorkState;
  form: WorkForm;
  name: string;
  /** Visitor-facing identity; catalogue format and availability are separate. */
  kind: string;
  summary: string;
  availability: string;
  href: string;
  action: string;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

export const selectedWork: SelectedWork[] = [
  {
    name: "Minder",
    kind: "iOS app",
    slug: "minder",
    domain: "Local-first",
    state: "live",
    form: "app",
    summary: "Activities, tasks, and selected calendars in one view of your day.",
    availability: "On the App Store",
    href: "https://apps.apple.com/us/app/minder-your-day/id6803974428",
    action: "Get Minder",
    image: {
      src: "/work/minder.jpg",
      alt: "Minder app preview showing a fictional sample day",
      caption: "Published app preview; fictional sample day.",
    },
  },
  {
    name: "Flickday Media",
    kind: "Sports-media business",
    slug: "flickday",
    domain: "Volleyball",
    state: "live",
    form: "site",
    summary: "Tournament photography, highlight reels, and event photo galleries.",
    availability: "",
    href: "https://flickdaymedia.com/",
    action: "Visit Flickday Media",
    image: {
      src: "/work/flickday.jpg",
      alt: "Volleyball photography from the Flickday Media portfolio",
    },
  },
  {
    name: "The Rotation",
    kind: "Website",
    slug: "the-rotation",
    domain: "Volleyball",
    state: "live",
    form: "site",
    summary: "Find college volleyball matches and where to watch them.",
    availability: "Live website",
    href: "https://therotation.tv/",
    action: "Open The Rotation",
    image: {
      src: "/work/rotation.png",
      alt: "The Rotation schedule and must-watch match cards",
    },
  },
  {
    name: "Let’s Pepper",
    kind: "Tournament series",
    slug: "lets-pepper",
    domain: "Volleyball",
    state: "live",
    form: "site",
    summary: "Player-first grass volleyball tournaments, standings, and event galleries.",
    availability: "2026 season complete",
    href: "https://letspepper.com/",
    action: "Visit Let’s Pepper",
    image: {
      src: "/work/lets-pepper-site.png",
      alt: "Let’s Pepper website with its tournament identity and grass volleyball photograph",
    },
  },
  {
    name: "Rally HQ",
    kind: "Web app",
    slug: "rally-hq",
    domain: "Volleyball",
    state: "live",
    form: "site",
    summary: "Tournament registration, brackets, schedules, and live court scoring.",
    availability: "Live website",
    href: "/work/rally-hq",
    action: "Explore Rally HQ",
    image: {
      src: "/work/rally-hq.webp",
      alt: "Rally HQ tournament interface",
    },
  },
  {
    name: "Cutting Board",
    kind: "App",
    slug: "cutting-board",
    domain: "Media & assets",
    state: "live",
    form: "app",
    summary: "Review, sort, and prepare event video before editing.",
    availability: "Public alpha",
    href: "https://apps.ninochavez.co/cutting-board/",
    action: "See Cutting Board",
  },
  {
    name: "Yawn",
    kind: "App",
    slug: "yawn",
    domain: "Local-first",
    state: "building",
    form: "app",
    summary: "A private meeting notepad with a transcript you can check.",
    availability: "Internal alpha",
    href: "https://apps.ninochavez.co/yawn/",
    action: "See Yawn",
  },
  {
    name: "Work Library",
    kind: "Publication library",
    slug: "work-library",
    domain: "Publishing",
    state: "published",
    form: "docs",
    summary: "Source-backed publications and private handoffs.",
    availability: "Public studies · private handoffs",
    href: "https://library.ninochavez.co/commerce/bc-shared-cart-pattern",
    action: "Read a public study",
  },
];
