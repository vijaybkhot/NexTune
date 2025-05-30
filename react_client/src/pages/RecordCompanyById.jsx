import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import queries from "../queries";
import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import EditArtistModal from "../components/EditArtistModal";
import DeleteModal from "../components/DeleteModal";
import EditCompanyModal from "../components/EditCompanyModal";

function RecordCompanyById() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: companyData,
    loading: companyLoading,
    error: companyError,
  } = useQuery(queries.GET_COMPANY_BY_ID, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const company = companyData?.getCompanyById;

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
  if (company) {
    return (
      <div className="artist-details-page">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>

        <h1>{company.name || "N/A"}</h1>
        <p>
          <strong>Formed:</strong> {company.foundedYear || "N/A"}
        </p>
        <p>
          <strong>Members:</strong> {company.country || "N/A"}
        </p>
        <p>
          <strong>Albums:</strong> {company.numOfAlbums ?? 0}
        </p>

        <div className="action-buttons">
          <button onClick={() => handleEditClick(company)}>✏️ Edit</button>
          <button onClick={() => handleDeleteClick(company)}>🗑 Delete</button>
        </div>

        {/* Albums Section */}
        <hr />
        <h2>Albums</h2>
        {company.albums && company.albums.length > 0 ? (
          <ul>
            {company.albums.map((album) => (
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

        {showEditModal && company && (
          <EditCompanyModal
            isOpen={showEditModal}
            company={company}
            handleClose={handleCloseModals}
          />
        )}

        {showDeleteModal && company && (
          <DeleteModal
            type={"company"}
            isOpen={showDeleteModal}
            deleteResource={company}
            handleClose={handleCloseModals}
            redirect={true}
          />
        )}
      </div>
    );
  } else if (companyLoading) {
    return <p>Loading Company...</p>;
  } else if (companyError) {
    return <p>Error loading company: {companyError.message}</p>;
  }
}

export default RecordCompanyById;
