"use client";

import DataCard from "@/components/DataCard";
import EditAlbumModal from "@/components/Modals/EditAlbumModal";
import DeleteModal from "@/components/Modals/DeleteModal";
import AddForm from "@/components/Add Forms/AddForm";
import { Album, Artist, RecordCompany, Song } from "@/__generated__/types";
import EditArtistModal from "@/components/Modals/EditArtistModal";
import EditCompanyModal from "@/components/Modals/EditCompanyModal";
import IconButton from "@/components/IconButton";
import { Plus } from "lucide-react";

export type Entity = Album | Artist | Song | RecordCompany;
type EntityType = "album" | "artist" | "song" | "company";

type EntitiesClientSectionProps<T extends Entity> = {
  type: EntityType;
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  selectedItem: T | null;
  showEditModal: boolean;
  showDeleteModal: boolean;
  handleCloseModals: () => void;
  toggleAddForm: () => void;
  showAddForm: boolean;
  setSelectedItem: (item: T) => void;
};

export default function EntityClientSection<T extends Entity>({
  type,
  data,
  onEdit,
  onDelete,
  selectedItem,
  showEditModal,
  showDeleteModal,
  handleCloseModals,
  toggleAddForm,
  showAddForm,
  setSelectedItem,
}: EntitiesClientSectionProps<T>) {
  const renderEditModal = () => {
    if (!showEditModal || !selectedItem) return null;

    switch (type) {
      case "album":
        return (
          <EditAlbumModal
            isOpen={showEditModal}
            album={selectedItem as Album}
            handleClose={handleCloseModals}
          />
        );
      case "artist":
        return (
          <EditArtistModal
            isOpen={showEditModal}
            artist={selectedItem as Artist}
            handleClose={handleCloseModals}
          />
        );
      case "company":
        return (
          <EditCompanyModal
            isOpen={showEditModal}
            company={selectedItem as RecordCompany}
            handleClose={handleCloseModals}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Create Button */}
      <div className="mb-6 flex justify-end">
        <IconButton
          icon={Plus}
          label={`Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
          onClick={toggleAddForm}
          className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 px-4 py-2 rounded-md transition-colors"
        />
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-8">
          <AddForm type={type} closeAddFormState={toggleAddForm} />
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item) => (
          <DataCard
            key={item._id}
            data={item}
            type={type}
            onEditClick={(item) => {
              setSelectedItem(item);
              onEdit(item);
            }}
            onDeleteClick={(item) => {
              setSelectedItem(item);
              onDelete(item);
            }}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow"
          />
        ))}
      </div>

      {/* Conditional Modals */}
      {renderEditModal()}

      {showDeleteModal && selectedItem && (
        <DeleteModal
          type={type}
          isOpen={showDeleteModal}
          deleteResource={selectedItem}
          handleClose={handleCloseModals}
          redirect={false}
        />
      )}
    </div>
  );
}
