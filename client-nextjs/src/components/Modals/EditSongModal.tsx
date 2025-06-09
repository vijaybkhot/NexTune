import React, { useEffect, useState } from "react";
import {
  EditSongMutationVariables,
  Song,
  useAlbumsQuery,
  useEditSongMutation,
} from "@/__generated__/types";
import { GetSongByIdDocument } from "@/__generated__/graphql";
import Modal from "./Modal";
import IconButton from "../IconButton";
import { Check, X } from "lucide-react";

type EditSongModalProps = {
  isOpen: boolean;
  song: Song;
  handleClose: () => void;
};

function EditSongModal({ isOpen, song, handleClose }: EditSongModalProps) {
  const [editSong, { loading, error }] = useEditSongMutation({
    refetchQueries: [
      {
        query: GetSongByIdDocument,
        variables: { id: song._id },
      },
    ],
  });

  const {
    data: albumData,
    loading: albumsLoading,
    error: albumsError,
  } = useAlbumsQuery({
    fetchPolicy: "cache-and-network",
  });

  const [title, setTitle] = useState("");
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [albumId, setAlbumId] = useState("");

  useEffect(() => {
    if (song) {
      setTitle(song.title || "");
      const minute = Number(song.duration.split(":")[0]);
      const seconds = Number(song.duration.split(":")[1]);
      setMin(minute || 0);
      setSec(seconds || 0);
      setAlbumId(song.album?._id ?? "");
    }
  }, [song]);

  const handleCloseEditModal = () => {
    setTitle("");
    setMin(0);
    setSec(0);
    setAlbumId("");
    handleClose();
  };

  // Sumbit handler function
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!song?._id) {
      alert("Song data is missing.");
      return;
    }
    const variables: EditSongMutationVariables = { id: song._id };

    // Title validation
    const trimmedTitle = title.trim();
    if (trimmedTitle && trimmedTitle !== song.title.trim()) {
      if (!trimmedTitle) {
        alert("Title cannot be just spaces.");
        return;
      }
      variables.title = trimmedTitle;
    }

    // Duration date validation
    if (
      !Number.isInteger(min) ||
      min < 0 ||
      !Number.isInteger(sec) ||
      sec < 0 ||
      sec >= 60 ||
      (min === 0 && sec == 0)
    ) {
      alert("Duration must be valid minutes and seconds (0-59).");
      return;
    }

    // Format duration to mm:ss with padded seconds
    const paddedSec = sec.toString().padStart(2, "0");
    const newDuration = `${min}:${paddedSec}`;

    if (newDuration !== song.duration) {
      variables.duration = newDuration;
    }

    // ALbum ID
    if (albumId && albumId !== song.album._id) {
      variables.albumId = albumId;
    }

    // No changes detected
    if (Object.keys(variables).length === 1) {
      alert("No changes detected.");
      return;
    }

    try {
      await editSong({
        variables,
        refetchQueries: [
          {
            query: GetSongByIdDocument,
            variables: { id: song._id },
          },
        ],
        awaitRefetchQueries: true,
      });
      alert("Song updated successfully!");
      handleClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      console.error("Mutation error:", errorMessage);
      alert(`Failed to edit song. ${errorMessage}`);
    }
  };

  if (loading || albumsLoading) return <p>Loading...</p>;
  if (error || albumsError) return <p>Error loading data</p>;

  return (
    <div>
      <Modal
        open={isOpen}
        onOpenChange={handleCloseEditModal}
        title="Edit Song"
        description="Here you can edit song details like title, duration, and album."
      >
        <form
          className="space-y-6 p-4 rounded-xl bg-white/70 backdrop-blur-sm shadow-md"
          id="edit-song"
          onSubmit={handleSubmit}
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title:
              <br />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus={true}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </label>
          </div>
          <br />

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (min:sec):
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="number"
                  min="0"
                  value={min}
                  onChange={(e) => setMin(Number(e.target.value))}
                  placeholder="Minutes"
                  style={{ width: "80px" }}
                  required
                />
                <span>:</span>
                <input
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  type="number"
                  min="0"
                  max="59"
                  value={sec}
                  onChange={(e) => setSec(Number(e.target.value))}
                  placeholder="Seconds"
                  style={{ width: "80px" }}
                  required
                />
              </div>
            </label>
          </div>
          <br />

          {/* Album */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Album:
              <select
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                id="albumId"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Please select an album --
                </option>
                {albumData?.albums?.map((album) => (
                  <option key={album?._id} value={album?._id}>
                    {album?.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br />

          <br />
          <br />
          <div className="flex justify-end gap-3 pt-4">
            <IconButton
              icon={Check}
              label="Update Song"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() =>
                document
                  .getElementById("edit-song")
                  ?.dispatchEvent(
                    new Event("submit", { bubbles: true, cancelable: true })
                  )
              }
            />
            <IconButton
              icon={X}
              label="Cancel"
              onClick={handleCloseEditModal}
              className="text-gray-600 border border-gray-300 hover:bg-gray-100"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditSongModal;
