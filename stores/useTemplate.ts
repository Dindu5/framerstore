import { defineStore } from "pinia";
import qs from "qs";
import { API_STATES } from "../services/constants";

export const useTemplateStore = defineStore("template", () => {
  // state variables
  const allTemplates = ref([]) as Ref<Array<any>>;
  const allTemplatesMeta = ref({
    page: 1,
    pageSize: 25,
    total: 1,
    pageCount: 1,
  }) as any;
  const templatesSearchResult = ref([]) as Ref<Array<any>>;
  const templatesSearchResultMeta = ref({
    page: 1,
    pageSize: 25,
    total: 1,
    pageCount: 1,
  }) as any;
  const allTags = ref([]) as any;
  const allIndustries = ref([]) as any;
  const allDesignStyles = ref([]) as any;
  const allDesignTypes = ref([]) as any;
  const apiLoadingStates = ref({
    allTemplates: API_STATES.IDLE,
    templatesSearchResult: API_STATES.IDLE,
    singleTemplate: API_STATES.IDLE,
    relatedTemplates: API_STATES.IDLE,
  });
  const relatedTemplates = ref([]) as Ref<Array<any>>;

  const searchFilters = ref({}) as any;
  const stateSearchTerm = ref("");

  // methods
  const transformTemplate = (template: any) => {
    const {
      name,
      price,
      description,
      thumbnail,
      purchase_link,
      preview_link,
      author,
      pages,
      features,
      tags,
      design_types,
      title,
      screenshots,
      industries,
    } = template?.attributes || {
      name: "",
      price: "",
      description: "",
      thumbnail: "",
      purchase_link: "",
      preview_link: "",
      author: {},
      tags: [],
      design_types: [],
      screenshots: [],
      industries: [],
    };
    return {
      id: template.id,
      name,
      price,
      pages,
      features,
      title,
      thumbnail: {
        image: thumbnail?.data?.attributes?.url,
        placeholder: thumbnail?.data?.attributes?.formats?.thumbnail?.url,
        publicId: thumbnail?.data?.attributes?.provider_metadata?.public_id,
      },
      screenshots:
        screenshots?.data?.map((screenshot: any) => {
          return {
            main: screenshot.attributes,
            image: screenshot?.attributes?.url,
            placeholder: screenshot?.attributes?.formats?.thumbnail?.url,
            publicId: screenshot?.attributes?.provider_metadata?.public_id,
          };
        }) || [],
      description: description,
      tags: tags?.data || [],
      industries: industries?.data || [],
      design_types: design_types?.data || [],
      author: {
        profilePicture:
          author?.data?.attributes?.profilePicture?.data?.attributes?.url,
        username: author?.data?.attributes?.username,
      },
      purchase_link,
      preview_link,
    };
  };
  async function getTemplates(payload?: any, searchTerm: string = "") {
    if (payload?.filters) {
      searchFilters.value = payload.filters;
    }

    const { $api } = useNuxtApp();
    const router = useRouter();
    const queryParams = {
      ...payload,
      populate: {
        author: { populate: "profilePicture" },
        thumbnail: "*",
        screenshots: "*",
        design_styles: "*",
        design_types: "*",
        industries: "*",
        tags: "*",
      },
    };
    if (searchTerm) {
      stateSearchTerm.value = searchTerm;
      const searchFields = [
        "name",
        "description",
        "slug",
        "tags.name",
        "design_types.name",
        "design_styles.name",
        "author.username",
        "tags.name",
        "industries.name",
      ];
      queryParams["filters"]["$or"] = searchFields.map((search: string) => {
        const searchField = {} as Record<string, any>;
        if (!search.includes(".")) {
          searchField[search] = { $containsi: searchTerm };
        } else {
          const [level1, level2] = search.split(".");
          const nestedSearchField = {} as Record<string, any>;
          nestedSearchField[level2] = { $containsi: searchTerm };
          searchField[level1] = nestedSearchField;
        }
        return searchField;
      });
    }
    if (searchTerm) {
      // router.push(`/search?searchTerm=${searchTerm}`);
      apiLoadingStates.value.templatesSearchResult = API_STATES.LOADING;
    } else {
      apiLoadingStates.value.allTemplates = API_STATES.LOADING;
    }
    const query = qs.stringify(queryParams);
    try {
      const { data, error } = await $api.template.getTemplates(query, {
        lazy: searchTerm ? true : false,
      });
      if (!searchTerm) {
        allTemplates.value = data.value?.data?.map((template: any) =>
          transformTemplate(template)
        );
        allTemplatesMeta.value = data.value?.meta?.pagination;
        apiLoadingStates.value.allTemplates = API_STATES.SUCCESS;
      } else {
        templatesSearchResult.value = data.value?.data?.map((template: any) =>
          transformTemplate(template)
        );

        templatesSearchResultMeta.value = data.value?.meta?.pagination;
        apiLoadingStates.value.templatesSearchResult = API_STATES.SUCCESS;
      }
    } catch (error) {
      console.error(error);
      if (searchTerm) {
        apiLoadingStates.value.templatesSearchResult = API_STATES.ERROR;
      } else {
        apiLoadingStates.value.allTemplates = API_STATES.ERROR;
      }
    }
  }

  const getFilters = async () => {
    const { $api } = useNuxtApp();
    const tagUrl = $api.tags.getTags();
    const industryUrl = $api.industry.getIndustries();
    const designStyleUrl = $api.designStyle.getDesignStyles();
    const designTypeUrl = $api.designType.getDesignTypes();
    console.log("here");

    try {
      const [industries, tags, designTypes, designStyles] = await Promise.all([
        industryUrl,
        tagUrl,
        designTypeUrl,
        designStyleUrl,
      ]);
      allTags.value = tags?.data?.value?.data;
      allIndustries.value = industries?.data?.value?.data;
      allDesignStyles.value = designStyles?.data?.value?.data;
      allDesignTypes.value = designTypes?.data?.value?.data;
    } catch (error) {
      console.log(error, "error na so");
    }
  };

  const getSingleTemplate = async (id: string) => {
    const { $api } = useNuxtApp();
    try {
      const queryParams = {
        populate: {
          author: { populate: "profilePicture" },
          thumbnail: "*",
          screenshots: "*",
          design_styles: "*",
          design_types: "*",
          industries: "*",
          tags: "*",
        },
      };
      const query = qs.stringify(queryParams);
      const { data, error } = await $api.template.getSingleTemplate(id, query);
      const template = transformTemplate(data.value?.data);
      getRelatedTemplates(template);
      return template;
    } catch (error) {
      console.log(error, "error na so");
    }
  };

  const getRelatedTemplates = async (template: any) => {
    const { $api } = useNuxtApp();
    try {
      const queryParams = {
        filters: {
          industries: {
            id: {
              $in: template?.industries?.map((ind: any) => ind.id) || [],
            },
          },
          tags: {
            id: {
              $in: template?.tags?.map((ind: any) => ind.id) || [],
            },
          },
        },
        populate: {
          author: { populate: "profilePicture" },
          thumbnail: "*",
          screenshots: "*",
          design_styles: "*",
          design_types: "*",
          industries: "*",
          tags: "*",
        },
      };
      apiLoadingStates.value.relatedTemplates = API_STATES.LOADING;
      const query = qs.stringify(queryParams);
      const { data, error } = await $api.template.getTemplates(query, {
        lazy: true,
      });
      relatedTemplates.value = data.value?.data?.map((template: any) =>
        transformTemplate(template)
      );
      apiLoadingStates.value.relatedTemplates = API_STATES.SUCCESS;
      if (error) {
      }
      return transformTemplate(data.value?.data);
    } catch (error) {
      console.log(error, "error na so");
      apiLoadingStates.value.relatedTemplates = API_STATES.ERROR;
    }
  };

  const setSearchTerm = (search: string) => {
    stateSearchTerm.value = search;
  };

  return {
    allTemplates,
    allTemplatesMeta,
    templatesSearchResult,
    templatesSearchResultMeta,
    getTemplates,
    getFilters,
    allTags,
    allIndustries,
    allDesignStyles,
    allDesignTypes,
    searchFilters,
    apiLoadingStates,
    getSingleTemplate,
    relatedTemplates,
    stateSearchTerm,
    setSearchTerm,
  };
});
