import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useMutation } from "@apollo/client";
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

function EditCompanyModal({ isOpen, company, handleClose }) {
  const [showEditModal, setShowEditModal] = useState(isOpen);
  const [editCompany, { loading, error }] = useMutation(queries.EDIT_COMPANY);

  const [name, setName] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (company) {
      setName(company.name || "");

      setFoundedYear(company.foundedYear || "N/A");
      setCountry(company.country || "N/A");
    }
  }, [company]);

  useEffect(() => {
    setShowEditModal(isOpen);
  }, [isOpen]);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setName("");
    setFoundedYear("");
    setCountry("");
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const variables = { id: company._id };

    // Name validation
    const trimmedName = name.trim();
    if (trimmedName && trimmedName !== company.name.trim()) {
      if (trimmedName === "" || !/^[A-Za-z]+$/.test(trimmedName)) {
        alert(
          "Name should be a string containing only alphabets. No numbers or special characters."
        );
        return;
      }
      variables.name = trimmedName;
    }

    // Founded year validation
    if (foundedYear) {
      if (
        !Number.isInteger(foundedYear) ||
        foundedYear < 1900 ||
        foundedYear > 2025
      ) {
        alert(
          "Company founded year should be an integer between 1900 and 2025."
        );
        return;
      }
      if (foundedYear !== company.foundedYear) {
        variables.foundedYear = Number(foundedYear);
      }
    }

    // Country validation
    if (country) {
      let trimmedCountry = country.trim();
      if (trimmedCountry === "") {
        alert("Country cannot be empty or blank spaces.");
      }

      if (company.country !== trimmedCountry) {
        variables.country = trimmedCountry;
      }
    }

    if (Object.keys(variables).length === 1) {
      alert("No changes detected.");
      return;
    }

    try {
      await editCompany({ variables });
      alert("Company updated successfully!");
      setShowEditModal(false);
      handleClose();
    } catch (err) {
      console.error("Mutation error:", err.message);
      alert(`Failed to update artist. ${err.message}`);
    }
  };

  {
    loading && <p>Updating Record Company...</p>;
  }
  {
    error && <p style={{ color: "red" }}>{error.message}</p>;
  }

  return (
    <div>
      <ReactModal
        name="EditCompanyModal"
        isOpen={showEditModal}
        contentLabel="Edit Company"
        style={customStyles}
      >
        <form className="form" id="edit-artist" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Name:
              <br />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />
            </label>
          </div>
          <br />
          <input
            type="number"
            value={foundedYear}
            onChange={(e) => setFoundedYear(Number(e.target.value))}
            className="form-control"
          />
          <br />

          <div className="form-group">
            <label>
              Country:
              <br />
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter the coutry of origin for the record company"
              />
            </label>
          </div>

          <br />
          <br />
          <button className="button add-button" type="submit">
            Update Company
          </button>
        </form>
        <button className="button cancel-button" onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditCompanyModal;
