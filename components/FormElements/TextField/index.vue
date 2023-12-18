<template>
  <div class="text-field--wrapper">
    <h4 v-if="name">{{ name }}</h4>
    <label v-if="label" for="">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <small v-if="hint">{{ hint }}</small>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: { type: String, default: "" },
  value: { type: [Boolean, Object] },
  label: { type: String },
  name: { type: String },
  hint: { type: String },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style></style>
