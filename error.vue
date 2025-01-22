<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <div>
    <NuxtLayout>
      <br />
      <br />
      <br />
      <div style="text-align: center">
        <h1>{{ error.statusCode }}</h1>
        <p>Page not found</p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </NuxtLayout>
  </div>
</template>
