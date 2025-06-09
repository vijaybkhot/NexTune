import {
  ArtistsDocument,
  ArtistsQuery,
  GetArtistByIdDocument,
  useAddArtistMutation,
} from "@/__generated__/types";
import { useState } from "react";

// Define the type for props
type AddArtistRenderProps = {
  closeAddFormState: () => void;
};

export function AddArtistRender({ closeAddFormState }: AddArtistRenderProps) {
  const [name, setName] = useState<string>("");
  const [date_formed, set_date_formed] = useState<string>("");
  const [members, setMembers] = useState<string>("");

  const [addArtist, { loading: loadingArtist, error: errorArtist }] =
    useAddArtistMutation({
      update(cache, { data }) {
        const newArtist = data?.addArtist;
        if (!newArtist) return;

        // 1. Update GET_ARTISTS cache
        try {
          const existing = cache.readQuery<ArtistsQuery>({
            query: ArtistsDocument,
          });

          if (existing?.artists) {
            cache.writeQuery<ArtistsQuery>({
              query: ArtistsDocument,
              data: {
                artists: [...existing.artists, newArtist],
              },
            });
          }
        } catch (e) {
          // Cache might not have been populated yet
          console.warn("GET_ARTISTS not in cache yet:", e);
        }

        // 2. Update GET_ARTIST_BY_ID cache
        cache.writeQuery({
          query: GetArtistByIdDocument,
          variables: { id: newArtist._id },
          data: {
            getArtistById: newArtist,
          },
        });
      },
    });

  const handleSubmitArtist = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
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

    // Format and validate date
    const [year, month, day] = date_formed.split("-");
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

    try {
      const { data } = await addArtist({
        variables: {
          name: trimmedName,
          dateFormed: formattedSubmitDate,
          members: memberList,
        },
      });

      if (data?.addArtist?.name) {
        alert(`Artist Added: ${data.addArtist.name}`);
        closeAddFormState();
      } else {
        alert("Artist added but no name returned.");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      console.error("Mutation error:", errorMessage);
      alert(`Failed to add artist. ${errorMessage}`);
    }
  };

  if (errorArtist) return <p>Error loading data</p>;
  if (loadingArtist) return <p>Loading data</p>;

  return (
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
            Create Artist
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddArtistRender;
