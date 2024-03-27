import { drizzle } from "drizzle-orm/better-sqlite3";
export { sql, eq, and, or, desc, asc } from "drizzle-orm";

// @ts-ignore - this works fine
import Database from "better-sqlite3";

import * as schema from "../database/schema";
export const tables = schema;

let db: InstanceType<typeof Database>;

export function useDrizzle() {
  if (!db) {
    db = new Database(`${process.cwd()}/.data/db.sqlite3`);
  }
  return drizzle(db, { schema });
}

export type User = typeof schema.users.$inferSelect;
export type Post = typeof schema.posts.$inferSelect;
