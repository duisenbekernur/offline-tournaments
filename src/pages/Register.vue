<template>
    <div class="flex my-20 w-full">
        <el-form
                ref="form"
                class="form bg-gray-600 mx-auto p-8 rounded-lg text-white w-1/3"
                label-position="top"
                label-width="100px"
                :model="form"
                :rules="rules"
        >
            <h1 class="text-3xl mb-2 font-bold text-lime-400">Регистрация</h1>
            <el-form-item color="white" class="text-white">
                <template v-slot:label>
                    <span style="color: white;">E-mail</span>
                </template>
                <el-input v-model="form.email" placeholder="e-mail" size="large" clearable/>
            </el-form-item>

            <el-form-item color="white" class="text-white">
                <template v-slot:label>
                    <span style="color: white;">Имя</span>
                </template>
                <el-input v-model="form.firstname" placeholder="имя" size="large" clearable/>
            </el-form-item>

            <el-form-item color="white" class="text-white">
                <template v-slot:label>
                    <span style="color: white;">Фамилия</span>
                </template>
                <el-input v-model="form.lastname" placeholder="фамилия" size="large" clearable/>
            </el-form-item>

            <el-form-item color="white" class="text-white">
                <template v-slot:label>
                    <span style="color: white;">Номер телефона</span>
                </template>
                <el-input v-model="form.phone" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                          placeholder="номер телефона" size="large" clearable/>
            </el-form-item>

            <el-form-item color="white" class="text-white">
                <template v-slot:label>
                    <span style="color: white;">Возрасть</span>
                </template>
                <el-select v-model="form.age" placeholder="возрасть">
                    <el-option v-for="n in ages" :label="n" :value="n"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="relative">
                <template v-slot:label>
                    <span style="color: white;">Пароль</span>
                </template>
                <el-input :type="passwordType" v-model="form.password" placeholder="пароль" size="large"/>
                <i v-if="passwordType === 'password'" class="absolute right-4 cursor-pointer"
                   @click="changePasswordType">
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 -16 544 544"
                         xmlns="http://www.w3.org/2000/svg"><title>show</title>
                        <path d="M272 400Q205 400 151 361 96 322 64 256 96 190 151 151 205 112 272 112 336 112 392 153 448 193 480 256 448 319 392 360 336 400 272 400ZM272 352Q312 352 340 324 368 296 368 256 368 216 340 188 312 160 272 160 232 160 204 188 176 216 176 256 176 296 204 324 232 352 272 352ZM272 312Q249 312 233 296 216 279 216 256 216 233 233 217 249 200 272 200 295 200 312 217 328 233 328 256 328 279 312 296 295 312 272 312Z"/>
                    </svg>
                </i>
                <i v-else class="absolute right-4 cursor-pointer" @click="changePasswordType">
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 -16 544 544"
                         xmlns="http://www.w3.org/2000/svg"><title>hide</title>
                        <path d="M108 60L468 420 436 452 362 378Q321 400 272 400 208 400 154 361 99 322 64 256 79 229 102 202 124 174 144 160L76 92 108 60ZM368 256Q368 216 340 188 312 160 272 160L229 117Q254 112 272 112 337 112 392 152 446 192 480 256 474 269 461 288 448 307 434 322L368 256ZM272 352Q299 352 322 338L293 309Q283 312 272 312 249 312 233 296 216 279 216 256 216 247 220 236L190 206Q176 229 176 256 176 296 204 324 232 352 272 352Z"/>
                    </svg>
                </i>
            </el-form-item>

            <div class="flex items-center justify-between">
                <el-button v-loading="loading" class="mt-2" type="success" size="large" @click.prevent="register">
                    Регистрация
                </el-button>

                <div class="flex gap-2"><p>Есть аккаунта?</p>
                    <router-link :to="{name: 'login'}" class="  text-lime-400 hover:text-lime-200 underline">Войти
                    </router-link>
                </div>
            </div>
        </el-form>


        <el-dialog
                v-model="show_dialog"
                title="Введите код отправленный на ваш email"
                width="30%"
                :before-close="handleClose"
        >
            <span>
                <el-input placeholder="введите 6 значный код" v-model="user_input_code"></el-input>
            </span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="show_dialog = false">Отмена</el-button>
                <el-button v-loading="loading" type="primary" @click="sendCode">
                  Подтвердить
                </el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {axiosInstance} from "../api/client.js";
import {notification} from "../utils/helpers.js";

export default {
    name: "Register",
    data() {
        return {
            loading: false,
            show_dialog: false,
            passwordType: 'password',
            email_code: null,
            user_input_code: null,
            form: {
                email: null,
                password: null,
                firstname: null,
                lastname: null,
                age: null,
                phone: null,
            },
            rules: {
                email: [{required: true, message: "Введите E-mail", trigger: "blur"}],
                password: [{required: true, message: "Введите пароль", trigger: "blur"}],
                firstname: [
                    {required: true, message: "Введите имя пользователя", trigger: "blur"},
                ],
                lastname: [
                    {required: true, message: "Введите фамилию", trigger: "blur"},
                ],
                age: [
                    {required: true, message: "Выберите ваш возрасть", trigger: "blur"},
                ],
                phone: [
                    {required: true, message: "Введите номер телефона", trigger: "blur"},
                ]
            },
        }
    },
    computed: {
        ages() {
            let ages = [];
            for (let i = 6; i <= 70; i++) {
                ages.push(i);
            }
            return ages
        }
    },
    methods: {
        changePasswordType() {
            this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
        },
        async sendCode() {
            this.loading = true

            if (+this.user_input_code === this.email_code) {
                await axiosInstance.post('/auth/registration/verified', {...this.form, verified: true}).then(res => {
                    if (res.data.message === "User created") {
                        notification('Успешная регистрация', 'success')
                        this.$router.push({name: 'login'})
                    }
                })
            } else {
                notification('Неправильный код', 'danger')
                this.user_input_code = ''
            }

            this.loading = false
        },
        register() {
            this.loading = true

            this.$refs['form'].validate(async valid => {
                if (valid) {
                    await axiosInstance.post('/auth/registration', {...this.form}).then(res => {
                        if (res.data.code) {
                            this.show_dialog = true;
                            this.email_code = res.data.code
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            })

            this.loading = false
        },
        handleClose() {
            this.show_dialog = false
        }
    }
}
</script>

<style scoped>
.form label {
    color: white;
}
</style>