<script setup>
import { computed } from "vue";
import Hero from "@/components/Hero.vue";
import SidebarLayout from "@/components/SidebarLayout.vue";
import { capitalizeFirstLetter, groupPostsByYear, formatDate } from "@/utils/helpers";

const route = useRoute();
const tagSlug = capitalizeFirstLetter(route.params.slug);

const runtimeConfig = useRuntimeConfig()
const API = runtimeConfig.public.NUXT_PUBLIC_API;

// Fetch tag first
const { data: tagData } = await useFetch(`${API}/tags`, {
  params: {
    slug: tagSlug
  },
  transform: (response) => response[0],
  key: `tag-${tagSlug}`
});

// Then fetch posts using the tag ID
const { data: posts, error } = await useFetch(() => tagData.value?.id ? `${API}/posts` : null, {
  params: {
    tags: tagData.value?.id
  },
  key: `tag-posts-${tagSlug}`,
  enabled: !!tagData.value?.id
});

const message = computed(() => {
  const count = posts.value.length; 
  if (count === 0) return " posts tagged:";
  if (count === 1) return " post tagged:";
  return ` posts tagged as:`;
});

const tagPostsByYear = computed(() => 
  posts.value ? groupPostsByYear(posts.value) : {}
);
</script>

<template>
  <div>
    <main>
      <div>
        <SidebarLayout>
          <div v-if="!error && tagData">
            <Hero 
              :highlight="posts?.length" 
              :subTitle="message" 
              :title="tagData?.name" 
            />
            <section class="segment">
              <div 
                v-for="year in Object.keys(tagPostsByYear).sort((a, b) => b - a)" 
                :key="year"
              >
                <h2 class="year">{{ year }}</h2>
                <div class="posts">
                  <a 
                    v-for="post in tagPostsByYear[year]" 
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
            <a href="/blog/tag">See all tags</a>
          </div>
          <section v-else class="segment small">
            <p class="error">
              {{ error || `The tag "${tagSlug}" not Found` }}
            </p>
          </section>
        </SidebarLayout>
      </div>
    </main>
  </div>
</template>
