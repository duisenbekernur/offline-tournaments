<template>
    <div class="w-[95%] mx-auto p-8 bg-gray-800 flex gap-8">
        <div class="w-full relative flex gap-8">
            <div class="flex flex-col w-1/2">
                <h1 class="font-bold text-5xl mb-4">Предполагаемые затраты</h1>
                <hr class="w-full" />
                <table class="expenses-table">
                    <thead>
                        <tr class="text-gray-400 font-bold">
                            <th>Название</th>
                            <th>Колличество</th>
                            <th>Цена за штуку</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-2xl" v-for="item in contest.contestExpenses" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.price }}₸</td>
                        </tr>
                    </tbody>
                </table>
                <hr class="w-full my-2" />
                <p class="text-3xl">
                    Общяя цена турнира -
                    <span class="text-lime-300 font-bold">{{ total_price }}₸</span>
                </p>
            </div>

            <div class="flex flex-col mx-auto w-1/3" v-if="locations">
                <h1 class="font-bold text-5xl mb-4">Местоположение</h1>
                <Map
                    :permission="'get'"
                    :latitude="locations.latitude"
                    :longitude="locations.longitude"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Map from "../../../components/Map.vue";
import { axiosInstance } from "../../../api/client.js";

export default {
    name: "contest-info",
    components: { Map },
    data() {
        return {
            loadingContest: false,
            contest: {},
            total_price: null,
            locations: null,
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
                        this.contest = res.data.contest1;
                        this.locations = res.data.contest1.locations[0];
                        this.total_price = res.data.totalPrice[0].totalExpense;
                    }
                });

            this.loadingContest = false;
        },
    },
};
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 60%;
}

.expenses-table {
    width: 100%;
}

table th,
table td {
    padding: 8px;
    text-align: left;
}

table th {
    /*background-color: #f2f2f2;*/
    font-weight: bold;
}

table tr:hover {
    /*background-color: #e6e6e6;*/
}

table td:first-child,
table th:first-child {
    padding-left: 0;
}

table td:last-child,
table th:last-child {
    padding-right: 0;
}
</style>
