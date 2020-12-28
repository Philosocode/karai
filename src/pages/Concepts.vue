<template>
  <h1 v-if="!hasConcepts">Click the plus button to add a concept.</h1>

  <Filters @search="handleSearchChange" @sort="handleSortChange" />

  <AddConcept :show="modalShowing" :error="error" @close="toggleModal" />
  <ConceptGrid :concepts="showingConcepts" :canDrag="canDrag" />
  <AddButton @clicked="toggleModal" />
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import AddButton from "../components/AddButton.vue";
import AddConcept from "../components/AddConcept.vue";
import ConceptGrid from "../components/ConceptGrid.vue";
import Filters from "../components/Filters";

export default {
  components: {
    AddButton,
    AddConcept,
    ConceptGrid,
    Filters,
  },
  setup() {
    document.title = "Karai「花蕾」- Concepts";

    const store = useStore();

    const modalShowing = ref(false);
    const deleteAllModalShowing = ref(false);

    const searchText = ref("");

    const concepts = computed(function () {
      return store.getters.concepts;
    });

    const showingConcepts = computed(function () {
      if (searchText.value.trim() === "") return concepts.value;

      return concepts.value.filter((c) =>
        c.name.toLowerCase().includes(searchText.value.toLowerCase())
      );
    });

    const error = computed(function () {
      return store.getters.error;
    });

    const canDrag = computed(function () {
      return searchText.value.trim() !== "";
    });

    const hasConcepts = computed(function () {
      return store.getters.hasConcepts;
    });

    function toggleModal() {
      modalShowing.value = !modalShowing.value;
    }

    function handleSearchChange(newVal) {
      searchText.value = newVal;
    }

    function handleSortChange(data) {
      store.dispatch("sortConcepts", data);
    }

    return {
      canDrag,
      concepts,
      deleteAllModalShowing,
      error,
      hasConcepts,
      modalShowing,
      toggleModal,
      handleSearchChange,
      handleSortChange,
      showingConcepts,
    };
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