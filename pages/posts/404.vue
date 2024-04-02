<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <h1 class="text-9xl font-bold">404</h1>
    <h2 class="text-4xl font-semibold mt-8">Post not found</h2>
    <p class="text-xl text-gray-600 mt-4">
      Sorry, we can't find that page. You'll find lots to explore on the home
      page.
    </p>
    <NuxtLink to="/posts" class="mt-8">
      <button
        class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Back to Homepage
      </button>
    </NuxtLink>
  </div>
</template>

<script setup>
useHead({
  title: "404 - Post not found",
  meta: [
    {
      name: "description",
      content:
        "Sorry, we can't find that page. You'll find lots to explore on the home page.",
    },
  ],
});
</script>
