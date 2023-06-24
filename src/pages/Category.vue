<template>
  <div class="w-full">
    <div class="intro-image relative">
      <img class="w-full h-[300px] object-cover opacity-40" :src="category.imgUrl" />
      <div
        class="absolute -bottom-10 left-0 right-0 w-[80%] text-center mx-auto p-4 bg-lime-900 rounded-lg"
      >
        <h1>
          ОТКРЫТЫЕ ТУРНИРЫ ПО КАТЕГОРИИ
          <span class="font-bold">{{ category.title.toUpperCase() }}</span>
        </h1>
      </div>
    </div>
    <div
      v-loading="loadingContests"
      class="w-full px-16 justify-between mt-16 flex flex-wrap gap-4 w-full"
    >
      <contest-card
        v-for="contest in contests"
        :contest="contest"
        :category="category"
      ></contest-card>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from "../api/client.js";
import ContestCard from "../components/ContestCard.vue";

export default {
  name: "Category",
  components: { ContestCard },
  data() {
    return {
      loadingContests: false,
      contests: [],
    };
  },
  computed: {
    slug() {
      return this.$route.params.category_name;
    },
    category() {
      return this.$store.getters["category/getCategoryBySlug"](this.slug);
    },
  },
  async created() {
    await this.getContests();
  },
  methods: {
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

<style scoped>
.intro-image {
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
}
</style>
