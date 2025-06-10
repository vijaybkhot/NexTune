import React, { useEffect, useState } from "react";
import {
  MusicGenre,
  useArtistsQuery,
  useEditAlbumMutation,
  useRecordCompaniesQuery,
} from "@/__generated__/types";
import {
  AlbumsDocument,
  ArtistsDocument,
  EditAlbumMutationVariables,
  GetAlbumByIdDocument,
  GetArtistByIdDocument,
  GetCompanyByIdDocument,
  RecordCompaniesDocument,
} from "@/__generated__/graphql";
import Modal from "./Modal";

type AlbumPreview = {
  _id: string;
  title: string;
  releaseDate: string;
  genre: MusicGenre;
  artist: {
    _id: string;
    name: string;
  };
  recordCompany: {
    _id: string;
    name: string;
  };
  songs: {
    _id: string;
    title: string;
  }[];
};

type EditAlbumModalProps = {
  isOpen: boolean;
  album: AlbumPreview;
  handleClose: () => void;
};

// Function to reformat incoming date
const convertToInputDateFormat = (mdyDate: string) => {
  const [month, day, year] = mdyDate.split("/");
  const paddedMonth = month.padStart(2, "0");
  const paddedDay = day.padStart(2, "0");
  return `${year}-${paddedMonth}-${paddedDay}`;
};

function EditAlbumModal({ isOpen, album, handleClose }: EditAlbumModalProps) {
  // const [showEditModal, setShowEditModal] = useState<boolean>(isOpen);
  const [editAlbum, { loading, error }] = useEditAlbumMutation({
    refetchQueries: (result) => {
      const updatedAlbum = result.data?.editAlbum;
      if (!updatedAlbum) return [];

      return [
        { query: AlbumsDocument },
        {
          query: GetAlbumByIdDocument,
          variables: { id: updatedAlbum._id },
        },
      ];
    },
    awaitRefetchQueries: true,
  });

  const {
    data: artistData,
    loading: artistLoading,
    error: artistError,
  } = useArtistsQuery({
    fetchPolicy: "cache-and-network",
  });

  const {
    data: companyData,
    loading: companyLoading,
    error: companyError,
  } = useRecordCompaniesQuery({
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
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!album?._id) {
      alert("Album data is missing.");
      return;
    }

    const variables: EditAlbumMutationVariables = { id: album._id };

    // Title validation
    const trimmedTitle = title.trim();
    if (trimmedTitle && trimmedTitle !== album?.title?.trim()) {
      if (!trimmedTitle) {
        alert("Title cannot be just spaces.");
        return;
      }
      variables.title = trimmedTitle;
    }

    // Release date validation
    if (releaseDate) {
      const [year, month, day] = releaseDate.split("-");
      const m = Number(month);
      const d = Number(day);
      const y = Number(year);
      const formattedSubmitDate = `${m}/${d}/${y}`;

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
      variables.genre = genre as MusicGenre;
    }

    // Artist ID
    if (artistId && artistId !== album?.artist?._id) {
      variables.artistId = artistId;
    }

    // Company ID
    if (companyId && companyId !== album?.recordCompany?._id) {
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
        refetchQueries: [
          { query: ArtistsDocument },
          { query: RecordCompaniesDocument },
          {
            query: GetArtistByIdDocument,
            variables: { id: variables.artistId || album?.artist?._id },
          },
          {
            query: GetCompanyByIdDocument,
            variables: { id: variables.companyId || album?.recordCompany?._id },
          },
        ],
        awaitRefetchQueries: true,
      });
      alert("Album updated successfully!");
      handleClose();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      console.error("Mutation error:", errorMessage);
      alert(`Failed to edit album. ${errorMessage}`);
    }
  };

  if (loading || artistLoading || companyLoading) return <p>Loading...</p>;
  if (error || artistError || companyError) return <p>Error loading data</p>;

  return (
    <div>
      <Modal
        open={isOpen}
        onOpenChange={handleCloseEditModal}
        title="Edit Album"
        description="Here you can edit album details like title, artist, and release date."
      >
        <form
          id="edit-album"
          onSubmit={handleSubmit}
          className="space-y-6 p-4 rounded-xl bg-white/70 backdrop-blur-sm shadow-md"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Release Date
            </label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
          </div>

          {/* Artist */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Artist
            </label>
            <select
              value={artistId}
              onChange={(e) => setArtistId(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="" disabled>
                -- Please select an artist --
              </option>
              {artistData?.artists?.map((artist) => (
                <option key={artist?._id} value={artist?._id}>
                  {artist?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Record Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Record Company
            </label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option value="" disabled>
                -- Please select a record company --
              </option>
              {companyData?.recordCompanies?.map((company) => (
                <option key={company?._id} value={company?._id}>
                  {company?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4 pt-4">
            <button
              type="button"
              onClick={handleCloseEditModal}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              Update Album
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default EditAlbumModal;
