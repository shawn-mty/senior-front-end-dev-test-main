<script lang="ts" setup>
import { useInfiniteScroll } from "@vueuse/core";
import type { PostWithUser } from "@/types";
const isLoading = ref(false);
const posts = ref<PostWithUser[]>([]);
const page = ref(0);
const perPage = 10;
const newestFirst = ref(true);

const fetchPosts = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  const nextPosts: PostWithUser[] = await $fetch("/api/posts", {
    method: "GET",
    query: {
      limit: 10,
      offset: page.value * 10,
      include: "user",
      order: newestFirst.value ? "oldestFirst" : "newestFirst",
    },
    params: { page: page.value, perPage },
  });

  posts.value = [...posts.value, ...nextPosts];
  page.value++;
  isLoading.value = false;
};

onMounted(async () => {
  await fetchPosts();
});

useInfiniteScroll(
  document,
  () => {
    fetchPosts();
  },
  { distance: 10 },
);

const toggleSortOrder = () => {
  posts.value = [];
  page.value = 0;
  fetchPosts();
};
</script>

<template>
  <div class="container my-5 mx-auto px-4">
    <h1 class="text-3xl font-bold text-center mb-4 mt-5">Our Blog</h1>
    <p class="text-gray-500 mb-4 text-center mb-6">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, quae.
    </p>
    <div class="flex items-center justify-end mb-4">
      <label class="mr-2" for="sort-order">
        <input
          id="sort-order"
          v-model="newestFirst"
          type="checkbox"
          @change="toggleSortOrder"
        />
        Newest to Oldest
      </label>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <BlogPost v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-if="isLoading" class="text-center my-8">
      <div class="flex justify-center items-center">
        <div
          class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2"
        ></div>
      </div>
    </div>
  </div>
</template>
<style>
.container {
  max-width: 1200px;
}
</style>
