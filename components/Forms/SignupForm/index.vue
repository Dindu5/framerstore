<template>
  <VForm class="auth-form" :validation-schema="schema" @submit="submitForm">
    <button class="btn btn-icon auth-form__close">
      <span class="material-symbols-rounded"> close </span>
    </button>
    <h1>Create a free account</h1>
    <p>Already a member? <nuxt-link to="/login">Log in </nuxt-link></p>
    <SocialAuth />

    <h6>or</h6>
    <VField name="fullName" v-slot="{ field, meta }">
      <input
        v-bind="field"
        type="text"
        placeholder="Full name"
        v-model="userDetails.fullName"
        :class="{
          'is-success': meta.valid && meta.touched,
          'has-error': !meta.valid && meta.touched,
        }"
      />
      <VErrorMessage name="fullName" />
    </VField>
    <VField name="email" v-slot="{ field, meta }">
      <input
        v-bind="field"
        type="text"
        placeholder="Email address"
        v-model="userDetails.email"
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
        v-model="userDetails.password"
        :class="{
          'is-success': meta.valid && meta.touched,
          'has-error': !meta.valid && meta.touched,
        }"
      />
      <VErrorMessage name="password" />
    </VField>
    <Button
      class="auth-form--cta"
      color="primary"
      full-width
      type="submit"
      :loading="apiLoadingStates.signup === API_STATES.LOADING"
    >
      Create Account
    </Button>
  </VForm>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import * as Yup from "yup";
import { API_STATES, NAME_REGEX } from "~/services/constants";
const authStore = useAuthStore();

const { signUpUser } = authStore;
const { apiLoadingStates } = storeToRefs(useAuthStore());

const userDetails = ref({
  fullName: "",
  email: "",
  password: "",
});
const schema = Yup.object().shape({
  fullName: Yup.string()
    .matches(NAME_REGEX, "Please enter first and last name")
    .required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const submitForm = async (e: Event) => {
  const { fullName, email, password } = userDetails.value;

  const names = fullName?.split(" ");
  const payload = {
    firstName: names[0] || "",
    lastName: names[1] || "",
    email,
    username: email,
    password,
  };
  await signUpUser(payload);
};
</script>

<style></style>
