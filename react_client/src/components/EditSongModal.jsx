import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useMutation, useQuery } from "@apollo/client";
import queries from "../queries";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    border: "1px solid #28547a",
    borderRadius: "4px",
  },
};

function EditSongModal({ isOpen, song, handleClose }) {
  //   const [showEditModal, setShowEditModal] = useState(isOpen);
  const [editSong, { loading, error }] = useMutation(queries.EDIT_SONG, {
    update(cache, { data: { editSong } }) {
      // update GET_SONG_BY_ID
      cache.writeQuery({
        query: queries.GET_SONG_BY_ID,
        variables: { id: editSong._id },
        data: { getSongById: editSong },
      });
    },
  });

  const {
    data: albumData,
    loading: albumsLoading,
    error: albumsError,
  } = useQuery(queries.GET_ALBUMS, {
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const variables = { id: song._id };

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
        // Refetch related queries
        refetchQueries: [
          { query: queries.GET_ARTISTS },
          { query: queries.GET_COMPANIES },
          { query: queries.GET_ALBUMS },
          {
            query: queries.GET_ALBUM_BY_ID,
            variables: { id: variables.albumId || song.album._id },
          },
        ],
        awaitRefetchQueries: true,
      });
      alert("Song updated successfully!");
      handleClose();
    } catch (err) {
      console.error("Mutation error:", err.message);
      alert(`Failed to update album. ${err.message}`);
    }
  };

  if (loading || albumsLoading) return <p>Loading...</p>;
  if (error || albumsError) return <p>Error loading data</p>;

  return (
    <div>
      <ReactModal
        name="editSongModal"
        isOpen={isOpen}
        contentLabel="Edit Song"
        style={customStyles}
      >
        <form className="form" id="edit-song" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>
              Title:
              <br />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus={true}
                required
              />
            </label>
          </div>
          <br />

          {/* Duration */}
          <div className="form-group">
            <label>
              Duration (min:sec):
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
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
          <br />

          {/* Album */}
          <div className="form-group">
            <label>
              Album:
              <select
                className="form-control"
                id="albumId"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Please select an album --
                </option>
                {albumData?.albums.map((album) => (
                  <option key={album._id} value={album._id}>
                    {album.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br />

          <br />
          <br />
          <button className="button add-button" type="submit">
            Update Song
          </button>
        </form>

        <button className="button cancel-button" onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditSongModal;
