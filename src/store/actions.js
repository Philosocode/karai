export default {
  addConcept(context, payload) {
    context.commit("addConcept", {
      name: payload,
      createdAt: Date.now(),
      hooks: []
    });
  },
  setConcepts(context, payload) {
    context.commit("setConcepts", payload);
  },
  sortConcepts(context, payload) {
    context.commit("sortConcepts", payload);
  },
  changeConceptName(context, payload) {
    if (payload.name.trim() === "") return;
    context.commit("changeConceptName", payload);
  },
  deleteConcept(context, payload) {
    context.commit("deleteConcept", payload);
  },
  setHooks(context, payload) {
    context.commit("setHooks", payload);
  },
  addHookToConcept(context, payload) {
    context.commit("addHookToConcept", payload);
  },
  updateHook(context, payload) {
    context.commit("updateHook", payload);
  },
  removeHookFromConcept(context, payload) {
    context.commit("removeHookFromConcept", payload);
  },
  deleteAllConcepts(context) {
    context.commit("deleteAllConcepts");
  },
  setError(context, payload) {
    context.commit("setError", payload);
  }
};
