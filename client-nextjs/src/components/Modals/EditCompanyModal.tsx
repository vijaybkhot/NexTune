import React, { useEffect, useState } from "react";
import {
  EditCompanyMutationVariables,
  RecordCompany,
  useEditCompanyMutation,
} from "@/__generated__/types";
import Modal from "./Modal";
import IconButton from "../IconButton";
import { Check, X } from "lucide-react";

type EditCompanyModalProps = {
  isOpen: boolean;
  company: RecordCompany;
  handleClose: () => void;
};

function EditCompanyModal({
  isOpen,
  company,
  handleClose,
}: EditCompanyModalProps) {
  const [showEditModal, setShowEditModal] = useState(isOpen);
  const [editCompany, { loading, error }] = useEditCompanyMutation();

  const [name, setName] = useState<string>("");
  const [foundedYear, setFoundedYear] = useState<number>(2025);
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    if (company) {
      setName(company.name || "");

      setFoundedYear(company.foundedYear || 2025);
      setCountry(company.country || "N/A");
    }
  }, [company]);

  useEffect(() => {
    setShowEditModal(isOpen);
  }, [isOpen]);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setName("");
    setFoundedYear(2025);
    setCountry("");
    handleClose();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const variables: EditCompanyMutationVariables = { id: company._id };

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
      const trimmedCountry = country.trim();
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
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      console.error("Mutation error:", errorMessage);
      alert(`Failed to edit record company. ${errorMessage}`);
    }
  };

  if (loading) return <p>Updating Record Company...</p>;

  if (error) return <p style={{ color: "red" }}>{error.message}</p>;

  return (
    <div>
      <Modal
        open={showEditModal}
        onOpenChange={handleCloseEditModal}
        title="Edit Record Company"
        description="Here you can edit record company details like name, founded year, and country."
      >
        <form
          className="space-y-6 p-4 rounded-xl bg-white/70 backdrop-blur-sm shadow-md"
          id="edit-company"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name:
              <br />
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />
            </label>
          </div>
          <br />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Founded Year:
            <input
              type="number"
              value={foundedYear}
              onChange={(e) => setFoundedYear(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="e.g., 1999"
            />
          </label>
          <br />

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country:
              <br />
              <input
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter the coutry of origin for the record company"
              />
            </label>
          </div>

          <br />
          <br />
          <div className="flex justify-end gap-3 pt-4">
            <IconButton
              icon={Check}
              label="Update Record Company"
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() =>
                document
                  .getElementById("edit-company")
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

export default EditCompanyModal;
