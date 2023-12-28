<template>
  <label class="form-checkbox">
    <input type="checkbox" v-model="model" :value="value" />
    {{ label }}
  </label>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: { type: [Array, Boolean] },
  value: { type: [Boolean, Object] },
  label: { type: String },
});
const emit = defineEmits(["update:model-value"]);
const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:model-value", value);
  },
});
</script>

<style></style>
