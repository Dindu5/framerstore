import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/users";

export default () => {
  return {
    getAuthenticatedUser() {
      return useCustomFetch(`${resource}/me`);
    },
  };
};
