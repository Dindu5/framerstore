import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/colors";

export default () => {
  return {
    getColors() {
      return useCustomFetch(`${resource}`);
    },
  };
};
