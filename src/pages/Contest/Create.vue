<template>
  <div
    class="container flex flex-col overflow-y-auto h-full w-full flex justify-center px-40 bg-white"
  >
    <div class="wrapper flex flex-col overflow-y-auto h-full w-full py-10 w-[65%] mr-auto">
      <h1 class="text-3xl mb-4">Создание турнира</h1>

      <el-form
        :model="form"
        class="flex flex-col overflow-y-auto h-full text-white bg-stone-700 rounded-lg p-4 w-full"
      >
        <div class="flex">
          <el-form-item class="form-item">
            <div class="text-xl">Выберите категорию турнира</div>
            <div class="ml-10">
              <el-select v-model="form.contestData.categoryId">
                <el-option
                  v-for="item in categories"
                  :label="item.title"
                  :value="item.id"
                  :key="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>

          <el-form-item class="form-item">
            <div class="text-xl">Видимость</div>
            <div class="ml-10">
              <el-select v-model="form.contestData.visibility" placeholder="видимость">
                <el-option
                  v-for="item in [{ title: 'public' }, { title: 'private' }]"
                  :value="item.title"
                  :key="item.title"
                  :label="item.title"
                />
              </el-select>
            </div>
          </el-form-item>
        </div>

        <hr class="mt-2" />

        <div class="flex">
          <div
            class="w-2/3"
            :class="{ 'w-3/5 border-r-2 pr-8': form.contestData.visibility === 'private' }"
            v-if="form.contestData.categoryId === 1 && form.contestData.visibility"
          >
            <h1 class="text-3xl text-green-600 font-bold mb-4">Общие настройки</h1>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Название турнира</div>
              <div class="w-full">
                <el-input placeholder="название" v-model="form.contestData.name" />
              </div>
            </el-form-item>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Приз</div>
              <div class="w-full">
                <el-input placeholder="приз" v-model="form.contestData.prize" />
              </div>
            </el-form-item>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Дата и время</div>
              <div class="w-full flex">
                <el-col :span="11">
                  <el-date-picker
                    v-model="temp.day"
                    type="date"
                    placeholder="Выберите день"
                    style="width: 100%"
                  />
                </el-col>
                <el-col :span="2" class="text-center">
                  <span class="text-gray-500 text-2xl font-bold">-</span>
                </el-col>
                <el-col :span="11">
                  <el-time-picker
                    v-model="temp.time"
                    placeholder="Выберите время"
                    style="width: 100%"
                  />
                </el-col>
              </div>
            </el-form-item>

            <h1 class="text-3xl text-green-600 font-bold mb-4">Требования</h1>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Взнос</div>
              <div class="w-full">
                <el-input
                  type="number"
                  placeholder="название"
                  v-model="form.contestRequirement.fee"
                />
              </div>
            </el-form-item>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Участие</div>
              <div class="w-full">
                <el-select v-model="form.contestRequirement.participation" placeholder="участие">
                  <el-option
                    v-for="item in [{ title: 'individual' }, { title: 'duo' }]"
                    :value="item.title"
                    :key="item.title"
                    :label="item.title"
                  />
                </el-select>
              </div>
            </el-form-item>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Пол</div>
              <div class="w-full">
                <el-select v-model="form.contestRequirement.gender" placeholder="пол">
                  <el-option
                    v-for="item in [{ title: 'male' }, { title: 'female' }]"
                    :value="item.title"
                    :key="item.title"
                    :label="item.title"
                  />
                </el-select>
              </div>
            </el-form-item>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Возрастные ограничения</div>
              <div class="w-full">
                <el-select v-model="form.contestRequirement.minAge" placeholder="мин. возрасть">
                  <el-option v-for="age in ageSelect" :value="age" :key="age" :label="age" />
                </el-select>
                <span class="text-gray-500 text-2xl font-bold px-4">-</span>
                <el-select v-model="form.contestRequirement.maxAge" placeholder="макс. возрасть">
                  <el-option v-for="age in ageSelect" :value="age" :key="age" :label="age" />
                </el-select>
              </div>
            </el-form-item>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Максимальное колличество участников</div>
              <div class="w-full">
                <el-select
                  v-model="form.contestRequirement.participantsLimit"
                  placeholder="участники"
                >
                  <el-option v-for="n in numbers" :value="n" :key="n" :label="n" />
                </el-select>
              </div>
            </el-form-item>

            <h1 class="text-3xl text-green-600 font-bold mb-4">Местоположение</h1>

            <el-form-item class="form-item">
              <div class="text-xl mb-1">Выберите место проведение на карте ниже</div>
              <div class="w-full">
                <Map @coordinates="pasteLocation"></Map>
                <div v-if="typeof form.contestLocation.address === 'string'">
                  <el-tag class="ml-2" type="warning">{{ form.contestLocation.country }}</el-tag>
                  <el-tag class="ml-2" type="warning">{{ form.contestLocation.city }}</el-tag>
                  <el-tag class="ml-2" type="warning">{{ form.contestLocation.address }}</el-tag>
                </div>
              </div>
            </el-form-item>

            <h1 class="text-3xl text-green-600 font-bold mb-4">Затраты</h1>

            <el-form-item class="flex flex-col">
              <div v-for="item in form.Expenses" class="flex gap-2 mb-2">
                <el-input v-model="item.name" placeholder="Название"></el-input>
                <el-input v-model="item.amount" placeholder="Колличество"></el-input>
                <el-input v-model="item.price" placeholder="Цена"></el-input>
                <el-button
                  v-if="item.id > 1"
                  @click="form.Expenses = form.Expenses.filter(e => e.id !== item.id)"
                  >-</el-button
                >
              </div>

              <el-button
                class="ml-4 -mt-2"
                type="primary"
                @click="
                  form.Expenses.push({
                    id: form.Expenses[form.Expenses.length - 1].id + 1,
                    name: '',
                    price: '',
                    amount: '',
                  })
                "
                >+</el-button
              >
            </el-form-item>

            <el-form-item>
              <el-button
                class="ml-auto text-xl"
                size="large"
                v-loading="postLoading"
                type="primary"
                @click="onSubmit"
                >Создать</el-button
              >
            </el-form-item>
          </div>

          <div
            v-if="form.contestData.visibility === 'private' && form.contestData.categoryId === 1"
            class="ml-4 mt-2"
          >
            <h1 class="text-3xl text-green-600 font-bold mb-4">Настройки команды</h1>
            <el-form-item class="form-item">
              <div class="text-xl">Выберите колличество команд</div>
              <div class="w-full">
                <el-select v-model="form.team_count" placeholder="колличество">
                  <el-option
                    v-for="n in [1, ...numbers.slice(0, 9)]"
                    :value="n"
                    :key="n"
                    :label="n"
                  />
                </el-select>
              </div>
            </el-form-item>

            <template v-if="form.team_count">
              <el-form-item class="form-item" v-for="(team, i) in form.teams">
                <div class="text-xl font-bold">Название команды № {{ i + 1 }}</div>
                <div class="ml-10">
                  <el-input v-model="team.name" :placeholder="`команда №${i + 1}`"></el-input>
                </div>

                <div class="flex flex-col gap-4">
                  <div class="mt-1" v-for="(user, userIndex) in team.users">
                    <p class="text-lg">Игрок №{{ userIndex + 1 }}</p>
                    <div class="flex gap-2">
                      <el-input v-model="user.name" placeholder="имя"></el-input>
                      <el-input v-model="user.telegram" placeholder="телеграм ник"></el-input>
                      <el-button
                        v-if="userIndex > 0"
                        @click="team.users = team.users.filter(u => u.pos !== user.pos)"
                        >-</el-button
                      >
                    </div>
                  </div>
                  <el-button
                    class="w-10 ml-auto"
                    @click="
                      team.users.push({
                        pos: team.users[team.users.length - 1].pos + 1,
                        name: '',
                        telegram: null,
                      })
                    "
                    type="primary"
                    >+</el-button
                  >
                </div>

                <hr class="w-full mt-6" /> </el-form-item
            ></template>
            <el-button
              @click="form.teams.push({ name: '', users: [{ pos: 1, name: '', telegram: null }] })"
              type="primary"
              >+</el-button
            >
          </div>
        </div>

        <div
          v-if="form.contestData.categoryId && form.contestData.categoryId !== 1"
          class="flex flex-col gap-4 items-center justify-center text-center px-10 mt-20"
        >
          <h1>Для выбранной категории еще нет шаблонов создания турнира</h1>
          <img class="w-[200px] text-white" src="../../assets/sad.svg" />
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from "../../api/client.js";
import Map from "../../components/Map.vue";
import { notification } from "../../utils/helpers.js";

