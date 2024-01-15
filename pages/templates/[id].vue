<template>
  <div class="search-page">
    <NuxtLoadingIndicator />
    <Head>
      <Title>{{ singleTemplate.title || singleTemplate.name }}</Title>
      <Meta name="description" :content="singleTemplate.description" />
      <Meta name="author" :content="singleTemplate.author.username" />
    </Head>

    <div
      v-if="apiLoadingStates.singleTemplate === API_STATES.LOADING"
      class="search-page-loading"
    >
      <div class="container">
        <div class="search-page-loading-top">
          <div>
            <SkeletonLoader width="89rem" height="63%" />
            <div>
              <SkeletonLoader shape="circle" width="6rem" height="6rem" />
              <SkeletonLoader width="16rem" height="6rem" />
            </div>
          </div>
          <SkeletonLoader width="40rem" height="100%" />
        </div>
        <div class="search-page-loading-carousel">
          <SkeletonLoader width="50%" height="100%" />
          <SkeletonLoader width="50%" height="100%" />
        </div>
        <div class="search-page-loading-desc">
          <SkeletonLoader
            width="100%"
            height="2rem"
            style="margin-bottom: 1rem"
          />
          <SkeletonLoader
            width="100%"
            height="17rem"
            style="margin-bottom: 2rem"
          />
          <SkeletonLoader
            width="100%"
            height="2rem"
            style="margin-bottom: 1rem"
          />
          <SkeletonLoader
            width="100%"
            height="7rem"
            style="margin-bottom: 2rem"
          />
          <SkeletonLoader
            width="100%"
            height="2rem"
            style="margin-bottom: 1rem"
          />
          <SkeletonLoader
            width="100%"
            height="7rem"
            style="margin-bottom: 2rem"
          />
          <SkeletonLoader
            width="100%"
            height="2rem"
            style="margin-bottom: 1rem"
          />
          <SkeletonLoader
            width="100%"
            height="7rem"
            style="margin-bottom: 2rem"
          />
        </div>
      </div>
    </div>
    <div>
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
            <Button
              color="accent"
              @click="visitExternalLink(singleTemplate.purchase_link)"
            >
              <img src="/images/icons/buy.svg" alt="Upload" /> Buy Template -
              ${{ singleTemplate.price }}
            </Button>

            <div>
              <!-- <button class="btn btn-icon">
              <span class="material-symbols-rounded"> bookmark </span>
            </button> -->
              <!-- <Button color="secondary" outlined icon>
                <img src="/images/icons/share.svg" alt="Upload" />
              </Button> -->
              <Button
                color="secondary"
                outlined
                @click="previewTemplate(singleTemplate)"
              >
                Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
      <client-only>
        <div @mouseout="hoverElement = false" @mouseover="hoverElement = true">
          <swiper
            class="search-page-images"
            :class="hoverElement ? 'search-page-images--active' : ''"
            :space-between="50"
            :modules="modules"
            :keyboard="true"
            slidesPerView="auto"
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
        </div>
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
                @click="triggerSearch(page)"
              >
                {{ page }}
              </div>
            </div>
          </div>

          <div>
            <h3>Features</h3>
            <div class="chips-container">
              <div
                v-for="feature in singleTemplate.features"
                :key="feature.name"
                class="chip"
                @click="triggerSearch(feature.name)"
              >
                {{ feature.name }}
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
                @click="triggerSearch(tag?.attributes?.name || '')"
              >
                {{ tag?.attributes?.name || "" }}
              </div>
            </div>
          </div>
          <div v-if="singleTemplate?.design_styles?.length > 0">
            <h3>Style</h3>
            <div class="chips-container">
              <div
                v-for="style in singleTemplate.design_styles"
                :key="style.id"
                class="chip"
                @click="triggerSearch(style?.attributes?.name || '')"
              >
                {{ style?.attributes?.name || "" }}
              </div>
            </div>
          </div>
          <div v-if="singleTemplate?.typographies?.length > 0">
            <h3>Typography</h3>
            <div class="chips-container">
              <div
                v-for="typo in singleTemplate.typographies"
                :key="typo.id"
                class="chip"
                @click="triggerSearch(typo?.attributes?.name || '')"
              >
                {{ typo?.attributes?.name || "" }}
              </div>
            </div>
          </div>
          <div v-if="singleTemplate?.colors?.length > 0">
            <h3>Colors</h3>
            <div class="chips-container">
              <div
                v-for="color in singleTemplate.colors"
                :key="color.id"
                class="chip"
                @click="triggerSearch(color)"
              >
                <span
                  :class="
                    color.toLowerCase() === 'white'
                      ? 'chip-white'
                      : `chip-color-${color}`
                  "
                ></span>
                {{ color }}
              </div>
            </div>
          </div>
          <div class="search-page--cta">
            <Button
              color="accent"
              @click="visitExternalLink(singleTemplate.purchase_link)"
            >
              <img src="/images/icons/buy.svg" alt="Buy" /> Buy Template - ${{
                singleTemplate.price
              }}
            </Button>
            <Button
              color="secondary"
              outlined
              @click="previewTemplate(singleTemplate)"
            >
              Preview
            </Button>
            <!-- <Button color="secondary" outlined icon>
              <img src="/images/icons/share.svg" alt="Upload" />
            </Button> -->
          </div>
        </div>
      </section>
      <section
        v-if="
          apiLoadingStates.relatedTemplates === API_STATES.LOADING ||
          relatedTemplates.length > 0
        "
        class="container"
      >
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
            @preview="previewTemplate"
          />
        </div>
      </section>
      <EmptyState v-else title="No related templates found" />
    </div>
  </div>
</template>

<script lang="ts">
import { useTemplateStore } from "../../stores/useTemplate";
import { storeToRefs } from "pinia";
import "swiper/css";
import "swiper/css/navigation";
import { API_STATES } from "../../services/constants";
// import { slider, slideritem } from "vue-concise-slider";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async setup() {
    const onSwiper = (swiper: any) => {
      console.log(swiper, "heree");
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    const templateStore = useTemplateStore();
    const { getSingleTemplate, setSelectedTemplate, getTemplates } =
      useTemplateStore();
    const { relatedTemplates, apiLoadingStates, searchFilters } =
      storeToRefs(templateStore);
    const route = useRoute();
    const router = useRouter();
    const hoverElement = ref(false);

    const id = route.params.id as string;

    const options = {
      currentPage: 0,
    };
    const visitExternalLink = (url: string) => {
      navigateTo(url, {
        open: {
          target: "_blank",
        },
      });
    };

    const previewTemplate = (template: any) => {
      setSelectedTemplate(template);
    };

    const singleTemplate =
      (await getSingleTemplate(id)) ||
      ({
        name: "",
        author: {},
        description: "",
        screenshots: [],
      } as any);

    const triggerSearch = (search: string) => {
      getTemplates({ filters: searchFilters.value }, search);
      router.push(`/search?searchTerm=${search}`);
    };
    return {
      onSwiper,
      onSlideChange,
      singleTemplate,
      options,
      relatedTemplates,
      apiLoadingStates,
      API_STATES,
      previewTemplate,
      modules: [Navigation, Pagination, Mousewheel, Keyboard],
      hoverElement,
      visitExternalLink,
      triggerSearch,
    };
  },
};
</script>
