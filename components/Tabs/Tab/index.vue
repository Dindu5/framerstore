<template>
  <div v-show="value === selectedTitle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const selectedTitle = inject("selectedTitle");

const props = defineProps({
  value: { type: String },
});
</script>
