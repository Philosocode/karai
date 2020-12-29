<template>
  <teleport to="body">
    <div class="backdrop" v-if="show" @click="closeModal" />

    <transition name="dialog">
      <dialog
        :class="long ? 'is-long' : ''"
        open
        v-if="show"
        @keypress.esc="closeModal"
      >
        <h2 class="modal-title">{{ title }}</h2>
        <slot />
        <i
          class="close-icon fas fa-times"
          @keypress.enter="closeModal"
          @click="closeModal"
          tabindex="0"
        />
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "Dialog",
  props: ["show", "title", "long"],
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.backdrop {
  background-color: rgba(black, 0.8);
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}

.close-icon {
  color: $color-grey-light;
  cursor: pointer;
  font-size: 1.8rem;
  position: absolute;
  top: 0.6em;
  right: 0.6em;

  @include respond(tab-land) {
    font-size: 2.4rem;
  }
}

dialog {
  background: $color-off-black;
  position: fixed;
    left: 50%;
  transform: translateX(-50%);
  top: 20vh;
  border-radius: 2px;
  border: none;
  padding: $spacing-medium 1.5rem;
  overflow: hidden;
  z-index: 100;
  width: 90%;

  @media (min-width: 500px) {
    width: 40rem;

    &.is-long {
      width: 50rem;
    }
  }

  @include respond(tab-land) {
    padding: $spacing-medium;
  }
}

.modal-title {
  color: $color-grey-lightest;
  font-size: $font-size-normal;
  margin: 0;

  @include respond(tab-port) {
    font-size: $font-size-medium;
  }

  @include respond(tab-land) {
    font-size: $font-size-large;
  }
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.dialog-enter-active {
  transition: all 0.2s ease-out;
}

.dialog-leave-active {
  transition: all 0.2s ease-in;
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>