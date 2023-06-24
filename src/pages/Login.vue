<template>
    <div class="flex mt-40 w-full">
        <el-form
            class="form bg-gray-600 mx-auto p-8 rounded-lg text-white w-1/3"
            label-position="top"
            label-width="100px"
            :model="form"
            :rules="rules"
        >
            <h1 class="text-3xl mb-2 font-bold text-lime-400">Войти</h1>
            <el-form-item color="white">
                <template v-slot:label>
                    <span style="color: white">E-mail</span>
                </template>
                <el-input v-model="form.email" placeholder="e-mail" size="large" clearable />
            </el-form-item>
            <el-form-item class="relative">
                <template v-slot:label>
                    <span style="color: white">Пароль</span>
                </template>
                <el-input
                    :type="passwordType"
                    v-model="form.password"
                    placeholder="пароль"
                    size="large"
                />

                <i
                    v-if="passwordType === 'password'"
                    class="absolute right-4 cursor-pointer"
                    @click="changePasswordType"
                >
                    <svg
                        fill="#000000"
                        width="20px"
                        height="20px"
                        viewBox="0 -16 544 544"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>show</title>
                        <path
                            d="M272 400Q205 400 151 361 96 322 64 256 96 190 151 151 205 112 272 112 336 112 392 153 448 193 480 256 448 319 392 360 336 400 272 400ZM272 352Q312 352 340 324 368 296 368 256 368 216 340 188 312 160 272 160 232 160 204 188 176 216 176 256 176 296 204 324 232 352 272 352ZM272 312Q249 312 233 296 216 279 216 256 216 233 233 217 249 200 272 200 295 200 312 217 328 233 328 256 328 279 312 296 295 312 272 312Z"
                        />
                    </svg>
                </i>
                <i v-else class="absolute right-4 cursor-pointer" @click="changePasswordType">
                    <svg
                        fill="#000000"
                        width="20px"
                        height="20px"
                        viewBox="0 -16 544 544"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>hide</title>
                        <path
                            d="M108 60L468 420 436 452 362 378Q321 400 272 400 208 400 154 361 99 322 64 256 79 229 102 202 124 174 144 160L76 92 108 60ZM368 256Q368 216 340 188 312 160 272 160L229 117Q254 112 272 112 337 112 392 152 446 192 480 256 474 269 461 288 448 307 434 322L368 256ZM272 352Q299 352 322 338L293 309Q283 312 272 312 249 312 233 296 216 279 216 256 216 247 220 236L190 206Q176 229 176 256 176 296 204 324 232 352 272 352Z"
                        />
                    </svg>
                </i>
            </el-form-item>

            <div class="flex items-center justify-between">
                <el-button
                    v-loading="loading"
                    class="mt-2"
                    type="success"
                    size="large"
                    @click="login"
                    >Войти</el-button
                >

                <div class="flex gap-2">
                    <p>Нету аккаунта?</p>
                    <router-link
                        :to="{ name: 'register' }"
                        class="text-lime-400 hover:text-lime-200 underline"
                    >
                        Регистрация
                    </router-link>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import { axiosInstance } from "../api/client.js";
import { notification } from "../utils/helpers.js";

export default {
    name: "Login",
    data() {
        return {
            loading: false,
            passwordType: "password",
            form: {
                email: null,
                password: null,
            },
            rules: [],
        };
    },
    methods: {
        changePasswordType() {
            this.passwordType = this.passwordType === "password" ? "text" : "password";
        },
        async login() {
            this.loading = true;

            await axiosInstance.post("/auth/login", { ...this.form }).then(res => {
                console.log(res.data);
                if (res.data.user && res.data.user.id) {
                    localStorage.setItem("userId", res.data.user.id);
                    localStorage.setItem("accessToken", res.data.accessToken);
                    localStorage.setItem("refreshToken", res.data.refreshToken);
                    this.$store.commit("user/setId", { id: res.data.user.id });
                    notification("Успешно", "success");
                    this.$router.push({ name: "main" });
                }
            });

            this.loading = false;
        },
    },
};
</script>

<style scoped>
.custom-label {
    color: white;
}
</style>
