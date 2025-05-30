import { Link } from "react-router-dom";

function DataCard({ data, onEditClick, onDeleteClick, type, search }) {
  if (type === "artist") {
    return (
      <div className="artist-card">
        <Link to={`/artists/${data._id}`}>
          <h2>{data.name}</h2>
        </Link>
        <p>Members: {data.members.join(", ")}</p>
        <p>Number of Albums: {data.numOfAlbums}</p>
        {!search && (
          <>
            <button onClick={() => onEditClick(data)}>Edit Artist</button>
            <button onClick={() => onDeleteClick(data)}>Delete Artist</button>
          </>
        )}
      </div>
    );
  } else if (type === "album") {
    return (
      <div className="artist-card">
        <Link to={`/albums/${data._id}`}>
          <h2>{data.title}</h2>
        </Link>
        <p>Genre: {data.genre}</p>
        <p>Artist: {data.artist.name}</p>
        <p>Released on: {data.releaseDate}</p>
        {!search && (
          <>
            <button onClick={() => onEditClick(data)}>Edit Album</button>
            <button onClick={() => onDeleteClick(data)}>Delete Album</button>
          </>
        )}
      </div>
    );
  } else if (type === "company") {
    return (
      <div className="artist-card">
        <Link to={`/companies/${data._id}`}>
          <h2>{data.name}</h2>
        </Link>
        <p>Founded Year: {data.foundedYear}</p>
        <p>Country: {data.country}</p>
        <p>Number of Albums: {data.numOfAlbums}</p>

        {!search && (
          <>
            <button onClick={() => onEditClick(data)}>Edit Company</button>
            <button onClick={() => onDeleteClick(data)}>Delete Company</button>
          </>
        )}
      </div>
    );
  } else if (type === "song") {
    return (
      <div className="artist-card">
        <Link to={`/songs/${data._id}`}>
          <h2>{data.title}</h2>
        </Link>
        <p>Duration: {data.duration}</p>
        <p>Album: {data.album?.title}</p>
        {!search && (
          <>
            {/* <button onClick={() => onEditClick(data)}>Edit Song</button> */}
            <button onClick={() => onDeleteClick(data)}>Delete Song</button>
          </>
        )}
      </div>
    );
  }
}

export default DataCard;
