<script setup>
// You'll need to import your components
import Hero from '~/components/Hero.vue'
import Heading from '~/components/Heading.vue'
// import Circle from '~/components/Circle.vue'
import Projects from '~/components/Projects.vue'
import {formatDate} from '~/utils/helpers.js'

const config = useRuntimeConfig();
const API = config.public.api;

// Add your data fetching logic here
const latestPosts = ref({
  loading: true,
  error: null,
  data: []
})

const highlightedPosts = ref({
  loading: true,
  error: null,
  data: []
})

import skills from '~/assets/data/skillList';
const skillList = ref([
  ...skills
])


onMounted(async () => {
  try {
    // Fetch both latest posts and highlights concurrently
    const [postsPromise, highlightsPromise] = await Promise.allSettled([
      fetchLatestPosts(),
      fetchHighlightedPosts(),
    ]);

    // Handle latest posts result
    if (postsPromise.status === "fulfilled") {
      latestPosts.value = {
        loading: false,
        data: postsPromise.value,
        error: null,
      };
    } else {
      latestPosts.value = {
        loading: false,
        data: null,
        error: postsPromise.reason.message,
      };
    }

    // Handle highlighted posts result
    if (highlightsPromise.status === "fulfilled") {
      highlightedPosts.value = {
        loading: false,
        data: highlightsPromise.value,
        error: null,
      };
    } else {
      highlightedPosts.value = {
        loading: false,
        data: null,
        error: highlightsPromise.reason.message,
      };
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
});

// Fetch latest posts
async function fetchLatestPosts() {
  const API = 'https://wp3.zmt3.com/wp-json/wp/v2';
  const res = await fetch(`${API}/posts?per_page=6&categories_exclude=3`);
  if (!res.ok) throw new Error("Failed to fetch latest posts");
  return await res.json();
}

// Fetch highlighted posts
async function fetchHighlightedPosts() {
  const API = 'https://wp3.zmt3.com/wp-json/wp/v2';
  const categoryRes = await fetch(`${API}/categories?slug=Highlight`);
  if (!categoryRes.ok) throw new Error("Failed to fetch category");
  const categoryData = await categoryRes.json();

  if (categoryData.length === 0) return [];

  const categoryId = categoryData[0].id;
  const postsRes = await fetch(`${API}/posts?categories=${categoryId}`);
  if (!postsRes.ok) throw new Error("Failed to fetch highlighted posts");
  const posts = await postsRes.json();

  // Fetch featured images for highlighted posts
  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      let featuredImage = null;
      if (post.featured_media) {
        const mediaRes = await fetch(`${API}/media/${post.featured_media}`);
        if (mediaRes.ok) {
          const mediaData = await mediaRes.json();
          featuredImage = mediaData.source_url;
        }
      }
      return { ...post, featuredImage };
    })
  );

  return postsWithImages;
}
</script>


<template>
  <main>
    <div>
      <div class="container">
        <div class="hero-wrapper">
          <Hero title="Zubair Ibn Zamir">
            <p class="hero-description small width">
              I'm a MERN Stack Developer, who writes about life, code, Islam and
              more. Welcome to my digital garden. 🌱
            </p>
            <div class="hire-me">
              <NuxtLink to="/hire-me" class="button">Hire Me</NuxtLink>
            </div>
          </Hero>
          <div class="decoration">
            <img
              src="../assets/mernl.png"
              alt="MERN Logo"
              class="image hero-image"
              title="MERN Logo"
            />
          </div>
        </div>
      </div>
      <div class="container">
        <section class="segment first">
          <Heading title="Latest Posts" :slug="'/blog'" />
          <div class="posts newspaper">
            <template v-if="latestPosts.loading">
             Loading
            </template>
            <template v-else-if="latestPosts.error">
              <p class="error">{{ latestPosts.error }}</p>
            </template>
            <template v-else>
              <NuxtLink
                v-for="post in latestPosts.data"
                :key="post.slug"
                class="post"
                :to="`/blog/${post.slug}`"
              >
                <h3>{{ post.title.rendered }}</h3>
                <time>{{ formatDate(post.date, true) }}</time>
              </NuxtLink>
            </template>
          </div>
        </section>
        <section class="segment large">
          <Heading title="Highlights" />
          <div class="highlight-preview">
            <template v-if="highlightedPosts.loading">
              Loading
            </template>
            <template v-else-if="highlightedPosts.error">
              <p class="error">{{ highlightedPosts.error }}</p>
            </template>
            <template v-else>
              <div
                v-for="hPost in highlightedPosts.data"
                :key="hPost.slug"
                class="muted card flex"
              >
                <div
                  class="gatsby-image-wrapper"
                  style="position:relative;overflow:hidden;display:inline-block;width:45px;height:45px"
                >
                  <img
                    v-if="hPost.featuredImage"
                    :src="hPost.featuredImage"
                    :alt="hPost.title.rendered"
                  />
                </div>
                <div>
                  <time>{{ formatDate(hPost.date, true) }}</time>
                  <NuxtLink class="card-header" :to="`/blog/${hPost.slug}`">
                    {{ hPost.title.rendered }}
                  </NuxtLink>
                </div>
              </div>
            </template>
          </div>
        </section>
        <section class="segment large">
          <Heading title="Skills" />
          <div class="skill-preview">
            <i
              v-for="skill in skillList"
              :key="skill"
              :class="[skill, 'colored']"
            >
            </i>
          </div>
        </section>
        <Projects />
      </div>
    </div>
  </main>
</template>

