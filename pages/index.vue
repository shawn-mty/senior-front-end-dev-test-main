<script setup lang="ts">
const setup = ref(false);
const checked = ref(false);

const { data: dbStatus } = await useFetch("/api/db/check-setup", {});
if (dbStatus.value?.isSetup) setup.value = true;
checked.value = true;

const loading = ref();
async function setupDb() {
  try {
    loading.value = true;
    await $fetch("/api/db/migrate");
    await $fetch("/api/db/seed");
    setup.value = true;
  } catch (e) {
    alert("Error setting up database");
  }
  loading.value = false;
}
</script>
<template>
  <div class="h-screen flex justify-center items-center">
    <div class="flex flex-col gap-8 max-w-[700px]" v-if="!setup">
      <h1 class="text-4xl font-bold">👋 Welcome to the Test!</h1>
      <div>
        <p class="mb-2">
          This is a test to see how you handle a real-world task. You will be
          building a simple blog by fetching data from a pre-built REST API.
        </p>
        <p class="mb-2">
          You will be given a set of tasks to complete. Details can be found in
          the project
          <strong class="text-red-600 font-mono text-xs">README.md</strong>.
        </p>
        <p class="mb-2">
          The first step is to setup the database with the button below.
        </p>
      </div>
      <div>
        <button class="p-3 bg-blue-600 rounded text-white" @click="setupDb">
          {{ loading ? "Setting up Database..." : "Setup Database" }}
        </button>
      </div>
    </div>

    <div v-else class="text-center flex flex-col gap-8">
      <h1 class="text-4xl font-bold">🎉 You're all set up!</h1>
      <div>
        <NuxtLink to="/posts" class="p-3 bg-blue-600 rounded text-white">
          Go to Task #1
        </NuxtLink>

        <a
          href="#"
          class="text-sm text-gray-500 underline inline-block ml-4"
          @click.prevent="setupDb"
        >
          {{ loading ? "Setting up Database..." : "(or Setup Database Again)" }}
        </a>
      </div>
    </div>
  </div>
</template>
