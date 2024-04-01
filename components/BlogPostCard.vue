<script setup lang="ts">
import type { PostWithUser } from "@/types";
import { formatTimeAgo } from "@vueuse/core";

defineProps({
  post: {
    type: Object as PropType<PostWithUser>,
    required: true,
  },
});
</script>

<template>
  <article class="bg-white rounded-lg shadow-md overflow-hidden p-4">
    <div class="flex justify-between">
      <span class="text-gray-500 text-xs mb-4 text-end pl-2">
        <Icon name="majesticons:article-line" data-testid="article-img" />
        Article
      </span>
      <time v-if="post.publishedAt" class="text-gray-500 text-sm mb-4 text-end">
        {{ formatTimeAgo(new Date(post.publishedAt)) }}
      </time>
    </div>
    <NuxtImg
      class="bg-gray-100 rounded-sm"
      format="webp"
      :src="post.image"
      :alt="`${post.title} image`"
      width="672"
      height="384"
      loading="lazy"
    />
    <div class="p-6">
      <section>
        <h2 class="text-2xl font-bold mb-2">{{ post.title }}</h2>
        <p class="text-gray-700 mb-4">{{ post.excerpt }}</p>
      </section>

      <footer class="flex justify-between items-center">
        <div class="flex items-center">
          <NuxtImg
            format="webp"
            width="40"
            height="40"
            :src="post.user.avatar"
            :alt="`${post.user.firstName} ${post.user.lastName}'s avatar image`"
            class="w-10 h-10 rounded-full mr-4"
            loading="lazy"
          />
          <address class="text-gray-900 font-semibold leading-none">
            {{ post.user.firstName }} {{ post.user.lastName }}
          </address>
        </div>
        <NuxtLink
          :to="`/posts/${post.id}`"
          class="font-semibold hover:font-bold ml-2 flex items-center"
        >
          Read more <Icon name="heroicons-outline:arrow-right" />
        </NuxtLink>
      </footer>
    </div>
  </article>
</template>
