<template>
  <div class="w-[47%]">
    <div class="relative flex px-4 w-full justify-between bg-slate-600 h-[150px]">
      <div class="flex items-center gap-4 text-white">
        <div class="w-[120px] h-[120px]">
          <img class="object-cover w-[120px] h-[120px]" :src="category.imgUrl" />
        </div>

        <div class="text-left">
          <h1 class="text-3xl">{{ contest.name }}</h1>
          <p class="text-gray-400">
            {{
              new Date(contest.startDate).toLocaleDateString() +
              " " +
              new Date(contest.startDate).toLocaleTimeString()
            }}
          </p>
          <p>ПРИЗ - {{ contest.prize.toUpperCase() }}</p>
          <div class="flex gap-2 items-center font-bold text-rose-500">
            <p>{{ contest.status.toUpperCase() }}</p>
            <p>|</p>
            <p>{{ contest.visibility.toUpperCase() }}</p>
          </div>
        </div>
      </div>

      <router-link :to="{ name: 'contest_page', params: { contest_id: contest.key } }">
        <div
          class="text-black text-center absolute bottom-4 rounded-lg px-4 py-1 bg-lime-300 right-4"
        >
          Посмотреть турнир
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContestCard",
  props: {
    contest: Object,
    category: Object,
  },
  created() {
    console.log("from", this.contest, this.category);
  },
};
</script>

<style scoped></style>
