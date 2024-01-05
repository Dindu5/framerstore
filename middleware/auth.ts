export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const authToken = useCookie("authToken");
  const { getUser } = authStore;

  if (!authStore.isLoggedIn && !authToken.value) {
    return navigateTo("/login");
  } else {
    getUser();
  }
  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  //   if (to.path !== "/") {
  //     return navigateTo("/");
  //   }
  return;
});
