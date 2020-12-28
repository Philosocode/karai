<template>
  <button @click="handleClick">
    <i class="fas fa-plus" />
  </button>
</template>

<script>
export default {
  emits: [ "clicked" ],
  methods: {
    handleClick() {
      this.$emit("clicked");
    }
  }
}
</script>

<style lang="scss" scoped>
button {
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