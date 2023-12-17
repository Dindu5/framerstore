<template>
  <div class="template-card">
    <img :src="cardData.img" alt="Template Image" />
    <div class="template-card__details">
      <h4>{{ cardData.title }}</h4>
      <p>{{ cardData.price }}</p>
    </div>
    <div class="template-card__author">
      <img :src="cardData.authorImg" alt="User Image" />
      <p>{{ cardData.author }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    cardData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style></style>
