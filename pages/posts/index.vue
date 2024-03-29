<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import type { Post } from "@/types";

const isLoading = ref(false);
const posts = ref<Post[]>([]);
const page = ref(0);
const perPage = 10;

const fetchPosts = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  const nextPosts: Post[] = await $fetch("/api/posts", {
    method: "GET",
    query: {
      limit: 10,
      offset: 40,
      include: "user",
      order: "newestFirst",
    },
    params: {
      page: page.value,
      perPage,
    },
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
</script>

<template>
  <div class="my-4 mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <img
          :src="post.image"
          alt="Post image"
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">{{ post.title }}</h2>
          <p class="text-gray-700 mb-4">{{ post.excerpt }}</p>
          <p class="text-gray-500 text-sm">{{ post.publishedAt }}</p>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="text-center mt-8">
      <svg
        class="animate-spin h-5 w-5 text-gray-600 inline-block"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span class="ml-2">Loading...</span>
    </div>
  </div>
</template>
