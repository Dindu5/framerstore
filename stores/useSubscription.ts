import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import { useNotification } from "@kyvg/vue3-notification";
import MailerLite from "@mailerlite/mailerlite-nodejs";

export const useSubscriptionStore = defineStore("subscription", () => {
  // state variables
  const apiLoadingStates = ref({
    subscribeToNewsletter: API_STATES.IDLE,
  });

  const subscribeToNewsletter = async (email: string) => {
    const { notify } = useNotification();
    const config = useRuntimeConfig();

    const mailerlite = new MailerLite({
      api_key: config.public.mailLiteKey,
    });
    apiLoadingStates.value.subscribeToNewsletter = API_STATES.LOADING;

    const params = {
      email,
      groups: [config.public.mailLiteGroupId],
    };

    await mailerlite.subscribers
      .createOrUpdate(params)
      .then((response: any) => {
        notify({
          title: "Subscription successful",
          type: "success",
          text: "You have successfully subscribed",
        });
        apiLoadingStates.value.subscribeToNewsletter = API_STATES.SUCCESS;
        //  console.log(response.data);
      })
      .catch((error: any) => {
        if (error.response) {
          notify({
            title: "Error",
            type: "error",
            text: "Failed to subscribe",
          });
        }
        apiLoadingStates.value.subscribeToNewsletter = API_STATES.ERROR;
        // console.log(error.response.data);
      });
  };

  return {
    apiLoadingStates,
    subscribeToNewsletter,
  };
});
