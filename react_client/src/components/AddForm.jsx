import { useMutation, useQuery } from "@apollo/client";
import queries from "../queries";
import { useState } from "react";

function AddForm({ type, closeAddFormState }) {
  // Artist state and queries -----------------------------------------------------
  const [name, setName] = useState("");
  const [date_formed, set_date_formed] = useState("");
  const [members, setMembers] = useState("");

  const [addArtist, { loading: loadingArtist, error: errorArtist }] =
    useMutation(queries.ADD_ARTIST, {
      update(cache, { data: { addArtist } }) {
        // Update GET_ARTISTS list
        try {
          const { artists } = cache.readQuery({
            query: queries.GET_ARTISTS,
          });
          cache.writeQuery({
            query: queries.GET_ARTISTS,
            data: { artists: [...artists, addArtist] },
          });
        } catch (e) {
          // do nothing is GET_ARTISTS is not cached yet
          console.log(e);
        }
        // Also write to GET_ARTIST_BY_ID
        cache.writeQuery({
          query: queries.GET_ARTIST_BY_ID,
          variables: { id: addArtist._id },
          data: { getArtistById: addArtist },
        });
      },
    });

  const handleSubmitArtist = async (e) => {
    e.preventDefault();

    // Trim name and members
    const trimmedName = name.trim();
    const memberList = members
      .split(",")
      .map((m) => m.trim())
      .filter((m) => m !== "");

    // Validate name
    if (!trimmedName) {
      alert("Name cannot be empty or just spaces.");
      return;
    }

    // Validate members
    const nameRegex = /^[A-Za-z\s]+$/;
    const invalidMembers = memberList.filter((m) => !nameRegex.test(m));
    if (invalidMembers.length > 0) {
      alert("Member names must only contain letters and spaces (A-Z, a-z).");
      return;
    }

    // Format date and validate
    const [year, month, day] = date_formed.split("-");
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

    try {
      const { data } = await addArtist({
        variables: {
          name: trimmedName,
          dateFormed: formattedSubmitDate,
          members: memberList,
        },
      });

      alert(`Artist Added for ${data.name}`);
      closeAddFormState();
    } catch (err) {
      console.error("Mutation error:", err.message);
      alert(`Failed to add artist. ${err.message}`);
    }
  };

  // Album state and queries -----------------------------------------------------
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [artistId, setArtistId] = useState("");
  const [companyId, setCompanyId] = useState("");

  const [addAlbum, { loading: loadingAlbum, error: errorAlbum }] = useMutation(
    queries.ADD_ALBUM,
    {
      update(cache, { data: { addAlbum } }) {
        //update GET_ALBUMS cache
        const { albums } = cache.readQuery({ query: queries.GET_ALBUMS });
        cache.writeQuery({
          query: queries.GET_ALBUMS,
          data: { albums: [...albums, addAlbum] },
        });
      },
      // Update other related queries by refetching
      refetchQueries: [
        { query: queries.GET_ARTISTS },
        { query: queries.GET_COMPANIES },
        {
          query: queries.GET_ARTIST_BY_ID,
          variables: { id: artistId },
        },
        {
          query: queries.GET_COMPANY_BY_ID,
          variables: { id: companyId },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

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

  const handleSubmitAlbum = async (e) => {
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
      dateObj instanceof Date &&
      !isNaN(dateObj) &&
      dateObj.getDate() === Number(day) &&
      dateObj.getMonth() === Number(month) - 1 &&
      dateObj.getFullYear() === Number(year);

    if (!isValidDate) {
      alert("Please enter a valid date (e.g., M/D/YYYY, MM/DD/YYYY).");
      return;
    }

    // Validate genre
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

    // Validate genre
    if (!genre || !validGenres.includes(genre)) {
      alert("Please select a valid genre.");
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
          genre,
          artistId,
          companyId,
        },
      });
      console.log(data);
      alert(`Album Added Titled ${trimmedTitle}`);
      closeAddFormState();
      setTitle("");
      setReleaseDate("");
      setGenre("");
      setArtistId("");
      setCompanyId("");
    } catch (err) {
      console.error("Mutation error:", err.message);
      alert(`Failed to add artist. ${err.message}`);
    }
  };

  // Record Company state and queries -----------------------------------------------------
  const [companyName, setCompanyName] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [country, setCountry] = useState("");

  const [addCompany, { loading: loadingCompany, error: errorCompany }] =
    useMutation(queries.ADD_COMPANY, {
      update(cache, { data: { addCompany } }) {
        // Update GET_COMPANIES list
        try {
          const { recordCompanies } = cache.readQuery({
            query: queries.GET_COMPANIES,
          });
          cache.writeQuery({
            query: queries.GET_COMPANIES,
            data: { recordCompanies: [...recordCompanies, addCompany] },
          });
        } catch (e) {
          // do nothing if GET_COMPANIES is not cached yet
          console.log(e);
        }
        // Also write to GET_COMPANY_BY_ID
        cache.writeQuery({
          query: queries.GET_COMPANY_BY_ID,
          variables: { id: addCompany._id },
          data: { getCompanyById: addCompany },
        });
      },
    });

  const handleSubmitCompany = async (e) => {
    e.preventDefault();

    // Trim name and members
    const trimmedCompanyName = companyName.trim();

    // Validate name
    if (!trimmedCompanyName) {
      alert("Record company name cannot be empty or just spaces.");
      return;
    }

    // Validate founded year
    if (
      !Number.isInteger(foundedYear) ||
      foundedYear < 1900 ||
      foundedYear > 2025
    ) {
      alert("Company founded year should be an integer between 1900 and 2025.");
      return;
    }

    // Validate country
    let trimmedCountry = country.trim();
    if (trimmedCountry === "") {
      alert("Country cannot be empty or blank spaces.");
    }

    try {
      const { data } = await addCompany({
        variables: {
          name: trimmedCompanyName,
          foundedYear: foundedYear,
          country: trimmedCountry,
        },
      });
      console.log("data", data);
      alert(`Company Added named ${data.addCompany.name}`);
      closeAddFormState();
    } catch (err) {
      console.error("Mutation error:", err.message);
      alert(`Failed to add artist. ${err.message}`);
    }
  };

  // Song state and queries -----------------------------------------------------

  const [songTitle, setSongTitle] = useState("");
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const [albumId, setAlbumId] = useState("");

  const [addSong, { loading: loadingSong, error: errorSong }] = useMutation(
    queries.ADD_SONG,
    {
      refetchQueries: [
        {
          query: queries.GET_ALBUM_BY_ID,
          variables: { id: albumId },
        },
      ],
      awaitRefetchQueries: true,
    }
  );

  const handleSubmitSong = async (e) => {
    e.preventDefault();

    const trimmedTitle = songTitle.trim();

    if (!trimmedTitle) {
      alert("Song title cannot be empty or just spaces.");
      return;
    }

    if (
      !Number.isInteger(min) ||
      min < 0 ||
      !Number.isInteger(sec) ||
      sec < 0 ||
      sec >= 60 ||
      (min === 0 && sec === 0)
    ) {
      alert("Duration must be valid minutes and seconds (0-59).");
      return;
    }

    if (!albumId) {
      alert("Please select an album for the song.");
      return;
    }

    const paddedSec = sec.toString().padStart(2, "0");
    const formattedDuration = `${min}:${paddedSec}`;

    try {
      const { data } = await addSong({
        variables: {
          title: trimmedTitle,
          duration: formattedDuration,
          albumId,
        },
      });

      alert(`Song "${data.addSong.title}" added successfully!`);
      closeAddFormState();
      setSongTitle("");
      setMin(0);
      setSec(0);
    } catch (err) {
      console.error("Mutation error:", err.message);
      alert(`Failed to add song. ${err.message}`);
    }
  };

  const {
    data: albumData,
    loading: albumLoading,
    error: albumError,
  } = useQuery(queries.GET_ALBUMS, {
    fetchPolicy: "cache-and-network",
  });

  //------------------------------------------------------------------------

  let body = null;
  if (type === "artist") {
    body = (
      <div>
        <form onSubmit={handleSubmitArtist}>
          <div className="form-group">
            <label>
              Name:
              <br />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus={true}
              />
            </label>
          </div>
          <br />
          <input
            type="date"
            value={date_formed}
            onChange={(e) => set_date_formed(e.target.value)}
            className="form-control"
          />
          <br />

          <div className="form-group">
            <label>
              Members (comma-separated):
              <br />
              <input
                value={members}
                onChange={(e) => setMembers(e.target.value)}
                placeholder="e.g., John, Paul, George, Ringo"
              />
            </label>
          </div>

          <br />
          <br />
          <button className="button add-button" type="submit">
            Create Artist
          </button>
        </form>
      </div>
    );
  } else if (type === "company") {
    body = (
      <div>
        <form onSubmit={handleSubmitCompany}>
          <div className="form-group">
            <label>
              Record Company Name:
              <br />
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                autoFocus={true}
              />
            </label>
          </div>
          <br />

          <label>
            Company Founded Year:
            <br />
            <input
              type="number"
              value={foundedYear}
              onChange={(e) => setFoundedYear(Number(e.target.value))}
              className="form-control"
            />
          </label>
          <br />

          <div className="form-group">
            <label>
              Country:
              <br />
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter the coutry of origin for the record company"
              />
            </label>
          </div>

          <br />
          <br />
          <button className="button add-button" type="submit">
            Create Record Company
          </button>
        </form>
      </div>
    );
  } else if (type === "album") {
    let artists = artistData?.artists || [];
    let recordCompanies = companyData?.recordCompanies || [];
    body = (
      <div>
        <form onSubmit={handleSubmitAlbum}>
          <div className="form-group">
            {/* TItle */}
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
          {/* Release date */}
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
                {artists &&
                  artists.map((artist) => {
                    return (
                      <option key={artist._id} value={artist._id}>
                        {artist.name}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
          <br />
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
                  -- Please select a record company --
                </option>
                {recordCompanies &&
                  recordCompanies.map((company) => {
                    return (
                      <option key={company._id} value={company._id}>
                        {company.name}
                      </option>
                    );
                  })}
              </select>
            </label>
          </div>
          <br />
          <br />
          <button className="button add-button" type="submit">
            Create Album
          </button>
        </form>
      </div>
    );
  } else if (type === "song") {
    body = (
      <div>
        <form onSubmit={handleSubmitSong}>
          <div className="form-group">
            <label>
              Title:
              <br />
              <input
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                autoFocus={true}
                required
              />
            </label>
          </div>
          <br />

          <div className="form-group">
            <label>
              Duration (min:sec):
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <input
                  type="number"
                  min="0"
                  value={min}
                  onChange={(e) => setMin(Number(e.target.value))}
                  placeholder="Minutes"
                  className="form-control"
                  style={{ width: "80px" }}
                  required
                />
                <span>:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={sec}
                  onChange={(e) => setSec(Number(e.target.value))}
                  placeholder="Seconds"
                  className="form-control"
                  style={{ width: "80px" }}
                  required
                />
              </div>
            </label>
          </div>

          <div className="form-group">
            <label>
              Album:
              <select
                className="form-control"
                id="albumId"
                value={albumId}
                onChange={(e) => setAlbumId(e.target.value)}
                required
              >
                <option value="" disabled>
                  -- Please select an album --
                </option>
                {albumData?.albums.map((album) => (
                  <option key={album._id} value={album._id}>
                    {album.title}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <br />

          <br />
          <button className="button add-button" type="submit">
            Create Song
          </button>
        </form>
      </div>
    );
  }
  if (
    loadingArtist ||
    loadingAlbum ||
    loadingCompany ||
    artistLoading ||
    companyLoading ||
    loadingSong ||
    albumLoading
  )
    return <p>Loading...</p>;
  if (
    errorArtist ||
    errorAlbum ||
    errorCompany ||
    artistError ||
    companyError ||
    errorSong ||
    albumError
  )
    return <p>Error loading data</p>;
  return <div>{body}</div>;
}

export default AddForm;
