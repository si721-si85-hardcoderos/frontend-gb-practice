import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "advisoryes"
    },
    {
      path: "/profiles",
      name: "profiles",
      component: () => import("../users/coach/coach-profile/pages/coach-profile.component.vue"),
    },
    {
      path: "/advisoryes",
      name: "advisoryes",
      component: () => import("../users/coach/coach-advisory/pages/coach-advisory.component.vue")
    }
  ]
})

export default router
