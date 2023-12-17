<template>
  <div class="search-page">
    <div class="container">
      <div class="search-page-top">
        <div>
          <h1>ChloeLaurent — Luxury Fashion Photography Website</h1>
          <div>
            <img src="/images/author-2x.svg" alt="Author" />
            <p>by Felix Studio</p>
          </div>
        </div>
        <div>
          <button class="btn btn-primary">
            <span class="material-symbols-rounded"> local_mall </span> Buy
            Template
          </button>

          <div>
            <button class="btn btn-icon">
              <span class="material-symbols-rounded"> bookmark </span>
            </button>
            <button class="btn btn-icon">
              <span class="material-symbols-rounded"> upload </span>
            </button>
            <button class="btn">Preview</button>
          </div>
        </div>
      </div>
    </div>
    <div class="search-page-images">
      <img src="/images/search-3.png" alt="Search Image" />
      <img src="/images/search-2.jpg" alt="Search Image" />
    </div>
    <section class="container">
      <div class="search-page-description">
        <div>
          <div>
            <h3>Description</h3>
            <p>
              Unleash your business's potential with Spendly, a dynamic SAAS
              template meticulously designed to ignite your vision. Spendly is a
              flexible, all-in-one solution ideal for entrepreneurs seeking to
              launch a state-of-the-art financial management tool.
            </p>
          </div>
          <div>
            <h3>Pages (13)</h3>
            <div class="chips-container">
              <div class="chip">Home</div>
              <div class="chip">404</div>
              <div class="chip">Contact</div>
              <div class="chip">About</div>
              <div class="chip">People</div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3>Features</h3>
            <div class="chips-container">
              <div class="chip">
                Video <span class="material-symbols-rounded"> videocam </span>
              </div>
              <div class="chip">
                3-D <span class="material-symbols-rounded"> view_in_ar </span>
              </div>
              <div class="chip">
                CMS <span class="material-symbols-rounded"> database </span>
              </div>
              <div class="chip">
                CMS <span class="material-symbols-rounded"> database </span>
              </div>
              <div class="chip">
                CMS <span class="material-symbols-rounded"> database </span>
              </div>
              <div class="chip">
                CMS <span class="material-symbols-rounded"> database </span>
              </div>
              <div class="chip">
                CMS <span class="material-symbols-rounded"> database </span>
              </div>
            </div>
          </div>
          <div>
            <h3>Tags</h3>
            <div class="chips-container">
              <div class="chip">Home</div>
              <div class="chip">404</div>
              <div class="chip">Contact</div>
              <div class="chip">About</div>
              <div class="chip">People</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container">
      <h2 class="search-page-sub_title">Related Templates</h2>
      <div class="search-page-related">
        <TemplateCard
          v-for="(item, i) in cardItems"
          :key="i"
          :cardData="item"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
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
      ],
    };
  },
};
</script>
