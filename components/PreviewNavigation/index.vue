<template>
  <div class="nav" :class="scrolled ? 'nav-scroll' : ''">
    <div class="container">
      <div class="nav-container nav-preview--container">
        <div>
          <nuxt-link to="/">
            <img src="/images/logo.svg" class="nav-logo" alt="Framestore"
          /></nuxt-link>
          <div class="nav-preview--screens">
            <img
              v-for="(size, i) in templateSizes"
              :key="i"
              :src="size.url"
              :alt="size.alt"
              :class="
                selectedTemplateSize === size.value
                  ? 'nav-preview--screens-active'
                  : ''
              "
              @click="updateTemplateSize(size.value)"
            />
          </div>

          <div class="nav-preview--buttons">
            <Button
              color="secondary"
              outlined
              icon
              @click="visitExternalLink('http://framerstore.shop/blog/')"
            >
              <img src="/images/icons/share.svg" alt="Share" />
            </Button>
            <Button
              @click="visitExternalLink('https://www.framer.com/?via=biyified')"
            >
              <img src="/images/icons/info.svg" alt="Info" />
              Template details
            </Button>

            <Button color="primary" @click="router.push('/app/submit')">
              <img src="/images/icons/buy.svg" alt="Info" />
              Buy for ${{ selectedTemplate.price ? selectedTemplate.price : 0 }}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTemplateStore } from "~/stores/useTemplate";

const templateStore = useTemplateStore();
const { selectedTemplate, selectedTemplateSize } = storeToRefs(templateStore);
const { updateTemplateSize } = templateStore;

const scrolled = ref(false);
const router = useRouter();
const route = useRoute();

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const visitExternalLink = (url: string) => {
  navigateTo(url, {
    open: {
      target: "_blank",
    },
  });
};

const templateSizes = ref([
  {
    url: "/images/icons/laptop-computer.svg",
    alt: "Laptop",
    value: "desktop",
  },
  {
    url: "/images/icons/tablet.svg",
    alt: "Tablet",
    value: "tablet",
  },
  {
    url: "/images/icons/mobile-phone.svg",
    alt: "Phone",
    value: "mobile",
  },
]) as Ref<
  Array<{ url: string; alt: string; value: "mobile" | "tablet" | "desktop" }>
>;

onMounted(async () => {
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
