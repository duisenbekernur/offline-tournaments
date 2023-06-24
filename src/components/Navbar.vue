<template>
    <div class="w-full flex justify-between px-10 bg-[#545c64] sticky top-0 z-10">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#a3e635"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
            <el-menu-item :index="item.index" v-for="item in navLinks"
                >{{ item.title }}
            </el-menu-item>
            <div class="flex-grow" />
        </el-menu>

        <div v-if="!(user && +user.id >= 1)">
            <router-link :to="{ name: 'login' }">
                <button
                    :class="{ 'bg-gray-600': $route.name === 'login' }"
                    class="h-full text-lime-400 font-bold text-xl px-4 hover:opacity-80 hover:bg-gray-600 transition-all"
                >
                    Войти
                </button>
            </router-link>
            <router-link :to="{ name: 'register' }">
                <button class="h-full bg-lime-600 font-bold text-white text-xl px-4">
                    Регистрация
                </button>
            </router-link>
        </div>
        <div v-else class="flex">
            <router-link :to="{ name: 'profile' }">
                <button
                    :class="{ 'bg-gray-600': $route.name === 'main' }"
                    class="h-full text-lime-400 font-bold text-xl px-4 hover:opacity-80 hover:bg-gray-600 transition-all"
                >
                    <el-avatar
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                </button>
            </router-link>
            <router-link :to="{ name: 'contest_create' }">
                <button
                    class="h-full bg-lime-600 text-white font-bold text-xl px-4 hover:opacity-80 hover:bg-lime-400 transition-all"
                >
                    Создать турнир
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
import { notification } from "../utils/helpers.js";

export default {
    name: "Navbar",
    data() {
        return {
            activeIndex: 0,
            navLinks: [
                {
                    title: "Главная",
                    route_name: "main",
                    index: 0,
                },
                {
                    title: "Турниры",
                    route_name: "contests",
                    index: 1,
                },
            ],
        };
    },
    computed: {
        user() {
            return this.$store.getters["user/getUser"];
        },
    },
    created() {
        if (this.$route.name !== "main" && this.$route.name !== "contests") this.activeIndex = -1;
    },
    methods: {
        handleSelect(index) {
            this.$router.push({ name: this.navLinks[index].route_name });
        },
        logout() {
            localStorage.clear();
            this.$router.push({ name: "login" });
            // console.log(this.$store.commit)
            this.$store.commit("user/setId", { id: null });
            notification("Успешно вышли из аккаунта", "success");
        },
    },
};
</script>

<style scoped></style>
