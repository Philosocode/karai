export default {
  concepts(state) {
    return state.concepts;
  },
  currConcept(state) {
    return state.currConcept;
  },
  hasConcepts(state) {
    return state.concepts.length > 0;
  },
  hasHooks(state) {
    return state.currConcept.hooks.length > 0;
  },
  hooks(state) {
    return state.hooks;
  },
  error(state) {
    return state.error;
  },
};
