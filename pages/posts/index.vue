<script lang="ts" setup>
import { useInfiniteScroll } from "@vueuse/core";
import type { PostWithUser } from "@/types";

const isLoading = ref(false);
const posts = ref<PostWithUser[]>([]);
const page = ref(0);
const perPage = 10;
const isNewestFirst = ref(true);
const route = useRoute();
const router = useRouter();
const error = ref<null | string>(null);

useInfiniteScroll(
  document,
  () => {
    fetchPosts();
  },
  { distance: 10 },
);

const title = "Our Blog";
const description =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, quae.";
const url = "https://ourblog.com/posts"; // Should have real domain defined by a var from dotenv

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: url,
  ogType: "website",
  ogSiteName: "Our Blog",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
});

useHead({
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: url,
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: title,
        description: description,
        url: url,
        blogPosts: posts.value.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: new Date(post.publishedAt as number).toISOString(),
          author: {
            "@type": "Person",
            name: `${post.user.firstName} ${post.user.lastName}`,
          },
          image: post.image,
        })),
      }),
    },
  ],
});

const fetchPosts = async ({ isInitialLoad = false, isRetry = false } = {}) => {
  if (isRetry) error.value = null;
  if (isLoading.value || error.value) return;
  isLoading.value = true;

  const fetchUrl = "/api/posts";

  const fetchOptions = {
    query: {
      limit: perPage,
      offset: page.value * perPage,
      include: "user",
      select: "id,title,excerpt,publishedAt,image",
      order: isNewestFirst.value ? "oldestFirst" : "newestFirst",
    },
    params: { page: page.value, perPage },
  };

  try {
    let nextPosts;
    if (isInitialLoad) {
      const { data } = await useFetch(fetchUrl, fetchOptions);
      nextPosts = data.value;
    } else {
      nextPosts = await $fetch(fetchUrl, fetchOptions);
    }

    posts.value = [...posts.value, ...(nextPosts as PostWithUser[])];
    page.value++;
  } catch (err) {
    console.error(err);
    error.value = "Couldn't fetch posts. ";
  } finally {
    isLoading.value = false;
  }
};

const toggleSortOrder = () => {
  posts.value = [];
  page.value = 0;
  fetchPosts();

  updateSortOrderUrl();
};

const updateSortOrderUrl = () => {
  router.push({
    path: router.currentRoute.value.path,
    query: {
      ...route.query,
      order: isNewestFirst.value ? "newestFirst" : "oldestFirst",
    },
  });
};

const sortPostsOnLoad = () => {
  if (route.query.order) {
    if (route.query.order === "newestFirst") {
      isNewestFirst.value = route.query.order === "newestFirst";
    } else if (route.query.order === "oldestFirst") {
      isNewestFirst.value = !(route.query.order === "oldestFirst");
    }
  }
};

sortPostsOnLoad();
updateSortOrderUrl();
await fetchPosts({ isInitialLoad: true });
</script>
<template>
  <div class="my-5 mx-auto px-4 max-w-6xl">
    <h1 class="text-3xl font-bold text-center mb-4 mt-5">Our Blog</h1>
    <p class="text-gray-500 mb-4 text-center mb-6">
      {{ description }}
    </p>
    <div class="flex items-center justify-end mb-4">
      <label v-if="!isLoading" class="mr-2" for="sort-order">
        <input
          id="sort-order"
          v-model="isNewestFirst"
          type="checkbox"
          @change="toggleSortOrder"
        />
        Newest to Oldest
      </label>
    </div>
    <div v-if="error" class="text-red-500 text-center mb-4">
      Error: {{ error }}
      <button
        class="bg-gray-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        @click="() => fetchPosts({ isRetry: true })"
      >
        Retry
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-9">
      <BlogPostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-if="isLoading" class="my-8">
      <LoadingSpinner />
    </div>
  </div>
</template>
