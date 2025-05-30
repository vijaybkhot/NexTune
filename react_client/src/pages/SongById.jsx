import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import queries from "../queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import EditCompanyModal from "../components/EditCompanyModal";
import EditSongModal from "../components/EditSongModal";

function SongById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: songData,
    loading: songLoading,
    error: songError,
  } = useQuery(queries.GET_SONG_BY_ID, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const song = songData?.getSongById;
  console.log(song);

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };
  if (song) {
    return (
      <div className="song-details-page">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <h1>{song.title || "N/A"}</h1>
        <p>
          <strong>Duration:</strong> {song.duration || "N/A"}
        </p>

        <p>
          <Link to={`/albums/${song.album._id}`}>
            <strong>Album:</strong> {song.album.title || "N/A"}
          </Link>
        </p>

        <div className="action-buttons">
          <button onClick={() => handleEditClick(song)}>✏️ Edit</button>
          <button onClick={() => handleDeleteClick(song)}>🗑 Delete</button>
        </div>

        <hr />

        {showEditModal && song && (
          <EditSongModal
            isOpen={showEditModal}
            song={song}
            handleClose={handleCloseModals}
          />
        )}

        {showDeleteModal && song && (
          <DeleteModal
            type={"song"}
            isOpen={showDeleteModal}
            deleteResource={song}
            handleClose={handleCloseModals}
            redirect={true}
          />
        )}
      </div>
    );
  } else if (songLoading) {
    return <p>Loading Song...</p>;
  } else if (songError) {
    return <p>Error loading song: {songError.message}</p>;
  }
}

export default SongById;
