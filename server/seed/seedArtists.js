import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createNewArtist } from "../services/artistServices.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load JSON data

export async function seedArtists(context) {
  const dataPath = path.join(__dirname, "./data/seed_artists.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const data = JSON.parse(rawData);

  for (const artist of data) {
    try {
      const inserted = await createNewArtist(null, artist, context);
      console.log(`✅ Inserted: ${inserted.name}`);
    } catch (error) {
      console.error(
        `❌ Failed to insert artist: ${artist.name}`,
        error.message
      );
    }
  }
}
