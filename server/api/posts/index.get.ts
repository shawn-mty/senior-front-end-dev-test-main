import { postSelectQueryHelper } from "~/server/utils";

export type User = typeof tables.users.$inferSelect;
export type Post = typeof tables.posts.$inferSelect;
type PostWithUser = (Partial<Post> & { user?: Partial<User> })[];

export default defineEventHandler(async (event): Promise<PostWithUser> => {
  const payload = validate(
    event,
    z.object({
      include: z
        .literal("user", {
          invalid_type_error: "Include must be the value `user`",
        })
        .optional(),
      limit: z.coerce.number().optional().default(10),
      offset: z.coerce.number().optional().default(0),
      select: z
        .string()
        .optional()
        .default(
          ["image", "title", "publishedAt", "content", "excerpt", "id"].join(
            ","
          )
        ),
      order: z
        .union([z.literal("newestFirst"), z.literal("oldestFirst")])
        .optional(),
    })
  );

  const select = postSelectQueryHelper(payload);

  // Query the Database
  try {
    const query = useDrizzle()
      .select(select)
      .from(tables.posts)
      .limit(payload.limit)
      .offset(payload.offset)
      .orderBy(
        payload.order === "newestFirst"
          ? asc(tables.posts.publishedAt)
          : desc(tables.posts.publishedAt)
      );

    if (payload.include === "user") {
      query.innerJoin(tables.users, eq(tables.posts.userId, tables.users.id));
    }
    return await query;
  } catch (e) {
    console.log(e);
    throw createError({
      status: 500,
      message: "Database Error",
    });
  }
});
