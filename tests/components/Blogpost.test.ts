import BlogPost from "../components/BlogPost.vue";
import { screen } from "@testing-library/vue";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import "@testing-library/jest-dom";
import type { Post, User } from "@/types";
const { findByText, getByText, getByAltText, getByTestId } = screen;

const userId = "ctWipK8KQV9RHpZnPQxuH";
const dummyPost: Required<Post> & { user: Required<User> } = {
  image: "https://picsum.photos/seed/my-blog-post-554/1920/1080",
  title: "My Blog Post #554",
  publishedAt: 1711465191148,
  content:
    "<p>Advoco solio videlicet combibo quia deserunt comburo amplexus venio corroboro. Stella solium vitae depono vix. Tumultus vae veniam adeptio viridis depopulo.</p>",
  excerpt:
    "Advoco solio videlicet combibo quia deserunt comburo amplexus venio corroboro. Stella solium vitae d...",
  id: "my-blog-post-554",
  userId,
  user: {
    id: userId,
    firstName: "Clint",
    lastName: "Schultz",
    email: "Tatyana_Windler88@gmail.com",
    avatar: "https://i.pravatar.cc/150?u=ctWipK8KQV9RHpZnPQxuH",
  },
};

const encodeQuestionMark = (str: string) => str.replace(/\?/g, "%3F");

const userFullName = dummyPost.user.firstName + " " + dummyPost.user.lastName;

test("BlogPost renders", async () => {
  renderSuspended(BlogPost, {
    props: {
      post: dummyPost,
    },
  });

  expect(await findByText(dummyPost.title)).toBeVisible();
  expect(getByText(userFullName)).toBeVisible();
  expect(getByText("5 days ago")).toBeVisible();
  expect(getByText(dummyPost.excerpt)).toBeVisible();

  const blogImage = getByAltText(dummyPost.title + " image");
  expect(blogImage).toHaveAttribute(
    "src",
    "/_ipx/f_webp&s_840x480/" + dummyPost.image,
  );

  const avatarImage = getByAltText(userFullName + "'s avatar image");
  expect(avatarImage).toHaveAttribute(
    "src",
    "/_ipx/f_webp&s_40x40/" + encodeQuestionMark(dummyPost.user.avatar),
  );

  expect(getByText("Article")).toBeVisible();
  expect(getByTestId("article-img")).toHaveClass("icon");

  screen.debug();
});
