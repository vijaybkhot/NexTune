import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ObjectId } from "mongodb";
import { addNewSong } from "../services/songServices.js";
import {
  songs as songsCollection,
  albums as albumCollection,
} from "../config/mongoCollections.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function seedSongs(context) {
  const songDataPath = path.join(__dirname, "./data/seed_songs.json");
  const songRawData = fs.readFileSync(songDataPath, "utf-8");
  const songs = JSON.parse(songRawData);

  const albumCol = await albumCollection();
  const albums = await albumCol.find({}).toArray();
  const albumMap = Object.fromEntries(albums.map((a) => [a.title, a._id]));

  for (const song of songs) {
    try {
      const albumId = albumMap[song.albumTitle];
      if (!albumId) {
        console.warn(`Skipping song '${song.title}' due to missing album`);
        continue;
      }

      const songInput = {
        title: song.title,
        duration: song.duration,
        albumId: albumId.toString(),
      };

      const inserted = await addNewSong(null, songInput, context);
      console.log(`✅ Inserted Song: ${inserted.title}`);
    } catch (err) {
      console.error(`❌ Failed to insert song '${song.title}':`, err.message);
    }
  }
}
