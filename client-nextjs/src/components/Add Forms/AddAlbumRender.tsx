import { useState } from "react";
import {
  AlbumsDocument,
  AlbumsQuery,
  Artist,
  ArtistsDocument,
  GetArtistByIdDocument,
  GetCompanyByIdDocument,
  MusicGenre,
  RecordCompaniesDocument,
  RecordCompany,
  useAddAlbumMutation,
  useArtistsQuery,
  useRecordCompaniesQuery,
} from "@/__generated__/types";

// Props type definition
type AddAlbumRenderProps = {
  closeAddFormState: () => void;
};

function AddAlbumRender({ closeAddFormState }: AddAlbumRenderProps) {
  const [title, setTitle] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [genre, setGenre] = useState<MusicGenre>(MusicGenre.Pop);
  const [artistId, setArtistId] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");

  const [addAlbum, { loading: loadingAlbum, error: errorAlbum }] =
    useAddAlbumMutation({
      update(cache, { data }) {
        const newAlbum = data?.addAlbum;
        if (!newAlbum) return;

        try {
          const existing = cache.readQuery<AlbumsQuery>({
            query: AlbumsDocument,
          });

          if (existing?.albums) {
            cache.writeQuery({
              query: AlbumsDocument,
              data: {
                albums: [...existing.albums, newAlbum],
              },
            });
          }
        } catch (e: unknown) {
          if (e instanceof Error) {
            console.error("GET_ALBUMS not in cache yet.", e.message);
          } else {
            console.error("Unexpected error:", e);
          }
        }
      },
      refetchQueries: [
        { query: ArtistsDocument },
        { query: RecordCompaniesDocument },
        {
          query: GetArtistByIdDocument,
          variables: { id: artistId },
        },
        {
          query: GetCompanyByIdDocument,
          variables: { id: companyId },
        },
      ],
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

  const handleSubmitAlbum = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Trim name and members
    const trimmedTitle = title.trim();

    // Validate title
    if (!trimmedTitle) {
      alert("Title cannot be empty or just spaces.");
      return;
    }

    // Format date and validate
    const [year, month, day] = releaseDate.split("-");
    const formattedSubmitDate = `${parseInt(month)}/${parseInt(day)}/${year}`;

    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    const isValidDate =
      !isNaN(dateObj.getTime()) &&
      dateObj.getDate() === Number(day) &&
      dateObj.getMonth() === Number(month) - 1 &&
      dateObj.getFullYear() === Number(year);

    if (!isValidDate) {
      alert("Please enter a valid date (e.g., M/D/YYYY, MM/DD/YYYY).");
      return;
    }

    if (!isValidDate) {
      alert("Please enter a valid date (e.g., M/D/YYYY, MM/DD/YYYY).");
      return;
    }

    // Validate genre
    if (!Object.values(MusicGenre).includes(genre as MusicGenre)) {
      alert("Invalid genre selected.");
      return;
    }

    // Validate artistId and companyId
    if (!artistId || !companyId) {
      alert("Please select both an artist and a company.");
      return;
    }

    try {
      const { data } = await addAlbum({
        variables: {
          title: trimmedTitle,
          releaseDate: formattedSubmitDate,
          genre: genre as MusicGenre,
          artistId,
          companyId,
        },
      });
      if (data?.addAlbum) {
        console.log("New album added:", data.addAlbum.title);
      }
      alert(`Album Added Titled ${data?.addAlbum?.title}`);
      closeAddFormState();
      setTitle("");
      setReleaseDate("");
      setGenre(MusicGenre.Pop);
      setArtistId("");
      setCompanyId("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error("Failed to add album", e.message);
      } else {
        console.error("Unexpected error:", e);
      }
    }
  };

  const artists = artistData?.artists?.filter(
    (artist): artist is Artist => artist !== null
  );
  const recordCompanies = companyData?.recordCompanies?.filter(
    (company): company is RecordCompany => company !== null
  );

  if (!artistData?.artists?.length || !companyData?.recordCompanies?.length) {
    return (
      <div>
        <p>
          ⚠️ Please add at least one artist and one record company before adding
          an album.
        </p>
      </div>
    );
  }
  if (errorAlbum || companyError || artistError)
    return <p>Error loading data</p>;
  if (loadingAlbum || artistLoading || companyLoading)
    return <p>Loading data</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <form onSubmit={handleSubmitAlbum} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Release Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Release Date:
          </label>
          <input
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Genre:
          </label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value as MusicGenre)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">-- Select Genre --</option>
            <option value="POP">Pop</option>
            <option value="ROCK">Rock</option>
            <option value="HIP_HOP">Hip Hop</option>
            <option value="COUNTRY">Country</option>
            <option value="JAZZ">Jazz</option>
            <option value="CLASSICAL">Classical</option>
            <option value="ELECTRONIC">Electronic</option>
            <option value="R_AND_B">R&amp;B</option>
            <option value="INDIE">Indie</option>
            <option value="ALTERNATIVE">Alternative</option>
            <option value="PUNK">Punk</option>
            <option value="METAL">Metal</option>
            <option value="BLUES">Blues</option>
            <option value="FOLK">Folk</option>
            <option value="REGGAE">Reggae</option>
            <option value="LATIN">Latin</option>
            <option value="SOUL">Soul</option>
            <option value="FUNK">Funk</option>
            <option value="DISCO">Disco</option>
            <option value="WORLD">World</option>
            <option value="OPERA">Opera</option>
            <option value="SOUNDTRACK">Soundtrack</option>
            <option value="K_POP">K-Pop</option>
            <option value="EDM">EDM</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Artist */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Artist:
          </label>
          <select
            value={artistId}
            onChange={(e) => setArtistId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">-- Select Artist --</option>
            {artists?.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>

        {/* Record Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Record Company:
          </label>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="">-- Select Company --</option>
            {recordCompanies?.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <br />
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={closeAddFormState}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Album
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAlbumRender;
