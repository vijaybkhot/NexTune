import AddArtistRender from "./AddArtistRender";
import AddCompanyRender from "./AddCompanyRender";
import AddAlbumRender from "./AddAlbumRender";
import AddSongRender from "./AddSongRender";

type AddFormProps = {
  type: "song" | "album" | "artist" | "company";
  closeAddFormState: () => void;
  albumId?: string;
};

function AddForm({ type, closeAddFormState, albumId }: AddFormProps) {
  //------------------------------------------------------------------------

  let body = <div>Loading data ...</div>;

  if (type === "artist") {
    body = <AddArtistRender closeAddFormState={closeAddFormState} />;
  } else if (type === "company") {
    body = <AddCompanyRender closeAddFormState={closeAddFormState} />;
  } else if (type === "album") {
    body = <AddAlbumRender closeAddFormState={closeAddFormState} />;
  } else if (type === "song") {
    body = (
      <AddSongRender closeAddFormState={closeAddFormState} albumId={albumId} />
    );
  }

  //------------------------------------------------------------------------

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {body}
    </div>
  );
}

export default AddForm;
