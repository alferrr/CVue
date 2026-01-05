import { createRouter, createWebHistory } from "vue-router";
import Test from "../components/Test.vue"; // adjust path to your component

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../components/Home.vue"),
  },
  {
    path: "/getstarted",
    name: "Resume",
    component: Test,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
