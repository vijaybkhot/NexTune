export default function AlbumActions({
  onEdit,
  onDelete,
  onAddSong,
}: {
  onEdit: () => void;
  onDelete: () => void;
  onAddSong: () => void;
}) {
  return (
    <div className="action-buttons">
      <button onClick={onEdit}>✏️ Edit Album</button>
      <button onClick={onDelete}>🗑 Delete Album</button>
      <button onClick={onAddSong}>🎵 Add a New Song</button>
    </div>
  );
}
