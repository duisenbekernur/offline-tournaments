<script>

import Navbar from "./components/Navbar.vue";

export default {
    components: {Navbar},
    created() {
        console.log(this.$route)
    }
}
</script>

<template>
    <div class="w-full flex flex-col relative overflow-y-auto h-full">
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>

<style scoped>
</style>
