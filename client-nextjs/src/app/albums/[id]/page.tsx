import { getClient } from "@/lib/apollo-server-client";
import {
  Album,
  AlbumsDocument,
  GetAlbumByIdDocument,
} from "@/__generated__/types";
import AlbumClientSection from "@/components/ClientSections/Single Entity/AlbumClientSection";

export const revalidate = 60;

export async function generateStaticParams() {
  const client = getClient();
  const { data } = await client.query({
    query: AlbumsDocument,
  });

  return (
    data.albums?.map((album: Album) => ({
      id: album?._id,
    })) ?? []
  );
}

export default async function AlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const client = getClient();

  // Preload data into cache
  await client.query({
    query: GetAlbumByIdDocument,
    variables: { id },
    fetchPolicy: "network-only",
  });

  // Pass the id to client fetch from Apollo cache
  return <AlbumClientSection albumId={id} />;
}
