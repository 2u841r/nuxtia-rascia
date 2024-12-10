<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      default: "",
    },
  },
};
</script>


<template>
    <h2 class="home-heading">
      <div>
        <div class="title">{{ title }}</div>
        <div v-if="description" class="description">{{ description }}</div>
      </div>
      <a v-if="slug" class="button" :href="slug">View all</a>
    </h2>
  </template>
  
