<template>
  <div class="select-wrapper" :id="dropdownId">
    <label v-if="label"> {{ label }}</label>
    <div class="select-wrapper__select-input" @click="toggleDropdown">
      <div class="select-wrapper__selected-items">
        <div
          v-for="(item, index) in selectedItems"
          :key="index"
          class="select-wrapper__selected-item"
          @click="removeItem(index)"
        >
          {{ item }} <span v-if="!isSingleSelect">&times;</span>
        </div>
      </div>
      <span v-if="selectedItems.length > 0" class="material-symbols-rounded">
        close
      </span>
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
          <div></div>
          {{ option }}
        </div>
      </div>
    </div>
    <small v-if="max">Max {{ max }}</small>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  options: { type: Array as () => string[], required: true },
  modelValue: { type: Array as () => string[], default: () => [] },
  isSingleSelect: { type: Boolean, default: false },
  max: { type: Number, default: 0 },
  label: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);
const dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;

const selectedItems = ref<string[]>(props.modelValue);
const showDropdown = ref<boolean>(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const toggleSelection = (option: string) => {
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
  emit("update:modelValue", selectedItems.value);
  toggleDropdown();
};

const removeItem = (index: number) => {
  selectedItems.value.splice(index, 1);
  emit("update:modelValue", selectedItems.value);
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
