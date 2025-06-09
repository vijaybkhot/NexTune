"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DataCard from "@/components/DataCard";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditAlbumModal from "@/components/Modals/EditAlbumModal";
import EditSongModal from "@/components/Modals/EditSongModal";
import AddForm from "@/components/Add Forms/AddForm";
import type { Album, Song } from "@/__generated__/graphql";
import { useGetAlbumByIdQuery } from "@/__generated__/types";

export default function AlbumClientSection({ albumId }: { albumId: string }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const [showSongEditModal, setShowSongEditModal] = useState(false);
  const [showSongDeleteModal, setShowSongDeleteModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Partial<Song> | null>(null);

  const { data, loading, error } = useGetAlbumByIdQuery({
    variables: { id: albumId },
    fetchPolicy: "cache-and-network",
  });

  const album = data?.getAlbumById;

  const renderedSongs = useMemo(() => {
    if (!album?.songs?.length) return null;

    return album.songs.map((song) => (
      <li key={song._id} className="w-full">
        <DataCard
          type="song"
          data={song as Song}
          onEditClick={(item) => {
            setSelectedSong(item);
            setShowSongEditModal(true);
          }}
          onDeleteClick={(item) => {
            setSelectedSong(item);
            setShowSongDeleteModal(true);
          }}
          className="rounded-xl shadow hover:shadow-lg transition"
        />
      </li>
    ));
  }, [album?.songs]);

  if (loading) return <p>Loading...</p>;
  if (error || !data?.getAlbumById || !album)
    return <p>Error loading album.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <Link
        href="/albums"
        className="text-blue-600 hover:underline text-sm mb-4 inline-block"
      >
        ← Back to Albums
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{album.title}</h1>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <strong className="text-gray-800">Release Date:</strong>{" "}
            {album.releaseDate}
          </p>
          <p>
            <strong className="text-gray-800">Genre:</strong> {album.genre}
          </p>
          <p>
            <strong className="text-gray-800">Artist:</strong>{" "}
            <Link
              href={`/artists/${album.artist._id}`}
              className="text-blue-500 hover:underline"
            >
              {album.artist.name}
            </Link>
          </p>
          <p>
            <strong className="text-gray-800">Record Company:</strong>{" "}
            <Link
              href={`/companies/${album.recordCompany._id}`}
              className="text-blue-500 hover:underline"
            >
              {album.recordCompany.name}
            </Link>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setShowEditModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-100 hover:bg-neutral-200 text-sm font-medium shadow"
          >
            <Pencil className="w-4 h-4" />
            Edit Album
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-100 hover:bg-red-200 text-sm font-medium text-red-800 shadow"
          >
            <Trash2 className="w-4 h-4" />
            Delete Album
          </button>
          <button
            onClick={() => setShowAddSongForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow"
          >
            <Plus className="w-4 h-4" />
            Add Song
          </button>
        </div>
      </div>

      {showAddSongForm && (
        <div className="mb-8">
          <AddForm
            type="song"
            albumId={album._id}
            closeAddFormState={() => setShowAddSongForm(false)}
          />
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Songs</h2>
        {album.songs.length > 0 ? (
          <ul className="space-y-4">{renderedSongs}</ul>
        ) : (
          <p className="text-gray-500">No songs added to this album yet.</p>
        )}
      </div>

      {showEditModal && (
        <EditAlbumModal
          isOpen={showEditModal}
          album={album}
          handleClose={() => setShowEditModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          type="album"
          deleteResource={album as Album}
          handleClose={() => setShowDeleteModal(false)}
          redirect
        />
      )}

      {showSongEditModal && selectedSong && (
        <EditSongModal
          isOpen={showSongEditModal}
          song={selectedSong as Song}
          handleClose={() => {
            setShowSongEditModal(false);
            setSelectedSong(null);
          }}
        />
      )}

      {showSongDeleteModal && selectedSong && (
        <DeleteModal
          isOpen={showSongDeleteModal}
          type="song"
          deleteResource={selectedSong as Song}
          handleClose={() => {
            setShowSongDeleteModal(false);
            setSelectedSong(null);
          }}
          redirect={false}
        />
      )}
    </div>
  );
}
