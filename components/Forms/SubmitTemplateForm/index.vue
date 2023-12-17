<template>
  <div class="submit-template">
    <div v-if="currentStep !== 1" class="submit-template--indicators">
      <div @click="currentStep = 1">1</div>
      <div></div>
      <div @click="currentStep = 2" :class="currentStep === 2 ? 'active' : ''">
        2
      </div>
      <div></div>
      <div @click="currentStep = 3" :class="currentStep === 3 ? 'active' : ''">
        3
      </div>
    </div>

    <form>
      <div v-if="currentStep === 1">
        <div class="submit-template--title">
          <h3>Submit your template</h3>
          <p>Connect to thousands of templates buyers</p>
        </div>
        <div class="submit-template--form-elements">
          <TextField
            label="Template name"
            hint="Give your template a catchy and unique name, not a description"
            placeholder="Polymer"
          />
          <TextArea label="Write a short description for your template." />
          <TextField label="Set a price for your template" placeholder="$25" />
          <TextField
            label="List the pages your template contains"
            placeholder="Home, 404"
            hint="Separate pages by comma"
          />
          <TextField label="Live Preview" v-model="livePreview" />
          <TextField
            label="Purchase link"
            hint="Input your Gumroad or Lemonsqueezy purchase link"
          />
        </div>
        <div class="submit-template__buttons">
          <!-- <button class="btn btn-primary-outline">Cancel</button> -->
          <button class="btn btn-primary" @click="currentStep++">
            Next Step
          </button>
        </div>
      </div>
      <div v-if="currentStep === 2">
        <div class="submit-template--title">
          <h3>Filters</h3>
          <p>Help the right customers find your template</p>
        </div>
        <div class="submit-template--form-elements">
          <MultiSelect
            label="Please specify the industry of your template "
            :options="industryOptions"
            :max="3"
            v-model="localSelectedItem"
          />
          <MultiSelect
            label="Select a web design Type"
            :options="webDesignOptions"
            v-model="modelValues.designStyle"
          />
          <MultiSelect
            label="Which of these best represent the templates design style "
            :options="designStyleOptions"
            :max="3"
            v-model="modelValues.industry"
          />
          <MultiSelect
            label="Tags"
            :options="['One page', 'Minimal', 'Modern']"
            v-model="modelValues.tags"
          />
          <MultiSelect
            label="Features"
            :options="['Blog', 'CMS', 'Newsletter signup', 'Product page']"
            v-model="modelValues.webDesign"
          />
          <MultiSelect
            label="What is the primary color of your template "
            :options="['Blue', 'Orange']"
            v-model="modelValues.colors"
          />
          <MultiSelect
            label="Typography Style"
            :options="['Serif', 'Display']"
            v-model="modelValues.typo"
          />
        </div>

        <div class="submit-template__buttons">
          <button class="btn btn-primary-outline" @click="currentStep = 1">
            Cancel
          </button>
          <button class="btn btn-primary" @click="currentStep++">
            Next Step
          </button>
        </div>
      </div>
      <div v-if="currentStep === 3">
        <div class="submit-template--title">
          <h3>Branding & Images</h3>
          <p>Let people see what your templates look like</p>
        </div>
        <div class="submit-template--upload-elements">
          <div>
            <p>Your Profile</p>
            <div>
              <div>
                <img src="/images/users/user-1.svg" alt="User" />
                <h5>Felxi stuido</h5>
              </div>
              <button class="btn btn-secondary-outline">
                <span class="material-symbols-rounded"> edit_square </span> Edit
              </button>
            </div>
            <p>This will apper next to you template</p>
          </div>
          <DropZone
            label="Thumbnail"
            @files-dropped="updateThumbnails"
            #default="{ dropZoneActive }"
          >
            <p v-if="dropZoneActive">
              <span class="main">Drop Them Here to add them</span>
            </p>
            <p v-else>
              <span class="main"
                >Drag and drop image to upload or <em>browse</em>
              </span>
              <span class="smaller">
                <strong>600x720px</strong> exported at 2x as a JPG format only
              </span>
            </p>
          </DropZone>

          <DropZone
            label="Template Screenshots"
            description="Provide a minimum 3 screenshots to showcase your template. The screenshots need to be 1400x950 exported at 2x as a JPG."
            additionalText="Screenshots"
            @files-dropped="updateScreenshot"
            #default="{ dropZoneActive }"
          >
            <p v-if="dropZoneActive">
              <span class="main">Drop Them Here to add them</span>
            </p>
            <p v-else>
              <span class="main"
                >Drag and drop image to upload or <em>browse</em>
              </span>
              <span class="smaller">
                <strong>1400x950px</strong> exported at 2x as a JPG format only
              </span>
            </p>
          </DropZone>
        </div>

        <div class="submit-template__buttons">
          <button class="btn btn-primary-outline" @click="currentStep = 2">
            Cancel
          </button>
          <button class="btn btn-primary" @click="currentStep++">
            Next Step
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// import Multiselect from "@vueform/multiselect";
import { ref } from "vue";

// Uploader
import createUploader from "../../../compositions/file-uploader";
const { uploadFiles } = createUploader("YOUR URL HERE");

const currentStep = ref(1);

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value = currentStep.value + 1;
  }
};
const value = ref(null);
const webDesignOptions = ["Portfolio", "Business", "Joker"];
const industryOptions = ["Photography", "Technology", "Crypto"];
const designStyleOptions = ["Minimal", "Typography", "Other option"];
const localSelectedItem = ref([]);

const livePreview = ref("");

const modelValues = ref({
  designStyle: [],
  industry: [],
  tags: [],
  webDesign: [],
  colors: [],
  typo: [],
  localSelectedItem: [],
  thumbNails: [],
  screenShots: [],
});

function updateThumbnails(e: any) {
  modelValues.value.thumbNails = e;
}

function updateScreenshot(e: any) {
  modelValues.value.screenShots = e;
}
</script>

<style lang="scss">
.drop-area {
  width: 100%;
  max-width: 800px;
}
</style>
