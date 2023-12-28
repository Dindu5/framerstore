<template>
  <div class="dropdown" v-click-away="away">
    <div @click="toggle">
      <slot name="toggler"> </slot>
    </div>
    <div class="dropdown-content">
      <slot />
    </div>
  </div>
</template>

<script>
import { directive } from "vue3-click-away";
export default {
  name: "Dropdown",
  provide() {
    return {
      sharedState: this.sharedState,
    };
  },
  directives: {
    ClickAway: directive,
  },
  data() {
    return {
      sharedState: {
        active: false,
      },
    };
  },
  methods: {
    toggle() {
      this.sharedState.active = !this.sharedState.active;
    },
    away() {
      this.sharedState.active = false;
    },
  },
};
</script>
