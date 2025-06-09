import { getClient } from "@/lib/apollo-server-client";
import {
  Artist,
  ArtistsDocument,
  GetArtistByIdDocument,
  GetSongsByArtistIdDocument,
} from "@/__generated__/types";
import ArtistClientSection from "@/components/ClientSections/Single Entity/ArtistClientSection";
import PageContainer from "@/components/PageContainer";

export const revalidate = 60;

export async function generateStaticParams() {
  const client = getClient();
  const { data } = await client.query({
    query: ArtistsDocument,
  });

  return (
    data.artists?.map((artist: Artist) => ({
      id: artist?._id,
    })) ?? []
  );
}

export default async function ArtistPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const client = getClient();

  const [artistRes, songsRes] = await Promise.all([
    client.query({
      query: GetArtistByIdDocument,
      variables: { id },
      fetchPolicy: "network-only",
    }),
    client.query({
      query: GetSongsByArtistIdDocument,
      variables: { artistId: id },
      fetchPolicy: "network-only",
    }),
  ]);

  const artist = artistRes.data?.getArtistById;

  if (!songsRes.data?.getSongsByArtistId) {
    console.warn(`No songs found for artist ID: ${id}`);
  }
  if (!artist) {
    return (
      <PageContainer title="Artist Not Found">
        <div className="p-6 text-red-500">Artist not found.</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Artist Details">
      <ArtistClientSection artistId={artist._id} />
    </PageContainer>
  );
}
