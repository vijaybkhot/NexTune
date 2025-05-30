import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import React, { useState } from "react";
import EditAlbumModal from "../components/EditAlbumModal";
import DeleteModal from "../components/DeleteModal";
import DataCard from "../components/DataCard";
import EditSongModal from "../components/EditSongModal";
import AddForm from "../components/AddForm";

function AlbumById() {
  const { id } = useParams();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showAddSongForm, setShowAddSongForm] = useState(false);
  const [showSongEditModal, setShowSongEditModal] = useState(false);
  const [showSongDeleteModal, setShowSongDeleteModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const { data, loading, error } = useQuery(queries.GET_ALBUM_BY_ID, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p>Loading album...</p>;
  if (error) return <p>Error loading album: {error.message}</p>;

  const album = data?.getAlbumById;
  console.log(album.songs);

  return (
    <div className="album-details-page">
      <button onClick={() => window.history.back()} className="back-button">
        ← Back
      </button>

      <h1>{album.title}</h1>
      <p>
        <strong>Release Date:</strong> {album.releaseDate}
      </p>
      <p>
        <strong>Genre:</strong> {album.genre}
      </p>

      <p>
        <strong>Artist:</strong>{" "}
        <Link to={`/artists/${album.artist._id}`}>{album.artist.name}</Link>
      </p>

      <p>
        <strong>Record Company:</strong>{" "}
        <Link to={`/companies/${album.recordCompany._id}`}>
          {album.recordCompany.name}
        </Link>
      </p>

      <div className="action-buttons">
        <button onClick={() => setShowEditModal(true)}>✏️ Edit Album</button>
        <button onClick={() => setShowDeleteModal(true)}>🗑 Delete Album</button>
        <button onClick={() => setShowAddSongForm(true)}>
          🎵 Add a New Song
        </button>
      </div>
      {showAddSongForm && (
        <AddForm
          type="song"
          albumId={album._id}
          closeAddFormState={() => setShowAddSongForm(false)}
        />
      )}

      <hr />
      <h2>Songs:</h2>
      {album.songs.length > 0 ? (
        <ul>
          {album.songs.map((song) => (
            <li key={song._id} className="song-item">
              <DataCard
                type="song"
                data={song}
                onEditClick={() => {
                  setSelectedSong(song);
                  setShowSongEditModal(true);
                }}
                onDeleteClick={() => {
                  setSelectedSong(song);
                  setShowSongDeleteModal(true);
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs added to this album yet.</p>
      )}

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
          deleteResource={album}
          handleClose={() => setShowDeleteModal(false)}
          redirect={true}
        />
      )}

      {showSongEditModal && selectedSong && (
        <EditSongModal
          isOpen={showSongEditModal}
          song={selectedSong}
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
          deleteResource={selectedSong}
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

export default AlbumById;
