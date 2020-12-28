<template>
  <div class="filters" v-if="hasConcepts">
    <input
      type="text"
      class="search"
      v-model="searchText"
      @input="handleSearchChange"
    />
    <div class="sort">
      <button class="modal-button sort-button" @click="handleAlphaSort">
        {{ alphabeticalText }}
      </button>
      <button class="modal-button sort-button" @click="handleDateSort">
        {{ dateText }}
      </button>
    </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";

export default {
  name: "Filters",
  data() {
    return {
      searchText: "",
      isAlphaReverse: false,
      isDateReverse: false,
    };
  },
  emits: ["search", "sort"],
  created() {
    this.handleSearchChange = debounce(this.handleSearchChange, 300);
  },
  methods: {
    handleSearchChange() {
      this.$emit("search", this.searchText);
    },
    handleAlphaSort() {
      this.$emit("sort", {
        type: "alphabetical",
        isReverse: this.isAlphaReverse,
      });

      this.isAlphaReverse = !this.isAlphaReverse;
    },
    handleDateSort() {
      this.$emit("sort", {
        type: "date",
        isReverse: this.isDateReverse,
      });

      this.isDateReverse = !this.isDateReverse;
    }
  },
  computed: {
    alphabeticalText() {
      return this.isAlphaReverse ? "Z - A" : "A - Z";
    },
    dateText() {
      return this.isDateReverse ? "Oldest" : "Newest";
    },
    hasConcepts() {
      return this.$store.getters.hasConcepts;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
    flex-direction: column;
    justify-content: center;
  margin: 0 auto;
  width: 80%;
  max-width: 35rem;
}

.search {
  background: transparent;
  border: none;
  border-bottom: 1px solid $color-grey-darkest;
  color: $color-grey-lightest;
  font-size: $font-size-small;
  font-weight: 500;
  padding-bottom: 5px;

  @include respond(tab-land) {
    font-size: $font-size-medium;
  }

  &:active,
  &:focus {
    outline: none;
  }
}

.sort {
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-top: $spacing-small;
}

.sort-button {
  cursor: pointer;
  margin-left: 1.6rem;
  margin-top: 0 !important;
}
</style>