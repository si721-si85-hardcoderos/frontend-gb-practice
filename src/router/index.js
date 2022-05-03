import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "profiles"
    },
    {
      path: "/profiles",
      name: "profiles",
      component: () => import("../users/coach/coach-profile/pages/coach-profile.component.vue"),
    }
  ]
})

export default router
