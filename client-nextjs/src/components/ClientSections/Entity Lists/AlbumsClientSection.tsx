"use client";

import { useState } from "react";
import EntityClientSection from "@/components/ClientSections/Entity Lists/EntitiesClientSection";
import { useAlbumsQuery } from "@/__generated__/types";
import type { Album } from "@/__generated__/types";
import IconButton from "@/components/IconButton";
import { Plus } from "lucide-react";
import AddForm from "@/components/Add Forms/AddForm";

export default function AlbumsClientSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  const { data, loading, error } = useAlbumsQuery({
    fetchPolicy: "cache-and-network",
  });

  const albums = data?.albums || [];

  const handleEditClick = (album: Album) => {
    setSelectedAlbum(album);
    setShowEditModal(true);
  };

  const handleDeleteClick = (album: Album) => {
    setSelectedAlbum(album);
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
  if (!albums.length) {
    return (
      <div>
        {/* Create Button */}
        <div className="mb-6 flex justify-end">
          <IconButton
            icon={Plus}
            label={`Add Album`}
            onClick={toggleAddForm}
            className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2 rounded-md transition-colors"
          />
        </div>
        {/* Add Form */}
        {showAddForm && (
          <div className="mb-8">
            <AddForm type={"album"} closeAddFormState={toggleAddForm} />
          </div>
        )}
        <p className="text-center py-10 text-gray-500">No albums found.</p>
      </div>
    );
  }

  return (
    <div>
      <EntityClientSection
        type="album"
        data={albums as Album[]}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        selectedItem={selectedAlbum}
        showEditModal={showEditModal}
        showDeleteModal={showDeleteModal}
        handleCloseModals={handleCloseModals}
        toggleAddForm={toggleAddForm}
        showAddForm={showAddForm}
        setSelectedItem={setSelectedAlbum}
      />
    </div>
  );
}
