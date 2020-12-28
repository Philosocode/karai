<template>
  <div>
    <h2 class="heading"># Hooks: {{ conceptHooks.length || 0 }}</h2>
    <Draggable
      class="hooks"
      v-model="conceptHooks"
      tag="transition-group"
      :component-data="{ tag: 'div', name: 'animate-dnd', type: 'transition' }"
      item-key="name"
    >
      <template #item="{ element, index }">
        <ConceptHook
          :key="element.name"
          :conceptId="concept.createdAt"
          :index="index"
          :name="element.name"
          :text="element.text"
          @deleteHook="startDelete"
        />
      </template>
    </Draggable>
  </div>
  <Dialog :show="modalShowing" title="Delete Hook" @close="cancelDelete">
    <p class="modal-text">Are you sure?</p>
    <button class="modal-button" @click="handleDelete">Delete</button>
  </Dialog>
</template>

<script>
import ConceptHook from "./ConceptHook";
import Dialog from "./Dialog.vue";
import Draggable from "vuedraggable";

export default {
  name: "HookList",
  components: { ConceptHook, Dialog, Draggable },
  props: ["concept"],
  data() {
    return {
      hookToDelete: "",
      modalShowing: false,
      drag: false,
    };
  },
  computed: {
    conceptHooks: {
      get() {
        const concept = this.$store.getters.concepts.find(
          (c) => c.createdAt === this.concept.createdAt
        );
        return concept.hooks;
      },
      set(updatedHooks) {
        this.$store.commit("setHooks", {
          id: this.concept.createdAt,
          hooks: updatedHooks,
        });
      },
    },
  },
  methods: {
    toggleModal() {
      this.modalShowing = !this.modalShowing;
    },
    cancelDelete() {
      this.toggleModal();
      this.hookToDelete = "";
    },
    startDelete(hookToDelete) {
      this.toggleModal();
      this.hookToDelete = hookToDelete;
    },
    handleDelete() {
      this.$store.dispatch("removeHookFromConcept", {
        id: this.concept.createdAt,
        hook: this.hookToDelete,
      });

      this.cancelDelete();
    },
  },
};
</script>

<style lang="scss" scoped>
.heading {
  color: $color-grey-lightest;
  font-weight: 500;
  font-size: $font-size-medium;
  text-align: center;
  margin-bottom: $spacing-smallest;

  @include respond(tab-land) {
    font-size: $font-size-large;
  }
}

.hooks {
  display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  padding-left: 0;
}
</style>