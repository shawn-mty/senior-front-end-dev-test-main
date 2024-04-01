import { screen } from "@testing-library/vue";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { formatDate } from "@vueuse/core";
import type { PostWithUser } from "@/types";

import BlogPost from "../components/BlogPost.vue";

const { findByText, getByText, getByAltText } = screen;
const userId = nanoid();
const postId = "123";
const publishedAt = faker.date
  .past({
    years: 1,
    refDate: "2024-01-01T00:00:00.000Z",
  })
  .getTime();
const blogPostContent = faker.lorem.paragraphs(1);
const dummyPost: PostWithUser = {
  image: `https://picsum.photos/seed/${postId}/1920/1080`,
  title: `My Blog Post #${postId}`,
  publishedAt,
  excerpt: faker.lorem.paragraphs(1),
  content: `<p>${blogPostContent}</p>`,
  id: `my-blog-post-${postId}`,
  userId,
  user: {
    id: userId,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    avatar: `https://i.pravatar.cc/150?u=${userId}`,
  },
};

const userFullName = dummyPost.user.firstName + " " + dummyPost.user.lastName;

it("BlogPost renders", async () => {
  renderSuspended(BlogPost, {
    props: {
      post: dummyPost,
    },
  });

  expect(await findByText(dummyPost.title as string)).toBeVisible();
  expect(getByText(userFullName)).toBeVisible();
  expect(
    getByText(formatDate(new Date(publishedAt), "MMM D, YYYY")),
  ).toBeVisible();
  expect(getByText(blogPostContent as string)).toBeVisible();

  const blogImage = getByAltText(dummyPost.title + " image");
  expect(blogImage).toBeVisible();

  const avatarImage = getByAltText(userFullName + "'s avatar image");
  expect(avatarImage).toBeVisible();
});
