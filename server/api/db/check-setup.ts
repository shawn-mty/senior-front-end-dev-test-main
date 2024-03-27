export default defineEventHandler(async () => {
  try {
    const posts = await $fetch("/api/posts", {
      query: {
        limit: 1,
      },
    });
    return {
      isSetup: posts && posts.length > 0,
    };
  } catch (err) {
    return {
      isSetup: false,
    };
  }
});
