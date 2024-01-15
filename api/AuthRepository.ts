import type { LoginPayload, SignUpPayload } from "~/types/modules/authModel";

const resource = "/auth";

export default () => {
  return {
    login(payload: LoginPayload) {
      return useCustomFetch(`${resource}/local`, {
        body: payload,
        method: "POST",
      });
    },
    currentUser() {
      return useCustomFetch(`${resource}/me`);
    },
    signup(payload: SignUpPayload) {
      return useCustomFetch(`${resource}/local/register`, {
        method: "POST",
        body: payload,
      });
    },
    providerAuth(provider: string, payload: any) {
      return useCustomFetch(`${resource}/${provider}/callback`, {
        query: payload,
      });
    },
    forgotPassword(email: string) {
      return useCustomFetch(`${resource}/forgot-password`, {
        body: { email },
        method: "POST",
      });
    },
    resetPassword(payload: any) {
      return useCustomFetch(`${resource}/reset-password`, {
        body: payload,
        method: "POST",
      });
    },
  };
};
