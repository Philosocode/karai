import orderBy from "lodash.orderby";

export default {
  addConcept(state, payload) {
    state.concepts.unshift(payload);
  },
  setConcepts(state, payload) {
    state.concepts = payload;
  },
  sortConcepts(state, payload) {
    const { type, isReverse } = payload;
    const order = isReverse ? "asc" : "desc";

    let sorted = type === "alphabetical"
      ? orderBy(state.concepts, ["name"], [order])
      : orderBy(state.concepts, ["createdAt"], [order]);

    state.concepts = sorted;
  },
  changeConceptName(state, payload) {
    const idx = state.concepts.findIndex((c) => c.createdAt === payload.id);

    if (idx !== -1) state.concepts[idx].name = payload.name;
  },
  addHookToConcept(state, payload) {
    const idx = state.concepts.findIndex((c) => c.createdAt === payload.id);

    if (idx !== -1) state.concepts[idx].hooks.unshift(payload.hook);
  },
  setHooks(state, payload) {
    const conceptIdx = state.concepts.findIndex(
      (c) => c.createdAt === payload.id
    );

    if (conceptIdx === -1) return;

    state.concepts[conceptIdx].hooks = payload.hooks;
  },
  updateHook(state, payload) {
    const idx = state.concepts.findIndex((c) => c.createdAt === payload.id);

    if (idx === -1) return;

    const hooks = state.concepts[idx].hooks;

    const hookIdx = hooks.findIndex((h) => h.name === payload.hook);

    if (hookIdx === -1) return;

    if (payload.newName) hooks[hookIdx].name = payload.newName;

    if (payload.newText) hooks[hookIdx].text = payload.newText;
  },
  removeHookFromConcept(state, payload) {
    const conceptIdx = state.concepts.findIndex(
      (c) => c.createdAt === payload.id
    );

    if (conceptIdx === -1) return;

    const concept = state.concepts[conceptIdx];

    const hookIdx = concept.hooks.findIndex((h) => h.name === payload.hook);

    if (hookIdx === -1) return;

    concept.hooks.splice(hookIdx, 1);
  },
  deleteConcept(state, payload) {
    const idx = state.concepts.findIndex((c) => c.createdAt === payload);

    if (idx !== -1) state.concepts.splice(idx, 1);
  },
  deleteAllConcepts(state) {
    state.concepts = [];
  },
  setError(state, payload) {
    state.error = payload;
  },
};
