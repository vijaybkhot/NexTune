import { getClient } from "@/lib/apollo-server-client";
import { GetAlbumByIdDocument } from "@/__generated__/types";
import AlbumClientSection from "@/components/ClientSections/Single Entity/AlbumClientSection";

// export const revalidate = 60;

// export async function generateStaticParams() {
//   const client = getClient();
//   const { data } = await client.query({
//     query: AlbumsDocument,
//   });

//   return (
//     data.albums?.map((album: Album) => ({
//       id: album?._id,
//     })) ?? []
//   );
// }

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AlbumPage({ params }: PageProps) {
  const { id } = await params;

  const client = getClient();

  await client.query({
    query: GetAlbumByIdDocument,
    variables: { id },
    fetchPolicy: "network-only",
  });

  return <AlbumClientSection albumId={id} />;
}
