import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import CreateBooksView from "../components/CreateBooksView.vue";
import UpdateBooksView from "../components/UpdateBooksView.vue";
import RegisterView from "../components/RegisterView.vue";
import LoginView from "../components/LoginView.vue";
import DashbordView from "../components/DashbordView.vue";
import NotFoundView from "../components/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/add",
      name: "create",
      component: CreateBooksView,
    },
    {
      path: "/update/:id",
      name: "update",
      component: UpdateBooksView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashbordView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

if (localStorage.getItem("username")) {
  document.isAuthenticated = true;
} else {
  document.isAuthenticated = false;
}

router.beforeEach((to, from, next) => {
  if (
    (to.path == "/dashboard" ||
      to.path == "/update/:id" ||
      to.path == "/add") &&
    document.isAuthenticated == false
  ) {
    next("/login");
  } else if (
    (to.path == "/login" || to.path == "/register") &&
    document.isAuthenticated == true
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
