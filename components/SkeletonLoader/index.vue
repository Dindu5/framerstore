<template>
  <div
    class="skeleton"
    :class="`skeleton-${shape}-${size}`"
    :style="`width: ${width}; height: ${height}`"
  >
    <div class="skeleton-progress" :class="`skeleton-${size}`"></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  size: {
    type: String,
    default: "sm",
  },
  shape: {
    type: String,
    default: "rectangle",
  },
  width: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
