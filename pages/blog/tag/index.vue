<script setup>
import { computed } from "vue";
import Hero from "@/components/Hero.vue";

const runtimeConfig = useRuntimeConfig()
const API = runtimeConfig.public.NUXT_PUBLIC_API;

// Fetch all tags
const { data: allTags, error } = await useFetch(`${API}/tags`, {
  params: {
    per_page: 100
  },
  transform: (response) => response,
  key: 'tags'
});

const message = computed(() => {
  if (!allTags.value) return "";
  const count = allTags.value.length;
  return count === 0
    ? "No Tag Found"
    : count === 1
    ? `Only ${count} Tag`
    : `All ${count} Tags`;
});
</script>

<template>
  <main>
    <div>
      <section class="container">
        <div class="grid">
          <div class="article-content">
            <header class="hero">
              <h1>{{ message }}</h1>
            </header>
            <section v-if="!error" class="segment">
              <a
                v-for="tag in allTags"
                :key="tag.id"
                class="post"
                :href="`/blog/tag/${tag.slug}`"
              >
                <h3>{{ tag.name }}</h3>
                <time>
                  {{ tag.count }}
                  {{ tag.count < 2 ? 'post' : 'posts' }}
                </time>
              </a>
            </section>
            <section v-else class="segment small">
              <p class="error">{{ error }}</p>
            </section>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
