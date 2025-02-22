import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

// const Login = () => import('@/pages/Login.vue')
const Login = () => import('@/pages/LoginPage.vue')
const Overview = () => import('@/pages/Overview.vue')
const Students = () => import('@/pages/Students.vue')
const Teachers = () => import('@/pages/Teachers.vue')
const Classes = () => import('@/pages/Classes.vue')
const AssignStudents = () => import('@/pages/AssignStudents.vue')
const AssignTeachers = () => import('@/pages/AssignTeachers.vue')
const MainLayout = () => import('@/layouts/MainLayout.vue')

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  {
    path: "/",
    component: MainLayout, // ✅ Wraps protected routes inside MainLayout
    meta: { requiresAuth: true },
    children: [
      { path: "overview", component: Overview },
      { path: "students", component: Students },
      { path: "teachers", component: Teachers },
      { path: "classes", component: Classes },
      { path: "assign-students", component: AssignStudents },
      { path: "assign-teachers", component: AssignTeachers },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
