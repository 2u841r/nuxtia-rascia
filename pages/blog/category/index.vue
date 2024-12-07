<script setup>
import { computed } from "vue";
import Hero from "@/components/Hero.vue";

const API = `https://wp3.zmt3.com/wp-json/wp/v2`;

// Replace onServerPrefetch with useFetch
const { data: allCategories, error } = await useFetch(`${API}/categories`, {
  params: {
    per_page: 100
  },
  transform: (response) => response,
  key: 'categories' // Add a unique key for caching
});

const message = computed(() => {
  if (!allCategories.value) return "";
  const count = allCategories.value.length;
  return count === 0
    ? "No Category Found"
    : count === 1
    ? `Only ${count} Category`
    : `All ${count} Categories`;
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
                v-for="category in allCategories"
                :key="category.id"
                class="post"
                :href="`/blog/category/${category.slug}`"
              >
                <h3>{{ category.name }}</h3>
                <time>
                  {{ category.count }}
                  {{ category.count < 2 ? 'post' : 'posts' }}
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
  