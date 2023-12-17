<template>
  <div class="landing-container">
    <Hero />
    <section class="landing">
      <div class="container">
        <TemplateCard
          v-for="(item, i) in cardItems"
          :key="i"
          :cardData="item"
        />
      </div>
    </section>
    <div class="container">
      <div class="landing-pagination">
        <button>
          <span class="material-symbols-rounded"> chevron_left </span> Previous
        </button>
        <button
          v-for="i in 6"
          :key="i"
          class="pagination-btn"
          :class="i === 1 ? 'active' : ''"
        >
          {{ i }}
        </button>
        <button>
          Next <span class="material-symbols-rounded"> chevron_right </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        { title: "Tab 1", content: "Content for Tab 1" },
        { title: "Tab 2", content: "Content for Tab 2" },
        { title: "Tab 3", content: "Content for Tab 3" },
      ],
      cardItems: [
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

        {
          img: "/images/templates/img-3.jpg",
          title: "Magica",
          price: "$68",
          authorImg: "/images/author.png",
          author: "Adedayo",
        },
        {
          img: "/images/templates/img-4.jpg",
          title: "Cuisine",
          price: "$68",
          authorImg: "/images/author.png",
          author: "Adedayo",
        },
        {
          img: "/images/templates/img-5.jpg",
          title: "Cuisine",
          price: "$68",
          authorImg: "/images/author.png",
          author: "Adedayo",
        },
        {
          img: "/images/templates/img-1.jpg",
          title: "Cuisine",
          price: "$68",
          authorImg: "/images/author.png",
          author: "Adedayo",
        },
        {
          img: "/images/templates/img-3.jpg",
          title: "Magica",
          price: "$68",
          authorImg: "/images/author.png",
          author: "Adedayo",
        },
        {
          img: "/images/templates/img-4.jpg",
          title: "Cuisine",
          price: "$68",
          authorImg: "/images/author.png",
          author: "Adedayo",
        },
      ],
    };
  },
};
</script>
