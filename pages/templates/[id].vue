<template>
  <div class="search-page">
    <NuxtLoadingIndicator />
    <div class="container">
      <div class="search-page-top">
        <div>
          <h1>{{ singleTemplate.title || singleTemplate.name }}</h1>
          <div>
            <img :src="singleTemplate.author.profilePicture" alt="Author" />
            <p>by {{ singleTemplate.author.username }}</p>
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
    <client-only>
      <swiper
        class="search-page-images"
        :slides-per-view="2"
        :space-between="50"
        navigation
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide
          v-for="(screenshot, i) in singleTemplate.screenshots"
          :key="i"
        >
          <img :src="screenshot.image" alt="Search Image"
        /></swiper-slide>
      </swiper>
      <!-- <div  style="width: 100%">
        <slider
          ref="slider"
          :options="options"
          @slide="slide"
          @tap="onTap"
          @init="onInit"
        >
          <slideritem
            
          >
            <img :src="screenshot.image" alt="Search Image"
          /></slideritem>
        </slider>
      </div> -->
    </client-only>
    <section class="container">
      <div class="search-page-description">
        <div>
          <div>
            <h3>Description</h3>
            <p>
              {{ singleTemplate.description }}
            </p>
          </div>
          <div>
            <h3>Pages ({{ singleTemplate?.pages?.length }})</h3>
            <div class="chips-container">
              <div
                v-for="page in singleTemplate.pages"
                :key="page"
                class="chip"
              >
                {{ page }}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <h3>Features</h3>
            <div class="chips-container">
              <div
                v-for="feature in singleTemplate.features"
                :key="feature.name"
                class="chip"
              >
                {{ feature.name }}
                <span class="material-symbols-rounded">
                  {{ feature.icon }}
                </span>
              </div>
            </div>
          </div>
          <div>
            <h3>Tags</h3>
            <div class="chips-container">
              <div
                v-for="tag in singleTemplate.tags"
                :key="tag.id"
                class="chip"
              >
                {{ tag?.attributes?.name || "" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container">
      <h2 class="search-page-sub_title">Related Templates</h2>
      <div
        v-if="apiLoadingStates.relatedTemplates === API_STATES.LOADING"
        class="search-page-related"
      >
        <TemplateCardSkeleton v-for="i in 3" :key="i" />
      </div>
      <div class="search-page-related" v-else>
        <TemplateCard
          v-for="(item, i) in relatedTemplates"
          :key="i"
          :cardData="item"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useTemplateStore } from "../../stores/useTemplate";
import { storeToRefs } from "pinia";
import "swiper/css";
// import "swiper/css/navigation";
import { API_STATES } from "../../services/constants";
// import { slider, slideritem } from "vue-concise-slider";
import { Swiper, SwiperSlide } from "swiper/vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async setup() {
    const onSwiper = (swiper: any) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    const templateStore = useTemplateStore();
    const { getSingleTemplate } = useTemplateStore();
    const { relatedTemplates, apiLoadingStates } = storeToRefs(templateStore);
    const route = useRoute();

    const id = route.params.id as string;

    const options = {
      currentPage: 0,
    };

    const singleTemplate = (await getSingleTemplate(id)) || {
      name: "",
      author: {},
      description: "",
      screenshots: [],
    };
    return {
      onSwiper,
      onSlideChange,
      singleTemplate,
      options,
      relatedTemplates,
      apiLoadingStates,
      API_STATES,
    };
  },
};
</script>
