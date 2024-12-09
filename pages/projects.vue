<script setup>
import projects from '~/assets/data/projectsList';
const projectList = ref([
  ...projects
])
// import ExternalLinkIcon from '~/assets/external';
import ExternalLinkIcon from '~/assets/External.vue';
</script>

<template>
  <div>
      <main>
        <div class="container">
          <header class="hero">
            <h1>My Projects</h1>
          </header>
        </div>
        <section class="segment">
          <div class="container">
            <div class="project-preview">
              <div v-for="project in projectList" :key="project.slug" class="card anchored large">
                <div>
                  <time>{{ project.date }}</time>
                  <a class="card-header" :href="`https://github.com/2u841r/${project.slug}`" target="_blank"
                    rel="noreferrer">
                    {{ project.name }}
                  </a>
                  <p>{{ project.tagline }}</p>
                </div>

                <div class="links anchored">
                  <a v-if="project.writeup" :href="project.writeup" class="button small flex">
                    Article
                  </a>
                  <a class="button small flex" :href="project.url" target="_blank" rel="noreferrer">
                        Demo
                        <ExternalLinkIcon />
                      </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
  </div>
</template>