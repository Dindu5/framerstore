const resource = "/auth";

export default () => {
  return {
    login(payload: any) {
      return $fetch(`${resource}/login`, payload);
    },
    currentUser() {
      return $fetch(`${resource}/me`);
    },
    signup(payload: any) {
      return $fetch(`${resource}/signup`, payload);
    },
  };
};
