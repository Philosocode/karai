import { createRouter, createWebHistory } from "vue-router";

import Concepts from "../pages/Concepts.vue";

const routes = [
  {
    path: "/",
    name: "Concepts",
    component: Concepts,
  },
  {
    path: "/:id",
    name: "Concept Detail",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "conceptDetail" */ "../pages/ConceptDetail.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

export default router;
