import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <header>
        <h1>🎵 Welcome to Music-Fi</h1>
        <p>
          A platform to manage artists, albums, songs, and record companies.
        </p>
      </header>

      <section>
        <Link to={`/artists`}>
          <h2>🎤 Artists</h2>
        </Link>
        <p>
          View, add, edit, or delete musical artists and their associated
          albums.
        </p>
      </section>

      <section>
        <Link to={`/albums`}>
          <h2>💿 Albums</h2>
        </Link>
        <p>
          Explore albums by genre, manage album details, and view associated
          songs.
        </p>
      </section>

      <section>
        <h2>🎶 Songs</h2>
        <p>
          Add new tracks to albums, edit song details, or remove songs when
          needed.
        </p>
      </section>

      <section>
        <Link to={`/companies`}>
          <h2>🏢 Record Companies</h2>
        </Link>
        <p>
          Track music labels, their founding details, and albums they've
          released.
        </p>
      </section>
    </div>
  );
}

export default Home;
