<template>
    <router-link :to="{name: 'category_name', params: {category_name: slug}}">
        <div class="text-white bg-[#000] w-[300px] h-[300px] relative rounded-lg overflow-hidden hover:-translate-y-2	transition-all cursor-pointer">

            <img class=" w-[300px] h-[300px] object-cover" :src="imgUrl" />

            <div class="absolute bottom-0 w-full">
                <div class="w-full h-full p-4 bg-[#000] opacity-80">
                    <p>{{ title }}</p>
                </div>
            </div>

        </div>
    </router-link>
</template>

<script>
export default {
    name: "CategoryCard",
    props: {
        title: String,
        imgUrl: String,
        slug: String,
    }
}
</script>

<style scoped>

</style>