import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

import hooks from "../assets/hooks";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const vuexPersist = new VuexPersist({
  key: "karai",
  storage: window.localStorage,
});

export default createStore({
  state: {
    hooks,
    concepts: [],
    currConcept: "",
    error: "",
  },
  mutations,
  actions,
  getters,
  plugins: [vuexPersist.plugin],
});
