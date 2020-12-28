import orderBy from "lodash.orderby";

export default {
  addConcept(state, payload) {
    state.concepts.unshift(payload);
  },
  setConcepts(state, payload) {
    state.concepts = payload;
  },
  setCurrConcept(state, payload) {
    state.currConcept = payload;
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
    if (!state.currConcept) return;

    state.currConcept.name = payload;
  },
  addHookToConcept(state, payload) {
    if (!state.currConcept) return;

    state.currConcept.hooks.push(payload);
  },
  setHooks(state, payload) {
    if (!state.currConcept) return;

    state.currConcept.hooks = payload;
  },
  updateHook(state, payload) {
    if (!state.currConcept) return;

    const hooks = state.currConcept.hooks;

    const hookIdx = hooks.findIndex((h) => h.name === payload.hook);

    if (hookIdx === -1) return;

    if (payload.newName) hooks[hookIdx].name = payload.newName;
    if (payload.newText) hooks[hookIdx].text = payload.newText;
  },
  removeHookFromConcept(state, payload) {
    if (!state.currConcept) return;

    const hooks = state.currConcept.hooks;
    const hookIdx = hooks.findIndex((h) => h.name === payload.hook);

    if (hookIdx === -1) return;

    hooks.splice(hookIdx, 1);
  },
  deleteConcept(state, payload) {
    const idx = state.concepts.findIndex((c) => c.createdAt === payload);

    if (idx !== -1) state.concepts.splice(idx, 1);
  },
};
