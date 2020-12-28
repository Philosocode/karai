<template>
  <Dialog title="Rando Tip" :show="modalShowing" @close="toggleModal">
    <i class="refresh fas fa-redo" @click="refreshHook" />
    <p class="hook-text">{{ currentHook }}</p>
  </Dialog>
  <i
    class="nav-icon fas fa-lightbulb"
    :class="modalShowing && 'is-active'"
    @click="toggleModal"
  />
</template>

<script>
import Dialog from "./Dialog.vue";
import getRandomHook from "../mixins/randomHookMixin";

export default {
  name: "RandoTip",
  components: { Dialog },
  mixins: [getRandomHook],
  data() {
    return {
      currentHook: "",
      modalShowing: false,
    };
  },
  methods: {
    toggleModal() {
      this.modalShowing = !this.modalShowing;

      if (this.modalShowing)
        this.currentHook = this.getRandomHook();
    },
    refreshHook() {
      let newHook;
      do {
        newHook = this.getRandomHook();
      } while (newHook === this.currentHook);

      this.currentHook = newHook;
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  position: relative;
    right: 4px;
}

.refresh {
  cursor: pointer;
  font-size: 2rem;
  color: $color-green;
  position: absolute;
  transform: translate(11rem, -2.8rem);

  &:hover {
    color: $color-green-light;
  }
}

.hook-text {
  background-color: $color-grey-darkest;
  color: $color-grey-lighter;
  font-weight: 500;
  font-size: $font-size-small;
  margin-bottom: 0;
  padding: $spacing-small $spacing-small;
  width: max-content;
  max-width: 100%;

  @include respond(tab-land) {
    font-size: $font-size-normal;
  }
}
</style>