<template>
  <div
    class="select-wrapper"
    :class="{
      'has-error': !!errorMessage,
    }"
    :id="dropdownId"
  >
    <label v-if="label"> {{ label }}</label>
    <div class="select-wrapper__select-input" @click="toggleDropdown">
      <div v-if="!isSingleSelect" class="select-wrapper__selected-items">
        <div
          v-for="(item, index) in selectedItems"
          :key="index"
          class="select-wrapper__selected-item"
          @click="removeItem(index)"
        >
          {{ item }}
        </div>
      </div>
      <div v-else-if="selectedItems" class="select-wrapper__selected-items">
        <div class="select-wrapper__selected-item" @click="removeItem(index)">
          {{ selectedItems }}
        </div>
      </div>

      <p
        v-if="placeholder && selectedItems.length === 0"
        class="select-wrapper__placeholder"
      >
        {{ placeholder }}
      </p>

      <img
        class="select-wrapper__icon"
        :class="{
          rotate: showDropdown,
        }"
        src="/images/icons/toggle-up.svg"
        alt="Toggle"
      />

      <div class="select-wrapper__dropdown" v-show="showDropdown">
        <div
          v-for="(option, index) in options"
          :key="index"
          @click="toggleSelection(option)"
          :class="{
            'select-wrapper__selected-option': selectedItems.includes(option),
          }"
          v-show="
            !max ||
            !selectedItems.includes(option) ||
            max > selectedItems.length
          "
        >
          <!-- <div></div> -->
          {{ option }}
          <svg
            v-if="selectedItems.includes(option)"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20 6L9 17L4 12"
              stroke="#403D39"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="select-wrapper__footer">
      <span v-if="errorMessage" class="error-display">{{
        errorMessage || hint
      }}</span>
      <small v-if="max">Max {{ max }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  options: { type: Array as () => string[], required: true },
  modelValue: { type: [String, Array], default: () => [] },
  isSingleSelect: { type: Boolean, default: false },
  max: { type: Number, default: 0 },
  label: { type: String, default: "" },
  placeholder: { type: String, default: "" },
  errorMessage: { type: String },
});

const emit = defineEmits(["update:modelValue", "blur"]);
const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;

const selectedItems = ref<any>(props.modelValue);
const showDropdown = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const toggleSelection = (option: string) => {
  if (props.isSingleSelect) {
    selectedItems.value = option;
    toggleDropdown();
  } else {
    if (!selectedItems.value.includes(option)) {
      if (
        !props.isSingleSelect &&
        (!props.max || props.max > selectedItems.value.length)
      ) {
        selectedItems.value = [...selectedItems.value, option];
      } else if (props.isSingleSelect) {
        selectedItems.value = [option];
      }
    } else {
      removeItem(selectedItems.value.indexOf(option));
    }
  }

  emit("update:modelValue", selectedItems.value);
  emit("blur");
  toggleDropdown();
};

const removeItem = (index: number) => {
  if (!props.isSingleSelect && typeof selectedItems.value === "object") {
    selectedItems.value.splice(index, 1);
    emit("update:modelValue", selectedItems.value);
    emit("blur");
  }
};

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = dropdownRef.value;
  const selectInput = document.querySelector(".select-wrapper__select-input");

  if (
    dropdown &&
    selectInput &&
    !dropdown.contains(event.target as Node) &&
    !selectInput.contains(event.target as Node)
  ) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  dropdownRef.value = document.getElementById(dropdownId);
  window.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped></style>
