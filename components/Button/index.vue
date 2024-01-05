<template>
  <button
    class="btn"
    :class="`btn-${color}${outlined ? '-outline' : ''} ${
      icon ? 'btn-icon' : ''
    } ${auth ? 'btn-auth' : ''} ${fullWidth ? 'btn-full' : ''} ${
      loading ? 'btn-loading' : ''
    }`"
    :disabled="disabled"
  >
    <span v-show="preIcon" class="material-symbols-rounded">
      {{ preIcon }}
    </span>
    <div>
      <slot />
    </div>

    <span v-show="postIcon" class="material-symbols-rounded">
      {{ postIcon }}
    </span>
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: { type: String, default: "" },
  preIcon: { type: String },
  postIcon: { type: String },
  outlined: { type: Boolean, default: false },
  icon: { type: Boolean, default: false },
  auth: { type: Boolean, default: false },
  fullWidth: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});
</script>

<style></style>
