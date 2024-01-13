<template>
  <div class="submit-page">
    <MvpTemplateSubmitForm />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
