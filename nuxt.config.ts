// https://nuxt.com/docs/api/configuration/nuxt-config
import { dirname, resolve } from "path";

export default defineNuxtConfig({
  vite: {
    server: {
      fs: {
        allow: ['.']
      }
    }
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  css: ["@/styles/style.css"],
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_API: process.env.NUXT_PUBLIC_API
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css",
        },
      ],
    },
  },
  alias: {
    xxx: "<rootDir>/assets",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
