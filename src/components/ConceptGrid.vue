<template>
  <h2 class="no-concepts" v-if="hasConcepts && concepts.length === 0">No concepts found.</h2>
  <Draggable
    class="grid page-container"
    v-model="allConcepts"
    tag="transition-group"
    :component-data="{ tag: 'div', type: 'transition', name: 'animate-dnd' }"
    item-key="createdAt"
    :disabled="canDrag"
  >
    <template #item="{ element }">
      <ConceptGridItem
        :concept="element" 
        @deleteConcept="handleDeleteClick"
      />
    </template>
  </Draggable>

  <Dialog
    :show="modalShowing"
    title="Delete Concept"
    @close="modalShowing = false;"
  >
    <p class="modal-text">Are you sure?</p>
    <button class="modal-button" @click="handleDelete">Delete</button>
  </Dialog>
</template>

<script>
import Draggable from "vuedraggable";

import ConceptGridItem from "./ConceptGridItem.vue";
import Dialog from "./Dialog.vue";

export default {
  name: "ConceptGrid",
  components: { ConceptGridItem, Dialog, Draggable },
  props: ["canDrag", "concepts"],
  data() {
    return {
      currentConceptId: undefined,
      modalShowing: false,
      deleteAllModalShowing: false,
    };
  },
  computed: {
    hasConcepts() {
      return this.$store.getters.hasConcepts;
    },
    allConcepts: {
      get() {
        return this.$store.getters.concepts;
      },
      set(newVal) {
        this.$store.dispatch("setConcepts", newVal);
      }
    }
  },
  methods: {
    toggleModal() {
      this.modalShowing = !this.modalShowing;
    },
    handleDeleteClick(conceptId) {
      this.currentConceptId = conceptId;
      this.toggleModal();
    },
    handleDelete() {
      this.$store.dispatch("deleteConcept", this.currentConceptId);
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: flex;
    flex-wrap: wrap;
    justify-content: center;
  margin-top: $spacing-small;
}

.no-concepts {
  color: $color-grey-lightest;
  font-weight: 500;
  margin-top: $spacing-medium;
  text-align: center;
  font-size: $font-size-normal-big;

  @include respond(tab-land) {
    font-size: $font-size-medium;
    margin-top: $spacing-large;
  }
}
</style>