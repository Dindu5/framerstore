<template>
  <div
    class="file-uploader"
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <div class="file-uploader__label">
      <h6 v-if="label">{{ label }}</h6>
      <p v-if="description">{{ description }}</p>
      <small v-if="additionalText">{{ additionalText }}</small>
    </div>
    <div class="file-uploader__slot">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
      >
        <path
          d="M8 24V40C8 41.0609 8.42143 42.0783 9.17157 42.8284C9.92172 43.5786 10.9391 44 12 44H36C37.0609 44 38.0783 43.5786 38.8284 42.8284C39.5786 42.0783 40 41.0609 40 40V24"
          stroke="#403D39"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M32 12L24 4L16 12"
          stroke="#403D39"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M24 4V30"
          stroke="#403D39"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <label :for="fileId">
        <slot :dropZoneActive="active"></slot>
        <input type="file" :id="fileId" multiple @change="onInputChange" />
      </label>
    </div>
    <div>
      <ul class="file-uploader__image-list" v-show="files.length">
        <FilePreview
          v-for="file of files"
          :key="file.id"
          :file="file"
          tag="li"
          @remove="removeFile"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import useFileList from "../../compositions/file-list";
// const { files, addFiles, removeFile } = useFileList();
const emit = defineEmits(["files-dropped"]);

defineProps({
  label: { type: String, default: "" },
  description: { type: String, default: "" },
  additionalText: { type: String, default: "" },
});

const fileId = `file-${Math.random().toString(36).substr(2, 9)}`;

let active = ref(false);
let inActiveTimeout = null as any;
class UploadableFile {
  file: File;
  id: string;
  url: string;
  status: null | string;

  constructor(file: File) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
  }
}

const files: Ref<UploadableFile[]> = ref([]);

function addFiles(newFiles: File[]) {
  let newUploadableFiles = [...newFiles]
    .map((file) => new UploadableFile(file))
    .filter((file) => !fileExists(file.id));
  files.value = files.value.concat(newUploadableFiles);
  console.log(files.value);
}

function fileExists(otherId: string) {
  return files.value.some(({ id }) => id === otherId);
}

function removeFile(file: UploadableFile) {
  const index = files.value.indexOf(file);

  if (index > -1) files.value.splice(index, 1);
}

// setActive and setInactive use timeouts, so that when you drag an item over a child element,
// the dragleave event that is fired won't cause a flicker. A few ms should be plenty of
// time to wait for the next dragenter event to clear the timeout and set it back to active.
function setActive() {
  active.value = true;
  clearTimeout(inActiveTimeout);
}
function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onDrop(e: any) {
  setInactive();
  addFiles(e);
  emit("files-dropped", files); // [...e.dataTransfer.files]);
}

function preventDefaults(e: any) {
  e.preventDefault();
}

function onInputChange(e: any) {
  addFiles(e.target.files);
  emit("files-dropped", files);
  e.target.value = null; // reset so that selecting the same file again will still cause it to fire this change
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>
