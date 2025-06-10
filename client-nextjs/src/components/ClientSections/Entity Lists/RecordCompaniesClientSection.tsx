"use client";

import { useState } from "react";
import EntityClientSection from "@/components/ClientSections/Entity Lists/EntitiesClientSection";
import { RecordCompany, useRecordCompaniesQuery } from "@/__generated__/types";
import AddForm from "@/components/Add Forms/AddForm";
import IconButton from "@/components/IconButton";
import { Plus } from "lucide-react";

export default function RecordCompaniesClientSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<RecordCompany | null>(
    null
  );

  const { data, loading, error } = useRecordCompaniesQuery({
    fetchPolicy: "cache-and-network",
  });

  const companies = data?.recordCompanies || [];

  const handleEditClick = (recordCompany: RecordCompany) => {
    setSelectedCompany(recordCompany);
    setShowEditModal(true);
  };

  const handleDeleteClick = (recordCompany: RecordCompany) => {
    setSelectedCompany(recordCompany);
    setShowDeleteModal(true);
  };

  const handleCloseModals = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const toggleAddForm = () => {
    setShowAddForm((prev) => !prev);
  };

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error: {error.message}</p>
    );
  if (!companies.length)
    return (
      <div>
        {/* Create Button */}
        <div className="mb-6 flex justify-end">
          <IconButton
            icon={Plus}
            label={`Add Record Company`}
            onClick={toggleAddForm}
            className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2 rounded-md transition-colors"
          />
        </div>
        {/* Add Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddForm type={"company"} closeAddFormState={toggleAddForm} />
          </div>
        )}
        <p className="text-center py-10 text-gray-500">
          No Record Company found. Please add a new record company to view.
        </p>
      </div>
    );

  return (
    <EntityClientSection
      type="company"
      data={companies as RecordCompany[]}
      onEdit={handleEditClick}
      onDelete={handleDeleteClick}
      selectedItem={selectedCompany}
      showEditModal={showEditModal}
      showDeleteModal={showDeleteModal}
      handleCloseModals={handleCloseModals}
      toggleAddForm={toggleAddForm}
      showAddForm={showAddForm}
      setSelectedItem={setSelectedCompany}
    />
  );
}
