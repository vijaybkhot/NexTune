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

// Function to reformat incoming date
const convertToInputDateFormat = (mdyDate) => {
  const [month, day, year] = mdyDate.split("/");
  const paddedMonth = month.padStart(2, "0");
  const paddedDay = day.padStart(2, "0");
  return `${year}-${paddedMonth}-${paddedDay}`;
};

function EditArtistModal({ isOpen, artist, handleClose }) {
  const [showEditModal, setShowEditModal] = useState(isOpen);
  const [editArtist, { loading, error }] = useMutation(queries.EDIT_ARTIST);

  const [name, setName] = useState("");
  const [date_formed, set_date_formed] = useState("");
  const [members, setMembers] = useState("");

  useEffect(() => {
    if (artist) {
      setName(artist.name || "");
      const rawDate = artist.date_formed || artist.dateFormed || "1/1/2025";

      set_date_formed(convertToInputDateFormat(rawDate));
      setMembers(artist.members ? artist.members.join(", ") : "");
    }
  }, [artist, set_date_formed]);

  useEffect(() => {
    setShowEditModal(isOpen);
  }, [isOpen]);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setName("");
    set_date_formed(new Date());
    setMembers("");
    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const variables = { id: artist._id };

    // Name validation
    const trimmedName = name.trim();
    if (trimmedName && trimmedName !== artist.name.trim()) {
      if (!trimmedName) {
        alert("Name cannot be just spaces.");
        return;
      }
      variables.name = trimmedName;
    }

    // Members validation
    const memberList = members
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m !== "");

    const originalMembers = artist.members || [];
    const editedMembers =
      memberList.length > 0 &&
      JSON.stringify(memberList) !== JSON.stringify(originalMembers);

    if (editedMembers) {
      const nameRegex = /^[A-Za-z\s]+$/;
      const invalidMembers = memberList.filter((m) => !nameRegex.test(m));
      if (invalidMembers.length > 0) {
        alert("Member names must contain only letters and spaces.");
        return;
      }
      variables.members = memberList;
    }

    // Date validation
    if (date_formed) {
      // Format date and validate
      const [year, month, day] = date_formed.split("-");
      const formattedSubmitDate = `${parseInt(month)}/${parseInt(day)}/${year}`;

      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));

      const isValidDate =
        dateObj instanceof Date &&
        !isNaN(dateObj) &&
        dateObj.getDate() === Number(day) &&
        dateObj.getMonth() === Number(month) - 1 &&
        dateObj.getFullYear() === Number(year);

      if (!isValidDate) {
        alert("Please enter a valid date (e.g., M/D/YYYY, MM/DD/YYYY).");
        return;
      }
      const originalDate = artist.date_formed || artist.dateFormed || "";
      if (formattedSubmitDate !== originalDate) {
        variables.dateFormed = formattedSubmitDate;
      }
    }

    if (Object.keys(variables).length === 1) {
      alert("No changes detected.");
      return;
    }

    try {
      await editArtist({ variables });
      alert("Artist updated successfully!");
      setShowEditModal(false);
      handleClose();
    } catch (err) {
      console.error("Mutation error:", err.message);
      alert(`Failed to update artist. ${err.message}`);
    }
  };

  {
    loading && <p>Updating artist...</p>;
  }
  {
    error && <p style={{ color: "red" }}>{error.message}</p>;
  }

  return (
    <div>
      <ReactModal
        name="editArtistModal"
        isOpen={showEditModal}
        contentLabel="Edit Artist"
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
            type="date"
            value={date_formed}
            onChange={(e) => set_date_formed(e.target.value)}
            className="form-control"
          />
          <br />

          <div className="form-group">
            <label>
              Members (comma-separated):
              <br />
              <input
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder="e.g., John, Paul, George, Ringo"
              />
            </label>
          </div>

          <br />
          <br />
          <button className="button add-button" type="submit">
            Update Artist
          </button>
        </form>
        <button className="button cancel-button" onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditArtistModal;
