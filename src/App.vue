<template>
  <div class="nav-icons">
    <router-link to="/">
      <Logo class="logo" />
    </router-link>
    <RandoTip />
    <DeleteAll />
  </div>

  <div class="site-content">
    <router-view :key="$route.fullPath" />
  </div>
  <Footer />
</template>

<script>
import DeleteAll from "./components/DeleteAll";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import RandoTip from "./components/RandoTip.vue";

export default {
  name: "App",
  components: { DeleteAll, Footer, Logo, RandoTip },
};
</script>

<style lang="scss">
:root {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
}

html {
  font-size: 62.5%; // 1rem = 10px, 10/16 = 62.5%
}

body {
  background: $color-black;
  font-family: $font-primary;
  font-size: 1.6rem;
  line-height: 1.5;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.site-content {
  min-height: 85vh;
  margin-top: 9rem;

  @include respond(tab-land) {
    margin-top: 12rem; 
  }
}

.modal-text {
  color: $color-grey-lightest;
  font-size: $font-size-normal-big;
  margin-bottom: 0;
}

.modal-input {
  border: none;
  border-bottom: 1px solid $color-grey-darker;
  background: transparent;
  color: $color-grey-lightest;
  margin-top: $spacing-small;
  font-size: $font-size-small;
  padding-bottom: 0.4rem;
  overflow: hidden;
  width: 100%;

  @include respond(tab-land) {
    font-size: $font-size-normal-big;
    margin-top: $spacing-medium;
    padding-bottom: $spacing-smallest;
  }

  &:active,
  &:focus {
    outline: none;
    border-bottom: 1px solid $color-grey;
  }
}

.modal-button {
  background: transparent;
  border: 1px solid $color-grey-darker;
  border-radius: 5px;
  color: $color-grey-lighter;
  cursor: pointer;
  font-size: $font-size-smallest;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 1em 2em;
  margin-top: 1.8rem;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  @include respond(tab-land) {
    font-size: $font-size-smaller;
    margin-top: $spacing-medium;
  }

  &:hover {
    border-color: $color-grey;
    color: $color-grey-lightest;
  }

  &:active,
  &:focus {
    outline: 1px solid $color-grey;
  }

  &:disabled {
    border-color: $color-grey-darker;
    color: $color-grey-darker;
    cursor: not-allowed;
  }
}

.logo {
  position: relative;
    top: 5px;
  transform: rotate(15deg);
  width: 3.5rem;

  @include respond(tab-land) {
    width: 5rem;
  }
}

.nav-icons {
  display: flex;
    align-items: center;
    justify-content: space-between;
  margin: 0 auto;
  position: fixed;
    left: 50%;
    top: 2rem;
    transform: translateX(-50%);
  width: 15rem;
  z-index: 10;

  @include respond(tab-land) {
    width: 20rem;
  }
}

.nav-icon {
  color: $color-grey-light;
  cursor: pointer;
  font-size: 2.5rem;
  transition: color 0.2s ease-in-out;
  z-index: 10;

  @include respond(tab-land) {
    font-size: 3rem;
  }

  &:hover,
  &.is-active {
    color: $color-green-light;
  }
}

.page-container {
  margin: 0 auto;
  margin-bottom: $spacing-medium;
  width: 90vw;

  @include respond(tab-land) {
    margin-bottom: $spacing-largest;
    width: 85vw;
  }
}

.animate-dnd-move {
  transition: transform 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
