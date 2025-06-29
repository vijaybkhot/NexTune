import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { addAlbum } from "../services/albumServices.js";
import {
  artists as artistsCollection,
  recordcompanies as recordcompaniesCollection,
} from "../config/mongoCollections.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedAlbums(context) {
  const albumDataPath = path.join(__dirname, "./data/seed_albums.json");
  const albumRawData = fs.readFileSync(albumDataPath, "utf-8");
  const albums = JSON.parse(albumRawData);

  const artistCol = await artistsCollection();
  const artists = await artistCol.find({}).toArray();

  const companyCol = await recordcompaniesCollection();
  const companies = await companyCol.find({}).toArray();

  const artistMap = Object.fromEntries(artists.map((a) => [a.name, a._id]));
  const companyMap = Object.fromEntries(companies.map((c) => [c.name, c._id]));

  for (const album of albums) {
    try {
      const artistId = artistMap[album.artistName];
      const companyId = companyMap[album.companyName];

      if (!artistId || !companyId) {
        console.warn(
          `Skipping album ${album.title} due to missing artist or company`
        );
        continue;
      }

      const albumInput = {
        title: album.title,
        releaseDate: album.releaseDate,
        genre: album.genre,
        artistId: artistId.toString(),
        companyId: companyId.toString(),
      };

      const inserted = await addAlbum(null, albumInput, context);
      console.log(`✅ Inserted Album: ${inserted.title}`);
    } catch (err) {
      console.error(`❌ Failed to insert album ${album.title}:`, err.message);
    }
  }
}
