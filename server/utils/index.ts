import type { H3Event } from "h3";
import type { AnyZodObject, infer } from "zod";
import type { User, Post, PostWithUser } from "~/types";
export { z } from "zod";
import { z, ZodError } from "zod";

export function validate<T extends AnyZodObject>(
  event: H3Event,
  schema: T
): z.infer<T> {
  try {
    const query = getQuery(event);
    return schema.parse(query);
  } catch (err) {
    if (err instanceof ZodError) {
      throw createError({
        status: 422,
        message: "Invalid request",
        data: err.formErrors.fieldErrors,
        statusMessage: "Unprocessable Entity",
      });
    }
    throw err;
  }
}

export function postSelectQueryHelper(payload: {
  select: string;
  include?: "user" | undefined;
}) {
  const selectQuery = payload.select
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s);
  const selectEnum = z.enum([
    "image",
    "title",
    "publishedAt",
    "content",
    "excerpt",
    "id",
    "user.avatar",
    "user.firstName",
    "user.email",
    "user.lastName",
    "user.id",
  ] as const);

  selectQuery.forEach((field) => {
    if (!selectEnum.safeParse(field).success) {
      throw createError({
        status: 422,
        message: "Invalid request",
        data: {
          select: "Invalid select field",
        },
      });
    }
  });

  const select: Record<any, any> = {};

  selectQuery.forEach((field) => {
    if (field.startsWith("user.")) {
      if (payload.include !== "user") {
        throw createError({
          status: 422,
          message: "Invalid request",
          data: {
            select: "You can't select user fields without including user",
          },
        });
      }

      // @ts-ignore this works because of the starts with check
      select[field] = tables.users[field.split(".")[1]];
      return;
    } else {
      // @ts-ignore this works because of the starts with check
      select[field] = tables.posts[field];
    }
  });

  if (payload.include === "user") {
    select.user = tables.users;
  }

  return select;
}
