<template>
  <LoginForm />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
useSeoMeta({
  title: "Framerstore - Login",
  ogTitle: "Framerstore - Login",
  applicationName: "FramerStore",
  description:
    "Login to Framerstore to discover the best suited Framer template for your website",
  ogDescription:
    "Login to Framerstore to discover the best suited Framer template for your website",
  ogImage:
    "https://res.cloudinary.com/dindu/image/upload/v1705347384/framerstore-og_jdeqlq_ypj8ru.png",
  twitterCard: "summary_large_image",
  ogType: "website",
  ogLocale: "en_UK",
  twitterImage:
    "https://res.cloudinary.com/dindu/image/upload/v1705347384/framerstore-og_jdeqlq_ypj8ru.png",
  themeColor: "#1d1c1c",
});
</script>
