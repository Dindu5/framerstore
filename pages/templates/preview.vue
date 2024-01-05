<template>
  <main class="preview-template">
    <iframe
      :class="`preview-template--${selectedTemplateSize}`"
      :src="selectedTemplate.preview_link"
      frameborder="0"
    ></iframe>
  </main>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
const { selectedTemplate, selectedTemplateSize } = storeToRefs(
  useTemplateStore()
);
definePageMeta({
  layout: "preview",
  middleware: [
    function (to, from) {
      const { selectedTemplate } = storeToRefs(useTemplateStore());
      if (!selectedTemplate.value.preview_link) {
        return navigateTo("/");
      }
    },
  ],
});
</script>

<style lang="scss" scoped>
.preview-template {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  &--desktop {
    height: 100%;
    width: 100%;
  }
  &--tablet {
    height: 1024px;
    width: 768px;
    margin: auto;
    border: 0.4rem solid black;
    border-radius: 1.6rem;
  }
  &--mobile {
    height: 932px;
    width: 430px;
    margin: auto;
    border: 0.4rem solid black;
    border-radius: 1.6rem;
  }
}
</style>
