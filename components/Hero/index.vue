<template>
  <header class="hero">
    <div class="container">
      <div class="hero-main_content">
        <h1>Discover the best suited Framer template for your website</h1>
        <h5>
          Whether you need a portfolio website, store, or a personal blog, you
          can use Framer’s customizable and responsive website templates to get
          started.
        </h5>
        <div class="hero-filters">
          <div>
            <p @click="router.push('/')">All templates</p>
            <p @click="triggerSearch('AI')">AI</p>
            <p @click="triggerSearch('Blog')">Blog</p>
          </div>
          <div>
            <p @click="triggerSearch('Portfolio')">Portfolio</p>
            <p @click="triggerSearch('Landing')">Landing Page</p>
            <p @click="triggerSearch('Travel')">Travel</p>
          </div>
          <div>
            <p @click="triggerSearch('Agency')">Agency</p>
            <p @click="triggerSearch('Startup')">Startup</p>
            <p @click="triggerSearch('Minimal')">Minimal</p>
          </div>
          <div>
            <p @click="triggerSearch('Business')">Business</p>
            <p @click="triggerSearch('E-commerce')">E-commerce</p>
            <p @click="triggerSearch('personal')">Personal</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTemplateStore } from "../../stores/useTemplate";
const router = useRouter();

const { searchFilters } = storeToRefs(useTemplateStore());
const { getTemplates } = useTemplateStore();

const triggerSearch = (search: string) => {
  getTemplates({ filters: searchFilters.value }, search);
  router.push(`/search?searchTerm=${search}`);
};
</script>

<style></style>
