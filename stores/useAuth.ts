import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import type {
  IUser,
  LoginPayload,
  SignUpPayload,
} from "~/types/modules/authModel";
import { useNotification } from "@kyvg/vue3-notification";

export const useAuthStore = defineStore("auth", () => {
  // state variables
  const user = ref({}) as Ref<IUser>;
  const isLoggedIn = ref(false) as Ref<boolean>;
  const apiLoadingStates = ref({
    login: API_STATES.IDLE,
    signup: API_STATES.IDLE,
    getUser: API_STATES.IDLE,
    providerAuth: API_STATES.IDLE,
    forgotPassword: API_STATES.IDLE,
    resetPassword: API_STATES.IDLE,
  });

  // getter equivalent
  const getUserName = computed(() => user.value.firstName);

  // methods
  const updateUser = (user: any) => (user.value = user);

  const loginUser = async (payload: LoginPayload) => {
    const { $api } = useNuxtApp();
    const { notify } = useNotification();

    apiLoadingStates.value.login = API_STATES.LOADING;

    const { data, error } = await $api.auth.login(payload);
    if (error.value) {
      notify({
        title: "Authentication error",
        type: "error",
        text: error.value?.data?.error?.message || "",
      });
      apiLoadingStates.value.login = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      completeLogin(data);
      apiLoadingStates.value.login = API_STATES.SUCCESS;
    }
  };

  const signUpUser = async (payload: SignUpPayload) => {
    const { $api } = useNuxtApp();
    const { notify } = useNotification();
    apiLoadingStates.value.signup = API_STATES.LOADING;

    const { data, error } = (await $api.auth.signup(payload)) as any;
    if (error.value) {
      notify({
        title: "An error occured",
        type: "error",
        text: error.value?.data?.error?.message || "",
      });
      apiLoadingStates.value.signup = API_STATES.ERROR;
      return { error: error.value };
    } else if (data.value) {
      completeLogin(data);
      apiLoadingStates.value.signup = API_STATES.SUCCESS;
    }
  };

  const completeLogin = (data: any) => {
    const authToken = useCookie("authToken");
    const router = useRouter();

    user.value = data.value?.user;
    authToken.value = data.value?.jwt;
    isLoggedIn.value = true;
    router.push("/app/submit");
  };

  const getUser = async () => {
    const { $api } = useNuxtApp();
    const { notify } = useNotification();
    apiLoadingStates.value.getUser = API_STATES.LOADING;

    const { data, error } = await $api.users.getAuthenticatedUser();
    if (error.value) {
      apiLoadingStates.value.getUser = API_STATES.ERROR;
    } else if (error.value) {
      notify({
        type: "error",
        title: "Authorization Error",
        text: (error.value as any)?.data?.error?.message || "",
      });
      user.value = data.value;
      apiLoadingStates.value.getUser = API_STATES.SUCCESS;
    }
  };

  const loginProvider = async (provider: string, query: any) => {
    const { $api } = useNuxtApp();
    const router = useRouter();
    const { notify } = useNotification();

    apiLoadingStates.value.providerAuth = API_STATES.LOADING;

    const { data, error } = await $api.auth.providerAuth(provider, query);
    if (error.value) {
      notify({
        type: "error",
        title: "Authorization Error",
        text: error.value?.data?.error?.message || "",
      });
      apiLoadingStates.value.providerAuth = API_STATES.ERROR;
      setTimeout(() => {
        router.go(-2);
      }, 800);
    } else if (data.value) {
      notify({
        title: "Authorization completed",
        text: `Welcome ${
          data.value?.user?.firstName || data.value?.user?.username
        }`,
      });
      apiLoadingStates.value.providerAuth = API_STATES.SUCCESS;
      completeLogin(data);
    }
  };

  const triggerForgotPassword = async (email: string) => {
    const { $api } = useNuxtApp();
    const { notify } = useNotification();

    apiLoadingStates.value.forgotPassword = API_STATES.LOADING;

    const { data, error } = await $api.auth.forgotPassword(email);
    if (error.value) {
      notify({
        title: "Error",
        type: "error",
        text: error.value?.data?.error?.message || "",
      });
      apiLoadingStates.value.forgotPassword = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      apiLoadingStates.value.forgotPassword = API_STATES.SUCCESS;
      return { data: data.value };
    }
  };

  const triggerResetPassword = async (payload: any) => {
    const { $api } = useNuxtApp();
    const { notify } = useNotification();

    apiLoadingStates.value.resetPassword = API_STATES.LOADING;

    const { data, error } = await $api.auth.resetPassword(payload);
    if (error.value) {
      notify({
        title: "Error",
        type: "error",
        text: error.value?.data?.error?.message || "",
      });
      apiLoadingStates.value.resetPassword = API_STATES.ERROR;
    }
    if (data.value) {
      notify({
        title: "Password reset successfully",
        text: `Welcome ${
          data.value?.user?.firstName || data.value?.user?.username
        }`,
      });
      apiLoadingStates.value.resetPassword = API_STATES.SUCCESS;
      setTimeout(() => {
        completeLogin(data);
      }, 1000);
    }
  };

  return {
    user,
    getUserName,
    updateUser,
    isLoggedIn,
    loginUser,
    signUpUser,
    getUser,
    apiLoadingStates,
    loginProvider,
    triggerResetPassword,
    triggerForgotPassword,
  };
});
