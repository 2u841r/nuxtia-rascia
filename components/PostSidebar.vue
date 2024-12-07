<script setup>
  import { formatDate } from "~/utils/helpers.js";
  defineProps({
    tags: Array,
    categories: Array,
    date: String
  });

</script>

<template>
  <aside class="post-sidebar">
    <div class="post-sidebar-card">
      <h2>About me</h2>
      <p>
        Hello and thanks for visiting! My name is
        <a href="/me">Zubair</a>, and this is my website and digital garden. 🌱
      </p>
      <p>
        I'm a MERN Stack Developer who makes open-source projects and writes about
        life, code, design, and more.
      </p>
    </div>

    <div class="post-sidebar-card">
      <h2>Post Details</h2>
      <ul>
        <li>
          <strong>Published: </strong>
          {{ formatDate(date, true) }}
        </li>
        <li>
          <strong>Category: </strong>
          <template v-for="category in categories" :key="category.slug">
            <a :href="`/blog/category/${category.slug}`" class="tag">
              {{ category.name }}
            </a>
          </template>
        </li>
      </ul>

      <h2>Tags</h2>
      <div class="tags">
        <template v-for="tag in tags" :key="tag.slug">
          <a :href="`/blog/tag/${tag.slug}`" class="tag">
            {{ tag.name }}
          </a>
        </template>
      </div>
      <p style="margin-top: 1.5rem;">
        <!-- Example of an optional action -->
        <!-- <a href="https://substack.com" target="_blank" rel="noopener noreferrer">
          Subscribe to the Newsletter
        </a> -->
      </p>
    </div>
  </aside>
</template>

<style scoped>
  .post-sidebar {
    margin-top: 2rem;
  }

  .post-sidebar-card {
    margin-bottom: 2rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
  }

  .tag {
    margin-right: 0.5rem;
    text-decoration: none;
  }
</style>
