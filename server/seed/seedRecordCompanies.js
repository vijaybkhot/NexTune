import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createNewCompany } from "../services/recordCompaniesServices.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Main seed function
export async function seedRecordCompanies(context) {
  const dataPath = path.join(__dirname, "./data/seed_recordCompanies.json");

  let rawData;
  try {
    rawData = fs.readFileSync(dataPath, "utf-8");
  } catch (err) {
    console.error(
      "❌ Failed to read seed_record_companies.json file:",
      err.message
    );
    return;
  }

  let data;
  try {
    data = JSON.parse(rawData);
  } catch (err) {
    console.error(
      "❌ Failed to parse JSON data from seed_record_companies.json:",
      err.message
    );
    return;
  }

  for (const recordCompany of data) {
    try {
      const inserted = await createNewCompany(null, recordCompany, context);
      console.log(`✅ Inserted: ${inserted.name}`);
    } catch (error) {
      console.error(
        `❌ Failed to insert record company: ${recordCompany.name}`,
        error.message
      );
    }
  }
}
