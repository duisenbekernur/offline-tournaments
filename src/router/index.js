import { createRouter, createWebHashHistory } from "vue-router";
import { notification } from "../utils/helpers.js";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "main",
            component: () => import("../pages/main/Main.vue"),
        },
        {
            path: "/contests",
            name: "contests",
            component: () => import("../pages/Contest/Contests.vue"),
        },
        {
            path: "/contests/:contest_id",
            name: "contest_page",
            component: () => import("../pages/Contest/Contest.vue"),
        },
        {
            path: "/contests/create",
            name: "contest_create",
            component: () => import("../pages/Contest/Create.vue"),
        },
        {
            path: "/profile",
            name: "profile",
            redirect: { name: "profile_page", params: { user_id: localStorage.getItem("userId") } },
            children: [
                {
                    path: ":user_id",
                    name: "profile_page",
                    component: () => import("../pages/Profile/Profile.vue"),
                    redirect: { name: "profile_participated_contests" },
                    children: [
                        {
                            path: "participated",
                            name: "profile_participated_contests",
                            component: () => import("../pages/Profile/Contests.vue"),
                        },
                        {
                            path: "history",
                            name: "profile_history",
                            component: () => import("../pages/Profile/History.vue"),
                        },
                        {
                            path: "favorites",
                            name: "profile_favorites",
                            component: () => import("../pages/Profile/Favorites.vue"),
                        },
                        {
                            path: "invites",
                            name: "profile_invited",
                            component: () => import("../pages/Profile/Invited.vue"),
                        },
                    ],
                },
            ],
        },
        {
            path: "/auth",
            name: "auth",
            children: [
                {
                    path: "login",
                    name: "login",
                    component: () => import("../pages/Login.vue"),
                },
                {
                    path: "register",
                    name: "register",
                    component: () => import("../pages/Register.vue"),
                },
            ],
        },
        {
            path: "/category",
            name: "category",
            redirect: { name: "category_name" },
            children: [
                {
                    path: ":category_name",
                    name: "category_name",
                    component: () => import("../pages/Category.vue"),
                },
            ],
        },
    ],
});

router.beforeEach((to, from) => {
    const isAuthenticated = +localStorage.getItem("userId") > 0;

    if (isAuthenticated && (to.name === "login" || to.name === "register")) {
        notification(
            "Авторизованный пользователь не может перейти на страницу авторизации",
            "danger"
        );
        return { name: "main" };
    }

    if (!isAuthenticated && to.name === "contest_create") {
        notification("Авторизируйтесь чтобы создать турнир", "danger");
        return { name: "login" };
    }

    return true;
});

export default router;
