"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="mb-10 sm:mb-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">NexTune</h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
          Manage Songs, Albums, Artists & Record Companies
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Songs Card */}
        <Link
          href="/songs"
          className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
            Songs
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            View and manage all songs.
          </p>
        </Link>

        {/* Albums Card */}
        <Link
          href="/albums"
          className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
            Albums
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            View and manage albums collection.
          </p>
        </Link>

        {/* Artists Card */}
        <Link
          href="/artists"
          className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
            Artists
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Browse and edit artists information.
          </p>
        </Link>

        {/* Record Companies Card */}
        <Link
          href="/companies"
          className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
        >
          <h2 className="text-2xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">
            Record Companies
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage record companies data.
          </p>
        </Link>
      </section>

      {/* Future feature placeholder */}
      <section className="mt-16 p-6 bg-blue-50 rounded-lg text-center text-blue-700 font-semibold max-w-2xl mx-auto">
        <p>🎵 Coming Soon: Play songs directly from your collection!</p>
      </section>
    </main>
  );
}
