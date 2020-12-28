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
      import(/* webpackChunkName: "about" */ "../pages/ConceptDetail.vue"),
  },
  {
    path: "/:notFound(.*)",
    component: () => import("../pages/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: "/",
  routes,
});

export default router;
