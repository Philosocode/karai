<template>
  <Dialog :show="show" title="Create Concept" @close="closeModal">
    <form @submit.prevent="handleSubmit">
      <input
        class="modal-input"
        type="text"
        v-model="conceptName"
        placeholder="Concept Name"
        @keydown.esc="closeModal"
        required
      />
      <p v-if="error">{{ error }}</p>
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
  props: ["error", "show"],
  emits: ["close"],
  components: { Dialog },
  data() {
    return {
      conceptName: "",
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
      this.conceptName = "";
    },
    handleSubmit() {
      this.$store.dispatch("addConcept", this.conceptName);
      this.closeModal();
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  color: $color-red;
  margin-bottom: 0;
}
</style>