import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/typographies";

export default () => {
  return {
    getTypographies() {
      return useCustomFetch(`${resource}`, { lazy: true });
    },
  };
};
