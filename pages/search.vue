<template>
  <div class="search-result-page">
    <div class="container">
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
    <section v-else class="landing">
      <div class="container">
        <TemplateCard
          v-for="(item, i) in templatesSearchResult"
          :key="i"
          :cardData="item"
        />
      </div>
    </section>
    <div class="container">
      <Pagination
        class="landing-pagination"
        :totalPages="templatesSearchResultMeta.pageCount || 1"
        :perPage="templatesSearchResultMeta.pageSize || 25"
        :currentPage="templatesSearchResultMeta.page || 1"
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

const templateStore = useTemplateStore();
const currentPage = ref(1);
const searchTerm = ref("") as any;
const { getTemplates } = useTemplateStore();
const {
  templatesSearchResult,
  templatesSearchResultMeta,
  searchFilters,
  apiLoadingStates,
} = storeToRefs(templateStore);

searchTerm.value = route?.query?.searchTerm;

if (templatesSearchResult.value.length < 1) {
  getTemplates({ filters: {} }, searchTerm.value);
}

const onPageChange = (page: number) => {
  getTemplates(
    { pagination: { page }, filters: searchFilters.value },
    searchTerm.value
  );
};
</script>
