import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/industries";

export default () => {
  return {
    getIndustries() {
      return useCustomFetch(`${resource}`, { lazy: true });
    },
  };
};
