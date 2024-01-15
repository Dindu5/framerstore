<template>
  <ResetPasswordForm />
</template>

<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: [
    function (to, from) {
      if (!to?.query?.code) {
        return navigateTo("/login");
      }
    },
  ],
});
</script>
