import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/design-styles";

export default () => {
  return {
    getDesignStyles() {
      return useCustomFetch(`${resource}`);
    },
  };
};
