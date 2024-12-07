<script setup>
import Heading from "@/components/Heading.vue";
import projects from "@/assets/data/projectsList.js";
import { ref } from "vue";

const projectList = ref(projects);

</script>

<template>
  <div>
    <section class="segment large">
      <Heading title="Projects" slug="/projects" />
      <div class="post-preview">
        <div v-for="project in projectList.filter(p => p?.highlight)" :key="project?.slug" class="anchored card">
          <div>
            <time>{{ project.date }}</time>
            <a class="card-header" :href="`https://github.com/2u841r/${project.slug}`" target="_blank" rel="noreferrer">
              {{ project.name }}
            </a>
            <p>{{ project.tagline }}</p>
          </div>


          <div class="anchored links">
            <a v-if="project?.writeup" :href="project.writeup" class="button flex">
              Article
            </a>
            <a v-if="project?.url && project.url !== '#'" class="button flex" :href="project.url" target="_blank"
              rel="noreferrer">
              Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
