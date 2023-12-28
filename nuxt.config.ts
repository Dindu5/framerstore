// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_URL,
    },
  },
  modules: ["@pinia/nuxt", "@nuxt/image", "@nuxtjs/cloudinary"],
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

  // components: {
  //   dirs: [
  //     {
  //       path: "~/components",
  //       pathPrefix: false,
  //     },
  //   ],
  // },
});
