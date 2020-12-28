export default {
  concepts(state) {
    return state.concepts;
  },
  currConcept(state) {
    return state.concepts.find(state.currConcept);
  },
  hasConcepts(state) {
    return state.concepts.length > 0;
  },
  hooks(state) {
    return state.hooks;
  },
  error(state) {
    return state.error;
  },
};
