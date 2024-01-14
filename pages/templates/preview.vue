<template>
  <main class="preview-template">
    <div :class="`preview-template--${selectedTemplateSize}`">
      <iframe :src="selectedTemplate.preview_link" frameborder="0"></iframe>
    </div>
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
  min-height: 100vh;
  width: 100vw;

  background: #efefef;
  iframe {
    width: 100%;
    height: 100%;
    border-radius: 1.6rem;
  }
  &--desktop {
    height: calc(100vh - 10rem);
    width: 100%;
    iframe {
      border-radius: 0rem;
    }
  }
  &--tablet {
    height: 1149px;
    width: 768px;
    margin: auto;
    border: 0.8rem solid #fcfbf9;
    margin-top: 8rem;
    margin-bottom: 8rem;
    border-radius: 2.4rem;
    box-shadow: 8px 11px 29px 0px rgba(0, 0, 0, 0.1),
      31px 42px 53px 0px rgba(0, 0, 0, 0.09),
      71px 95px 71px 0px rgba(0, 0, 0, 0.05),
      126px 169px 84px 0px rgba(0, 0, 0, 0.01),
      196px 265px 92px 0px rgba(0, 0, 0, 0);
  }
  &--mobile {
    height: 884px;
    width: 406px;
    margin: auto;
    margin-top: 8rem;
    margin-bottom: 8rem;
    border: 0.8rem solid #fcfbf9;
    border-bottom: 3.2rem solid #fcfbf9;
    border-radius: 2.4rem;
    box-shadow: 8px 11px 29px 0px rgba(0, 0, 0, 0.1),
      31px 42px 53px 0px rgba(0, 0, 0, 0.09),
      71px 95px 71px 0px rgba(0, 0, 0, 0.05),
      126px 169px 84px 0px rgba(0, 0, 0, 0.01),
      196px 265px 92px 0px rgba(0, 0, 0, 0);
  }
}
</style>
