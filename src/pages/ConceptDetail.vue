<template>
  <Title :title="`Karai - ${concept.name}`" />
  <div class="page-container">
    <div class="breadcrumbs">
      <router-link to="/">Home</router-link> / <span>{{ concept.name }}</span>
    </div>

    <ConceptHeader :concept="concept" />
    <AddHook :concept="concept" />

    <div class="divider" />

    <HookList :concept="concept" />
  </div>
</template>

<script>
import AddHook from "../components/AddHook";
import ConceptHeader from "../components/ConceptHeader";
import HookList from "../components/HookList";
import Title from "../components/Title";

export default {
  name: "ConceptDetail",
  components: { AddHook, ConceptHeader, HookList, Title },
  props: ["id"],
  data() {
    return {
      concept: undefined,
    };
  },
  created() {
    const currConcept = this.$store.getters.concepts.find(
      (c) => c.createdAt === Number(this.id)
    );

    if (!currConcept) {
      alert("ERROR: Failed to find concept with that ID.");
      this.$router.push("/");
    } else {
      this.concept = currConcept;
      this.newConceptName = currConcept.name;
    }
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs {
  color: $color-grey;
  font-weight: 500;
  font-size: $font-size-small;

  & > a {
    color: $color-green;
  }

  @include respond(tab-port) {
    font-size: $font-size-normal;
  }
}

.divider {
  background: $color-grey-darkest;
  height: 1px;
  width: 100%;
  margin-top: $spacing-large;
}
</style>