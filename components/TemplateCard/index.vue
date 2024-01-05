<template>
  <div
    class="template-card"
    @mouseover="showCta = true"
    @mouseout="showCta = false"
    @click="$router.push(`/templates/${cardData.id}`)"
  >
    <div class="template-card__img" :ref="`template-card-${id}`">
      <NuxtImg
        :src="cardData.thumbnail.image"
        alt="Template Image"
        :placeholder="cardData.thumbnail.placeholder"
      />
      <!-- <CldImage
        :src="cardData.thumbnail.publicId"
        alt="Image"
        layout="fullWidth"
        :height="`${height}`"
        :width="`${width}`"
      >
      </CldImage> -->

      <div :class="showCta ? 'template-card__img-cta' : ''">
        <button class="btn btn-icon" @click="bookMark">
          <span class="material-symbols-rounded"> bookmark </span>
        </button>
        <button class="btn btn-icon" @click="bookMark">
          <span class="material-symbols-rounded"> upload </span>
        </button>
        <button class="btn" @click.prevent="preview">Live preview</button>
      </div>
    </div>

    <div class="template-card__details">
      <h4>{{ cardData.name }}</h4>
      <p>${{ cardData.price }}</p>
    </div>
    <div class="template-card__author">
      <img :src="cardData.author.profilePicture" alt="User Image" />
      <p>{{ cardData.author.username }}</p>
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
      height: 638,
      width: 533,
      id: "" as any,
    };
  },
  methods: {
    getSize() {
      let height = (this.$refs as any)?.[`template-card-${this.id}`]
        ?.clientHeight;
      let width = (this.$refs as any)?.[`template-card-${this.id}`]
        ?.clientWidth;
      this.height = height;
      this.width = width;
    },
    bookMark(e: Event) {
      e.stopPropagation();
    },
    preview(e: Event) {
      e.stopPropagation();
      this.$emit("preview", this.cardData);
    },
  },
  mounted() {
    this.getSize();
    window.addEventListener("resize", this.getSize);
  },
  created() {
    this.id = Math.random();
  },

  unmounted() {
    window.removeEventListener("resize", this.getSize);
  },
};
</script>

<style></style>
