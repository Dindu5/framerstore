<template>
  <VForm
    class="auth-form"
    :validation-schema="schema"
    @submit="initForgotPassword"
  >
    <!-- <button class="btn btn-icon auth-form__close">
      <span class="material-symbols-rounded"> close </span>
    </button> -->
    <h1>
      {{ currentScreen === "success" ? "Email Sent" : "Forgot Password?" }}
    </h1>
    <p>
      {{
        currentScreen === "success"
          ? `We sent an email containing the reset password link to ${formValues.email}`
          : "Enter the email you registered with and we will send you an email to reset your password"
      }}
    </p>
    <br />
    <br />

    <VField
      v-if="currentScreen !== 'success'"
      name="email"
      v-slot="{ field, meta }"
    >
      <input
        v-bind="field"
        type="email"
        placeholder="Email"
        v-model="formValues.email"
        :class="{
          'is-success': meta.valid && meta.touched,
          'has-error': !meta.valid && meta.touched,
        }"
      />
      <VErrorMessage name="email" />
    </VField>
    <Button
      v-if="currentScreen !== 'success'"
      class="auth-form--cta"
      style="margin-top: 0rem"
      color="primary"
      fullWidth
      :loading="apiLoadingStates.forgotPassword === API_STATES.LOADING"
      type="submit"
    >
      Send Email
    </Button>

    <div class="auth-form__actions">
      <nuxt-link
        v-if="currentScreen !== 'success'"
        to="/login"
        class="auth-form__reset-password"
        >Back to login</nuxt-link
      >
      <div v-else>
        <CircularLoader
          v-if="apiLoadingStates.forgotPassword === API_STATES.LOADING"
        />
        <h5
          v-else
          class="auth-form__reset-password"
          @click="initForgotPassword()"
        >
          Did not receive code? <strong>Click here to send again</strong>
        </h5>
      </div>
    </div>
  </VForm>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { API_STATES } from "~/services/constants";
const authStore = useAuthStore();
import { storeToRefs } from "pinia";

const { triggerForgotPassword } = authStore;
const { apiLoadingStates } = storeToRefs(authStore);

const currentScreen = ref<"index" | "success">("index");
const formValues = ref({
  email: "",
});

async function initForgotPassword(e: any) {
  const { email } = formValues.value;
  if (email) {
    const res = await triggerForgotPassword(email);
    console.log(res);

    if (res?.data) {
      currentScreen.value = "success";
    }
  }
  // router.push("/app");
}

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});
</script>

<style></style>
