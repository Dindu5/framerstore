<template>
  <form class="auth-form">
    <button class="btn btn-icon auth-form__close">
      <span class="material-symbols-rounded"> close </span>
    </button>
    <h1>Log into FramerStore</h1>
    <button class="btn btn-full btn-auth auth-form--google">
      <img src="/images/icons/google-icon.svg" alt="Google Icon" />
      Login with Google
    </button>
    <button class="btn btn-full btn-auth auth-form--facebook">
      <img src="/images/icons/facebook.svg" alt="Google Icon" />
      Login with Facebook
    </button>
    <h6>or</h6>
    <input type="text" placeholder="Email" />
    <input type="text" placeholder="Password" />
    <button class="btn btn-primary btn-full auth-form--cta" @click="login">
      Log In
    </button>
    <div class="auth-form__actions">
      <nuxt-link class="auth-form__login-link" to="/signup"
        >Don’t have an account?</nuxt-link
      >
      <nuxt-link class="auth-form__forgot-password">Forgot Password?</nuxt-link>
    </div>
  </form>
</template>

<script setup lang="ts">
const router = useRouter();

function login(e: any) {
  e.preventDefault();
  router.push("/app");
}
</script>

<style></style>
