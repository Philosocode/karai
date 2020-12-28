<template>
  <form @submit.prevent="handleSubmit">
    <div class="hook-container">
      <input
        class="hook-text"
        ref="inputRef"
        v-model="hook"
        @input="resizeInput"
        @focus="resizeInput"
        placeholder="Hook Name"
      />
      <div class="icons">
        <i class="icon fas fa-redo" @click="getUnusedHook" />
      </div>
    </div>
    <textarea
      class="hook-textarea"
      v-model="text"
      ref="textareaRef"
      @focus="autosizeTextarea"
      @input="autosizeTextarea"
      placeholder="Type something..."
    />
    <button
      type="submit"
      class="modal-button hook-submit"
      :disabled="submitButtonDisabled"
    >
      Create
    </button>
  </form>
</template>

<script>
import getRandomHook from "../mixins/randomHookMixin";
import autosizeTextarea from "../mixins/autosizeTextareaMixin";

export default {
  name: "AddHook",
  props: ["concept"],
  mixins: [getRandomHook, autosizeTextarea],
  data() {
    return {
      hook: "",
      text: "",
    };
  },
  computed: {
    submitButtonDisabled() {
      return this.hook.trim() === "" || this.text.trim() === "";
    },
  },
  mounted() {
    this.isMounted = true;
    this.focusInput();
  },
  methods: {
    getUnusedHook() {
      let newHook;
      do {
        newHook = this.getRandomHook();
      } while (
        this.hook.toLowerCase() === newHook.toLowerCase() ||
        this.concept.hooks.some((conceptHook) => {
          return conceptHook.name.toLowerCase() === newHook.toLowerCase();
        })
      );
      
      this.hook = newHook;
      this.$refs.inputRef.value = newHook;
      this.resizeInput();
    },
    focusInput() {
      this.$nextTick(() => {
        this.$refs.inputRef.focus();
      });
    },
    resizeInput() {
      this.$refs.inputRef.style.width = "auto";
      this.$refs.inputRef.style.width = this.$refs.inputRef.scrollWidth + "px";
    },
    resizeTextarea() {
      this.$refs.textareaRef.style.height = "auto";
      this.$refs.textareaRef.style.height =
      this.$refs.textareaRef.style.scrollHeight + "px";
    },
    handleSubmit() {
      if (!this.$refs.inputRef.value || !this.text) return;

      this.$store.dispatch("addHookToConcept", {
        name: this.hook,
        text: this.text
      });

      this.hook = "";
      this.$refs.inputRef.value = "";

      this.text = "";

      this.resizeInput();
      this.resizeTextarea();
      this.focusInput();
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 90rem;
  width: 100%;
}

.hook-container {
  position: relative;

  @include respond(tab-land) {
    margin-bottom: $spacing-medium;
  }
}

.icons {
  display: flex;
  padding-top: 1.5rem;
  visibility: visible;

  @include respond(tab-land) {
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-3.3rem, 1px);
  }
}

.icon {
  color: $color-grey-lightest;
  cursor: pointer;
  font-size: $font-size-normal-big;
  margin-right: $spacing-medium;
  padding-bottom: 1.5rem;

  @include respond(tab-land) {
    font-size: $font-size-medium;
  }

  &:hover {
    color: $color-green-light;
  }
}

.hook-text {
  background: transparent;
  border: none;
  border-bottom: 1px solid $color-grey-darkest;
  color: $color-grey-lightest;
  font-size: $font-size-small;
  font-weight: 500;
  margin: 0;
  margin-top: $spacing-small;
  padding-bottom: $spacing-smallest;
  width: max-content;
  min-width: 25rem;
  max-width: 100%;

  @include respond(tab-land) {
    font-size: $font-size-normal-big;
  }

  &:active,
  &:focus {
    outline: none;
    border-color: $color-grey;
  }
}

.hook-textarea {
  background: transparent;
  border: 1px solid $color-grey-darkest;
  color: $color-grey-lightest;
  font-size: $font-size-normal;
  overflow: hidden;
  padding: 1.3rem 1rem;
  width: 100%;

  @include respond(tab-land) {
    font-size: $font-size-medium;
    padding: 2rem;
  }

  &:active,
  &:focus {
    outline: none;
    border-color: $color-grey;
  }
}

.hook-submit {
  display: block;
}
</style>