import type { PostWithUser, Post, User } from "@/types";
import { postSelectQueryHelper } from "~/server/utils";

export default defineEventHandler(async (event): Promise<PostWithUser> => {
  const id = String(getRouterParam(event, "id"));

  const payload = validate(
    event,
    z.object({
      include: z.literal("user").optional(),
      select: z
        .string()
        .optional()
        .default(
          ["image", "title", "publishedAt", "content", "excerpt", "id"].join(
            ","
          )
        ),
    })
  );

  const select = postSelectQueryHelper(payload);

  const query = useDrizzle()
    .select(select)
    .from(tables.posts)
    .where(eq(tables.posts.id, id))
    .limit(1);

  if (payload.include === "user") {
    query.innerJoin(tables.users, eq(tables.posts.userId, tables.users.id));
  }

  const post = await query;

  if (!post.at(0)) {
    throw createError({
      status: 404,
      message: "Post not found",
    });
  }

  return post.at(0);
});
