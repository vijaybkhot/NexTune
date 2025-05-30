import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import DataCard from "../components/DataCard";
import "./Artists.css";
import EditAlbumModal from "../components/EditAlbumModal";
import AddForm from "../components/AddForm";
import DeleteModal from "../components/DeleteModal";

function Albums() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const { data, loading, error } = useQuery(queries.GET_ALBUMS, {
    fetchPolicy: "cache-and-network",
  });

  const closeAddFormState = () => {
    setShowAddForm(false);
  };

  const handleEditClick = (album) => {
    setSelectedAlbum(album);
    setShowEditModal(true);
  };

  const handleDeleteClick = (album) => {
    setShowDeleteModal(true);
    setSelectedAlbum(album);
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  if (data) {
    const { albums } = data;
    return (
      <div>
        <button className="button" onClick={() => setShowAddForm(!showAddForm)}>
          Create Album
        </button>
        {showAddForm && (
          <AddForm type="album" closeAddFormState={closeAddFormState} />
        )}
        <br />
        <br />

        <div className="artist-grid">
          {albums.map((album) => (
            <DataCard
              key={album._id}
              data={album}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              type={"album"}
            />
          ))}
          {showEditModal && selectedAlbum && (
            <EditAlbumModal
              isOpen={showEditModal}
              album={selectedAlbum}
              handleClose={handleCloseModals}
            />
          )}

          {showDeleteModal && selectedAlbum && (
            <DeleteModal
              type={"album"}
              isOpen={showDeleteModal}
              deleteResource={selectedAlbum}
              handleClose={handleCloseModals}
              redirect={false}
            />
          )}
        </div>
      </div>
    );
  } else if (loading) {
    return <div>Loading</div>;
  } else if (error) {
    return <div>{error.message}</div>;
  }
}

export default Albums;
