<template>
  <form @submit.prevent="handleSubmit">
    <div class="hook-container">
      <p class="hook-text">{{ hook }}</p>
      <div class="icons">
        <i class="refresh icon fas fa-redo" @click="getUnusedHook" />
        <i class="edit icon fas fa-edit" @click="showModal" />
      </div>
    </div>
    <textarea
      class="hook-textarea"
      v-model="text"
      @focus="autosizeTextarea"
      @input="autosizeTextarea"
    />
    <button
      type="submit"
      class="modal-button hook-submit"
      :disabled="text.trim() === ''"
    >
      Create
    </button>
  </form>
  <Dialog :show="modalShowing" title="Change Hook Name" @close="hideModal">
    <form @submit.prevent="handleHookChange">
      <textarea
        class="modal-input"
        v-model="hookInputText"
        @focus="autosizeTextarea"
        @input="autosizeTextarea"
        @keydown.esc="hideModal"
        rows="1"
        required
      />
      <button class="modal-button" :disabled="buttonIsDisabled">Change</button>
    </form>
  </Dialog>
</template>

<script>
import Dialog from "./Dialog";

import getRandomHook from "../mixins/randomHookMixin";
import autosizeTextarea from "../mixins/autosizeTextareaMixin";

export default {
  name: "AddHook",
  props: ["concept"],
  mixins: [getRandomHook, autosizeTextarea],
  components: { Dialog },
  data() {
    return {
      hook: "",
      hookInputText: "",
      text: "",
      modalShowing: false,
    };
  },
  computed: {
    buttonIsDisabled() {
      return this.hookInputText.trim() === "";
    },
  },
  created() {
    this.getUnusedHook();
  },
  methods: {
    getUnusedHook() {
      let newHook;
      do {
        newHook = this.getRandomHook();
      } while (this.hook === newHook || this.concept.hooks.includes(newHook));

      this.hook = newHook;
    },
    toggleModal() {
      this.modalShowing = !this.modalShowing;
    },
    showModal() {
      this.toggleModal();
      this.hookInputText = this.hook;
    },
    hideModal() {
      this.toggleModal();
    },
    handleHookChange() {
      if (this.hookInputText.trim() === "") return;

      this.hook = this.hookInputText;
      this.hideModal();
    },
    handleSubmit() {
      if (!this.text) return;

      this.$store.dispatch("addHookToConcept", {
        id: this.concept.createdAt,
        hook: {
          name: this.hook,
          text: this.text,
        },
      });

      this.text = "";
      this.getUnusedHook();
    },
  },
};
</script>

<style lang="scss" scoped>
.hook-container {
  position: relative;
  width: max-content;

  &:hover .icons {
    visibility: visible;
  }
}

.icons {
  display: flex;
  padding-top: 1.5rem;
  visibility: visible;

  @include respond(tab-land) {
    visibility: hidden;
  }
}

.icon {
  color: $color-grey-lightest;
  cursor: pointer;
  font-size: $font-size-normal-big;
  margin-right: $spacing-medium;
  padding-bottom: 1.5rem;

  @include respond(tab-land) {
    font-size: $font-size-large;
    padding-bottom: $spacing-medium;
  }

  &:hover {
    color: $color-green-light;
  }
}

.edit {
  transform: translateY(-2px);
}

.hook-text {
  background: $color-grey-darkest;
  color: $color-grey-lightest;
  font-size: $font-size-medium;
  font-weight: 500;
  margin: 0;
  padding: 1.5rem;
  font-size: $font-size-small;
  width: max-content;
  max-width: 90vw;

  @include respond(tab-land) {
    font-size: $font-size-normal;
    padding: 2rem;
  }
}

.hook-textarea {
  background: transparent;
  border: 1px solid $color-grey-darkest;
  color: $color-grey-lightest;
  font-size: $font-size-normal;
  min-height: 25rem;
  overflow: hidden;
  padding: 1.3rem 1rem;
  width: 100%;
  max-width: 100rem;

  @include respond(tab-land) {
    font-size: $font-size-medium;
    min-height: 50rem;
    padding: 2rem;
  }

  &:active,
  &:focus {
    outline: none;
  }
}

.hook-submit {
  display: block;
}
</style>