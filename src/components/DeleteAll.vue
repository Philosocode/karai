<template>
  <i v-if="shouldRender" class="nav-icon fas fa-trash" @click="toggleModal" />
  <Dialog
    :title="`Delete All ${thingToDelete}`"
    :show="modalShowing"
    @close="toggleModal"
  >
    <p class="modal-text">
      Are you sure? <br />
      This will delete <strong>ALL</strong> of your {{ thingToDelete.toLowerCase() }}.
    </p>
    <button class="modal-button" @click="handleDelete">Delete All</button>
  </Dialog>
</template>

<script>
import Dialog from "./Dialog";

export default {
  name: "DeleteAllConcepts",
  components: {
    Dialog,
  },
  created() {
    if (this.$route.name === "Concepts") this.isConceptPage = true;
  },
  data() {
    return {
      modalShowing: false,
      isConceptPage: false,
    };
  },
  computed: {
    thingToDelete() {
      return this.isConceptPage ? "Concepts" : "Hooks";
    },
    hasConcepts() {
      return this.$store.getters.hasConcepts;
    },
    hasHooks() {
      const currConcept = this.$store.getters.currConcept;
      if (!currConcept) return false;

      return currConcept.hooks.length > 0;
    },
    shouldRender() {
      // if on Concepts page, show if there are concepts
      if (this.$route.name === "Concepts") return this.hasConcepts;

      // if on Concept detail page, show if there are hooks
      return this.hasHooks;
    },
  },
  methods: {
    toggleModal() {
      this.modalShowing = !this.modalShowing;
    },
    handleDelete() {
      if (this.isConceptPage) this.$store.dispatch("setConcepts", []);
      else this.$store.dispatch("setHooks", []);
      this.toggleModal();
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  left: 15rem;

  &:hover {
    color: $color-red;
  }
}
</style>