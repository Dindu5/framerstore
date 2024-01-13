<template>
  <div class="pagination">
    <button
      type="button"
      @click="onClickPreviousPage"
      :disabled="isInFirstPage"
    >
      <img src="/images/icons/arrow_back.svg" alt="back" /> Previous
    </button>

    <!-- Visible Buttons Start -->
    <h6>
      <span> {{ currentPage }}</span> of {{ pages.length }}
    </h6>
    <button
      type="button"
      v-for="page in pages"
      :key="page.name"
      class="pagination-btn"
      :class="page.name === currentPage ? 'active' : ''"
      @click="onClickPage(page.name)"
    >
      {{ page.name }}
    </button>

    <!-- Visible Buttons End -->

    <button type="button" @click="onClickNextPage" :disabled="isInLastPage">
      Next <img src="/images/icons/arrow_forward.svg" alt="forward" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 5,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }

      return range;
    },
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
  },
  methods: {
    onClickPreviousPage() {
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      this.$emit("pagechanged", this.currentPage + 1);
    },
  },
};
</script>
