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
            Blog
          </Button>
          <Button
            color="secondary"
            outlined
            @click="visitExternalLink('https://www.framer.com/?via=biyified')"
          >
            Get Framer
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
          <button @click="searchTrigger()">
            <img src="/images/icons/search-mobile.svg" alt="Menu" />
          </button>
          <button @click="menuTrigger()">
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
              <img
                v-if="!hasIndustryActive"
                src="/images/icons/down.svg"
                alt="expand"
              />
              <img v-else src="/images/icons/down-white.svg" alt="expand" />
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
              <img
                v-if="!hasTypeActive"
                src="/images/icons/down.svg"
                alt="expand"
              />
              <img v-else src="/images/icons/down-white.svg" alt="expand" />
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

              <img
                v-if="!hasStyleActive"
                src="/images/icons/down.svg"
                alt="expand"
              />
              <img v-else src="/images/icons/down-white.svg" alt="expand" />
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
            <div
              class="nav-filter-options__toggle"
              :class="hasColorActive ? 'nav-filter-options__toggle-active' : ''"
            >
              Color
              <img
                v-if="!hasColorActive"
                src="/images/icons/down.svg"
                alt="expand"
              />
              <img v-else src="/images/icons/down-white.svg" alt="expand" />
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
              :class="
                hasTypographyActive ? 'nav-filter-options__toggle-active' : ''
              "
            >
              Typography
              <img
                v-if="!hasTypographyActive"
                src="/images/icons/down.svg"
                alt="expand"
              />
              <img v-else src="/images/icons/down-white.svg" alt="expand" />
            </div>
          </template>
          <DropdownContent>
            <CheckBox
              v-for="industry in typographyFilterItems"
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
            hasTypeActive ||
            hasColorActive ||
            hasTypographyActive
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
    <div
      class="nav-mobile"
      :class="isMobileNavVisible ? 'nav-mobile-active' : ''"
    >
      <div>
        <nuxt-link to="/app/submit">Submit Template</nuxt-link>
        <nuxt-link to="/login">Sign In</nuxt-link>
        <nuxt-link to="/signup">Register - Free</nuxt-link>
      </div>
    </div>
    <div
      class="nav-mobile-search"
      :class="isMobileSearchVisible ? 'nav-mobile-search-active' : ''"
    >
      <div>
        <div>
          <form
            class="nav-mobile-search__input-container"
            @submit.prevent="triggerSearch"
          >
            <input
              name="templateSearch"
              type="text"
              placeholder="Enter keyword to search"
              v-model="searchTerm"
              @keypress.enter="triggerSearch"
            />

            <img src="/images/icons/seach-mobile.svg" alt="Search" />
            <button @click="searchTrigger()">Cancel</button>
          </form>
        </div>
      </div>
    </div>
    <div
      class="nav-mobile-filters"
      :class="isMobileFiltersVisible ? 'nav-mobile-filters-active' : ''"
    >
      <div>
        <div class="nav-mobile-filters__top">
          <h4>Filters</h4>
          <button @click="setMobileFilters(false)">
            <img src="/images/icons/close.svg" alt="Close" />
          </button>
        </div>
        <div class="nav-mobile-filters__filter-items">
          <div>
            <div
              class="nav-mobile-filters__filter-items-title"
              @click="
                mobileFilterOptionHeadings.industry =
                  !mobileFilterOptionHeadings.industry
              "
            >
              <h5>Industry</h5>
              <img src="/images/icons/down.svg" alt="down" />
            </div>
            <div
              class="nav-mobile-filters__filter-items-options"
              :class="
                mobileFilterOptionHeadings.industry
                  ? ' nav-mobile-filters__filter-items-options-active'
                  : ''
              "
              :style="`height: ${
                mobileFilterOptionHeadings.industry
                  ? getFilterHeight(industryFilterItems.length || 1)
                  : '0rem'
              };`"
            >
              <CheckBox
                v-for="industry in industryFilterItems"
                :key="industry.name"
                :label="industry.name"
                v-model="industry.value"
              />
            </div>
          </div>
          <div>
            <div
              class="nav-mobile-filters__filter-items-title"
              @click="
                mobileFilterOptionHeadings.type =
                  !mobileFilterOptionHeadings.type
              "
            >
              <h5>Type</h5>
              <img src="/images/icons/down.svg" alt="down" />
            </div>
            <div
              class="nav-mobile-filters__filter-items-options"
              :class="
                mobileFilterOptionHeadings.type
                  ? ' nav-mobile-filters__filter-items-options-active'
                  : ''
              "
              :style="`height: ${
                mobileFilterOptionHeadings.type
                  ? getFilterHeight(typeFilterItems.length || 1)
                  : '0rem'
              };`"
            >
              <CheckBox
                v-for="industry in typeFilterItems"
                :key="industry.name"
                :label="industry.name"
                v-model="industry.value"
              />
            </div>
          </div>
          <div>
            <div
              class="nav-mobile-filters__filter-items-title"
              @click="
                mobileFilterOptionHeadings.style =
                  !mobileFilterOptionHeadings.style
              "
            >
              <h5>Style</h5>
              <img src="/images/icons/down.svg" alt="down" />
            </div>
            <div
              class="nav-mobile-filters__filter-items-options"
              :class="
                mobileFilterOptionHeadings.style
                  ? ' nav-mobile-filters__filter-items-options-active'
                  : ''
              "
              :style="`height: ${
                mobileFilterOptionHeadings.style
                  ? getFilterHeight(styleFilterItems.length || 1)
                  : '0rem'
              };`"
            >
              <CheckBox
                v-for="industry in styleFilterItems"
                :key="industry.name"
                :label="industry.name"
                v-model="industry.value"
              />
            </div>
          </div>

          <div>
            <div
              class="nav-mobile-filters__filter-items-title"
              @click="
                mobileFilterOptionHeadings.color =
                  !mobileFilterOptionHeadings.color
              "
            >
              <h5>Color</h5>
              <img src="/images/icons/down.svg" alt="down" />
            </div>
            <div
              class="nav-mobile-filters__filter-items-options"
              :class="
                mobileFilterOptionHeadings.color
                  ? ' nav-mobile-filters__filter-items-options-active'
                  : ''
              "
              :style="`height: ${
                mobileFilterOptionHeadings.color
                  ? getFilterHeight(colorFilterValues.length || 1)
                  : '0rem'
              };`"
            >
              <CheckBox
                v-for="industry in colorFilterValues"
                :key="industry.name"
                :label="industry.name"
                useColor
                v-model="industry.value"
              />
            </div>
          </div>

          <div>
            <div
              class="nav-mobile-filters__filter-items-title"
              @click="
                mobileFilterOptionHeadings.typography =
                  !mobileFilterOptionHeadings.typography
              "
            >
              <h5>Tags</h5>
              <img src="/images/icons/down.svg" alt="down" />
            </div>
            <div
              class="nav-mobile-filters__filter-items-options"
              :class="
                mobileFilterOptionHeadings.typography
                  ? ' nav-mobile-filters__filter-items-options-active'
                  : ''
              "
              :style="`height: ${
                mobileFilterOptionHeadings.typography
                  ? getFilterHeight(typographyFilterItems.length || 1)
                  : '0rem'
              };`"
            >
              <CheckBox
                v-for="typo in typographyFilterItems"
                :key="typo.name"
                :label="typo.name"
                v-model="typo.value"
              />
            </div>
          </div>
        </div>
        <div class="nav-mobile-filters__buttons">
          <Button
            color="primary"
            outlined
            fullWidth
            @click="
              setFilters();
              applyFilters();
            "
          >
            Reset
          </Button>
          <Button color="primary" fullWidth @click="applyFilters">
            Apply
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTemplateStore } from "../../stores/useTemplate";
import { API_STATES } from "../../services/constants";
import { Colors } from "~/types/modules/templateModel";

const isMobileNavVisible = ref<boolean>(false);
const isMobileSearchVisible = ref<boolean>(false);

// method when the menu button is click
const menuTrigger = (): void => {
  if (isMobileNavVisible.value) {
    isMobileNavVisible.value = false;
    return;
  }
  setMobileFilters(false);
  isMobileSearchVisible.value = false;
  isMobileNavVisible.value = true;
};
const searchTrigger = (): void => {
  if (isMobileSearchVisible.value) {
    isMobileSearchVisible.value = false;
    return;
  }
  setMobileFilters(false);
  isMobileNavVisible.value = false;
  isMobileSearchVisible.value = true;
};

const { getFilters, getTemplates, setMobileFilters } = useTemplateStore();
const templateStore = useTemplateStore();
const {
  allTypographies,
  allColors,
  allIndustries,
  allDesignStyles,
  allDesignTypes,
  apiLoadingStates,
  stateSearchTerm,
  isMobileFiltersVisible,
} = storeToRefs(templateStore);
useHead({
  bodyAttrs: {
    class: computed(() => {
      if (
        isMobileNavVisible.value ||
        isMobileSearchVisible.value ||
        isMobileFiltersVisible.value
      )
        return "show-overlay";
      return "";
    }),
  },
});

const scrolled = ref<boolean>(false);
const router = useRouter();
const route = useRoute();

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const mobileFilterOptionHeadings = ref<Record<string, boolean>>({
  industry: false,
  color: false,
  type: false,
  style: false,
  typography: false,
});
const industryFilterItems = ref([]) as Ref<
  Array<{ name: string; value: boolean }>
>;
const styleFilterItems = ref([]) as Ref<
  Array<{ name: string; value: boolean }>
>;
const typeFilterItems = ref([]) as Ref<Array<{ name: string; value: boolean }>>;
const typographyFilterItems = ref([]) as Ref<
  Array<{ name: string; value: boolean }>
>;
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
  typographyFilterItems.value = allTypographies.value?.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  typeFilterItems.value = allDesignTypes.value?.map((tag: any) => {
    return { name: tag?.attributes?.name, id: tag.id, value: false };
  });
  // Object.values(Colors)
  colorFilterValues.value = allColors.value?.map((color: any) => {
    return { name: color?.attributes?.name, id: color.id, value: false };
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
const hasTypographyActive = computed(() => {
  return typographyFilterItems.value?.some((item: any) => item.value);
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
  const selectedFilters = {
    industry: industryFilterItems.value?.filter(
      (industry: any) => industry.value
    ),
    style: styleFilterItems.value?.filter((industry: any) => industry.value),
    typography: typographyFilterItems.value?.filter(
      (industry: any) => industry.value
    ),
    type: typeFilterItems.value?.filter((industry: any) => industry.value),
    color: colorFilterValues.value?.filter((color: any) => color.value),
  };
  if (hasIndustryActive) {
    filters["industries"] = {
      id: {
        $in: selectedFilters.industry?.map((ind: any) => ind.id),
      },
    };
  }
  if (hasStyleActive) {
    filters["design_styles"] = {
      id: {
        $in: selectedFilters.style?.map((ind: any) => ind.id),
      },
    };
  }
  if (hasTypographyActive) {
    filters["typographies"] = {
      id: {
        $in: selectedFilters.typography?.map((ind: any) => ind.id),
      },
    };
  }
  if (hasTypeActive) {
    filters["design_types"] = {
      id: {
        $in: selectedFilters.type?.map((ind: any) => ind.id),
      },
    };
  }
  if (hasColorActive) {
    filters["colors"] = {
      $containsi: selectedFilters.color?.map((ind: any) => ind.id),
    };
  }
  const { color, style, type, industry } = selectedFilters;

  const totalFilters =
    color.length + style.length + type.length + industry.length;

  getTemplates({ filters }, searchTerm.value, totalFilters);
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
const getFilterHeight = (length: number) => {
  return `${3.2 + length * 2.9 + (length - 1) * 1.6}rem`;
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
