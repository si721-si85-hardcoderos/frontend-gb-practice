import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "general-log-in"
    },
    {
      path: '/general-log-in',
      name: 'general-log-in',
      component: () => import("../public/login/pages/login.component.vue")
    },
    {
      path: "/coach-profile",
      name: "coach-profile",
      component: () => import("../users/coach/coach-profile/pages/coach-profile.component.vue"),
    },
    {
      path: "/coach-advisories",
      name: "coach-advisories",
      component: () => import("../users/coach/coach-advisory/pages/coach-advisory.component.vue")
    },
    {
      path: "/coach-students",
      name: "coach-students",
      component: () => import("../users/coach/coach-students/pages/coach-students.component.vue")
    },
    {
      path: "/coach-tournaments",
      name: "coach-tournaments",
      component: () => import("../users/coach/coach-tournament/pages/coach-tournaments.component.vue")
    },
    {
      path: '/coach-home',
      name: 'coach-home',
      component: () => import("../users/coach/coach-home/pages/coach-home.component.vue")
    },
    {path: '/coach-events',
      name: 'coach-events',
      component: () => import("../users/coach/coach-event/pages/coach-event.component.vue")
    },
    {
      path: '/coach-log-in',
      name: 'coach-login',
      component: () => import("../users/coach/coach-log-in/pages/log-in.vue")
    },
    {
      path: '/coach-sign-up',
      name: 'coach-signup',
      component: () => import("../users/coach/coach-sign-up/pages/sign-up.vue")
    },
    {
      path: "/cyber-log-in",
      name: "cyber-log-in",
      component:()=>import("../users/cyber/cyber-log-in/pages/log-in.component.vue")
    },
    {
      path: "/cyber-sign-up",
      name: "cyber-sign-up",
      component:()=>import("../users/cyber/cyber-sign-up/pages/sign-up.component.vue")
    },
    {
      path: "/cyber-events",
      name: "cyber-events",
      component:()=>import("../users/cyber/cyber-event/pages/cyber-event.component.vue")
    },

    {
      path: "/cyber-profile",
      name: "cyber-profile",
      component: () => import("../users/cyber/cyber-profile/pages/cyber-profile.component.vue"),
    },
    {
      path: "/cyber-tournaments",
      name: "cyber-tournaments",
      component:()=>import("../users/cyber/cyber-tournament/pages/cyber-tournament.vue")
    },
    {
      path: "/student-coaches",
      name: "student-coaches",
      component:()=>import("../users/student/student-coaches/pages/student-coaches.component.vue")
    },
    {
      path: "/student-selected-coaches",
      name: "student-selected-coaches",
      component:()=>import("../users/student/student-selected-coaches/views/student-selected-coaches.component.vue")
    },
    {
      path: "/student-home",
      name: "student-home",
      component: () => import("../users/student/student-home/pages/student-home.component.vue")
    },
    {
      path: "/student-profile",
      name: "student-profile",
      component: () => import("../users/student/student-profile/pages/student-profile.component.vue")
    },
    {
      path: "/student-log-in",
      name: "student-log-in",
      component:()=>import("../users/student/student-log-in/pages/log-in.component.vue")
    },
    {
      path: "/student-sign-up",
      name: "student-sign-up",
      component:()=>import("../users/student/student-sign-up/pages/sign-up.component.vue")
    }
  ]
})

export default router
