<template>
    <div v-loading="loadingData" class="w-96 min-h-20 px-20 text-black">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 33
        " shape-rendering="crispEdges">
            <path fill="#ffffff" d="M0 0h33v33H0z
        "/>
            <path stroke="#000000" d="M4 4.5h7m1 0h2m1 0h3m4 0h7M4 5.5h1m5 0h1m1 0h2m2 0h2m1 0h1m2 0h1m5 0h1M4 6.5h1m1
              0h3m1 0h1m1 0h1m3 0h1m1 0h3m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m5 0h1m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1M4
              8.5h1m1 0h3m1 0h1m2 0h2m2 0h2m3 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m1 0h1m1 0h1m5 0h1m5 0h1M4 10.5h7m1
              0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h8M6 12.5h3m1 0h1m1 0h1m5 0h1m2 0h3m2 0h3M6 13.5h3m3 0h2m2 0h2m1
              0h2m2 0h1m2 0h1M4 14.5h1m4 0h4m1 0h3m1 0h1m3 0h7M7 15.5h3m1 0h1m1 0h2m4 0h1m4 0h2m1 0h2M5 16.5h1m2 0h4m2
              0h2m3 0h4m1 0h5M4 17.5h2m1 0h1m1 0h1m1 0h2m6 0h1m3 0h1m1 0h1M4 18.5h1m2 0h4m1 0h1m1 0h1m1 0h1m1 0h3m1
              0h2m1 0h1m1 0h2M4 19.5h1m7 0h1m3 0h2m1 0h1m1 0h2m4 0h1M4 20.5h1m1 0h3m1 0h3m1 0h3m2 0h8m1 0h1M12 21.5h2m1
              0h2m2 0h2m3 0h2m1 0h1M4 22.5h7m4 0h1m3 0h2m1 0h1m1 0h1m1 0h3M4 23.5h1m5 0h1m6 0h2m1 0h1m3 0h1m3 0h1M4
              24.5h1m1 0h3m1 0h1m1 0h2m6 0h8M4 25.5h1m1 0h3m1 0h1m1 0h2m1 0h1m1 0h1m1 0h4m1 0h1m1 0h1m1 0h1M4 26.5h1m1
              0h3m1 0h1m1 0h1m1 0h2m4 0h2m1 0h1m2 0h1m1 0h1M4 27.5h1m5 0h1m2 0h7m2 0h1m5 0h1M4 28.5h7m4 0h3m1 0h1m1
              0h1m1 0h1m2 0h3
        "/>
        </svg>
    </div>
</template>

<script>
import {axiosInstance} from "../../api/client.js";

export default {
    name: "ProfileParticipatedContests",
    data() {
        return {
            loadingData: false,
        }
    },
    async created() {
        await this.getUserContests()
    },
    methods: {
        async getUserContests() {

            // this.loadingData = true;
            //
            // await axiosInstance.get('/contests/')
            //
            // this.loadingData = false;
        }
    }
}
</script>

<style scoped>

</style>