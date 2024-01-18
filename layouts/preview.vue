<template>
  <main class="preview--layout">
    <PreviewNavigation />
    <div>
      <slot />
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.preview--layout {
  background: #efefef;
}
</style>
