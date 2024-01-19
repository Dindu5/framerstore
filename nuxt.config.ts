// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL,
      mailLiteKey: process.env.MAILLITE_API_KEY,
      mailLiteGroupId: process.env.MAILLITE_GROUP_ID,
    },
  },
  pages: true,
  modules: ["@pinia/nuxt", "@nuxt/image", "@nuxtjs/cloudinary", "nuxt-gtag"],
  cloudinary: {
    cloudName: "dindu",
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  css: [
    "~/assets/styles/scss/main.scss",
    //  "@vueform/multiselect/themes/default.css",
  ],
  routeRules: {
    "/": { ssr: false },
    "/search": { ssr: false },
    "/templates/**": { ssr: false },
    "/login": { ssr: false },
    "/signup": { ssr: false },
    "/forgot-password": { ssr: false },
    "/reset-password": { ssr: false },
    "/facebook/callback": { ssr: false },
    "/google/callback": { ssr: false },
    "/app/submit": { ssr: false },
  },

  // components: {
  //   dirs: [
  //     {
  //       path: "~/components",
  //       pathPrefix: false,
  //     },
  //   ],
  // },
});
