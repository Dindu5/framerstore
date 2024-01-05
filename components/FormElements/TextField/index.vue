<template>
  <div
    class="text-field--wrapper"
    :class="{
      'text-field--wrapper-error': !!errorMessage,
      success: meta.valid,
    }"
  >
    <h4 v-if="name">{{ name }}</h4>
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      :name="formName"
      :value="modelValue"
      v-bind="$attrs"
      autocomplete="off"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <small v-if="hint || errorMessage">{{ errorMessage || hint }}</small>
  </div>
</template>

<script setup>
import { computed, toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  modelValue: { type: String, default: "" },
  value: { type: [Boolean, Object] },
  label: { type: String },
  name: { type: String },
  hint: { type: String },
  formName: { type: String },
});
const emit = defineEmits(["update:modelValue"]);

const name = toRef(props, "formName");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<style></style>
