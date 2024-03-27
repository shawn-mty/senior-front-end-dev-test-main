import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: ".data/db.sqlite3",
  },
});
