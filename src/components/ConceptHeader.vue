<template>
  <div class="concept-info">
    <h1 class="concept-info-name">
      {{ concept.name }}
      <i class="edit-name fas fa-edit" @click="toggleModal" />
    </h1>
  </div>
  <Dialog :show="modalShowing" title="Change Concept Name" @close="toggleModal">
    <form @submit.prevent="handleSubmit">
      <input class="modal-input" v-model="newName" required />
      <button class="modal-button" :disabled="newName.trim() === ''">
        Change Name
      </button>
    </form>
  </Dialog>
</template>

<script>
import Dialog from "../components/Dialog";

export default {
  name: "ConceptHeader",
  components: { Dialog },
  props: ["concept"],
  data() {
    return {
      newName: this.concept.name,
      modalShowing: false,
    };
  },
  methods: {
    toggleModal() {
      this.modalShowing = !this.modalShowing;
    },
    handleSubmit() {
      this.$store.dispatch("changeConceptName", this.newName);

      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
.concept-info {
  margin-top: $spacing-small;

  &:hover .edit-name {
    display: inline-block;
  }

  @include respond(tab-land) {
    margin-top: $spacing-medium;
  }
}

.concept-info-name {
  background: transparent;
  color: $color-grey-lightest;
  padding-bottom: $spacing-smaller;
  outline: none;
  margin: 0;
  width: 100%;
  max-width: 50rem;

  font-size: $font-size-large;

  @include respond(tab-land) {
    font-size: $font-size-larger;
  }
}

.edit-name {
  cursor: pointer;
  font-size: 2rem;
  position: relative;
  bottom: 2px;
  left: 0.5rem;

  @include respond(tab-land) {
    display: none;
    bottom: 4.6px;
    left: 1.3rem;
  }

  &:hover {
    color: $color-green;
  }
}
</style>