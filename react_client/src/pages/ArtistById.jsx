import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import queries from "../queries";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import EditArtistModal from "../components/EditArtistModal";
import DeleteModal from "../components/DeleteModal";

function ArtistById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: artistData,
    loading: artistLoading,
    error: artistError,
  } = useQuery(queries.GET_ARTIST_BY_ID, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const {
    data: songsData,
    loading: songsLoading,
    error: songsError,
  } = useQuery(queries.GET_SONGS_BY_ARTIST_ID, {
    variables: { artistId: id },
    fetchPolicy: "cache-and-network",
  });

  const artist = artistData?.getArtistById;
  const songs = songsData?.getSongsByArtistId;

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
  if (artist) {
    return (
      <div className="artist-details-page">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <h1>{artist.name || "N/A"}</h1>
        <p>
          <strong>Formed:</strong> {artist.dateFormed || "N/A"}
        </p>
        <p>
          <strong>Members:</strong> {artist.members?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>Albums:</strong> {artist.numOfAlbums ?? 0}
        </p>

        <div className="action-buttons">
          <button onClick={() => handleEditClick(artist)}>✏️ Edit</button>
          <button onClick={() => handleDeleteClick(artist)}>🗑 Delete</button>
        </div>

        {/* Albums Section */}
        <hr />
        <h2>Albums</h2>
        {artist.albums && artist.albums.length > 0 ? (
          <ul>
            {artist.albums.map((album) => (
              <li key={album._id}>
                <Link to={`/albums/${album._id}`}>{album.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No albums available.</p>
        )}

        {/* Songs Section */}
        <hr />
        <h2>Songs and duration</h2>
        {songs && songs.length > 0 ? (
          <ul>
            {songs.map((song) => (
              <li key={song._id}>
                {song.title} - {song.duration}
              </li>
            ))}
          </ul>
        ) : (
          <p>No songs found.</p>
        )}
        {showEditModal && artist && (
          <EditArtistModal
            isOpen={showEditModal}
            artist={artist}
            handleClose={handleCloseModals}
          />
        )}

        {showDeleteModal && artist && (
          <DeleteModal
            type={"artist"}
            isOpen={showDeleteModal}
            deleteResource={artist}
            handleClose={handleCloseModals}
            redirect={true}
          />
        )}
      </div>
    );
  } else if (artistLoading || songsLoading) {
    return <p>Loading artist and songs...</p>;
  } else if (artistError) {
    return <p>Error loading artist: {artistError.message}</p>;
  } else if (songsError) {
    return <p>Error loading songs: {songsError.message}</p>;
  }
}

export default ArtistById;
