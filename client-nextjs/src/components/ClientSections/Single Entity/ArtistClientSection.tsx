"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EditArtistModal from "@/components/Modals/EditArtistModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import { Pencil, Trash2 } from "lucide-react";
import {
  Artist,
  useGetArtistByIdQuery,
  useGetSongsByArtistIdQuery,
} from "@/__generated__/types";

export default function ArtistClientSection({
  artistId,
}: {
  artistId: string;
}) {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: artistData,
    loading: artistLoading,
    error: artistError,
  } = useGetArtistByIdQuery({
    variables: { id: artistId },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: songsData,
    loading: songsLoading,
    error: songsError,
  } = useGetSongsByArtistIdQuery({
    variables: { artistId },
    fetchPolicy: "cache-and-network",
  });

  const artist = artistData?.getArtistById;
  const songs = songsData?.getSongsByArtistId;

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  if (artistLoading || songsLoading) return <p>Loading...</p>;
  if (artistError || !artist || songsError) return <p>Error loading artist.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-gray-900">
      <button
        onClick={() => router.back()}
        className="text-sm text-blue-600 hover:underline mb-6"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
      <p className="text-sm text-gray-600 mb-1">
        <strong className="text-gray-800">Formed:</strong>{" "}
        {artist.dateFormed || "N/A"}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        <strong className="text-gray-800">Members:</strong>{" "}
        {artist.members?.join(", ") || "N/A"}
      </p>
      <p className="text-sm text-gray-600 mb-6">
        <strong className="text-gray-800">Albums:</strong>{" "}
        {artist.numOfAlbums ?? 0}
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setShowEditModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-sm font-medium shadow"
        >
          <Pencil className="w-4 h-4" />
          Edit Artist
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-100 hover:bg-red-200 text-sm font-medium text-red-800 shadow"
        >
          <Trash2 className="w-4 h-4" />
          Delete Artist
        </button>
      </div>

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-4">Albums</h2>
      {artist.albums?.length > 0 ? (
        <ul className="space-y-2">
          {artist.albums.map((album) => (
            <li key={album._id}>
              <Link
                href={`/albums/${album._id}`}
                className="text-blue-600 hover:underline"
              >
                {album.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No albums available.</p>
      )}

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-4">Songs & Duration</h2>
      {songs && songs.length > 0 ? (
        <ul className="space-y-2">
          {songs?.map((song) => (
            <li key={song?._id} className="text-sm text-gray-700">
              {song?.title} – {song?.duration}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No songs found.</p>
      )}

      {showEditModal && (
        <EditArtistModal
          isOpen={showEditModal}
          artist={artist as Artist}
          handleClose={handleCloseModals}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          type="artist"
          isOpen={showDeleteModal}
          deleteResource={artist as Artist}
          handleClose={handleCloseModals}
          redirect={true}
        />
      )}
    </div>
  );
}
