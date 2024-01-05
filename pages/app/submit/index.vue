<template>
  <div class="submit-page container">
    <MvpTemplateSubmitForm />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
