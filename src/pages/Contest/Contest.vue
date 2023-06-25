<template>
    <div class="w-full">
        <div class="wrapper" v-loading="loadingContest">
            <div class="intro-image relative">
                <img
                    class="w-full h-[300px] object-cover opacity-40"
                    src="https://cdn5.idcgames.com/storage/image/1250/game_home_bg_section_2/default.jpg"
                />
                <div
                    class="absolute -bottom-4 left-0 right-0 w-[80%] text-center mx-auto p-4 bg-lime-400 rounded-lg"
                >
                    <h1 class="text-black text-xl font-bold">
                        <p>
                            {{
                                contest.visibility === "public"
                                    ? "ПУБЛИЧНЫЙ ТУРНИР"
                                    : "ПРИВАТНЫЙ ТУРНИР"
                            }}
                        </p>
                        <span class="text-gray-700 font-bold"
                            >Участвуй, побеждай, выйгрывай призы!</span
                        >
                    </h1>
                </div>
            </div>

            <div class="mt-8 w-[95%] mx-auto p-8 bg-gray-800 flex gap-8">
                <div class="w-[250px] h-[250px]">
                    <img
                        class="w-[250px] h-[250px] object-cover"
                        src="https://i.pinimg.com/originals/e8/ed/a6/e8eda62f981e1c8e77c84b4350852245.jpg"
                    />
                </div>
                <div class="w-full relative">
                    <h1 class="font-bold text-5xl mb-4">{{ contest.name }}</h1>
                    <p class="text-gray-400">
                        {{
                            contest.locations[0].country +
                            ", " +
                            contest.locations[0].city +
                            ", " +
                            contest.locations[0].address
                        }}
                    </p>
                    <hr class="w-full mb-4" />
                    <table>
                        <thead>
                            <tr class="text-gray-400 font-bold">
                                <th>СТАТУС</th>
                                <th>УЧАСТИЕ</th>
                                <th>ВЗНОС</th>
                                <th>ДАТА</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-2xl">
                                <td>{{ contest.status.toUpperCase() }}</td>
                                <td>{{ contest.contestInfos[0].participation.toUpperCase() }}</td>
                                <td>{{ contest.contestInfos[0].fee }}₸</td>
                                <td>
                                    {{
                                        new Date(contest.startDate).toLocaleDateString() +
                                        " - " +
                                        new Date(contest.startDate)
                                            .toLocaleTimeString()
                                            .substring(0, 5)
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div
                        v-if="user.id === contest.organizerId"
                        class="absolute bottom-0 flex gap-2"
                    >
                        <div class="cursor-pointer px-2 py-1 rounded-lg bg-lime-500">
                            <p class="text-xl">Вы создатель этого турнира</p>
                        </div>
                        <el-button @click="deleteContest" type="danger" size="large"
                            >Отменить турнир</el-button
                        >
                    </div>
                    <div class="absolute bottom-0" v-else>
                        <el-button
                            v-loading="loadingSubmit"
                            type="success"
                            size="large"
                            @click="submit"
                            >Участвовать</el-button
                        >
                    </div>
                </div>
            </div>

            <div class="mt-8 w-[95%] mx-auto p-8 bg-gray-800 flex gap-8">
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
                                <tr
                                    class="text-2xl"
                                    v-for="item in contest.contestExpenses"
                                    :key="item.id"
                                >
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

                    <div class="flex flex-col mx-auto w-1/3">
                        <h1 class="font-bold text-5xl mb-4">Местоположение</h1>
                        <Map
                            :permission="'get'"
                            :latitude="contest.locations[0].latitude"
                            :longitude="contest.locations[0].longitude"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { axiosInstance } from "../../api/client.js";
import Map from "../../components/Map.vue";
import { notification } from "../../utils/helpers.js";
import axios from "axios";

export default {
    name: "Contest",
    components: { Map },
    data() {
        return {
            loadingSubmit: false,
            loadingContest: false,
            contest: {},
            total_price: null,
            payment_url: null,
        };
    },
    computed: {
        user() {
            return this.$store.getters["user/getUser"];
        },
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
                        this.total_price = res.data.totalPrice[0].totalExpense;
                    }
                });

            this.loadingContest = false;
        },
        async submit() {
            this.loadingSubmit = true;

            if (+localStorage.getItem("userId") < 1) {
                notification("Зайдите в аккаунт чтобы стать участником");
                return this.$router.push({ name: "login" });
            }
            const rate = await this.rubRate();
            const value = rate * this.contest.contestInfos[0].fee;
            console.log("here", this.rubRate(), this.contest.contestInfos[0].fee);

            await axiosInstance
                .post("/contest/payment", {
                    value,
                })
                .then(res => {
                    console.log(res.data);
                    if (res.data.makePaymentResult) {
                        this.payment_url = res.data.makePaymentResult.confirmation.confirmation_url;
                        window.open(this.payment_url, "_blank");
                    }
                });

            this.loadingSubmit = false;
        },
        async deleteContest() {},
        async rubRate() {
            const API_KEY = "7ccdc9fb798a1be907efa338";

            const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/KZT`;
            let rate = null;

            await axios
                .get(apiUrl)
                .then(response => {
                    const rates = response.data.conversion_rates;
                    rate = rates.RUB;
                })
                .catch(error => {
                    console.log("Error:", error.message);
                    throw error;
                });
            console.log("here", rate);
            return rate;
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
