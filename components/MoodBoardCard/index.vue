<template>
  <div class="moodboard-card" @click="gotToMoodboard">
    <div class="moodboard-card-grid">
      <div v-for="i in 4" :key="i">
        <img
          v-if="cardData.templates[i - 1]?.img"
          :src="cardData.templates[i - 1]?.img"
          alt="Template"
        />
        <div v-else></div>
      </div>
    </div>
    <div>
      <h4>{{ cardData.title }}</h4>
      <p>{{ cardData.templates.length }} Templates</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

const props = defineProps({
  cardData: { type: Object as () => {}, required: true },
});

function gotToMoodboard() {
  router.push("/app/moodboard/8677942");
}
</script>

<style></style>
