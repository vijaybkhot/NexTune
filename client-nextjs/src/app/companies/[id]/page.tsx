import { getClient } from "@/lib/apollo-server-client";
import { GetCompanyByIdDocument } from "@/__generated__/types";
import RecordCompanyClientSection from "@/components/ClientSections/Single Entity/RecordCompanyClientSection";
import PageContainer from "@/components/PageContainer";

// export const revalidate = 60;

// export async function generateStaticParams() {
//   const client = getClient();
//   const { data } = await client.query({
//     query: RecordCompaniesDocument,
//   });

//   return (
//     data.recordcompanies?.map((company: RecordCompany) => ({
//       id: company._id,
//     })) ?? []
//   );
// }

type RecordCompanyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecordCompanyPage({
  params,
}: RecordCompanyPageProps) {
  const { id } = await params;
  const client = getClient();

  const { data } = await client.query({
    query: GetCompanyByIdDocument,
    variables: { id },
  });

  const company = data?.getCompanyById;

  if (!company) {
    return <div className="text-red-500 p-6">Company not found.</div>;
  }

  return (
    <PageContainer title="Record Company Details">
      <RecordCompanyClientSection companyId={company._id} />
    </PageContainer>
  );
}
