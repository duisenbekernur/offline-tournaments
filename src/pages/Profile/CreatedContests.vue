<template>
    <div class="w-full">
        <div v-loading="loadingContests" class="wrapper flex flex-wrap gap-8 px-20 py-10">
            <contest-card
                v-for="contest in contests"
                :contest="contest"
                :category="category"
            ></contest-card>
            <p v-if="contests.length === 0 && !loadingContests" class="text-center text-3xl">Нет данных</p>
        </div>
    </div>
</template>

<script>
import ContestCard from "../../components/ContestCard.vue";
import { axiosInstance } from "../../api/client.js";

export default {
    name: "CreatedContests",
    components: { ContestCard },
    data() {
        return {
            loadingContests: false,
            contests: [],
        };
    },
    computed: {
        user() {
            return this.$store.getters["user/getUser"];
        },
        category() {
            return this.$store.getters["category/getCategoryBySlug"]("football");
        },
    },
    async created() {
        await this.getContests();
    },
    methods: {
        async getContests() {
            this.loadingContests = true;

            await axiosInstance
                .get("/contest/getContest", { params: { organizerId: this.user.id } })
                .then(res => {
                    if (res.data.success) {
                        this.contests = res.data.contests;
                    }
                });

            this.loadingContests = false;
        },
    },
};
</script>

<style scoped></style>
