import { API_STATES } from '~/services/constants';
<template>
  <div class="container">
    <div class="mvp-template-submit">
      <div v-if="currentStep === 'one'" class="mvp-template-submit__one">
        <h3 class="mvp-template-submit__title">Submit your template</h3>
        <p class="mvp-template-submit__subtext">
          Connect to thousands of templates buyers
        </p>
        <h6>Is your template available on www.Framer.com/templates?</h6>
        <form @submit="moveSwitch">
          <div class="mvp-template-submit__one-radio">
            <div>
              <input
                type="radio"
                id="control_01"
                name="framerTemplate"
                :value="true"
                checked
                v-model="framerTemplate"
              />
              <label for="control_01">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="85"
                  height="84"
                  viewBox="0 0 85 84"
                  fill="none"
                >
                  <path
                    d="M70.5 21L32 59.5L14.5 42"
                    stroke="#1D1C1C"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>Yes</p>
              </label>
            </div>
            <div>
              <input
                type="radio"
                id="control_02"
                name="framerTemplate"
                :value="false"
                v-model="framerTemplate"
              />
              <label for="control_02">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="85"
                  height="84"
                  viewBox="0 0 85 84"
                  fill="none"
                >
                  <path
                    d="M63.5 21L21.5 63"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.5 21L63.5 63"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>No / Not yet</p>
              </label>
            </div>
          </div>
          <div class="mvp-template-submit__one-buttons">
            <Button color="secondary" outlined @click="router.go(-1)">
              Cancel
            </Button>
            <Button color="primary" @click="moveSwitch"> Submit </Button>
          </div>
        </form>
      </div>
      <div v-else-if="currentStep === 'two'" class="mvp-template-submit__two">
        <h3 class="mvp-template-submit__title">Submit your template</h3>
        <p class="mvp-template-submit__subtext">
          What template will you like to submit
        </p>
        <form @submit="moveSwitch">
          <div class="mvp-template-submit__two-form">
            <TextField
              label="Template name"
              placeholder="Name of template"
              v-model="templateDetails.name"
              formName="name"
            />
            <TextField
              formName="url"
              label="Template URL"
              hint="https://www.framer.com/templates/..."
              placeholder="Link to the template"
              v-model="templateDetails.url"
            />
          </div>
          <div class="mvp-template-submit__one-buttons">
            <Button color="secondary" outlined @click="currentStep = 'one'">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              :loading="apiLoadingStates.mvpSubmit === API_STATES.LOADING"
              @click="moveSwitch"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div
        v-else-if="currentStep === 'success'"
        class="mvp-template-submit__info"
      >
        <div class="mvp-template-submit__info-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M40 12L18 34L8 24"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h6>Successful</h6>
        <p>
          You will receive an email from us once your template has been approved
        </p>
        <Button @click="router.push('/')"> Back to Home </Button>
      </div>
      <div
        v-else-if="currentStep === 'error'"
        class="mvp-template-submit__info"
      >
        <div
          class="mvp-template-submit__info-icon mvp-template-submit__info-icon-error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
          >
            <path
              d="M20.5796 7.72041L3.63955 36.0004C3.29029 36.6053 3.10549 37.291 3.10353 37.9894C3.10158 38.6879 3.28254 39.3747 3.62841 39.9815C3.97428 40.5883 4.473 41.0939 5.07497 41.4481C5.67693 41.8023 6.36115 41.9927 7.05955 42.0004H40.9396C41.638 41.9927 42.3222 41.8023 42.9241 41.4481C43.5261 41.0939 44.0248 40.5883 44.3707 39.9815C44.7166 39.3747 44.8975 38.6879 44.8956 37.9894C44.8936 37.291 44.7088 36.6053 44.3596 36.0004L27.4196 7.72041C27.063 7.13262 26.561 6.64665 25.9619 6.30938C25.3629 5.97211 24.687 5.79492 23.9996 5.79492C23.3121 5.79492 22.6362 5.97211 22.0372 6.30938C21.4381 6.64665 20.9361 7.13262 20.5796 7.72041Z"
              stroke="#F44F5D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24 18V26"
              stroke="#F44F5D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M24 34H24.02"
              stroke="#F44F5D"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h6>Oh no sorry!</h6>
        <p>
          We are only accepting templates available on
          <a href="www.framer.com/template" target="_blank"
            >www.framer.com/template</a
          >
          at the moment.<br />
          Submit your template on there and come back to us.
        </p>
        <Button @click="router.push('/')"> Back to Home </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { API_STATES } from "~/services/constants";
const authStore = useAuthStore();
const templateStore = useTemplateStore();
const framerTemplate = ref(true);
const router = useRouter();

const { user } = storeToRefs(authStore);
const { mvpTemplateSubmit } = templateStore;
const { apiLoadingStates } = storeToRefs(templateStore);
const currentStep = ref("one") as Ref<"one" | "two" | "success" | "error">;
const templateDetails = ref({
  name: "",
  url: "",
});

const moveSwitch = async (e?: Event) => {
  e?.preventDefault();
  switch (currentStep.value) {
    case "one":
      if (framerTemplate.value) {
        currentStep.value = "two";
      } else {
        currentStep.value = "error";
      }
      break;
    case "two":
      const { name, url } = templateDetails.value;
      if (url && name) {
        console.log({ templateDetails }, { user });
        const res = (await mvpTemplateSubmit({
          ...templateDetails.value,
          user: user?.value?.id,
        })) as any;
        console.log({ res });

        if (res?.data) {
          currentStep.value = "success";
        } else if (res?.error) {
        }
      }

      break;

    default:
      break;
  }
};
</script>

<style></style>
