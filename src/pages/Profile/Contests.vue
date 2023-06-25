<template>
    <div v-loading="loadingData" class="w-96 min-h-20 px-20 text-black">

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