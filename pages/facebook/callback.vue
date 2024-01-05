<template>
  <div class="container">
    <EmptyState icon title="Authenticating facebook user" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../../stores/useAuth";

const { loginProvider } = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
  if (route.query?.access_token) {
    loginProvider("facebook", route.query);
  } else {
    router.push("/");
  }
});
</script>

<style></style>
