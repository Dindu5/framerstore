<template>
  <div class="nav" :class="scrolled ? 'nav-scroll' : ''">
    <div class="container">
      <div class="nav-container">
        <div>
          <nuxt-link to="/">
            <img src="/images/logo.svg" class="nav-logo" alt="Framestore"
          /></nuxt-link>

          <form class="nav-search" @submit.prevent="triggerSearch">
            <input
              name="templateSearch"
              type="text"
              placeholder="Enter keyword to search"
              v-model="searchTerm"
              @keypress.enter="triggerSearch"
            />
            <button>
              <img src="/images/icons/search.svg" alt="Search" />
            </button>
          </form>
        </div>

        <div class="nav-container--buttons">
          <Button
            color="secondary"
            outlined
            @click="visitExternalLink('http://framerstore.shop/blog/')"
          >
            Our Blog
          </Button>
          <Button
            color="secondary"
            outlined
            @click="visitExternalLink('https://www.framer.com/?via=biyified')"
          >
            Build
          </Button>

          <Button color="primary" @click="router.push('/app/submit')">
            <img src="/images/icons/upload.svg" alt="Upload" />
            Submit Template
          </Button>
          <!-- <Button preIcon="person" color="primary" @click="signIn">
            Sign In
          </Button> -->
        </div>
        <div class="nav-container--mobile">
          <button>
            <img src="/images/icons/search-mobile.svg" alt="Menu" />
          </button>
          <button>
            <img src="/images/icons/mobile-toggle.svg" alt="Menu" />
          </button>
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
              <img src="/images/icons/down.svg" alt="expand" />
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
              <img src="/images/icons/down.svg" alt="expand" />
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

              <img src="/images/icons/down.svg" alt="expand" />
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
              <img src="/images/icons/down.svg" alt="expand" />
            </div>
          </template>
          <DropdownContent>
            <CheckBox
              v-for="color in colorFilterValues"
              :key="color.name"
              :label="color.name"
              useColor
              v-model="color.value"
              @change="applyFilters"
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
              <img src="/images/icons/down.svg" alt="expand" />
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
            hasStyleActive ||
            hasIndustryActive ||
            hasTagActive ||
            hasTypeActive ||
            hasColorActive
          "
          class="nav-filter-options__reset"
          @click="
            setFilters();
            applyFilters();
          "
        >
          Reset Filters <span class="material-symbols-rounded"> close </span>
        </button>
        <ClientOnly>
          <CircularLoader
            v-if="
              apiLoadingStates.templatesSearchResult === API_STATES.LOADING ||
              apiLoadingStates.allTemplates === API_STATES.LOADING
            "
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTemplateStore } from "../../stores/useTemplate";
import { API_STATES } from "../../services/constants";
import { Colors } from "~/types/modules/templateModel";

const { getFilters, getTemplates } = useTemplateStore();
const templateStore = useTemplateStore();
const {
  allTags,
  allIndustries,
  allDesignStyles,
  allDesignTypes,
  apiLoadingStates,
  stateSearchTerm,
} = storeToRefs(templateStore);

const scrolled = ref(false);
const router = useRouter();
const route = useRoute();

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const industryFilterItems = ref([]) as Ref<
  Array<{ name: string; value: boolean }>
>;
const styleFilterItems = ref([]) as Ref<
  Array<{ name: string; value: boolean }>
>;
const typeFilterItems = ref([]) as Ref<Array<{ name: string; value: boolean }>>;
const tagFilterItems = ref([]) as Ref<Array<{ name: string; value: boolean }>>;
const colorFilterValues = ref([]) as Ref<
  Array<{ name: string; value: boolean }>
>;
const searchTerm = ref("");

const setFilters = () => {
  industryFilterItems.value = allIndustries.value?.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  styleFilterItems.value = allDesignStyles.value?.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  tagFilterItems.value = allTags.value?.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  typeFilterItems.value = allDesignTypes.value?.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  colorFilterValues.value = Object.values(Colors).map((color: any) => {
    return { name: color, id: color, value: false };
  });
};

watch(allIndustries, (newIndustries, oldTags) => {
  setFilters();
});

watch(stateSearchTerm, () => {
  searchTerm.value = stateSearchTerm.value;
});

const hasIndustryActive = computed(() => {
  return industryFilterItems.value?.some((item: any) => item.value);
});
const hasStyleActive = computed(() => {
  return styleFilterItems.value?.some((item: any) => item.value);
});
const hasTagActive = computed(() => {
  return tagFilterItems.value?.some((item: any) => item.value);
});
const hasTypeActive = computed(() => {
  return typeFilterItems.value?.some((item: any) => item.value);
});
const hasColorActive = computed(() => {
  return colorFilterValues.value?.some((item: any) => item.value);
});

const showFilter = computed(() => {
  return ["/", "/search"].includes(route.path);
});

function signIn() {
  router.push("/login");
}

// if (allIndustries.value.length < 1) {
//   getFilters();
// }

const applyFilters = () => {
  const filters = {} as Record<string, any>;
  if (hasIndustryActive) {
    filters["industries"] = {
      id: {
        $in: industryFilterItems.value
          ?.filter((industry: any) => industry.value)
          ?.map((ind: any) => ind.id),
      },
    };
  }
  if (hasStyleActive) {
    filters["design_styles"] = {
      id: {
        $in: styleFilterItems.value
          ?.filter((industry: any) => industry.value)
          ?.map((ind: any) => ind.id),
      },
    };
  }
  if (hasTagActive) {
    filters["tags"] = {
      id: {
        $in: tagFilterItems.value
          ?.filter((industry: any) => industry.value)
          ?.map((ind: any) => ind.id),
      },
    };
  }
  if (hasTypeActive) {
    filters["design_types"] = {
      id: {
        $in: typeFilterItems.value
          ?.filter((industry: any) => industry.value)
          ?.map((ind: any) => ind.id),
      },
    };
  }
  if (hasColorActive) {
    filters["colors"] = {
      $containsi: colorFilterValues.value
        ?.filter((color: any) => color.value)
        ?.map((ind: any) => ind.id),
    };
  }

  getTemplates({ filters }, searchTerm.value);
};

const triggerSearch = (e: Event) => {
  if (searchTerm.value) {
    applyFilters();
    router.push(`/search?searchTerm=${searchTerm.value}`);
  }
};

const visitExternalLink = (url: string) => {
  navigateTo(url, {
    open: {
      target: "_blank",
    },
  });
};

onMounted(async () => {
  getFilters();
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
