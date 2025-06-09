import { useState } from "react";
import {
  GetAlbumByIdDocument,
  GetSongsByArtistIdDocument,
  useAddSongMutation,
  useAlbumsQuery,
} from "@/__generated__/types";

type AddSongRenderProps = {
  closeAddFormState: () => void;
  albumId: string | undefined;
};

export default function AddSongRender({
  closeAddFormState,
  albumId,
}: AddSongRenderProps) {
  const [songTitle, setSongTitle] = useState<string>("");
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>(albumId ?? "");

  const {
    data: albumData,
    loading: albumLoading,
    error: albumError,
  } = useAlbumsQuery({
    fetchPolicy: "cache-and-network",
  });

  const artistId = albumData?.albums?.filter(
    (album) => album?._id === albumId
  )[0]?.artist?._id;

  const [addSong, { loading: loadingSong, error: errorSong }] =
    useAddSongMutation({
      refetchQueries: [
        {
          query: GetAlbumByIdDocument,
          variables: { id: albumId },
        },
        {
          query: GetSongsByArtistIdDocument,
          variables: { artistId: artistId },
        },
      ],
      awaitRefetchQueries: true,
    });

  const handleSubmitSong = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const trimmedTitle = songTitle.trim();

    if (!trimmedTitle) {
      alert("Song title cannot be empty or just spaces.");
      return;
    }

    if (
      !Number.isInteger(min) ||
      min < 0 ||
      !Number.isInteger(sec) ||
      sec < 0 ||
      sec >= 60 ||
      (min === 0 && sec === 0)
    ) {
      alert("Duration must be valid minutes and seconds (0-59).");
      return;
    }

    if (!albumId) {
      alert("Please select an album for the song.");
      return;
    }

    const paddedSec = sec.toString().padStart(2, "0");
    const formattedDuration = `${min}:${paddedSec}`;

    try {
      const { data } = await addSong({
        variables: {
          title: trimmedTitle,
          duration: formattedDuration,
          albumId,
        },
      });
      if (data?.addSong?.title) {
        alert(`Song Added: ${data.addSong.title}`);
        closeAddFormState();
        setSongTitle("");
        setMin(0);
        setSec(0);
      } else {
        alert("Song added but no title returned.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      console.error("Mutation error:", errorMessage);
      alert(`Failed to add song. ${errorMessage}`);
    }
  };

  if (loadingSong || albumLoading) return <p>Loading song...</p>;
  if (errorSong || albumError) return <p>Error loading song</p>;

  return (
    <div>
      <form onSubmit={handleSubmitSong}>
        <div className="form-group">
          <label>
            Title:
            <br />
            <input
              value={songTitle}
              onChange={(e) => setSongTitle(e.target.value)}
              autoFocus={true}
              required
            />
          </label>
        </div>
        <br />

        <div className="form-group">
          <label>
            Duration (min:sec):
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="number"
                min="0"
                value={min}
                onChange={(e) => setMin(Number(e.target.value))}
                placeholder="Minutes"
                className="form-control"
                style={{ width: "80px" }}
                required
              />
              <span>:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={sec}
                onChange={(e) => setSec(Number(e.target.value))}
                placeholder="Seconds"
                className="form-control"
                style={{ width: "80px" }}
                required
              />
            </div>
          </label>
        </div>

        <div className="form-group">
          <label>
            Album:
            <select
              className="form-control"
              id="albumId"
              value={selectedAlbumId}
              onChange={(e) => setSelectedAlbumId(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Please select an album --
              </option>
              {albumData &&
                albumData?.albums?.map((album) => (
                  <option key={album?._id} value={album?._id}>
                    {album?.title}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <br />

        <br />
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={closeAddFormState}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Song
          </button>
        </div>
      </form>
    </div>
  );
}
