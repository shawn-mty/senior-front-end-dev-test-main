<template>
  <div class="container mx-auto px-4 py-10">
    <article v-if="post.id" class="max-w-3xl mx-auto">
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
            <time :datetime="post.publishedAt" class="text-gray-500">{{
              formatPublishedDate(post.publishedAt)
            }}</time>
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

    <div v-else class="text-center">Loading...</div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatDate } from "@vueuse/core";

const route = useRoute();

const { data: post } = await useFetch(`/api/posts/${route.params.slug}`, {
  key: route.params.slug,
  query: { include: "user" },
});

const formatPublishedDate = (date) => formatDate(new Date(date), "MMM D, YYYY");

const title = computed(() => post.value?.title);
const description = computed(() => post.value?.excerpt);
const image = computed(() => post.value?.image);
const url = computed(() => `http://localhost:3000/posts/${post.value?.id}`);
const author = computed(
  () => `${post.value?.user.firstName} ${post.value?.user.lastName}`,
);
const publishedTime = computed(() =>
  new Date(post.value?.publishedAt).toISOString(),
);

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogUrl: url,
  ogType: "article",
  ogSiteName: "Our blog",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  articlePublishedTime: publishedTime,
  articleAuthor: author,
});

useHead({
  link: [
    {
      hid: "canonical",
      rel: "canonical",
      href: url,
    },
  ],
});
</script>
