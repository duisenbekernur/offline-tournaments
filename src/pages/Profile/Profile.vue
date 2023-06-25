<template>
    <div v-loading="loadingData" class="w-full">
        <div class="relative">
            <img
                class="w-full h-[300px] object-cover opacity-40"
                src="https://www.shutterstock.com/image-photo/closeup-various-sport-equipments-on-260nw-1026630478.jpg"
            />
            <img
                v-if="user"
                class="absolute -bottom-10 left-0 right-0 mx-auto rounded-full w-[200px] object-cover"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <img
                v-else
                class="absolute -bottom-10 left-0 right-0 mx-auto rounded-full w-[200px] object-cover w-[200px] text-white"
                src="../../assets/sad.svg"
            />
        </div>
        <div class="text-center mt-16 text-2xl font-bold flex justify-between px-10" v-if="user">
            <div>
                <p>{{ user.email }}</p>
            </div>
            <div class="">
                <h3>{{ user.firstname + " " + user.lastname }}</h3>
            </div>
            <div>
                <el-button
                    type="danger"
                    class="ml-auto font-bold text-white text-xl px-4"
                    @click.prevent="logout"
                >
                    Выйти
                </el-button>
            </div>
        </div>

        <div v-if="user">
            <el-tabs v-model="activeTabName" type="border-card" class="mt-10">
                <el-tab-pane
                    :label="item.label"
                    :name="item.name"
                    v-for="item in tabs"
                ></el-tab-pane>
                <router-view></router-view>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { axiosInstance } from "../../api/client.js";
import { notification } from "../../utils/helpers.js";

export default {
    name: "Profile",
    data() {
        return {
            loadingData: false,
            user: null,
            activeTabName: "profile_participated_contests",
            tabs: [
                {
                    name: "profile_participated_contests",
                    label: "Турниры в котором участвуете",
                },
                {
                    name: "profile_history",
                    label: "История",
                },
                // {
                //     name: "profile_favorites",
                //     label: "Избранные турниры",
                // },
                {
                    name: "profile_invited",
                    label: "Приглашения",
                },
            ],
        };
    },
    watch: {
        activeTabName(newVal) {
            this.$router.push({ name: newVal });
        },
    },
    async created() {
        let active = this.tabs.find(t => t.name === this.$route.name);
        if (active) {
            this.activeTabName = active.name;
        } else {
            this.activeTabName = "profile_participated_contests";
        }

        await this.getUser();
    },
    methods: {
        async getUser() {
            this.loadingData = true;
            await axiosInstance.get(`/auth/getUser/${this.$route.params.user_id}`).then(res => {
                console.log(res.data);
                if (res.data.message === "Successfull") {
                    this.user = res.data.user;
                }
            });

            this.loadingData = false;
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
