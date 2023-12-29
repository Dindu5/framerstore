<template>
  <div class="search-result-page">
    <NuxtLoadingIndicator />
    <div v-if="templatesSearchResult.length > 0" class="container">
      <h1 class="search-result-page__text">
        Showing Result for: <span>{{ searchTerm }}</span>
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
      v-else-if="templatesSearchResult.length < 1"
      image="../images/empty-search.svg"
      title="No search result found"
      subText="Popular searches: Business, Portfolio, Minimal  "
      buttonText="Go Home"
      @action="goBack"
    />
    <section v-else class="landing">
      <div class="container">
        <TemplateCard
          v-for="(item, i) in templatesSearchResult"
          :key="i"
          :cardData="item"
        />
      </div>
    </section>
    <div v-if="templatesSearchResult.length > 0" class="container">
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
import { useTemplateStore } from "../stores/useTemplate";
import { storeToRefs } from "pinia";
import { API_STATES } from "../services/constants";
const route = useRoute();
const router = useRouter();

const templateStore = useTemplateStore();
const {
  templatesSearchResult,
  templatesSearchResultMeta,
  searchFilters,
  apiLoadingStates,
  stateSearchTerm,
} = storeToRefs(useTemplateStore());
const currentPage = ref(1);
const searchTerm = ref("") as any;
const { getTemplates, setSearchTerm } = useTemplateStore();

searchTerm.value = route?.query?.searchTerm;

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
</script>
