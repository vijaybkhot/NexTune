import Link from "next/link";

export default function AlbumDetails({ album }: { album: any }) {
  return (
    <>
      <h1>{album.title}</h1>
      <p>
        <strong>Release Date:</strong> {album.releaseDate}
      </p>
      <p>
        <strong>Genre:</strong> {album.genre}
      </p>

      <p>
        <strong>Artist:</strong>{" "}
        <Link href={`/artists/${album.artist._id}`}>{album.artist.name}</Link>
      </p>

      <p>
        <strong>Record Company:</strong>{" "}
        <Link href={`/companies/${album.recordCompany._id}`}>
          {album.recordCompany.name}
        </Link>
      </p>
    </>
  );
}
