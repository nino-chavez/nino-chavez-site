/** Fall 2026 volleyball offer, revised September 9, 2026. */
export const coverageOffer = {
  price: 350,
  individualDeposit: 175,
  organizationPaymentDays: 30,
  previewPhotos: 10,
  galleryDays: 5,
  firstDate: "2026-09-19",
  lastDate: "2026-12-31",
  typicalGallery: "40–60",
  onsiteHours: 3,
  deliverySummary: "Schools and established organizations: gallery delivered within 5 calendar days, invoice due 30 days after the event, no deposit. Individuals: gallery ready within 5 calendar days; $175 deposit and $175 balance when ready, before full-resolution downloads.",
  email: "nino@ninochavez.co",
  gallery: "https://ninochavez.co/photography/albums/hs-girls-vb-jca-vs-pnhs-08-25-2026-fJKdsB?src=coverage",
} as const;

export function earliestCoverageDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  const today = `${part("year")}-${part("month")}-${part("day")}`;
  return today > coverageOffer.firstDate ? today : coverageOffer.firstDate;
}
