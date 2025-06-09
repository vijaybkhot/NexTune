import DataCard from "@/components/DataCard";
import type { Song } from "@/types/graphql";

type SongListProps = {
  songs: Song[];
  onEdit: (song: Song) => void;
  onDelete: (song: Song) => void;
};

export default function SongList({ songs, onEdit, onDelete }: SongListProps) {
  return (
    <>
      <hr />
      <h2>Songs:</h2>
      {songs.length > 0 ? (
        <ul>
          {songs.map((song) => (
            <li key={song._id} className="song-item">
              <DataCard
                type="song"
                data={song}
                onEditClick={() => onEdit(song)}
                onDeleteClick={() => onDelete(song)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No songs added to this album yet.</p>
      )}
    </>
  );
}
