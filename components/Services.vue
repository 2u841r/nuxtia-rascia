<script setup>
import services from "~/assets/data/services";

const noticeItems = [
  "All websites are Responsive.",
  "SEO Friendly + Speed Optimized",
  "Domain, Hosting / VPS Not Included.",
  "3 Page per website, then $5-20 per page.",
];
</script>

<template>
  <div>
    <section class="segment">
      <h2>Services</h2>
      <div class="post-preview">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="anchored card"
        >
          <div>
            <h1>{{ service.name }}</h1>
            <p v-if="service.for !== 'Any'">{{ service.for }}</p>
          </div>
          <div class="anchored links">
            <time>{{ service.fee }}</time>
          </div>
        </div>
      </div>
      <br />
      <p>Please Notice</p>
      <ul>
        <li v-for="(item, index) in noticeItems" :key="index">{{ item }}</li>
      </ul>
    </section>
  </div>
</template>
