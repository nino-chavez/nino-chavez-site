import type { Domain, WorkForm, WorkState } from "./data";

export type OperatedProduct = {
  slug: string;
  domain: Domain;
  state: WorkState;
  form: WorkForm;
  name: string;
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

export const operatedProducts: OperatedProduct[] = [
  {
    name: "Minder",
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
    name: "The Rotation",
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
    name: "Rally HQ",
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
