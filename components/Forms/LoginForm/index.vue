<template>
  <VForm class="auth-form" :validation-schema="schema" @submit="login">
    <button class="btn btn-icon auth-form__close">
      <span class="material-symbols-rounded"> close </span>
    </button>
    <h1>Log into FramerStore</h1>
    <SocialAuth />
    <h6>or</h6>
    <VField name="email" v-slot="{ field, meta }">
      <input
        v-bind="field"
        type="text"
        placeholder="Email"
        v-model="formValues.identifier"
        :class="{
          'is-success': meta.valid && meta.touched,
          'has-error': !meta.valid && meta.touched,
        }"
      />
      <VErrorMessage name="email" />
    </VField>

    <VField name="password" v-slot="{ field, meta }">
      <input
        v-bind="field"
        type="password"
        placeholder="Password"
        :class="{
          'is-success': meta.valid && meta.touched,
          'has-error': !meta.valid && meta.touched,
        }"
        v-model="formValues.password"
      />
      <VErrorMessage name="password" />
    </VField>

    <Button
      class="auth-form--cta"
      color="primary"
      fullWidth
      :loading="apiLoadingStates.login === API_STATES.LOADING"
      @click="login"
    >
      Log in
    </Button>

    <div class="auth-form__actions">
      <nuxt-link class="auth-form__login-link" to="/signup"
        >Don’t have an account?</nuxt-link
      >
      <nuxt-link class="auth-form__forgot-password">Forgot Password?</nuxt-link>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { API_STATES } from "~/services/constants";
const authStore = useAuthStore();
import { storeToRefs } from "pinia";

const { loginUser } = authStore;
const { apiLoadingStates } = storeToRefs(authStore);

const formValues = ref({
  identifier: "",
  password: "",
});

function login(e: any) {
  const { identifier, password } = formValues.value;
  if (identifier && password) {
    loginUser({ identifier, password });
  }
  // router.push("/app");
}

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
</script>

<style></style>
