<template>
  <div class="container">
    <div class="empty-state">
      <img v-if="image" :src="image" :alt="title" />
      <h3>{{ title }}</h3>
      <p v-if="subText">{{ subText }}</p>
      <Button v-if="buttonTitle" @click="$emit('action')">
        {{ buttonTitle }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: { type: String },
  title: { type: String },
  subText: { type: String },
  buttonTitle: { type: String },
});

defineEmits(["action"]);
</script>

<style></style>
