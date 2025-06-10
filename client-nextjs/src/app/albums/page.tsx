import { AlbumsDocument } from "@/__generated__/types";
import AlbumsClientSection from "@/components/ClientSections/Entity Lists/AlbumsClientSection";
import PageContainer from "@/components/PageContainer";
import { getClient } from "@/lib/apollo-server-client";

export const revalidate = 60;

export default async function AlbumsPage() {
  const client = getClient();

  // Preload data into cache for the client component
  const { data } = await client.query({
    query: AlbumsDocument,
    fetchPolicy: "network-only",
  });

  console.log("Albums data loaded:", data?.albums);
  if (!data?.albums) {
    return (
      <PageContainer title="Albums">
        <div className="p-6 text-red-500">Failed to load albums.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Albums">
      <AlbumsClientSection />
    </PageContainer>
  );
}
