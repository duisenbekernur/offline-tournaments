<template>
    <div class="w-full">
        <div class="wrapper" v-loading="loadingContest" v-if="contest">
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

            <div class="mt-8 relative w-[95%] mx-auto p-8 bg-gray-800 flex gap-8">
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

                    <div v-loading="loadingPayment">
                        <div
                            v-if="user.id === contest.organizerId"
                            class="absolute bottom-0 flex gap-2"
                        >
                            <div class="px-2 py-1 rounded-lg bg-lime-500">
                                <p class="text-xl">Вы создатель этого турнира</p>
                            </div>
                            <el-button
                                v-loading="loadingDelete"
                                @click="deleteContest"
                                type="danger"
                                size="large"
                                >Отменить турнир</el-button
                            >
                        </div>
                        <div
                            class="absolute bottom-0"
                            v-else-if="paymentStatus === 'NOT REGISTERED'"
                        >
                            <el-button
                                v-loading="loadingSubmit"
                                type="success"
                                size="large"
                                @click="submit"
                                >Участвовать</el-button
                            >
                        </div>
                        <div
                            v-else-if="paymentStatus === 'waiting_for_capture'"
                            class="absolute bottom-0 flex gap-2"
                        >
                            <div class="cursor-pointer px-2 py-1 rounded-lg bg-lime-500">
                                <p class="text-xl">Вы уже участник турнира</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="contest.organizerId === user.id && contest.visibility === 'public'"
                    @click="imageModalVisible = true"
                    v-html="contest.qrCode"
                    class="w-80"
                ></div>
            </div>

            <el-tabs
                v-model="activeTabName"
                tab-position="top"
                type="border-card"
                class="tabs mt-10"
            >
                <el-tab-pane
                    class="tab"
                    :label="item.label"
                    :name="item.name"
                    v-for="item in tabs"
                ></el-tab-pane>
                <router-view></router-view>
            </el-tabs>
        </div>

        <el-dialog v-model="imageModalVisible">
            <div v-html="contest.qrCode" class="w-3/4 mx-auto"></div>
        </el-dialog>
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
            imageModalVisible: false,
            paymentStatus: "NOT REGISTERED",
            loadingDelete: false,
            loadingPayment: false,
            loadingSubmit: false,
            loadingContest: false,
            contest: null,
            total_price: null,
            payment_url: null,
            activeTabName: "contest_info",
            tabs: [
                {
                    name: "contest_info",
                    label: "Информация",
                },
                {
                    name: "contest_participants",
                    label: "Участники",
                },
                {
                    name: "contest_chat",
                    label: "Чат",
                },
            ],
        };
    },
    computed: {
        user() {
            return this.$store.getters["user/getUser"];
        },
    },
    watch: {
        activeTabName(newVal) {
            this.$router.push({ name: newVal });
        },
    },
    async created() {
        await this.getContest();
        await this.checkPayment();
    },
    methods: {
        async checkPayment() {
            this.loadingPayment = true;
            await axiosInstance
                .post("/contest/paymentDetails", {
                    contestId: this.contest.id,
                    userId: this.user.id,
                })
                .then(res => {
                    if (res.data.success) {
                        this.paymentStatus = res.data.payment.status;
                    }
                });

            this.loadingPayment = false;
        },
        async getContest() {
            this.loadingContest = true;
            this.loadingPayment = true;

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
            this.loadingPayment = false;
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
                    userId: this.user.id,
                    contestId: this.contest.id,
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
        async deleteContest() {
            this.loadingDelete = true;
            await axiosInstance
                .post("/contest/deleteContest", { contestId: this.contest.id })
                .then(res => {
                    if (res.data.success) {
                        notification("Успешно удалено", "success");
                        this.$router.push({ name: "main" });
                    }
                });
            this.loadingDelete = false;
        },
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

.tabs {
    background-color: #1e293b;
    border: 1px solid #3f3f46;
}
.tab {
    background-color: blue;
}
</style>
