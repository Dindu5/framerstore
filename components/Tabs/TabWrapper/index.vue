<template>
  <div class="tabs">
    <div class="tab-title--container container">
      <div class="tabs-titles">
        <div
          v-for="(item, i) in tabTitles"
          :key="i"
          class="tab-title_item"
          :class="selectedTitle === item.value ? 'active' : ''"
          @click="updateTab(item.value)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="tabs-main-panel container">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, provide } from "vue";
const props = defineProps({
  currentTab: { type: String },
});
const router = useRouter();

const instance = getCurrentInstance();
const slots = instance?.slots || ({} as any);

const tabTitles = slots.default()?.map((tab: any) => {
  return { title: tab.props.title, value: tab.props.value };
});
let selectedTitle = ref(tabTitles[0].value);

provide("selectedTitle", selectedTitle);

const updateTab = (item: any) => {
  selectedTitle.value = item;
  router.replace({
    path: "/app",
    query: { tab: item },
  });
};

if (props.currentTab) {
  selectedTitle.value = props.currentTab;
}

// watch(
//   props,
//   (value) => {
//     if (value?.currentTab) {
//       console.log(value, "watch");

//     }
//   },
//   { deep: true, immediate: true }
// );
</script>
