// https://nuxt.com/docs/api/configuration/nuxt-config
import { dirname, resolve } from "path";

export default defineNuxtConfig({
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
  css: ["@/styles/style.css"],
  runtimeConfig: {
    public: {
      API: process.env.NUXT_API,
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
