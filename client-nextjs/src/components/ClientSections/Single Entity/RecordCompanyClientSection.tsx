"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Album } from "@/__generated__/graphql";
import DeleteModal from "@/components/Modals/DeleteModal";
import EditCompanyModal from "@/components/Modals/EditCompanyModal";
import DataCard from "@/components/DataCard";
import { RecordCompany, useGetCompanyByIdQuery } from "@/__generated__/types";

export default function RecordCompanyClientSection({
  companyId,
}: {
  companyId: string;
}) {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const {
    data: companyData,
    loading: companyLoading,
    error: companyError,
  } = useGetCompanyByIdQuery({
    variables: { id: companyId },
    fetchPolicy: "cache-and-network",
  });

  const company = companyData?.getCompanyById;
  const renderedAlbums = useMemo(() => {
    if (!company?.albums?.length) return <p>No albums found.</p>;

    return (
      <ul className="space-y-4">
        {company.albums.map((album) => (
          <li key={album._id}>
            <DataCard type="album" data={album as Album} />
          </li>
        ))}
      </ul>
    );
  }, [company?.albums]);

  if (companyLoading) return <p>Loading...</p>;
  if (companyError || !company) return <p>Error loading Company.</p>;

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <Link
        href="/companies"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        ← Back
      </Link>

      <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
      <p className="text-gray-700">
        <strong>Founded:</strong> {company.foundedYear}
      </p>
      <p className="text-gray-700">
        <strong>Country:</strong> {company.country}
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Albums Released:</strong> {company.numOfAlbums ?? 0}
      </p>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          🗑 Delete
        </button>
      </div>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">Albums</h2>
      {company.albums && company.albums.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderedAlbums}
        </ul>
      ) : (
        <p className="text-gray-600">No albums available.</p>
      )}

      {/* Modals */}
      {showEditModal && (
        <EditCompanyModal
          isOpen={showEditModal}
          company={company as RecordCompany}
          handleClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          type="company"
          deleteResource={company as RecordCompany}
          handleClose={() => setShowDeleteModal(false)}
          redirect
        />
      )}
    </div>
  );
}
