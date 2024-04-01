<template>
  <div class="container mx-auto px-4 py-10">
    <div v-if="isLoading" class="my-10"><LoadingSpinner /></div>

    <BlogPost v-else :post="post" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const route = useRoute();

const { data: post, pending: isLoading } = await useFetch(
  `/api/posts/${route.params.slug}`,
  {
    key: route.params.slug,
    query: { include: "user" },
  },
);

const title = computed(() => post.value?.title);
const description = computed(() => post.value?.excerpt);
const image = computed(() => post.value?.image);
const url = computed(() => `http://ourblog.com/posts/${post.value?.id}`); // Should have real domain defined by a var from dotenv
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
  ogSiteName: "Our Blog",
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
