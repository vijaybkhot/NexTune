import { RecordCompaniesDocument } from "@/__generated__/types";
import RecordCompaniesClientSection from "@/components/ClientSections/Entity Lists/RecordCompaniesClientSection";
import PageContainer from "@/components/PageContainer";
import { getClient } from "@/lib/apollo-server-client";

export const revalidate = 60;

export default async function CompaniesPage() {
  const client = getClient();

  // Fetch and populate cache
  const { data } = await client.query({
    query: RecordCompaniesDocument,
    fetchPolicy: "network-only",
  });

  if (!data?.recordCompanies) {
    return (
      <PageContainer title="Record Companies">
        <div className="p-6 text-red-500">Failed to load record company.</div>
      </PageContainer>
    );
  }

  // if (data.recordCompanies.length === 0) {
  //   return (
  //     <PageContainer title="Record Companies">
  //       <div className="p-6 text-gray-500">No record companies found.</div>
  //     </PageContainer>
  //   );
  // }

  return (
    <PageContainer title="Record Companies">
      <RecordCompaniesClientSection />
    </PageContainer>
  );
}
