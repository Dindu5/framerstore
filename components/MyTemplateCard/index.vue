<template>
  <div class="my-template-card">
    <div class="my-template-card__info">
      <img :src="cardData.image" alt="Template" />
      <div>
        <h3>{{ cardData.title }}</h3>
        <h6>{{ cardData.status }}</h6>
        <p>{{ cardData.description }}</p>
      </div>
    </div>
    <div class="my-template-card__btns">
      <button class="btn btn-icon btn-secondary-outline">
        <span class="material-symbols-rounded"> delete </span>
      </button>
      <button class="btn btn-secondary-outline">
        <span class="material-symbols-rounded"> note_alt </span>Edit
      </button>
      <button class="btn btn-secondary-outline">
        <span class="material-symbols-rounded"> trending_up </span>Promote
      </button>
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
