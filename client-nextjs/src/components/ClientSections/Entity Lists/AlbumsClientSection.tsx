"use client";

import { useState } from "react";
import EntityClientSection from "@/components/ClientSections/Entity Lists/EntitiesClientSection";
import { useAlbumsQuery } from "@/__generated__/types";
import type { Album } from "@/__generated__/types";

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
  if (!albums.length)
    return <p className="text-center py-10 text-gray-500">No albums found.</p>;

  return (
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
  );
}
