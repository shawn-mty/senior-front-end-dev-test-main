<template>
  <div class="container mx-auto px-4 py-10">
    <div v-if="isLoading" class="my-10"><LoadingSpinner /></div>

    <BlogPost v-else-if="!error" :post="post" />
  </div>
</template>

<script setup>
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

const {
  data: post,
  pending: isLoading,
  error,
} = await useFetch(`/api/posts/${route.params.slug}`, {
  key: route.params.slug,
  query: { include: "user" },
});

if (error.value) {
  router.push("/posts/404");
}

const title = computed(() => post.value?.title);
const description = computed(() => post.value?.excerpt);
const image = computed(() => post.value?.image);
const url = computed(() => `http://ourblog.com/posts/${post.value?.id}`);
const author = computed(
  () => `${post.value?.user.firstName} ${post.value?.user.lastName}`,
);
const publishedTime = computed(() => {
  if (!post.value) return;
  return new Date(post.value?.publishedAt).toISOString();
});

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
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: description,
        datePublished: publishedTime,
        author: {
          "@type": "Person",
          name: author,
        },
        image: image,
        url: url,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
        },
      }),
    },
  ],
});
</script>
