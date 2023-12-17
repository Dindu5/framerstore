<template>
  <div
    class="template-card"
    @mouseover="showCta = true"
    @mouseout="showCta = false"
  >
    <div class="template-card__img">
      <img :src="cardData.img" alt="Template Image" />
      <div :class="showCta ? 'template-card__img-cta' : ''">
        <button class="btn btn-icon">
          <span class="material-symbols-rounded"> bookmark </span>
        </button>
        <button class="btn btn-icon">
          <span class="material-symbols-rounded"> upload </span>
        </button>
        <button class="btn">Live preview</button>
      </div>
    </div>

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
  data() {
    return {
      showCta: false,
    };
  },
  methods: {},
};
</script>

<style></style>
