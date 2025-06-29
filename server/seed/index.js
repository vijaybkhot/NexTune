import { seedArtists } from "./seedArtists.js";
import {
  connectToRedis,
  client as redisClient,
} from "../config/redisClientConnection.js";
import connectDB from "../config/db.js";
import { seedRecordCompanies } from "../seed/seedRecordCompanies.js";
import { seedAlbums } from "../seed/seedAlbums.js";
import { seedSongs } from "../seed/seedSongs.js";

(async () => {
  try {
    const connection = await connectDB();

    // ✅ Drop database once
    await connection.db.dropDatabase();
    console.log("🗑️  Dropped existing database");

    await connectToRedis();
    const context = { redisClient };

    await seedArtists(context);
    await seedRecordCompanies(context);
    await seedAlbums(context);
    await seedSongs(context);

    console.log("✅ All seeds completed");
    await redisClient.quit();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
})();
