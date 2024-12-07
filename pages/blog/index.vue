<script setup>
import SidebarLayout from '~/components/SidebarLayout.vue';
import { groupPostsByYear, formatDate } from '~/utils/helpers.js';

// Fetch posts server-side
const { data, error } = await useFetch('/api/posts');

// Compute posts grouped by year
const postsByYear = computed(() => {
  if (data.value?.wppost) {
    return groupPostsByYear(data.value.wppost);
  }
  return {};
});


// definePageMeta({
//   title: data.value?.title || 'All Blogs'
// });
</script>

<template>
  <div>
    <SidebarLayout>
      <header class="hero">
        <h1>Blog</h1>
      </header>
    
      <section class="segment">
        <div v-if="error" class="error">
          {{ error.message || 'An error occurred while fetching blogs' }}
        </div>
        <div v-else-if="data?.wppost">
          <template v-for="year in Object.keys(postsByYear).sort((a, b) => b - a)" :key="year">
            <h2 class="year">{{ year }}</h2>
            <div class="posts">
              <a 
                v-for="post in postsByYear[year]" 
                :key="post.slug" 
                class="post" 
                :href="`/blog/${post.slug}`"
              >
              
                <h3>{{ post.title.rendered }}</h3>
                <time>{{ formatDate(post.date) }}</time>
              </a>
            </div>
          </template>
        </div>
      </section>
    </SidebarLayout>
  </div>
</template>