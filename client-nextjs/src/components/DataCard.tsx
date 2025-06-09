import type {
  Album,
  Artist,
  Song,
  RecordCompany,
} from "@/__generated__/graphql";
import Link from "next/link";
import IconButton from "./IconButton";
import { Pencil, Trash2 } from "lucide-react";
import { Entity } from "./ClientSections/Entity Lists/EntitiesClientSection";

export type DataCardProps<T extends Entity> = {
  data: T;
  type: "album" | "artist" | "song" | "company";
  search?: boolean;
  onEditClick?: (item: T) => void;
  onDeleteClick?: (item: T) => void;
  className?: string;
};

function DataCard<T extends Album | Artist | Song | RecordCompany>({
  data,
  type,
  search,
  onEditClick,
  onDeleteClick,
  className = "",
}: DataCardProps<T>) {
  let url = "";
  let title = "";
  let content = null;

  if (type === "album") {
    const album = data as Album;
    url = `/albums/${album._id}`;
    title = album.title;
    content = (
      <div className="grid gap-1 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Genre:
          </span>{" "}
          {album.genre}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Artist:
          </span>{" "}
          {album?.artist?.name}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Released:
          </span>{" "}
          {album.releaseDate}
        </p>
      </div>
    );
  }

  if (type === "artist") {
    const artist = data as Artist;
    url = `/artists/${artist._id}`;
    title = artist.name;
    content = (
      <div className="grid gap-1 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Members:
          </span>{" "}
          {artist.members.join(", ")}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Albums:
          </span>{" "}
          {artist.numOfAlbums}
        </p>
      </div>
    );
  }

  if (type === "song") {
    const song = data as Song;
    url = `/songs/${song._id}`;
    title = song.title;
    content = (
      <div className="grid gap-1 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Duration:
          </span>{" "}
          {song.duration}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Album:
          </span>{" "}
          {song.album?.title}
        </p>
      </div>
    );
  }

  if (type === "company") {
    const company = data as RecordCompany;
    url = `/companies/${company._id}`;
    title = company.name;
    content = (
      <div className="grid gap-1 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Founded:
          </span>{" "}
          {company.foundedYear}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Country:
          </span>{" "}
          {company.country}
        </p>
        <p>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Albums:
          </span>{" "}
          {company.numOfAlbums}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        bg-white dark:bg-gray-900 
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition-shadow duration-300
        p-6
        flex flex-col justify-between
        ${className}
      `}
    >
      <Link href={url} className="no-underline hover:underline">
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </Link>
      {content}
      {!search && (
        <div className="mt-6 flex gap-4">
          {onEditClick && (
            <IconButton
              icon={Pencil}
              label="Edit"
              onClick={() => onEditClick?.(data)}
              className="text-blue-600 hover:text-blue-700 rounded-md px-3 py-2 border border-blue-200 hover:bg-blue-50"
            />
          )}
          {onDeleteClick && (
            <IconButton
              icon={Trash2}
              label="Delete"
              onClick={() => onDeleteClick?.(data)}
              className="text-red-600 hover:text-red-700 rounded-md px-3 py-2 border border-red-200 hover:bg-red-50"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default DataCard;
