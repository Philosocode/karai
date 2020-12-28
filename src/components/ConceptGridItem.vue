<template>
  <div
    class="concept-container"
    @click="goToConceptPage(concept.createdAt)"
    :key="concept.name"
  >
    <h3 class="concept-name">{{ concept.name }} [{{ concept.hooks.length }}]</h3>
    <p class="concept-date">{{ getDateString(concept.createdAt) }}</p>
    <i class="delete-icon fas fa-times" @click.stop="handleDelete" />
    <div class="icon-circle" />
  </div>
</template>

<script>
const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

export default {
  name: "ConceptGridItem",
  props: ["concept"],
  emits: ["deleteConcept"],
  methods: {
    handleDelete() {
      this.$emit("deleteConcept", this.concept.createdAt);
    },
    goToConceptPage(conceptId) {
      this.$router.push("/" + conceptId);
    },
    getDateString(dateMs) {
      const dateObj = new Date(dateMs);
      return dateObj.toLocaleString(undefined, dateOptions);
    }
  }
}
</script>

<style lang="scss" scoped>
.concept-container {
  background-color: $color-off-black;
  border-radius: 2px;
  color: $color-grey-lightest;
  cursor: pointer;
  margin-left: 5rem;
  margin-right: 5rem;
  margin-top: $spacing-medium;
  padding: $spacing-small;
  position: relative;
  text-decoration: none;
  width: 100%;
  max-width: 25rem;

  @include respond(tab-land) {
    margin-top: $spacing-large;
  }
}

.concept-name {
  font-size: $font-size-normal;
  margin-bottom: 0;
  padding-left: $spacing-small;
  padding-right: $spacing-small;
  padding-top: $spacing-small;
  text-align: center;

  @include respond(tab-land) {
    font-size: $font-size-normal-big;
    padding-top: 0;
  }
}

.concept-date {
  color: $color-grey;
  font-size: $font-size-smaller;
  font-weight: 500;
  margin-top: $spacing-smallest;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

@include respond(tab-port) {
  .concept-container:hover > .delete-icon {
    display: block;
  }

  .delete-icon {
    display: none;
  }
}

.delete-icon {
  font-size: 2rem;
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 10;

  &:hover + .icon-circle {
    opacity: 1;
  }
}

.icon-circle {
  border-radius: 50%;
  background-color: rgba($color-grey, 0.5);
  height: 3.5rem;
  width: 3.5rem;
  opacity: 0;
  position: absolute;
    top: 0.5rem;
    right: 0.18rem;
  transition: all 0.2s ease-in-out;
}
</style>