import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/tags";

export default () => {
  return {
    getTags() {
      return useCustomFetch(`${resource}`);
    },
  };
};
