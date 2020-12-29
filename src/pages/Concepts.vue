<template>
  <h1 v-if="!hasConcepts">Click the plus button to add a concept.</h1>

  <Filters @search="handleSearchChange" @sort="handleSortChange" />

  <ConceptGrid :concepts="showingConcepts" :canDrag="canDrag" />
  <AddConcept />
</template>

<script>
import AddConcept from "../components/AddConcept.vue";
import ConceptGrid from "../components/ConceptGrid.vue";
import Filters from "../components/Filters";

export default {
  components: {
    AddConcept,
    ConceptGrid,
    Filters,
  },
  data() {
    return {
      modalShowing: false,
      searchText: "",
    };
  },
  computed: {
    hasConcepts() {
      return this.$store.getters.hasConcepts;
    },
    concepts() {
      return this.$store.getters.concepts;
    },
    showingConcepts() {
      if (this.searchText.trim() === "") return this.concepts;

      return this.concepts.filter((c) =>
        c.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    canDrag() {
      // can drag when not filtering
      return this.searchText.trim() === "";
    },
  },
  created() {
    document.title = "Karai「花蕾」- Concepts";
  },
  methods: {
    handleSearchChange(newVal) {
      this.searchText = newVal;
    },
    handleSortChange(data) {
      this.$store.dispatch("sortConcepts", data);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  color: white;
  font-size: $font-size-medium;
  padding: 0 $spacing-medium;
  text-align: center;

  @include respond(tab-land) {
    font-size: $font-size-large;
  }
}
</style>