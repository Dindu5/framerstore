<template>
  <div class="search-result-page">
    <div v-if="templatesSearchResult?.length > 0" class="container">
      <h1
        v-if="apiLoadingStates.templatesSearchResult === API_STATES.SUCCESS"
        class="search-result-page__text"
      >
        Showing Result for: <span>{{ stateSearchTerm }}</span>
      </h1>
    </div>
    <section
      v-if="apiLoadingStates.templatesSearchResult === API_STATES.LOADING"
      class="landing"
    >
      <div class="container">
        <TemplateCardSkeleton v-for="i in 6" :key="i" />
      </div>
    </section>
    <EmptyState
      v-else-if="
        apiLoadingStates.templatesSearchResult === API_STATES.SUCCESS &&
        templatesSearchResult?.length < 1
      "
      image="../images/empty-search.svg"
      title="No search result found"
      subText="Popular searches: Business, Portfolio, Minimal  "
      buttonTitle="Go Home"
      @action="goBack"
    />
    <section v-else class="landing">
      <div class="container">
        <TemplateCard
          v-for="(item, i) in templatesSearchResult"
          :key="i"
          :cardData="item"
          @preview="previewTemplate"
        />
      </div>
    </section>
    <div v-if="templatesSearchResult?.length > 0" class="container">
      <Pagination
        class="landing-pagination"
        :totalPages="templatesSearchResultMeta?.pageCount || 1"
        :perPage="templatesSearchResultMeta?.pageSize || 25"
        :currentPage="templatesSearchResultMeta?.page || 1"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Framerstore - Search",
  ogTitle: "Framerstore - Search",
  applicationName: "FramerStore",
  description: "Discover the best suited Framer template for your website",
  ogDescription: "Discover the best suited Framer template for your website",
  ogImage:
    "https://res.cloudinary.com/dindu/image/upload/v1705347384/framerstore-og_jdeqlq_ypj8ru.png",
  twitterCard: "summary_large_image",
  ogType: "website",
  ogLocale: "en_UK",
  twitterImage:
    "https://res.cloudinary.com/dindu/image/upload/v1705347384/framerstore-og_jdeqlq_ypj8ru.png",
  themeColor: "#1d1c1c",
});
import { useTemplateStore } from "../stores/useTemplate";
import { storeToRefs } from "pinia";
import { API_STATES } from "../services/constants";

const { getTemplates, setSearchTerm, setSelectedTemplate } = useTemplateStore();
const {
  templatesSearchResult,
  templatesSearchResultMeta,
  searchFilters,
  apiLoadingStates,
  stateSearchTerm,
} = storeToRefs(useTemplateStore());
const route = useRoute();
const router = useRouter();

const currentPage = ref(1);
const searchTerm = ref(route?.query?.searchTerm || "") as any;

searchTerm.value = route?.query?.searchTerm || "";

if (stateSearchTerm.value !== searchTerm.value) {
  getTemplates({ filters: searchFilters.value }, searchTerm.value);
}

const onPageChange = (page: number) => {
  getTemplates(
    { pagination: { page }, filters: searchFilters.value },
    searchTerm.value
  );
};

const goBack = () => {
  setSearchTerm("");
  router.push("/");
};

const previewTemplate = (template: any) => {
  setSelectedTemplate(template);
};
</script>
