import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Artists from "./pages/Artists";
import ArtistById from "./pages/ArtistById";
import Home from "./pages/Home";
import Albums from "./pages/Albums";
import AlbumById from "./pages/AlbumById";
import Search from "./pages/Search";
import ReactModal from "react-modal";
import RecordCompanies from "./pages/RecordCompanies";
import RecordCompanyById from "./pages/RecordCompanyById";
import SongById from "./pages/SongById";

ReactModal.setAppElement("#root");

function App() {
  return (
    <>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/artists" className="nav-link">
              Artists
            </NavLink>
          </li>
          <li>
            <NavLink to="/albums" className="nav-link">
              Albums
            </NavLink>
          </li>
          <li>
            <NavLink to="/companies" className="nav-link">
              Record Companies
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className="nav-link">
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/artists/:id" element={<ArtistById />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<AlbumById />} />
        <Route path="/companies" element={<RecordCompanies />} />
        <Route path="/companies/:id" element={<RecordCompanyById />} />
        <Route path="/songs/:id" element={<SongById />} />
        <Route path="/search/" element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
