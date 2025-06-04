<script setup>
import { computed } from "vue";
import Hero from "@/components/Hero.vue";
import SidebarLayout from "@/components/SidebarLayout.vue";
import { capitalizeFirstLetter, groupPostsByYear, formatDate } from "@/utils/helpers";

const route = useRoute();
const categorySlug = capitalizeFirstLetter(route.params.slug);
const runtimeConfig = useRuntimeConfig()
const API = runtimeConfig.public.NUXT_PUBLIC_API;

// Fetch category first
const { data: categoryData } = await useFetch(`${API}/categories`, {
  params: {
    slug: categorySlug
  },
  transform: (response) => response[0], // Get first item since it's an array
  key: `category-${categorySlug}`
});

// Then fetch posts using the category ID
const { data: posts, error } = await useFetch(() => categoryData.value?.id ? `${API}/posts` : null, {
  params: {
    categories: categoryData.value?.id
  },
  key: `category-posts-${categorySlug}`,
  enabled: !!categoryData.value?.id
});

const message = computed(() => {
  const count = posts.value.length; 
  if (count === 0) return " posts categorized as:";
  if (count === 1) return " post categorized as:";
  return ` posts categorized as:`;
});

const categoryPostsByYear = computed(() => 
  posts.value ? groupPostsByYear(posts.value) : {}
);
</script>

<template>
  <div>
    <main>
      <div>
        <SidebarLayout>
          <div v-if="!error && categoryData">
            <Hero 
              :highlight="posts?.length" 
              :subTitle="message" 
              :title="categoryData?.name" 
            />
            <section class="segment">
              <div 
                v-for="year in Object.keys(categoryPostsByYear).sort((a, b) => b - a)" 
                :key="year"
              >
                <h2 class="year">{{ year }}</h2>
                <div class="posts">
                  <a 
                    v-for="post in categoryPostsByYear[year]" 
                    :key="post.id" 
                    class="post" 
                    :href="`/blog/${post.slug}`"
                  >
                    <h3 v-html="post.title.rendered"></h3>
                    <time>{{ formatDate(post.date) }}</time>
                  </a>
                </div>
              </div>
            </section>
            <a href="/blog/category">See all categories</a>
          </div>
          <section v-else class="segment small">
            <p class="error">
              {{ error || `The category "${categorySlug}" not Found` }}
            </p>
          </section>
        </SidebarLayout>
      </div>
    </main>
  </div>
</template>