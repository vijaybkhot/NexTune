import {
  GetCompanyByIdDocument,
  RecordCompaniesDocument,
  RecordCompaniesQuery,
  useAddCompanyMutation,
} from "@/__generated__/types";
import { useState } from "react";

type AddCompanyRenderProps = {
  closeAddFormState: () => void;
};

function AddCompanyRender({ closeAddFormState }: AddCompanyRenderProps) {
  const [companyName, setCompanyName] = useState<string>("");
  const [foundedYear, setFoundedYear] = useState<number>(0);
  const [country, setCountry] = useState<string>("");

  const [addCompany, { loading: loadingCompany, error: errorCompany }] =
    useAddCompanyMutation({
      update(cache, { data }) {
        const newCompany = data?.addCompany;
        if (!newCompany) return;
        // Update GET_COMPANIES list
        try {
          const existing = cache.readQuery<RecordCompaniesQuery>({
            query: RecordCompaniesDocument,
          });
          if (existing && "recordCompanies" in existing) {
            cache.writeQuery({
              query: RecordCompaniesDocument,
              data: {
                recordCompanies: [
                  ...(existing.recordCompanies ?? []),
                  newCompany,
                ],
              },
            });
          }
        } catch (e) {
          // do nothing if GET_COMPANIES is not cached yet
          console.log(e);
        }
        // Also write to GET_COMPANY_BY_ID
        cache.writeQuery({
          query: GetCompanyByIdDocument,
          variables: { id: newCompany._id },
          data: { getCompanyById: newCompany },
        });
      },
    });

  const handleSubmitCompany = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Trim name and members
    const trimmedCompanyName = companyName.trim();

    // Validate name
    if (!trimmedCompanyName) {
      alert("Record company name cannot be empty or just spaces.");
      return;
    }

    // Validate founded year
    const year = Number(foundedYear);

    if (!Number.isInteger(year) || year < 1900 || year > 2025) {
      alert("Company founded year should be an integer between 1900 and 2025.");
      return;
    }

    // Validate country
    const trimmedCountry = country.trim();
    if (trimmedCountry === "") {
      alert("Country cannot be empty or blank spaces.");
    }

    try {
      const { data } = await addCompany({
        variables: {
          name: trimmedCompanyName,
          foundedYear: year,
          country: trimmedCountry,
        },
      });
      if (data?.addCompany) {
        alert(`Company Added named ${data.addCompany.name}`);
      }
      closeAddFormState();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred.";
      console.error("Mutation error:", errorMessage);
      alert(`Failed to add record company. ${errorMessage}`);
    }
  };

  if (errorCompany) return <p>Error loading data</p>;
  if (loadingCompany) return <p>Loading data</p>;

  return (
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
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setFoundedYear(isNaN(value) ? 0 : value);
            }}
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
            Create Company
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCompanyRender;
