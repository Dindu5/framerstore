<template>
  <div>
    <button
      class="btn btn-full btn-auth auth-form--google"
      @click.prevent="socialLogin('google')"
    >
      <img src="/images/icons/google-icon.svg" alt="Google Icon" />
      Login with Google
    </button>
    <!-- <button
      class="btn btn-full btn-auth auth-form--facebook"
      @click.prevent="socialLogin('facebook')"
    >
      <img src="/images/icons/facebook.svg" alt="Google Icon" />
      Login with Facebook
    </button> -->
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const socialLogin = (provider: string) => {
  const url = `${config.public.baseURL}/connect/${provider}`;
  navigateTo(url, { external: true });
};
</script>

<style></style>
