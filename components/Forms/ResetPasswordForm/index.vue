<template>
  <VForm class="auth-form" :validation-schema="schema" @submit="initReset">
    <!-- <button class="btn btn-icon auth-form__close">
      <span class="material-symbols-rounded"> close </span>
    </button> -->
    <h1>Password Reset</h1>
    <br />
    <br />

    <VField name="password" v-slot="{ field, meta }">
      <input
        v-bind="field"
        type="password"
        placeholder="New Password"
        :class="{
          'is-success': meta.valid && meta.touched,
          'has-error': !meta.valid && meta.touched,
        }"
        v-model="formValues.password"
      />
      <VErrorMessage name="password" />
    </VField>
    <VField name="passwordConfirmation" v-slot="{ field, meta }">
      <input
        v-bind="field"
        type="password"
        placeholder="Confirm Password"
        :class="{
          'is-success': meta.valid && meta.touched,
          'has-error': !meta.valid && meta.touched,
        }"
        v-model="formValues.passwordConfirmation"
      />
      <VErrorMessage name="passwordConfirmation" />
    </VField>

    <Button
      class="auth-form--cta"
      color="primary"
      style="margin-top: 0rem"
      fullWidth
      :loading="apiLoadingStates.resetPassword === API_STATES.LOADING"
      type="submit"
    >
      Reset Password
    </Button>
    <div class="auth-form__actions">
      <nuxt-link
        v-if="currentScreen !== 'success'"
        to="/login"
        class="auth-form__reset-password"
        >Back to login</nuxt-link
      >
    </div>
  </VForm>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { API_STATES } from "~/services/constants";
const authStore = useAuthStore();
import { storeToRefs } from "pinia";

const { triggerResetPassword } = authStore;
const { apiLoadingStates } = storeToRefs(authStore);
const route = useRoute();

const formValues = ref({
  passwordConfirmation: "",
  password: "",
});

function initReset(e: any) {
  const { passwordConfirmation, password } = formValues.value;
  const code = route.query.code;
  if (passwordConfirmation === password) {
    triggerResetPassword({ passwordConfirmation, password, code });
  }
  // router.push("/app");
}

const schema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "Your password is too short."),
  passwordConfirmation: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
</script>

<style></style>
