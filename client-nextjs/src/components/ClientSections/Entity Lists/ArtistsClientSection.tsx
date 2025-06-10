"use client";

import { useState } from "react";
import EntityClientSection from "@/components/ClientSections/Entity Lists/EntitiesClientSection";
import { Artist, useArtistsQuery } from "@/__generated__/types";
import AddForm from "@/components/Add Forms/AddForm";
import IconButton from "@/components/IconButton";
import { Plus } from "lucide-react";

export default function ArtistsClientSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const { data, loading, error } = useArtistsQuery({
    fetchPolicy: "cache-and-network",
  });

  const artists = data?.artists || [];

  const handleEditClick = (artist: Artist) => {
    setSelectedArtist(artist);
    setShowEditModal(true);
  };

  const handleDeleteClick = (artist: Artist) => {
    setSelectedArtist(artist);
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
  if (!artists.length)
    return (
      <div>
        {/* Create Button */}
        <div className="mb-6 flex justify-end">
          <IconButton
            icon={Plus}
            label={`Add Artist`}
            onClick={toggleAddForm}
            className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2 rounded-md transition-colors"
          />
        </div>
        {/* Add Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddForm type={"artist"} closeAddFormState={toggleAddForm} />
          </div>
        )}
        <p className="text-center py-10 text-gray-500">
          No Artists found. Please add a new artist to view.
        </p>
      </div>
    );

  return (
    <EntityClientSection
      type="artist"
      data={artists as Artist[]}
      onEdit={handleEditClick}
      onDelete={handleDeleteClick}
      selectedItem={selectedArtist}
      showEditModal={showEditModal}
      showDeleteModal={showDeleteModal}
      handleCloseModals={handleCloseModals}
      toggleAddForm={toggleAddForm}
      showAddForm={showAddForm}
      setSelectedItem={setSelectedArtist}
    />
  );
}
