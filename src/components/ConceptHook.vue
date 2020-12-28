<template>
  <div class="container">
    <div class="index">{{ index + 1 }}</div>
    <textarea
      class="name"
      v-model="inputText"
      @focus="autosizeTextarea"
      @input="handleNameChange"
    />
    <textarea
      class="text"
      v-model="textareaText"
      @blur="collapseTextarea"
      @focus="autosizeTextarea"
      @input="handleTextChange"
    />
    <i class="delete-hook fas fa-trash" @click="handleDelete" />
  </div>
</template>

<script>
import autosizeTextarea from "../mixins/autosizeTextareaMixin";
import debounce from "lodash.debounce";

export default {
  name: "ConceptHook",
  mixins: [autosizeTextarea],
  props: ["conceptId", "index", "name", "text"],
  emits: ["deleteHook"],
  data() {
    return {
      inputText: "",
      textareaText: "",
    };
  },
  created() {
    this.inputText = this.name;
    this.textareaText = this.text;

    this.changeHookText = debounce(this.changeHookText, 500);
    this.handleNameChange = debounce(this.handleNameChange, 500);
  },
  methods: {
    handleDelete() {
      this.$emit("deleteHook", this.name);
    },
    handleNameChange(event) {
      this.resizeTextarea(event);
      this.changeHookName();
    },
    handleTextChange(event) {
      this.resizeTextarea(event);
      this.changeHookText();
    },
    changeHookName() {
      this.$store.dispatch("updateHook", {
        id: this.conceptId,
        hook: this.name,
        newName: this.inputText,
      });
    },
    changeHookText() {
      this.$store.dispatch("updateHook", {
        id: this.conceptId,
        hook: this.name,
        newText: this.textareaText,
      });
    },
    resizeTextarea(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: $color-off-black;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin-top: $spacing-medium;
  padding: 2rem 1.1rem;
  position: relative;
  width: 100vw;
  max-width: 80rem;

  @include respond(tab-port) {
    width: 100%;
  }

  @include respond(tab-land) {
    margin-top: $spacing-large;
    padding: $spacing-large;
  }
}

.container:hover > .delete-hook {
  display: block;
}

.index {
  color: $color-grey-dark;
  font-size: $font-size-normal;
  position: absolute;
  top: 1rem;
  left: 1rem;

  @include respond(tab-land) {
    font-size: $font-size-medium;
  }
}

.name {
  background: transparent;
  border: none;
  border-bottom: 1px solid $color-grey-darkest;
  color: $color-grey-lighter;
  font-weight: 500;
  margin-top: 3rem;
  overflow: hidden;

  @include respond(tab-land) {
    margin-top: 0;
  }

  &:focus,
  &:active {
    outline: none;
  }
}

.text {
  background: transparent;
  color: $color-grey-lightest;
  font-size: $font-size-normal;
  padding: 0.75em;
  margin-top: $spacing-medium;
  overflow: hidden;

  @include respond(tab-land) {
    font-size: $font-size-medium;
  }

  &:focus,
  &:active {
    outline: 1px solid $color-grey-dark;
  }
}

.delete-hook {
  color: $color-grey;
  cursor: pointer;
  font-size: 2rem;

  position: absolute;
  top: 1rem;
  right: 1rem;

  &:hover {
    color: $color-red;
    top: 2rem;
    right: 2rem;
  }

  @include respond(tab-land) {
    display: none;
    font-size: 2.5rem;
  }
}
</style>