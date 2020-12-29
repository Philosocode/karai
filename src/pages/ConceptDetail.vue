<template>
  <div class="page-container">
    <ConceptHeader :concept="concept" />
    <AddHook :concept="concept" />

    <div class="divider" />

    <HookList :concept="concept" />
    <AddConcept />
  </div>
</template>

<script>
import AddHook from "../components/AddHook";
import AddConcept from "../components/AddConcept.vue";
import ConceptHeader from "../components/ConceptHeader";
import HookList from "../components/HookList";

export default {
  name: "ConceptDetail",
  components: { AddConcept, AddHook, ConceptHeader, HookList },
  props: ["id"],
  data() {
    return {
      concept: undefined,
    };
  },
  created() {
    const concepts = this.$store.getters.concepts;
    const currConcept = concepts.find(c => c.createdAt === Number(this.id));

    if (!currConcept) {
      alert("ERROR: Failed to find concept. Please refresh the page.");
      this.$router.push("/");
    } else {
      this.$store.dispatch("setCurrConcept", currConcept);
      this.concept = currConcept;
      document.title = "Karai「花蕾」- " + currConcept.name;
    }
  },
  beforeUnmount() {
    this.$store.dispatch("setCurrConcept", undefined);
  }
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  color: $color-grey;
  font-size: $font-size-smaller;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;

  & > a {
    color: $color-green;
    text-decoration: none;

    &:hover {
      color: $color-green-light;
      text-decoration: underline;
    }
  }

  @include respond(tab-port) {
    font-size: $font-size-small;
  }
}

.divider {
  background: $color-grey-darkest;
  height: 1px;
  width: 100%;
  margin-top: $spacing-large;
}
</style>