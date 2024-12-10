
<script setup>
// Update these imports to match your assets directory structure in Nuxt
import nuxt from './public/assets/nuxt.png';
import netlify from './public/assets/netlify.png';
import github from './public/assets/nav-github.png';
import floppy from './public/assets/nav-floppy.png';

const links = [
  { url: '/colophon', label: 'Colophon' },
  { url: 'https://ssr.zmt3.com', label: 'SSR' },
  { url: 'https://deno.zmt3.com', label: 'Deno' },
  { url: 'https://zubair.click', label: 'Amplify' },
  { url: 'https://zubairiz.com', label: 'Vercel' },
  { url: 'https://vue.zmt3.com', label: 'Netlify, Nuxt SSR' },
]

const madeWithLinks = [
  { url: 'https://nuxt.com', label: 'Nuxt', icon: nuxt },
  { url: 'https://github.com/2u841r', label: 'GitHub', icon: github },
  { url: 'https://www.netlify.com', label: 'Netlify', icon: netlify }
]
</script>


<template>
  <footer class="footer">
    <section>
      <span>
        <img :src="floppy" class="logo" alt="Zubair" />
      </span>
      <nav>
        <a v-for="link in links" 
           :key="link.url" 
           :href="link.url" 
           target="_blank" 
           rel="noopener noreferrer"
        >
          {{ link.label }}
        </a>
      </nav>

      <nav>
        <a v-for="mwLink in madeWithLinks"
           :key="mwLink.url"
           class="button small"
           :href="mwLink.url"
           target="_blank"
           rel="noopener noreferrer"
        >
          <img :src="mwLink.icon" :alt="mwLink.label" />
          <span>{{ mwLink.label }}</span>
        </a>
      </nav>
    </section>
  </footer>
</template>
