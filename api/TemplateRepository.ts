import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/templates";

export default () => {
  return {
    getTemplates(query?: any, opts?: any) {
      return useCustomFetch(`${resource}?${query}`, opts);
    },
    getSingleTemplate(id: string, query?: any, opts?: any) {
      console.log(opts);

      return useCustomFetch(`${resource}/${id}?${query ? query : ""}`, opts);
    },
  };
};
