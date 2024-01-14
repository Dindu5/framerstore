<template>
  <div class="nav" :class="scrolled ? 'nav-scroll' : ''">
    <div class="container">
      <div class="nav-container nav-preview--container">
        <div>
          <button class="nav-preview--container__back" @click="router.go(-1)">
            <img src="/images/icons/forward.svg" alt="Arrow" />Back
          </button>
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
            <!-- <Button
              color="secondary"
              outlined
              icon
              @click="visitExternalLink('http://framerstore.shop/blog/')"
            >
              <img src="/images/icons/share.svg" alt="Share" />
            </Button> -->
            <Button @click="router.push(`/templates/${selectedTemplate.id}`)">
              <img src="/images/icons/info.svg" alt="Info" />
              Template details
            </Button>

            <Button color="accent" @click="router.push('/app/submit')">
              <img src="/images/icons/buy.svg" alt="Info" />
              Buy for ${{ selectedTemplate.price ? selectedTemplate.price : 0 }}
            </Button>
            <Button
              icon
              @click="router.push(`/templates/${selectedTemplate.id}`)"
            >
              <img src="/images/icons/info.svg" alt="Info" />
            </Button>

            <Button color="accent" icon @click="router.push('/app/submit')">
              <img src="/images/icons/buy.svg" alt="Info" />
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
