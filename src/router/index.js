import { createRouter, createWebHistory } from "vue-router";
import FirstView from "../views/FirstView.vue";
import MainView from "../views/MainView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: FirstView,
    },
    {
      path: "/main",
      name: "main",
      component: MainView,
    },
  ],
});

export default router;
