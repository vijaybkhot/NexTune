import ReactModal from "react-modal";
import queries from "../queries";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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

function DeleteModal({ isOpen, type, deleteResource, handleClose, redirect }) {
  const [resource, setResource] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setResource(deleteResource);
    }
  }, [deleteResource, isOpen]);

  const [removeArtist] = useMutation(queries.DELETE_ARTIST, {
    update(cache, { data: { removeArtist } }) {
      const deletedId = removeArtist._id;
      cache.modify({
        fields: {
          artists(existingArtists = [], { readField }) {
            return existingArtists.filter(
              (ref) => readField("_id", ref) !== removeArtist._id
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

  const [removeAlbum] = useMutation(queries.DELETE_ALBUM, {
    update(cache, { data: { removeAlbum } }) {
      const deletedId = removeAlbum._id;

      // remove from get albums
      cache.modify({
        fields: {
          albums(existingAlbums = [], { readField }) {
            return existingAlbums.filter(
              (albumRef) => readField("_id", albumRef) !== deletedId
            );
          },
        },
      });

      //Remove GET_ALBUM_BY_ID cache
      cache.evict({
        id: cache.identify({ __typename: "Album", _id: deletedId }),
      });
      cache.gc();
    },
  });

  const [removeCompany] = useMutation(queries.DELETE_COMPANY, {
    update(cache, { data: { removeCompany } }) {
      const deletedId = removeCompany._id;
      cache.modify({
        fields: {
          companies(existingCompany = [], { readField }) {
            return existingCompany.filter(
              (ref) => readField("_id", ref) !== removeCompany._id
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

  const [removeSong] = useMutation(queries.DELETE_SONG, {
    update(cache, { data: { removeSong } }) {
      const deletedId = removeSong._id;

      //Remove GET_SONG_BY_ID cache
      cache.evict({
        id: cache.identify({ __typename: "Song", _id: deletedId }),
      });
      cache.gc();
    },
  });

  const handleDelete = async () => {
    try {
      if (type === "artist") {
        await removeArtist({ variables: { id: resource._id } });
        alert("Artist deleted successfully.");
      } else if (type == "album") {
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
          navigate(-1);
        } else {
          navigate("/");
        }
      }
      handleClose();
    } catch (err) {
      console.error("Delete failed:", err.message);
      alert("Failed to delete resource.");
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel={`Delete ${type}`}
      style={customStyles}
      onRequestClose={handleClose}
    >
      {/* Delete Artist Modal */}
      {type === "artist" && resource && (
        <>
          <p>
            Are you sure you want to delete <strong>{resource.name}</strong>?
          </p>

          <div className="button-group">
            <button className="button danger" onClick={handleDelete}>
              Delete Artist
            </button>
            <button className="button cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Delete Company Modal */}
      {type === "company" && resource && (
        <>
          <p>
            Are you sure you want to delete <strong>{resource.name}</strong>?
          </p>

          <div className="button-group">
            <button className="button danger" onClick={handleDelete}>
              Delete Record Company
            </button>
            <button className="button cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Delete Album modal */}
      {type === "album" && resource && (
        <>
          <p>
            Are you sure you want to delete <strong>{resource.title}</strong>?
          </p>

          <div className="button-group">
            <button className="button danger" onClick={handleDelete}>
              Delete Album
            </button>
            <button className="button cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </>
      )}

      {/* Delete Song Modal */}
      {type === "song" && resource && (
        <>
          <p>
            Are you sure you want to delete <strong>{resource.title}</strong>?
          </p>

          <div className="button-group">
            <button className="button danger" onClick={handleDelete}>
              Delete Song
            </button>
            <button className="button cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </>
      )}
    </ReactModal>
  );
}

export default DeleteModal;
