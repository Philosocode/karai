<template>
  <i v-if="shouldRender" class="nav-icon fas fa-trash" @click="toggleModal" />
  <Dialog title="Delete All Concepts" :show="modalShowing" @close="toggleModal">
    <p class="modal-text">
      Are you sure? <br />
      This will delete <strong>ALL</strong> of your concepts.
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
  data() {
    return {
      modalShowing: false,
    };
  },
  computed: {
    hasConcepts() {
      return this.$store.getters.hasConcepts;
    },
    shouldRender() {
      return this.hasConcepts && this.$route.name === "Concepts";
    }
  },
  methods: {
    toggleModal() {
      this.modalShowing = !this.modalShowing;
    },
    handleDelete() {
      this.$store.dispatch("deleteAllConcepts");
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