<template>
  <div class="nav" :class="scrolled ? 'nav-scroll' : ''">
    <div class="container">
      <div class="nav-container">
        <div>
          <nuxt-link to="/">
            <img src="/images/logo.svg" class="nav-logo" alt="Framestore"
          /></nuxt-link>

          <div class="nav-search">
            <span class="material-symbols-rounded"> search </span>
            <input type="text" placeholder="Enter keyword to search" />
          </div>
          <button
            @click="filterActive = !filterActive"
            class="btn btn-secondary-outline"
          >
            <span class="material-symbols-rounded"> tune </span>
            {{ filterActive ? "Hide" : "Show" }} Filters
          </button>
        </div>

        <div>
          <button class="btn">
            <span class="material-symbols-rounded"> cloud_upload </span> Submit
            Template
          </button>
          <button class="btn btn-primary" @click="signIn">
            <span class="material-symbols-rounded"> person </span> Sign In
          </button>
        </div>
      </div>
    </div>
    <div
      class="nav-search-filter"
      :class="filterActive ? 'nav-search-filter__active' : ''"
    >
      <div class="container">
        <div class="nav-search-filter__top">
          <h4><span>Searching keyword:</span> Travel</h4>
          <p>
            <span class="material-symbols-rounded"> close </span> 3 Filters
            Reset All
          </p>
        </div>
        <div class="nav-search-filter__options">
          <div class="hero-filters">
            <div>
              <h6>Industry</h6>
              <div class="hero-filters_options">
                <div>
                  <label>
                    <input type="checkbox" name="thing-1" value="mystery" />
                    Technology
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-2" value="romance" />
                    Finance and Marketing
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-3" value="adventure" />
                    Travel
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-4" value="pizza" />
                    Hospitality
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-1" value="mystery" />
                    Technology
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-2" value="romance" />
                    Finance and Marketing
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-3" value="adventure" />
                    Travel
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-4" value="pizza" />
                    Hospitality
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h6>Type</h6>
              <div class="hero-filters_options">
                <div>
                  <label>
                    <input type="checkbox" name="thing-1" value="mystery" />
                    Open page
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-2" value="romance" />
                    Blog
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-3" value="adventure" />
                    Portfolio
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-4" value="pizza" />
                    Podcasting
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h6>Style</h6>
              <div class="hero-filters_options">
                <div>
                  <label>
                    <input type="checkbox" name="thing-1" value="mystery" />
                    Minimal
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-2" value="romance" />
                    Modern
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-3" value="adventure" />
                    Swiss
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-4" value="pizza" />
                    Typography
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h6>Collections</h6>
              <div class="hero-filters_options">
                <div>
                  <label>
                    <input type="checkbox" name="thing-1" value="mystery" />
                    Newest
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-2" value="romance" />
                    Popular
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-3" value="adventure" />
                    All Templates
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h6>Collections</h6>
              <div class="hero-filters_options">
                <div>
                  <label>
                    <input type="checkbox" name="thing-1" value="mystery" />
                    Newest
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-2" value="romance" />
                    Popular
                  </label>
                </div>
                <div>
                  <label>
                    <input type="checkbox" name="thing-3" value="adventure" />
                    All Templates
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const scrolled = ref(false);
const router = useRouter();

const filterActive = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

function signIn() {
  router.push("/login");
}

onMounted(() => {
  if (process.client) {
    window.addEventListener("scroll", handleScroll);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("scroll", handleScroll);
  }
});
</script>

<style></style>
