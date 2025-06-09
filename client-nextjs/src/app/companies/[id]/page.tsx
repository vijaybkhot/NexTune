import { getClient } from "@/lib/apollo-server-client";
import {
  GetCompanyByIdDocument,
  RecordCompaniesDocument,
  RecordCompany,
} from "@/__generated__/types";
import RecordCompanyClientSection from "@/components/ClientSections/Single Entity/RecordCompanyClientSection";
import PageContainer from "@/components/PageContainer";

export const revalidate = 60;

export async function generateStaticParams() {
  const client = getClient();
  const { data } = await client.query({
    query: RecordCompaniesDocument,
  });

  return (
    data.recordcompanies?.map((company: RecordCompany) => ({
      id: company._id,
    })) ?? []
  );
}

export default async function RecordCompanyPage({
  params,
}: {
  params: { id: string };
}) {
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
    <PageContainer title="Artist Details">
      <RecordCompanyClientSection companyId={company._id} />
    </PageContainer>
  );
}
