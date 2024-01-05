import { useCustomFetch } from "~/composables/useCustomFetch";
const resource = "/pending-templates";

export default () => {
  return {
    createTemplate(body: any) {
      return useCustomFetch(`${resource}`, {
        method: "POST",
        body,
      });
    },
  };
};
