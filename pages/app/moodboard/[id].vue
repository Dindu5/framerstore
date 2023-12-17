<template>
  <div class="single-moodboard container">
    <p class="single-moodboard__back-button" @click="goBack">
      <span class="material-symbols-rounded"> arrow_back_ios </span> Moodboard
    </p>
    <div class="single-moodboard__cta">
      <div class="single-moodboard__description">
        <h1>Clean Fashion templates</h1>
        <h5>
          <span>5 items</span>
          <span>Edit Mood board</span>
        </h5>
      </div>
      <div>
        <button class="btn btn-secondary-outline">
          Share <span class="material-symbols-rounded"> expand_more </span>
        </button>
        <button class="btn btn-secondary-outline">
          <span class="material-symbols-rounded"> cloud_upload </span> Copy link
        </button>
      </div>
    </div>
    <div class="single-moodboard__templates">
      <TemplateCard v-for="(item, i) in cardItems" :key="i" :cardData="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const cardItems = [
  {
    img: "/images/templates/img-0.jpg",
    title: "Cuisine",
    price: "$68",
    authorImg: "/images/author.png",
    author: "Adedayo",
  },
  {
    img: "/images/templates/img-1.jpg",
    title: "Aubrey",
    price: "$68",
    authorImg: "/images/author.png",
    author: "Adedayo",
  },
  {
    img: "/images/templates/img-2.jpg",
    title: "Bigtech",
    price: "$40",
    authorImg: "/images/author.png",
    author: "Adedayo",
  },
];

function goBack() {
  router.go(-1);
}
</script>

<style></style>
