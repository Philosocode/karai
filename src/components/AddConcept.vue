<template>
  <button class="add-button" @click="handleClick" tabindex="0">
    <i class="fas fa-plus" />
  </button>

  <Dialog :show="modalShowing" title="Create Concept" @close="closeModal">
    <form @submit.prevent="handleSubmit">
      <input
        class="modal-input"
        type="text"
        v-model="conceptName"
        placeholder="Concept Name"
        ref="inputRef"
        @keydown.esc="closeModal"
        required
      />
      <button class="modal-button" :disabled="conceptName.trim() === ''">
        Create
      </button>
    </form>
  </Dialog>
</template>

<script>
import Dialog from "./Dialog";

export default {
  name: "AddConcept",
  props: ["show"],
  emits: ["close"],
  components: { Dialog },
  data() {
    return {
      conceptName: "",
      modalShowing: false,
    };
  },
  methods: {
    closeModal() {
      this.modalShowing = false;
      this.conceptName = "";
    },
    handleClick() {
      this.modalShowing = true;
    },
    handleSubmit() {
      this.$store.dispatch("addConcept", this.conceptName);
      this.closeModal();

      // if on concept detail, push to new concept
      const newestConcept = this.$store.getters.concepts[0];
      this.$router.push("/" + newestConcept.createdAt);
    },
  },
  watch: {
    modalShowing() {
      if (this.modalShowing)
        this.$nextTick(() => {
          this.$refs.inputRef.focus();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  color: $color-red;
  margin-bottom: 0;
}

.add-button {
  background: $color-grey-lightest;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 6px;
  position: fixed;
    bottom: 2rem;
    right: 2rem;
  transition: transform 0.3s ease-in-out;
  width: 4rem;

  @include respond(tab-land) {
    padding: 1rem;
    right: 2vw;
    width: 5rem;
  }

  &:hover {
    transform: translateY(-0.5rem);
  }
  &:active, &:focus {
    outline: none;
  }
}

i {
  font-size: 2.5rem;
  color: $color-grey-darkest;

  @include respond(tab-land) {
    font-size: 3rem;
   }
}
</style>