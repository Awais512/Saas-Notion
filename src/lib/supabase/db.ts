import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL is not set");
}

const client = postgres(process.env.DATABASE_URL as string, {
  max: 1,
});

const db = drizzle(client, {
  schema,
});

const migrateDb = async () => {
  console.log("Migrating Client");
  try {
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("🚀 Successfully migrated...");
  } catch (error) {
    console.log(error);
  }
};

migrateDb();

export default db;
