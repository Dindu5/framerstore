<template>
  <div class="landing-container">
    <NuxtLoadingIndicator />
    <Hero />
    <section
      v-if="
        apiLoadingStates.allTemplates === API_STATES.LOADING &&
        allTemplates.length < 1
      "
      class="landing"
    >
      <div class="container">
        <TemplateCardSkeleton v-for="i in 6" :key="i" />
      </div>
    </section>
    <EmptyState
      v-else-if="allTemplates.length < 1"
      image="../images/empty-search.svg"
      title="No Templates found"
      subText="Kindly reset your search filters and try again"
    />
    <section v-else class="landing">
      <div class="container">
        <TemplateCard
          v-for="(item, i) in allTemplates"
          :key="i"
          :cardData="item"
        />
      </div>
    </section>

    <div
      v-if="apiLoadingStates.allTemplates === API_STATES.SUCCESS"
      class="container"
    >
      <Pagination
        class="landing-pagination"
        :totalPages="allTemplatesMeta?.pageCount || 1"
        :perPage="allTemplatesMeta?.pageSize || 25"
        :currentPage="allTemplatesMeta?.page || 1"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTemplateStore } from "../stores/useTemplate";
import { storeToRefs } from "pinia";
import { API_STATES } from "../services/constants";

const currentPage = ref(1);
const { getTemplates } = useTemplateStore();
const { allTemplates, allTemplatesMeta, searchFilters, apiLoadingStates } =
  storeToRefs(useTemplateStore());

getTemplates();

const onPageChange = (page: number) => {
  getTemplates({
    pagination: { page },
    filters: searchFilters.value,
  });
  // currentPage.value = page;
};
</script>
