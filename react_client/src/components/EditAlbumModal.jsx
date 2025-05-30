import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useMutation, useQuery } from "@apollo/client";
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

function EditAlbumModal({ isOpen, album, handleClose }) {
  //   const [showEditModal, setShowEditModal] = useState(isOpen);
  const [editAlbum, { loading, error }] = useMutation(queries.EDIT_ALBUM, {
    update(cache, { data: { editAlbum } }) {
      try {
        const { albums } = cache.readQuery({ query: queries.GET_ALBUMS });
        const updatedAlbums = albums.map((album) =>
          album._id === editAlbum._id ? editAlbum : album
        );

        cache.writeQuery({
          query: queries.GET_ALBUMS,
          data: { albums: updatedAlbums },
        });
      } catch (e) {
        console.log(
          e,
          "GET_ALBUMS not found in cache. Nothing to cache update."
        );
      }

      // update GET_ALBUM_BY_ID
      cache.writeQuery({
        query: queries.GET_ALBUM_BY_ID,
        variables: { id: editAlbum._id },
        data: { getAlbumById: editAlbum },
      });
    },

    awaitRefetchQueries: true,
  });

  const {
    data: artistData,
    loading: artistLoading,
    error: artistError,
  } = useQuery(queries.GET_ARTISTS, {
    fetchPolicy: "cache-and-network",
  });

  const {
    data: companyData,
    loading: companyLoading,
    error: companyError,
  } = useQuery(queries.GET_COMPANIES, {
    fetchPolicy: "cache-and-network",
  });

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [artistId, setArtistId] = useState("");
  const [companyId, setCompanyId] = useState("");

  useEffect(() => {
    if (album) {
      setTitle(album.title || "");
      const rawDate = album.releaseDate || "1/1/2025";
      setReleaseDate(convertToInputDateFormat(rawDate));
      setGenre(album.genre || "");
      setArtistId(album.artist?._id || "");
      setCompanyId(album.recordCompany?._id || "");
    }
  }, [album]);

  const handleCloseEditModal = () => {
    setTitle("");
    setReleaseDate("");
    setGenre("");
    setArtistId("");
    setCompanyId("");
    handleClose();
  };

  // Sumbit handler function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const variables = { id: album._id };

    // Title validation
    const trimmedTitle = title.trim();
    if (trimmedTitle && trimmedTitle !== album.title.trim()) {
      if (!trimmedTitle) {
        alert("Title cannot be just spaces.");
        return;
      }
      variables.title = trimmedTitle;
    }

    // Release date validation
    if (releaseDate) {
      const [year, month, day] = releaseDate.split("-");
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

      if (formattedSubmitDate !== album.releaseDate) {
        variables.releaseDate = formattedSubmitDate;
      }
    }

    // Genre validation
    const validGenres = [
      "POP",
      "ROCK",
      "HIP_HOP",
      "COUNTRY",
      "JAZZ",
      "CLASSICAL",
      "ELECTRONIC",
      "R_AND_B",
      "INDIE",
      "ALTERNATIVE",
    ];
    if (genre && genre !== album.genre) {
      if (!validGenres.includes(genre)) {
        alert("Please select a valid genre.");
        return;
      }
      variables.genre = genre;
    }

    // Artist ID
    if (artistId && artistId !== album.artist._id) {
      variables.artistId = artistId;
    }

    // Company ID
    if (companyId && companyId !== album.recordCompany._id) {
      variables.companyId = companyId;
    }

    // No changes detected
    if (Object.keys(variables).length === 1) {
      alert("No changes detected.");
      return;
    }

    try {
      await editAlbum({
        variables,
        // Refetch related queries
        refetchQueries: [
          { query: queries.GET_ARTISTS },
          { query: queries.GET_COMPANIES },
          {
            query: queries.GET_ARTIST_BY_ID,
            variables: { id: variables.artistId || album.artist._id },
          },
          {
            query: queries.GET_COMPANY_BY_ID,
            variables: { id: variables.companyId || album.recordCompany._id },
          },
        ],
        awaitRefetchQueries: true,
      });
      alert("Album updated successfully!");
      handleClose();
    } catch (err) {
      console.error("Mutation error:", err.message);
      alert(`Failed to update album. ${err.message}`);
    }
  };

  if (loading || artistLoading || companyLoading) return <p>Loading...</p>;
  if (error || artistError || companyError) return <p>Error loading data</p>;

  return (
    <div>
      <ReactModal
        name="editAlbumModal"
        isOpen={isOpen}
        contentLabel="Edit Album"
        style={customStyles}
      >
        <form className="form" id="edit-album" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label>
              Title:
              <br />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus={true}
                required
              />
            </label>
          </div>
          <br />

          {/* Release Date */}
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="form-control"
            required
          />
          <br />

          {/* Genre */}
          <div className="form-group">
            <label>
              Genre:
              <br />
              <select
                className="form-control"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              >
                <option value="">-- Select Genre --</option>
                <option value="POP">Pop</option>
                <option value="ROCK">Rock</option>
                <option value="HIP_HOP">Hip Hop</option>
                <option value="COUNTRY">Country</option>
                <option value="JAZZ">Jazz</option>
                <option value="CLASSICAL">Classical</option>
                <option value="ELECTRONIC">Electronic</option>
                <option value="R_AND_B">R&B</option>
                <option value="INDIE">Indie</option>
                <option value="ALTERNATIVE">Alternative</option>
              </select>
            </label>
          </div>
          <br />

          {/* Artist */}
          <div className="form-group">
            <label>
              Artist:
              <select
                className="form-control"
                id="artistId"
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Please select an artist --
                </option>
                {artistData?.artists.map((artist) => (
                  <option key={artist._id} value={artist._id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br />

          {/* Record Company */}
          <div className="form-group">
            <label>
              Record Company:
              <select
                className="form-control"
                id="companyId"
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Please select a record company for the album --
                </option>
                {companyData?.recordCompanies.map((company) => (
                  <option key={company._id} value={company._id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br />
          <br />
          <button className="button add-button" type="submit">
            Update Album
          </button>
        </form>

        <button className="button cancel-button" onClick={handleCloseEditModal}>
          Cancel
        </button>
      </ReactModal>
    </div>
  );
}

export default EditAlbumModal;
