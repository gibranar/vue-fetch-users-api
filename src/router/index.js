import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import EditUserPage from "../pages/EditUserPage.vue";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard/user/:id",
    name: "User",
    component: EditUserPage,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return next({ name: "Login" });
      }

      const response = await axios.get("http://127.0.0.1:8000/api/users", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        return next();
      } else {
        return next({ name: "Login" });
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      next({ name: "Login" });
    }
  } else {
    next();
  }
});

export default router;
