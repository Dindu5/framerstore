<template>
  <div
    class="text-field--wrapper"
    :class="{
      'text-field--wrapper-error': !!errorMessage,
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
      @blur="$emit('blur', $event)"
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
  errorMessage: { type: String },
});
const emit = defineEmits(["update:modelValue", "blur"]);

// const elementName = toRef(props, "formName");

// const {
//   value: inputValue,
//   errorMessage,
//   handleBlur,
//   handleChange,
//   meta,
// } = useField(elementName, undefined, {
//   initialValue: props.value,
// });
</script>

<style></style>
