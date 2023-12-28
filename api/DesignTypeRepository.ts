import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/design-types";

export default () => {
  return {
    getDesignTypes() {
      return useCustomFetch(`${resource}`, { lazy: true });
    },
  };
};
