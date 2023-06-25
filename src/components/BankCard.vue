<script lang="ts">
export default {
    name: "BankCard",
    props: {},
    data() {
        return {
            showCsv: false,
            billingDetails: {
                card_name: null,
                card_number: null,
            }
        };
    },
    methods: {},
};
</script>

<template>
    <div
        class="w-96 m-0 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transform hover:scale-105 transition-all"
    >
        <img class="relative object-cover w-full h-full rounded-xl" src="../assets/bank-card.png" />

        <div class="w-full px-8 absolute top-8">
            <div class="flex justify-between">
                <div class="">
                    <p class="font-light">ИМЯ И ФАМИЛИЯ</p>
                    <!--                    <p class="font-medium tracking-widest">{{ card.name }}</p>-->
                    <el-input size="small" />
                </div>
                <img class="w-14 h-14" src="../assets/master-card.png" />
            </div>
            <div class="flex justify-between">
                <div>
                    <p class="font-light m-0">НОМЕР КАРТЫ</p>
                    <!--                    <p class="font-medium tracking-more-wider">{{ card.number }}</p>-->
                    <el-input size="small"></el-input>
                </div>
            </div>
            <div class="pt-2 pr-6">
                <div class="flex justify-between">
                    <div class="w-14">
                        <p class="font-light text-xs">Valid</p>
                        <el-input size="small" class="w-20"></el-input>
                        <!--                        <p class="font-medium tracking-wider text-sm">{{ card.valid }}</p>-->
                    </div>
                    <div class="w-14">
                        <p class="font-light text-xs">Expiry</p>
                        <el-input size="small" class="w-20"></el-input>
                        <!--                        <p class="font-medium tracking-wider text-sm">{{ card.expiry }}</p>-->
                    </div>

                    <div class="w-14">
                        <p class="font-light text-xs">CVV</p>
                        <p
                            class="font-bold tracking-more-wider text-sm cursor-pointer"
                            @click="showCsv = !showCsv"
                        >
                            <el-input size="small" class="w-20"></el-input>
                            <!--                            {{ showCsv ? card.csv : "···" }}-->
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <img
            src="../assets/delete.png"
            alt="delete"
            class="absolute right-3 top-3 w-7 cursor-pointer hover:scale-110"
        />
    </div>
</template>
