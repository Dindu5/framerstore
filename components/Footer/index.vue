<template>
  <footer class="footer">
    <div class="container">
      <h2>Get the free weekly templates in your inbox</h2>
      <div class="footer-top">
        <div>
          <input
            name="email subscription"
            type="email"
            placeholder="Enter email here"
            class="footer-subscription"
          />
          <button class="btn">Subscribe</button>
        </div>
        <div>
          <a href="https://www.pinterest.com/framerstorehq" target="_blank">
            <img src="/images/icons/pintrest.svg" alt="Pinterest" />
          </a>
          <a href="https://twitter.com/framerstoreshop" target="_blank">
            <img src="/images/icons/x.svg" alt="Twitter" />
          </a>
          <a href="https://www.instagram.com/framerstorehq/" target="_blank">
            <img src="/images/icons/new-ig.svg" alt="Instagram" />
          </a>
        </div>
      </div>
      <hr class="footer-break" />
      <div class="footer-middle">
        <h4>Top Searches for Framer templates</h4>
        {{ topSearch }}
        <div>
          <p
            v-for="(search, i) in topSearch"
            :key="i"
            @click="triggerSearch(search)"
          >
            {{ search }}
          </p>
        </div>
      </div>
      <hr class="footer-break" />
      <div class="footer-bottom">
        <div>
          <nuxt-link to="/about">About us</nuxt-link>
          <a href="http://framerstore.shop/blog/" target="_blank">Blog</a>
          <a href=" https://www.framer.com/?via=biyified" target="_blank"
            >Build with Framer</a
          >
          <nuxt-link to="/app/submit">Submit a template</nuxt-link>
          <nuxt-link to="/">Promote a template</nuxt-link>
          <nuxt-link to="/">Customisation</nuxt-link>
        </div>
        <div>
          <p><span>©</span> Copyright 2023 Framerstore</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useTemplateStore } from "../../stores/useTemplate";
const router = useRouter();

const { searchFilters } = storeToRefs(useTemplateStore());
const { getTemplates } = useTemplateStore();

const topSearch = ref([
  "Portfolio",
  "Saas",
  "Startup",
  "Fitness",
  "Beauty",
  "Photography",
  "Pod casting",
  "Real Estate",
  "Health",
  "Agency",
  "Marketing",
  "Business",
  "Technology",
]);

const triggerSearch = (search: string) => {
  getTemplates({ filters: searchFilters.value }, search);
  router.push(`/search?searchTerm=${search}`);
};
</script>

<style></style>
