import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import DataCard from "../components/DataCard";
import "./Artists.css";
import AddForm from "../components/AddForm";
import DeleteModal from "../components/DeleteModal";
import EditCompanyModal from "../components/EditCompanyModal";

function RecordCompanies() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const { data, loading, error } = useQuery(queries.GET_COMPANIES, {
    fetchPolicy: "cache-and-network",
  });

  const closeAddFormState = () => {
    setShowAddForm(false);
  };

  const handleEditClick = (company) => {
    setSelectedCompany(company);
    setShowEditModal(true);
  };

  const handleDeleteClick = (company) => {
    setShowDeleteModal(true);
    setSelectedCompany(company);
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  if (data) {
    const { recordCompanies } = data;
    return (
      <div>
        <button className="button" onClick={() => setShowAddForm(!showAddForm)}>
          Create Record Company
        </button>
        {showAddForm && (
          <AddForm type="company" closeAddFormState={closeAddFormState} />
        )}
        <br />
        <br />

        <div className="artist-grid">
          {recordCompanies.map((company) => (
            <DataCard
              key={company._id}
              data={company}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              type={"company"}
            />
          ))}
          {showEditModal && selectedCompany && (
            <EditCompanyModal
              isOpen={showEditModal}
              company={selectedCompany}
              handleClose={handleCloseModals}
            />
          )}

          {showDeleteModal && selectedCompany && (
            <DeleteModal
              type={"company"}
              isOpen={showDeleteModal}
              deleteResource={selectedCompany}
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

export default RecordCompanies;
