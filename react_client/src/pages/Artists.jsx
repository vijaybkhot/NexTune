import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import DataCard from "../components/DataCard";
import "./Artists.css";
import EditArtistModal from "../components/EditArtistModal";
import AddForm from "../components/AddForm";
import DeleteModal from "../components/DeleteModal";

function Artists() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);

  const { data, loading, error } = useQuery(queries.GET_ARTISTS, {
    fetchPolicy: "cache-and-network",
  });

  const closeAddFormState = () => {
    setShowAddForm(false);
  };

  const handleEditClick = (artist) => {
    setSelectedArtist(artist);
    setShowEditModal(true);
  };

  const handleDeleteClick = (artist) => {
    setShowDeleteModal(true);
    setSelectedArtist(artist);
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  if (data) {
    const { artists } = data;
    return (
      <div>
        <button className="button" onClick={() => setShowAddForm(!showAddForm)}>
          Create Artist
        </button>
        {showAddForm && (
          <AddForm type="artist" closeAddFormState={closeAddFormState} />
        )}
        <br />
        <br />

        <div className="artist-grid">
          {artists.map((artist) => (
            <DataCard
              key={artist._id}
              data={artist}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              type={"artist"}
            />
          ))}
          {showEditModal && selectedArtist && (
            <EditArtistModal
              isOpen={showEditModal}
              artist={selectedArtist}
              handleClose={handleCloseModals}
            />
          )}

          {showDeleteModal && selectedArtist && (
            <DeleteModal
              type={"artist"}
              isOpen={showDeleteModal}
              deleteResource={selectedArtist}
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

export default Artists;
