<script setup lang="ts">
import type { PostWithUser } from "@/types";
import { formatDate } from "@vueuse/core";

defineProps({
  post: {
    type: Object as PropType<PostWithUser>,
    required: true,
  },
});

const formatPublishedDate = (timestamp: number) =>
  formatDate(new Date(timestamp), "MMM D, YYYY");
</script>

<template>
  <article class="max-w-3xl mx-auto">
    <header class="mb-6">
      <div class="flex items-center">
        <NuxtImg
          format="webp"
          width="56"
          height="56"
          :src="post.user.avatar"
          :alt="`${post.user.firstName} ${post.user.lastName}'s avatar image`"
          class="w-14 h-14 rounded-full mr-4"
        />
        <div>
          <div class="text-xl font-bold">
            {{ post.user.firstName }} {{ post.user.lastName }}
          </div>
          <time
            v-if="post.publishedAt"
            :datetime="new Date(post.publishedAt).toString()"
            class="text-gray-500"
            >{{ formatPublishedDate(post.publishedAt) }}</time
          >
        </div>
      </div>
    </header>

    <h1 class="text-4xl font-bold mb-6">{{ post.title }}</h1>
    <figure class="mb-8">
      <NuxtImg
        class="bg-gray-100 rounded-sm"
        format="webp"
        :src="post.image"
        :alt="`${post.title} image`"
        width="840"
        height="480"
      />
    </figure>

    <div class="prose max-w-none" v-html="post.content"></div>
  </article>
</template>
