<template>
  <form class="auth-form">
    <button class="btn btn-icon auth-form__close">
      <span class="material-symbols-rounded"> close </span>
    </button>
    <h1>Create a free account</h1>
    <p>Already a member? <nuxt-link to="/login">Log in </nuxt-link></p>
    <button class="btn btn-full btn-auth auth-form--google">
      <img src="/images/icons/google-icon.svg" alt="Google Icon" />
      Login with Google
    </button>
    <button class="btn btn-full btn-auth auth-form--facebook">
      <img src="/images/icons/facebook.svg" alt="Google Icon" />
      Login with Facebook
    </button>
    <h6>or</h6>
    <input type="text" placeholder="Full name" />
    <input type="text" placeholder="Email" />
    <input type="text" placeholder="Password" />
    <button class="btn btn-primary btn-full auth-form--cta">
      Create Account
    </button>
  </form>
</template>

<script>
export default {};
</script>

<style></style>
