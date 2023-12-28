import { defineStore } from "pinia";

export const useAuthStore = defineStore("counter", () => {
  // state variables
  const user = ref({}) as any;

  // getter equivalent
  const getUserName = computed(() => user.firstName);

  // methods
  const updateUser = (user: any) => (user.value = user);

  return {
    user,
    getUserName,
    updateUser,
  };
});
