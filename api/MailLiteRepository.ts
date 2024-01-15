import { useCustomFetch } from "~/composables/useCustomFetch";

export default () => {
  // const config = useRuntimeConfig();
  return {
    getDesignTypes(email: string) {
      return useFetch("/groups/109449033566651559/subscribers", {
        baseURL: "https://connect.mailerlite.com",
        body: { email, resubscribe: false, autoresponders: true },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    },
  };
};