export default {
  name: "Create",
  components: { Map },
  data() {
    return {
      postLoading: false,
      temp: {
        day: null,
        time: null,
      },
      categories: [],
      form: {
        contestData: {
          categoryId: null,
          name: null,
          prize: null,
          priority: null,
          visibility: null,
          startDate: null,
          endDate: null,
          organizerId: null,
        },
        contestRequirement: {
          participation: null,
          gender: null,
          minAge: null,
          maxAge: null,
          participantsLimit: null,
          fee: null,
        },
        contestLocation: {
          latitude: null,
          longitude: null,
          address: null,
          city: null,
          country: null,
        },
        Expenses: [{ id: 1, name: "", amount: "", price: "" }],
        team_count: null,
        teams: [{ name: "", users: [{ pos: 1, name: "", telegram: null }] }],
      },
    };
  },
  computed: {
    ageSelect() {
      let ages = [];
      for (let i = 6; i <= 70; i++) {
        ages.push(i);
      }
      return ages;
    },
    numbers() {
      let n = [];
      for (let i = 2; i <= 50; i++) {
        n.push(i);
      }
      return n;
    },
  },
  async mounted() {
    await this.getCategories();
  },
  methods: {
    async getCategories() {
      await axiosInstance.get("/category/getAll").then(res => {
        if (res.data.success) {
          this.categories = res.data.categories;
        }
      });
    },
    async onSubmit() {
      this.postLoading = true;

      this.form.contestData.startDate = new Date(
        `${this.formatDateDash(new Date(this.temp.day))} ${this.temp.time.toLocaleTimeString()}`
      );
      this.form.contestData.endDate = this.form.contestData.startDate;

      let obj = this.form;

      obj.contestData.organizerId = +localStorage.getItem("userId");

      await axiosInstance.post("/contest/create", { ...obj }).then(res => {
        console.log(res.data);
        if (res.data.success) {
          notification("Успешно", "success");
          this.$router.push({
            name: "contest_page",
            params: { contest_id: res.data.newContest.key },
          });
        }
      });

      this.postLoading = false;
    },
    pasteLocation(payload) {
      this.form.contestLocation = payload;
    },
    formatDateDash(date) {
      date = date.setDate(date.getDate() + 1);
      return new Date(date).toISOString().slice(0, 10).split("-").join("-");
    },
  },
};
</script>

<style scoped>
span {
  font-size: 18px;
}

.container {
  background: url("https://cdn.wallpapersafari.com/43/22/WrKwVv.jpg") no-repeat;
  background-size: cover;
  /*min-height: 100vh;*/
  min-width: 100%;
}

.form-item {
  @apply w-full flex flex-col gap-2;
}
</style>
