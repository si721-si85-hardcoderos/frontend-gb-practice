import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "advisories"
    },
    {
      path: "/profiles",
      name: "profiles",
      component: () => import("../users/coach/coach-profile/pages/coach-profile.component.vue"),
    },
    {
      path: "/advisories",
      name: "advisories",
      component: () => import("../users/coach/coach-advisory/pages/coach-advisory.component.vue")
    }
  ]
})

export default router
