<template>
    <div class="w-[95%] mx-auto p-8 bg-gray-800 flex gap-8">
        <div class="w-full relative flex gap-8">
            <div class="flex flex-col w-full">
                <h1 class="font-bold text-5xl mb-4">Участники</h1>

                <div class="flex flex-wrap gap-4">
                    <div
                        class="w-1/3 flex flex-wrap gap-4 items-center rounded-lg border-2 p-4"
                        v-for="p in participants"
                    >
                        <el-avatar
                            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        />
                        <div class="">
                            <h1 class="text-xl">
                                {{ p.fullname }}
                            </h1>
                            <p class="text-gray-400">
                                {{
                                    new Date(p.createdAt).toLocaleDateString() +
                                    " - " +
                                    new Date(p.createdAt).toLocaleTimeString()
                                }}
                            </p>
                        </div>
                        <div class="ml-auto">
                            <p class="text-xl text-lime-500">{{ p.description }}</p>
                        </div>
                    </div>

                    <p v-if="participants.length === 0" class="mx-auto text-3xl">Нет данных</p>
                </div>

                <hr class="w-full my-4" />

                <h1 class="font-bold text-5xl mb-4">Приглашенные</h1>

                <div class="flex flex-wrap gap-4">
                    <div
                        class="w-full flex bg-slate-700 flex-wrap gap-4 items-center rounded-lg border-2 p-4"
                        v-for="team in teams"
                    >
                        <p class="text-xl">
                            Название команды:
                            <span class="text-lime-400 uppercase text-2xl">{{ team.name }}</span>
                        </p>

                        <el-table
                            :data="formattedInvitedUsers(team.invited_users)"
                            style="width: 100%"
                        >
                            <el-table-column prop="name" label="Игрок" width="" />
<!--                            <el-table-column prop="email" label="Почта" width="" />-->
                            <el-table-column prop="createdAt" label="Дата" />
                        </el-table>
                    </div>

                    <p v-if="teams.length === 0" class="mx-auto text-3xl">Нет данных</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { axiosInstance } from "../../../api/client.js";
import Map from "../../../components/Map.vue";

export default {
    name: "contest-participants",
    components: { Map },
    data() {
        return {
            participants: [],
            teams: [],
        };
    },
    async created() {
        await this.getContest();
    },
    methods: {
        async getContest() {
            this.loadingContest = true;

            await axiosInstance
                .get("/contest/getContest", {
                    params: { key: this.$route.params.contest_id },
                })
                .then(res => {
                    if (res.data.success) {
                        this.participants = res.data.contest1.participants;
                        this.teams = res.data.contest1.teams;
                    }
                });

            this.loadingContest = false;
        },
        formattedInvitedUsers(users) {
            return users.map(item => ({
                ...item,
                createdAt: new Date(item.createdAt).toLocaleDateString("en-US"), // Format date as a string
            }));
        },
    },
};
</script>

<style scoped></style>
