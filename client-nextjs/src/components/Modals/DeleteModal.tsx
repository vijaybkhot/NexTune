"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Reference } from "@apollo/client";
import type {
  Artist,
  Album,
  RecordCompany,
  Song,
} from "@/__generated__/graphql";
import {
  useRemoveArtistMutation,
  useRemoveAlbumMutation,
  useRemoveCompanyMutation,
  useRemoveSongMutation,
} from "@/__generated__/types";
import Modal from "./Modal";
import IconButton from "../IconButton";
import { Trash2, X } from "lucide-react";

type EntityType = "artist" | "album" | "company" | "song";
type Resource = Artist | Album | RecordCompany | Song;

type DeleteModalProps = {
  isOpen: boolean;
  type: EntityType;
  deleteResource: Resource;
  handleClose: () => void;
  redirect?: boolean;
};

function DeleteModal({
  isOpen,
  type,
  deleteResource,
  handleClose,
  redirect,
}: DeleteModalProps) {
  const [resource, setResource] = useState<Resource | null>(null);
  const router = useRouter();

  const capitalizedType = `${type.slice(0, 1).toUpperCase() + type.slice(1)}`;

  useEffect(() => {
    if (isOpen) {
      setResource(deleteResource);
    }
  }, [deleteResource, isOpen]);

  const [removeArtist] = useRemoveArtistMutation({
    update(cache, { data }) {
      const removed = data?.removeArtist;
      if (!removed?._id) return;
      const deletedId = removed._id;
      if (!deletedId) return;
      cache.modify({
        fields: {
          artists(existingArtists = [], { readField }) {
            return existingArtists.filter(
              (ref: Reference) => readField("_id", ref) !== deletedId
            );
          },
        },
      });
      cache.evict({
        id: cache.identify({ __typename: "Artist", _id: deletedId }),
      });
      cache.gc();
    },
  });

  const [removeAlbum] = useRemoveAlbumMutation({
    update(cache, { data }) {
      const removed = data?.removeAlbum;
      if (!removed?._id) return;
      const deletedId = removed._id;
      if (!deletedId) return;
      cache.modify({
        fields: {
          albums(existingAlbums = [], { readField }) {
            return existingAlbums.filter(
              (ref: Reference) => readField("_id", ref) !== deletedId
            );
          },
        },
      });
      cache.evict({
        id: cache.identify({ __typename: "Album", _id: deletedId }),
      });
      cache.gc();
    },
  });

  const [removeCompany] = useRemoveCompanyMutation({
    update(cache, { data }) {
      const removed = data?.removeCompany;
      if (!removed?._id) return;
      const deletedId = removed._id;
      if (!deletedId) return;
      cache.modify({
        fields: {
          recordCompanies(existingCompanies = [], { readField }) {
            return existingCompanies.filter(
              (ref: Reference) => readField("_id", ref) !== deletedId
            );
          },
        },
      });
      cache.evict({
        id: cache.identify({ __typename: "RecordCompany", _id: deletedId }),
      });
      cache.gc();
    },
  });

  const [removeSong] = useRemoveSongMutation({
    update(cache, { data }) {
      const removed = data?.removeSong;
      if (!removed?._id) return;
      const deletedId = removed._id;
      if (!deletedId) return;
      cache.evict({
        id: cache.identify({ __typename: "Song", _id: deletedId }),
      });
      cache.gc();
    },
  });

  const handleDelete = async () => {
    try {
      if (!resource) return;
      if (type === "artist") {
        await removeArtist({ variables: { id: resource._id } });
        alert("Artist deleted successfully.");
      } else if (type === "album") {
        await removeAlbum({ variables: { id: resource._id } });
        alert("Album deleted successfully.");
      } else if (type === "company") {
        await removeCompany({ variables: { id: resource._id } });
        alert("Record company deleted successfully.");
      } else if (type === "song") {
        await removeSong({ variables: { id: resource._id } });
        alert("Song deleted successfully.");
      }

      if (redirect) {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }

      handleClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Delete failed:", err.message);
        alert("Failed to delete resource.");
      } else {
        console.error("Delete failed:", err);
        alert("An unexpected error occurred.");
      }
    }
  };

  const renderMessage = () => {
    if (!resource) return null;

    const name =
      type === "artist" || type === "company"
        ? (resource as Artist | RecordCompany).name
        : (resource as Album | Song).title;

    return (
      <div className="text-center text-gray-800 space-y-2">
        <p className="text-base font-medium">
          Are you sure you want to delete this {type}?
        </p>
        <p className="text-lg font-semibold text-red-600">{name}</p>
      </div>
    );
  };

  const renderButtons = () => {
    return (
      <div className="flex justify-end gap-4 mt-6">
        <IconButton
          icon={X}
          label="Cancel"
          onClick={handleClose}
          className="text-gray-600 border border-gray-300 hover:bg-gray-100"
        />
        <IconButton
          icon={Trash2}
          label={`Delete ${capitalizedType}`}
          onClick={handleDelete}
          className="text-red-600 border border-red-200 hover:bg-red-50"
        />
      </div>
    );
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onOpenChange={handleClose}
        description={`You can delete the selected ${capitalizedType}`}
        title={`Delete ${capitalizedType}`}
      >
        {renderMessage()}
        {renderButtons()}
      </Modal>
    </div>
  );
}

export default DeleteModal;
