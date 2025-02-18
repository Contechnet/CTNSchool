import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import Overview from "../pages/Overview.vue";
import Students from "../pages/Students.vue";
import Teachers from "../pages/Teachers.vue";
import Classes from "../pages/Classes.vue";
import AssignStudents from "../pages/AssignStudents.vue";
import AssignTeachers from "../pages/AssignTeachers.vue";
import { useAuthStore } from "../stores/authStore";
import MainLayout from "../layouts/MainLayout.vue";

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
  history: createWebHistory(),
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
