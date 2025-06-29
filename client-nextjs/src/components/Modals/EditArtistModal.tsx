import { Artist } from "@/__generated__/graphql";
import {
  EditArtistMutationVariables,
  useEditArtistMutation,
} from "@/__generated__/types";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import IconButton from "../IconButton";
import { Check, X } from "lucide-react";

type EditArtistModalProps = {
  isOpen: boolean;
  artist: Artist;
  handleClose: () => void;
};

// Function to reformat incoming date
const convertToInputDateFormat = (mdyDate: string) => {
  const [month, day, year] = mdyDate.split("/");
  const paddedMonth = month.padStart(2, "0");
  const paddedDay = day.padStart(2, "0");
  return `${year}-${paddedMonth}-${paddedDay}`;
};

function EditArtistModal({
  isOpen,
  artist,
  handleClose,
}: EditArtistModalProps) {
  const [showEditModal, setShowEditModal] = useState<boolean>(isOpen);
  const [editArtist, { loading, error }] = useEditArtistMutation();

  const [name, setName] = useState<string>("");
  const [date_formed, set_date_formed] = useState<string>("");
  const [members, setMembers] = useState<string>("");

  useEffect(() => {
    if (artist) {
      setName(artist.name || "");
      const rawDate = artist.dateFormed || "1/1/2025";

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
    set_date_formed(new Date().toISOString().split("T")[0]);
    setMembers("");
    handleClose();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const variables: EditArtistMutationVariables = { id: artist._id };

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
      const nameRegex = /^[A-Za-z\s.'-]+$/;

      const trimmedMembers = memberList.map((m) => m.trim());
      const invalidMembers = trimmedMembers.filter(
        (m) => m === "" || !nameRegex.test(m)
      );

      if (invalidMembers.length > 0) {
        alert(
          "Each member name must be non-empty and contain only letters, spaces, periods (.), apostrophes ('), or hyphens (-)."
        );
        return;
      }

      variables.members = trimmedMembers;
    }

    // Date validation
    if (date_formed) {
      // Format date and validate
      const [year, month, day] = date_formed.split("-");
      const formattedSubmitDate = `${parseInt(month)}/${parseInt(day)}/${year}`;

      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));

      const isValidDate =
        dateObj instanceof Date &&
        !isNaN(dateObj.getTime()) &&
        dateObj.getDate() === Number(day) &&
        dateObj.getMonth() === Number(month) - 1 &&
        dateObj.getFullYear() === Number(year);

      if (!isValidDate) {
        alert("Please enter a valid date (e.g., M/D/YYYY, MM/DD/YYYY).");
        return;
      }
      const originalDate = artist.dateFormed || "";
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
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      console.error("Mutation error:", errorMessage);
      alert(`Failed to edit artist. ${errorMessage}`);
    }
  };

  if (loading) return <p>Updating artist...</p>;

  if (error) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <div>
      <Modal
        open={showEditModal}
        onOpenChange={handleCloseEditModal}
        title="Edit Artist"
        description="Here you can edit artist details like name, date formed, and members."
      >
        <form
          id="edit-artist"
          onSubmit={handleSubmit}
          className="space-y-6 p-4 rounded-xl bg-white/70 backdrop-blur-sm shadow-md"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <br />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Members (comma-separated):
              <br />
              <input
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder="e.g., John, Paul, George, Ringo"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </label>
          </div>

          <br />
          <br />
          <div className="flex justify-end gap-3 pt-4">
            <IconButton
              icon={Check}
              label="Update Artist"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() =>
                document
                  .getElementById("edit-artist")
                  ?.dispatchEvent(
                    new Event("submit", { bubbles: true, cancelable: true })
                  )
              }
            />
            <IconButton
              icon={X}
              label="Cancel"
              onClick={handleCloseEditModal}
              className="text-gray-600 border border-gray-300 hover:bg-gray-100"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditArtistModal;
