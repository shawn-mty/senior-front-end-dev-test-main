import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  email: text("email"),
  avatar: text("avatar"),
});

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  image: text("image"),
  title: text("title"),
  publishedAt: integer("publishedAt"),
  content: text("content"),
  excerpt: text("excerpt"),
  userId: text("userId").references(() => users.id),
});
