export default defineEventHandler(async () => {
  if (!import.meta.dev) return;

  const db = useDatabase();

  // drop existing tables
  await db.sql`DROP TABLE IF EXISTS posts`;
  await db.sql`DROP TABLE IF EXISTS users`;

  const migrationsStorage = useStorage("root/server/database/migrations");
  let migrationFiles = await migrationsStorage.getKeys();
  migrationFiles = migrationFiles.filter((key) => key.endsWith(".sql"));

  for (const file of migrationFiles) {
    const migration = (await migrationsStorage.getItem<string>(file)) || "";
    const statements = migration.split("--> statement-breakpoint");
    for (let stmt of statements) {
      stmt = stmt
        .trim()
        .replace("CREATE TABLE", "CREATE TABLE IF NOT EXISTS")
        .replace("CREATE INDEX", "CREATE INDEX IF NOT EXISTS")
        .replace("CREATE UNIQUE INDEX", "CREATE UNIQUE INDEX IF NOT EXISTS");
      await db.prepare(stmt).run();
    }
  }

  return {
    tables: ["users", "posts"],
    message: "Database migrated!",
  };
});
