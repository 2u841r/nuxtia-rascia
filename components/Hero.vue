<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    highlight: {
      type: String,
      default: "",
    },
    index: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<template>
    <header :class="['hero', { index }]">
      <div v-if="subTitle" class="sub-title">
        <span v-if="highlight" class="highlight">{{ highlight }}</span>
        {{ subTitle }}
      </div>
      <h1 v-if="title">{{ title }}</h1>
      <slot />
    </header>
  </template>
  