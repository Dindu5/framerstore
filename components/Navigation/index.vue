<template>
  <div class="nav" :class="scrolled ? 'nav-scroll' : ''">
    <div class="container">
      <div class="nav-container">
        <div>
          <nuxt-link to="/">
            <img src="/images/logo.svg" class="nav-logo" alt="Framestore"
          /></nuxt-link>

          <div class="nav-search">
            <span class="material-symbols-rounded"> search </span>
            <input
              type="text"
              placeholder="Enter keyword to search"
              v-model="searchTerm"
              @keypress.enter="triggerSearch"
            />
          </div>
        </div>

        <div>
          <Button preIcon="cloud_upload"> Submit Template </Button>
          <Button preIcon="person" color="primary" @click="signIn">
            Sign In
          </Button>
        </div>
      </div>
    </div>
    <div v-if="showFilter" class="nav-filter-options">
      <div class="container">
        <Dropdown>
          <template v-slot:toggler>
            <div
              class="nav-filter-options__toggle"
              :class="
                hasIndustryActive ? 'nav-filter-options__toggle-active' : ''
              "
            >
              Industry
              <span class="material-symbols-rounded"> expand_more </span>
            </div>
          </template>
          <DropdownContent>
            <CheckBox
              v-for="industry in industryFilterItems"
              :key="industry.name"
              :label="industry.name"
              v-model="industry.value"
              @change="applyFilters"
            />
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <template v-slot:toggler>
            <div
              class="nav-filter-options__toggle"
              :class="hasTypeActive ? 'nav-filter-options__toggle-active' : ''"
            >
              Type
              <span class="material-symbols-rounded"> expand_more </span>
            </div>
          </template>
          <DropdownContent>
            <CheckBox
              v-for="industry in typeFilterItems"
              :key="industry.name"
              :label="industry.name"
              v-model="industry.value"
              @change="applyFilters"
            />
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <template v-slot:toggler>
            <div
              class="nav-filter-options__toggle"
              :class="hasStyleActive ? 'nav-filter-options__toggle-active' : ''"
            >
              Style
              <span class="material-symbols-rounded"> expand_more </span>
            </div>
          </template>
          <DropdownContent>
            <CheckBox
              v-for="industry in styleFilterItems"
              :key="industry.name"
              :label="industry.name"
              v-model="industry.value"
              @change="applyFilters"
            />
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <template v-slot:toggler>
            <div class="nav-filter-options__toggle">
              Color
              <span class="material-symbols-rounded"> expand_more </span>
            </div>
          </template>
          <DropdownContent>
            <CheckBox
              v-for="industry in styleFilterItems"
              :key="industry.name"
              :label="industry.name"
              v-model="industry.value"
            />
          </DropdownContent>
        </Dropdown>
        <Dropdown>
          <template v-slot:toggler>
            <div
              class="nav-filter-options__toggle"
              :class="hasTagActive ? 'nav-filter-options__toggle-active' : ''"
            >
              Tags
              <span class="material-symbols-rounded"> expand_more </span>
            </div>
          </template>
          <DropdownContent>
            <CheckBox
              v-for="industry in tagFilterItems"
              :key="industry.name"
              :label="industry.name"
              v-model="industry.value"
              @change="applyFilters"
            />
          </DropdownContent>
        </Dropdown>
        <button
          v-if="
            hasStyleActive || hasIndustryActive || hasTagActive || hasTypeActive
          "
          class="nav-filter-options__reset"
          @click="
            setFilters();
            applyFilters();
          "
        >
          Reset Filters <span class="material-symbols-rounded"> close </span>
        </button>
        <CircularLoader
          v-if="
            apiLoadingStates.templatesSearchResult === API_STATES.LOADING ||
            apiLoadingStates.allTemplates === API_STATES.LOADING
          "
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTemplateStore } from "../../stores/useTemplate";
import { API_STATES } from "../../services/constants";

const { getFilters, getTemplates } = useTemplateStore();
const templateStore = useTemplateStore();
const {
  allTags,
  allIndustries,
  allDesignStyles,
  allDesignTypes,
  apiLoadingStates,
} = storeToRefs(templateStore);

const scrolled = ref(false);
const router = useRouter();
const route = useRoute();

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const industryFilterItems = ref([]);
const styleFilterItems = ref([]);
const typeFilterItems = ref([]);
const tagFilterItems = ref([]);
const searchTerm = ref("");

const setFilters = () => {
  industryFilterItems.value = allIndustries.value.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  styleFilterItems.value = allDesignStyles.value.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  tagFilterItems.value = allTags.value.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  typeFilterItems.value = allDesignTypes.value.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
};

watch(allIndustries, async (newIndustries, oldTags) => {
  setFilters();
});

const hasIndustryActive = computed(() => {
  return industryFilterItems.value.some((item: any) => item.value);
});
const hasStyleActive = computed(() => {
  return styleFilterItems.value.some((item: any) => item.value);
});
const hasTagActive = computed(() => {
  return tagFilterItems.value.some((item: any) => item.value);
});
const hasTypeActive = computed(() => {
  return typeFilterItems.value.some((item: any) => item.value);
});

const showFilter = computed(() => {
  return ["/", "/search"].includes(route.path);
});

function signIn() {
  router.push("/login");
}

if (allIndustries.value.length < 1) {
  getFilters();
}

const applyFilters = () => {
  const filters = {} as Record<string, any>;
  if (hasIndustryActive) {
    filters["industries"] = {
      id: {
        $in: industryFilterItems.value
          .filter((industry: any) => industry.value)
          .map((ind: any) => ind.id),
      },
    };
  }
  if (hasStyleActive) {
    filters["design_styles"] = {
      id: {
        $in: styleFilterItems.value
          .filter((industry: any) => industry.value)
          .map((ind: any) => ind.id),
      },
    };
  }
  if (hasTagActive) {
    filters["tags"] = {
      id: {
        $in: tagFilterItems.value
          .filter((industry: any) => industry.value)
          .map((ind: any) => ind.id),
      },
    };
  }
  if (hasTypeActive) {
    filters["design_types"] = {
      id: {
        $in: typeFilterItems.value
          .filter((industry: any) => industry.value)
          .map((ind: any) => ind.id),
      },
    };
  }

  getTemplates({ filters }, searchTerm.value);
};

const triggerSearch = (e: Event) => {
  applyFilters();
  // router.push(`/search?searchTerm=${searchTerm.value}`);
};

onMounted(() => {
  setFilters();
  if (process.client) {
    window.addEventListener("scroll", handleScroll);
  }
});
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("scroll", handleScroll);
  }
});
</script>

<style></style>
