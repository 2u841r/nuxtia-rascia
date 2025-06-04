<script setup>
import Hero from '~/components/Hero.vue'
import Heading from '~/components/Heading.vue'
import Projects from '~/components/Projects.vue'
import { formatDate } from '~/utils/helpers.js'
import skills from '~/assets/data/skillList'

const runtimeConfig = useRuntimeConfig()
// Convert fetching logic to use useAsyncData
const { data: latestPosts, pending: isLatestLoading, error: latestError } = await useAsyncData(
  'latest-posts',
  async () => {
    const API = runtimeConfig.public.NUXT_PUBLIC_API
    console.log(API)
    const res = await fetch(`${API}/posts?per_page=6&categories_exclude=3`)
    if (!res.ok) throw new Error("Failed to fetch latest posts")
    return res.json()
  }
)

const { data: highlightedPosts, pending: isHighlightLoading, error: highlightError } = await useAsyncData(
  'highlighted-posts',
  async () => {
    const API = runtimeConfig.public.NUXT_PUBLIC_API

    // Fetch category ID
    const categoryRes = await fetch(`${API}/categories?slug=Highlight`)
    if (!categoryRes.ok) throw new Error("Failed to fetch category")
    const categoryData = await categoryRes.json()
    
    if (categoryData.length === 0) return []
    
    // Fetch posts with category
    const categoryId = categoryData[0].id
    const postsRes = await fetch(`${API}/posts?categories=${categoryId}`)
    if (!postsRes.ok) throw new Error("Failed to fetch highlighted posts")
    const posts = await postsRes.json()
    
    // Fetch featured images
    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        let featuredImage = null
        if (post.featured_media) {
          const mediaRes = await fetch(`${API}/media/${post.featured_media}`)
          if (mediaRes.ok) {
            const mediaData = await mediaRes.json()
            featuredImage = mediaData.source_url
          }
        }
        return { ...post, featuredImage }
      })
    )
    
    return postsWithImages
  }
)

const skillList = ref([...skills])

useHead({
  title: 'Zubair - MERN Stack Developer',
  meta: [
    { name: 'description', content: 'MERN Stack Developer writing about life, code, Islam and more.' }
  ]
})
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
            <template v-if="isLatestLoading">
              Loading
            </template>
            <template v-else-if="latestError">
              <p class="error">{{ latestError }}</p>
            </template>
            <template v-else>
              <NuxtLink
                v-for="post in latestPosts"
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
            <template v-if="isHighlightLoading">
              Loading
            </template>
            <template v-else-if="highlightError">
              <p class="error">{{ highlightError }}</p>
            </template>
            <template v-else>
              <div
                v-for="hPost in highlightedPosts"
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