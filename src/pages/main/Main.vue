<template>
    <div class="w-full">
        <div class="wrapper w-full px-28">
            <div class="mt-16">
                <div class="flex gap-4">
                    <div class="w-1 bg-lime-400 h-content"></div>
                    <div>
                        <h1 class="font-bold">ТУРНИРЫ ПО КАТЕГОРИЯМ</h1>
                        <p class="text-gray-400 text-xl">
                            выберите категорию турнира в котором хотите поучаствовать
                        </p>
                    </div>
                </div>

                <div v-loading="loadingCategories" class="mt-10 flex flex-wrap gap-4">
                    <category-card
                        v-for="(category, index) in categories"
                        :key="index"
                        :title="category.title"
                        :slug="category.slug"
                        :img-url="category.imgUrl"
                    ></category-card>
                    <p v-if="categories.length === 0" class="text-3xl">Нет данных</p>
                </div>
            </div>

            <div class="mt-20 w-full">
                <div class="flex gap-4">
                    <div class="w-1 bg-lime-400 h-content"></div>
                    <div>
                        <h1 class="font-bold">ВСЕ ТУРНИРЫ</h1>
                        <p class="text-gray-400 text-xl">
                            выберите турнир в котором хотите поучаствовать
                        </p>
                    </div>
                </div>

                <div v-loading="loadingContests" class="mt-10 flex flex-wrap gap-4 w-full">
                    <contest-card
                        v-for="contest in contests"
                        :contest="contest"
                        :category="categories.find(c => c.id === contest.categoryId)"
                    ></contest-card>
                    <p v-if="contests.length === 0" class="text-3xl">Нет данных</p>
                </div>
            </div>

            <footer class="h-40"></footer>
        </div>
    </div>
</template>

<script>
import CategoryCard from "./components/CategoryCard.vue";
import ContestCard from "../../components/ContestCard.vue";
import { axiosInstance } from "../../api/client.js";

export default {
    name: "Main",
    components: { ContestCard, CategoryCard },
    data() {
        return {
            loadingCategories: false,
            loadingContests: false,
            categories: [],
            contests: [],
        };
    },
    async created() {
        await this.getCategories();
        await this.getContests();
    },
    methods: {
        async getCategories() {
            this.loadingCategories = true;

            await axiosInstance.get("/category/getAll").then(res => {
                if (res.data.success) {
                    this.categories = res.data.categories;
                }
            });

            this.loadingCategories = false;
        },
        async getContests() {
            this.loadingContests = true;

            await axiosInstance.get("/contest/getContest").then(res => {
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
