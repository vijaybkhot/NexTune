import { ArtistsDocument } from "@/__generated__/types";
import ArtistsClientSection from "@/components/ClientSections/Entity Lists/ArtistsClientSection";
import PageContainer from "@/components/PageContainer";
import { getClient } from "@/lib/apollo-server-client";

export const revalidate = 60;

export default async function ArtistsPage() {
  const client = getClient();

  // Fetch and populate cache
  const { data } = await client.query({
    query: ArtistsDocument,
    fetchPolicy: "network-only",
  });

  if (!data?.artists) {
    return (
      <PageContainer title="Artists">
        <div className="p-6 text-red-500">Failed to load artists.</div>
      </PageContainer>
    );
  }

  if (data.artists.length === 0) {
    return (
      <PageContainer title="Artists">
        <div className="p-6 text-gray-500">No artists found.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Artists">
      <ArtistsClientSection />
    </PageContainer>
  );
}
