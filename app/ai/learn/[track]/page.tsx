import { permanentRedirect } from "next/navigation";

export default async function RetiredAiTrack({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  permanentRedirect(`/learn/${track}`);
}
