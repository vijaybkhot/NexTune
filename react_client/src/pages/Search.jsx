import { useLazyQuery } from "@apollo/client";
import queries from "../queries";
import { useState } from "react";
import DataCard from "../components/DataCard";

function Search() {
  // Albums by genre search and
  const [albumsByGenre, { loading: loadingAlbums, error: errorAlbums }] =
    useLazyQuery(queries.ALBUMS_BY_GENRE, {
      fetchPolicy: "cache-and-network",
    });
  const [showAlbumsSearch, setShowAlbumsSearch] = useState(false);
  const [genre, setGenre] = useState("");
  const [showSearchedAlbums, setShowSearchedAlbums] = useState(false);
  const [searchedAlbums, setSearchedAlbums] = useState([]);

  const handleShowAlbumsSearch = () => {
    setShowAlbumsSearch(true);
    setShowArtistsSearch(false);
    setShowCompaniesSearch(false);
    setShowSongsSearch(false);
  };

  const handleAlbumGenreSubmit = async (e) => {
    e.preventDefault();

    if (!genre) {
      alert("Please select a genre to search albums.");
      setSearchedAlbums([]);
      setShowSearchedAlbums(false);
      return;
    }

    let variables = { genre };
    try {
      const { data } = await albumsByGenre({ variables });
      setSearchedAlbums(data.albumsByGenre);
      setShowSearchedAlbums(true);
    } catch (err) {
      console.error("Search error:", err.message);
      alert(`Failed to search albums. ${err.message}`);
    }
  };

  // Artist By Name state and queries and handlers --------------------------------------
  const [artistsByName, { loading: loadingArtists, error: errorArtists }] =
    useLazyQuery(queries.SEARCH_ARTIST_BY_NAME, {
      fetchPolicy: "cache-and-network",
    });
  const [showArtistsSearch, setShowArtistsSearch] = useState(false);
  const [showSearchedArtists, setShowSearchedArtists] = useState(false);
  const [searchedArtists, setSearchedArtists] = useState([]);
  const [artistName, setArtistName] = useState("");

  const handleShowArtistSearch = () => {
    setShowArtistsSearch(true);
    setShowAlbumsSearch(false);
    setShowCompaniesSearch(false);
    setShowSongsSearch(false);
  };

  const handleArtistNameSubmit = async (e) => {
    e.preventDefault();
    let trimmedSearchTerm = artistName.trim();

    if (!trimmedSearchTerm) {
      alert(
        "Search term for artist name cannot be empty or just blank spaces."
      );
      setSearchedArtists([]);
      setShowSearchedArtists(false);
      return;
    }

    let variables = { searchTerm: trimmedSearchTerm };
    try {
      const { data } = await artistsByName({ variables });
      setSearchedArtists(data.searchArtistByArtistName);
      setShowSearchedArtists(true);
    } catch (err) {
      console.error("Search error:", err.message);
      alert(`Failed to search artists. ${err.message}`);
    }
  };

  // Company By Name state and queries and handlers --------------------------------------
  const [
    companiesByFoundedYear,
    { loading: loadingCompanies, error: errorCompanies },
  ] = useLazyQuery(queries.COMPANIES_BY_FOUNDED_YEAR, {
    fetchPolicy: "cache-and-network",
  });
  const [showCompaniesSearch, setShowCompaniesSearch] = useState(false);
  const [minYear, setMinYear] = useState(1900);
  const [maxYear, setMaxYear] = useState("");
  const [showSearchedCompanies, setShowSearchedCompanies] = useState(false);
  const [searchedCompanies, setSearchedCompanies] = useState([]);

  const handleShowCompaniesSearch = () => {
    setShowCompaniesSearch(true);
    setShowAlbumsSearch(false);
    setShowArtistsSearch(false);
    setShowSongsSearch(false);
  };
  const handleCompaniesRangeSubmit = async (e) => {
    e.preventDefault();

    const min = parseInt(minYear);
    const max = parseInt(maxYear);

    if (isNaN(min) || isNaN(max) || min < 1900 || max > 2025 || max < min) {
      alert(
        "Company founded year should be an integer between 1900 and 2025. And the 'To Founded Year' should be greater than or equal to the 'From Founded Year'"
      );
      setMinYear(1900);
      setMaxYear("");
      setShowSearchedCompanies(false);
      return;
    }

    let variables = { min, max };
    try {
      const { data } = await companiesByFoundedYear({ variables });
      console.log(data);
      setSearchedCompanies(data.companyByFoundedYear);
      setShowSearchedCompanies(true);
    } catch (err) {
      console.error("Search error:", err.message);
      alert(`Failed to search Companies. ${err.message}`);
    }
  };

  // Song By title state and queries and handlers --------------------------------------

  const [songByTitle, { loading: loadingSongs, error: errorSongs }] =
    useLazyQuery(queries.SEARCH_SONG_BY_TITLE, {
      fetchPolicy: "cache-and-network",
    });
  const [showSongsSearch, setShowSongsSearch] = useState(false);
  const [showSearchedSongs, setShowSearchedSongs] = useState(false);
  const [searchedSongs, setSearchedSongs] = useState([]);
  const [songTitle, setSongTitle] = useState("");

  const handleShowSongSearch = () => {
    setShowSongsSearch(true);
    setShowAlbumsSearch(false);
    setShowCompaniesSearch(false);
    setShowArtistsSearch(false);
  };

  const handleSongTitleSubmit = async (e) => {
    e.preventDefault();
    let trimmedSearchTerm = songTitle.trim();

    if (!trimmedSearchTerm) {
      alert("Search term for song name cannot be empty or just blank spaces.");
      setSearchedSongs([]);
      setShowSearchedSongs(false);
      return;
    }

    let variables = { searchTitleTerm: trimmedSearchTerm };
    try {
      const { data } = await songByTitle({ variables });
      setSearchedSongs(data.searchSongByTitle);
      setShowSearchedSongs(true);
    } catch (err) {
      console.error("Search error:", err.message);
      alert(`Failed to search songs. ${err.message}`);
    }
  };

  const handleReset = () => {
    setArtistName("");
    setShowArtistsSearch(false);
    setShowSearchedArtists(false);
    setSearchedArtists([]);

    setMinYear(1900);
    setMaxYear("");
    setShowCompaniesSearch(false);
    setShowSearchedCompanies(false);
    setSearchedCompanies([]);

    setGenre("");
    setShowAlbumsSearch(false);
    setShowSearchedAlbums(false);
    setSearchedAlbums([]);
  };

  if (loadingAlbums || loadingArtists || loadingCompanies || loadingSongs) {
    return <div>Loading search results</div>;
  }

  if (errorAlbums || errorArtists || errorCompanies || errorSongs) {
    return <div>Error loading search results! </div>;
  }
  return (
    <div>
      {!showAlbumsSearch && !showArtistsSearch && !showCompaniesSearch && (
        <div>
          <button onClick={handleShowAlbumsSearch}>
            Search Albums By Genre
          </button>
          <button onClick={handleShowArtistSearch}>
            Search Artists By Name
          </button>
          <button onClick={handleShowCompaniesSearch}>
            Search Companies By Founded Year Range
          </button>
          <button onClick={handleShowSongSearch}>Search Songs By Title</button>
        </div>
      )}

      {showArtistsSearch && (
        <div>
          <form onSubmit={handleArtistNameSubmit}>
            <label htmlFor="artist name">
              Please enter artist name to search
              <input
                type="text"
                name="artistName"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
              />
            </label>
            <button type="submit">Search Artists</button>
            <button type="button" onClick={handleReset}>
              Reset Search
            </button>{" "}
          </form>
        </div>
      )}
      {showSearchedArtists &&
        (searchedArtists.length > 0 ? (
          <div className="artist-grid">
            {searchedArtists.map((artist) => (
              <DataCard
                key={artist._id}
                data={artist}
                type={"artist"}
                search={true}
              />
            ))}
          </div>
        ) : (
          <div>No results found for the search query</div>
        ))}

      {showAlbumsSearch && (
        <div>
          <form onSubmit={handleAlbumGenreSubmit}>
            <label htmlFor="genre">
              Please select genre to search albums
              <div className="form-group">
                <label htmlFor="genre selection">
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
            </label>
            <button type="submit">Search Albums</button>
            <button type="button" onClick={handleReset}>
              Reset Search
            </button>
          </form>
        </div>
      )}
      {showSearchedAlbums &&
        (searchedAlbums.length > 0 ? (
          <div className="artist-grid">
            {searchedAlbums.map((album) => (
              <DataCard
                key={album._id}
                data={album}
                type={"album"}
                search={true}
              />
            ))}
          </div>
        ) : (
          <div>No results found for the search query</div>
        ))}

      {showCompaniesSearch && (
        <div>
          <form onSubmit={handleCompaniesRangeSubmit}>
            <label>
              Please select a range of founded year to search for companies
              <div className="form-group">
                <label htmlFor="from founded year">
                  From Founded Year:
                  <br />
                  <input
                    type="number"
                    value={minYear}
                    onChange={(e) => setMinYear(Number(e.target.value))}
                    className="form-control"
                  />
                  <br />
                </label>

                <label htmlFor="to founded year">
                  To Founded Year:
                  <br />
                  <input
                    type="number"
                    value={maxYear}
                    onChange={(e) => setMaxYear(Number(e.target.value))}
                    className="form-control"
                  />
                  <br />
                </label>
              </div>
            </label>
            <button type="submit">Search Companies</button>
            <button type="button" onClick={handleReset}>
              Reset Search
            </button>
          </form>
        </div>
      )}
      {showSearchedCompanies &&
        (searchedCompanies.length > 0 ? (
          <div className="artist-grid">
            {searchedCompanies.map((company) => (
              <DataCard
                key={company._id}
                data={company}
                type={"company"}
                search={true}
              />
            ))}
          </div>
        ) : (
          <div>No results found for the search query</div>
        ))}

      {showSongsSearch && (
        <div>
          <form onSubmit={handleSongTitleSubmit}>
            <label htmlFor="song title">
              Please enter song title to search
              <input
                type="text"
                name="songTitle"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
              />
            </label>
            <button type="submit">Search Songs</button>
            <button type="button" onClick={handleReset}>
              Reset Search
            </button>
          </form>
        </div>
      )}
      {showSearchedSongs &&
        (searchedSongs.length > 0 ? (
          <div className="artist-grid">
            {searchedSongs.map((song) => (
              <DataCard
                key={song._id}
                data={song}
                type={"song"}
                search={true}
              />
            ))}
          </div>
        ) : (
          <div>No results found for the search query</div>
        ))}
    </div>
  );
}

export default Search;
