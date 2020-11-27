<template>
    <v-card class="mx-auto" max-width="500">
        <v-card-title class="font-weight-bold justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar
                v-show="registerStep !== 1"
                color="primary lighten-2"
                class="subheading white--text"
                size="24"
                v-text="registerStep - 1"
            ></v-avatar>
        </v-card-title>

        <v-window v-model="registerStep">
            <!-- 登录 -->
            <v-window-item :value="1">
                <v-card-text>
                    <v-form v-model="loginForm.valid" ref="loginForm">
                        <v-text-field
                            label="账号"
                            placeholder="输入你的用户名"
                            v-model="loginForm.username"
                            :rules="[formRules.required]"
                        ></v-text-field>

                        <v-text-field
                            label="密码"
                            placeholder="输入你的密码"
                            :rules="[formRules.required]"
                            v-model="loginForm.password"
                            autocomplete="new-password"
                            :append-icon="
                                loginForm.eye1 ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="loginForm.eye1 ? 'text' : 'password'"
                            @click:append="loginForm.eye1 = !loginForm.eye1"
                        ></v-text-field>
                        <v-row>
                            <v-col cols="4">
                                <v-btn class="px-0">
                                    <v-img
                                        src="http://47.115.72.55:9999/user/verifyCode"
                                    ></v-img> </v-btn
                            ></v-col>
                            <v-col cols="8">
                                <v-text-field
                                    label="验证码"
                                    placeholder="请输入你的验证码"
                                    v-model="loginForm.verifyCode"
                                ></v-text-field
                            ></v-col>
                        </v-row>
                    </v-form>

                    <v-btn
                        block
                        color="primary"
                        @click="login"
                        class="mt-4"
                        :disabled="!loginForm.valid"
                        >登录</v-btn
                    >
                </v-card-text>
            </v-window-item>

            <!-- 注册用户名 -->
            <v-window-item :value="2">
                <v-card-text>
                    <v-form v-model="registerForm.userValid" ref="userReForm">
                        <v-text-field
                            v-model="registerForm.username"
                            label="注册用户名"
                            counter="16"
                            :rules="registerForm.userRules"
                            @input="registerForm.isExist = false"
                            hint="字母开头，字母数字下划线组成。至少5位，至多16位"
                        ></v-text-field>
                        <span class="caption grey--text text--darken-1 mb-5"
                            >用户名是用来登录此网站的唯一账号。</span
                        >

                        <v-text-field
                            v-model="registerForm.email"
                            label="输入邮箱"
                            :rules="[formRules.required]"
                        ></v-text-field>
                        <span class="caption grey--text text--darken-1 mb-5"
                            >邮箱用来登录或者找回账号</span
                        >
                    </v-form>
                </v-card-text>
            </v-window-item>

            <!-- 注册密码 -->
            <v-window-item :value="3">
                <v-card-text>
                    <v-form v-model="registerForm.passwordValid">
                        <v-text-field
                            label="密码"
                            v-model="registerForm.password"
                            :rules="registerForm.passwordRules"
                            hint="密码至少6位,至多18位"
                            autocomplete="new-password"
                            :append-icon="
                                registerForm.eye1 ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="registerForm.eye1 ? 'text' : 'password'"
                            @click:append="
                                registerForm.eye1 = !registerForm.eye1
                            "
                        ></v-text-field>
                        <v-text-field
                            label="确认密码"
                            v-model="registerForm.passwordR"
                            autocomplete="new-password"
                            :rules="registerForm.passwordRRules"
                            :append-icon="
                                registerForm.eye2 ? 'mdi-eye' : 'mdi-eye-off'
                            "
                            :type="registerForm.eye2 ? 'text' : 'password'"
                            @click:append="
                                registerForm.eye2 = !registerForm.eye1
                            "
                        ></v-text-field>
                    </v-form>
                    <span class="caption grey--text text--darken-1"
                        >请输入账户对应的密码。</span
                    >
                </v-card-text>
            </v-window-item>

            <!-- 注册成功 -->
            <v-window-item :value="4">
                <div class="pa-4 text-center">
                    <v-img
                        class="mb-4"
                        contain
                        height="128"
                        src="@/assets/logo.png"
                    ></v-img>
                    <h3 class="title font-weight-light mb-2">
                        欢迎来到智鲨音乐世界！
                    </h3>
                    <span class="caption grey--text"
                        >感谢注册！马上登录吧！</span
                    >
                </div>
            </v-window-item>
        </v-window>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn text @click="registerStep--" v-show="backShow">后退</v-btn>
            <v-spacer></v-spacer>
            <v-btn
                :disabled="formBtn"
                color="primary"
                depressed
                @click="registerStepFuc(registerStep)"
            >
                <span v-if="registerStep === 1">注册</span>
                <span v-else-if="registerStep === 2">下一步</span>
                <span v-else-if="registerStep === 3">完成</span>
                <span v-else-if="registerStep === 4">登录</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
// 引入请求配置
import NWOPT from "@/network/options.js";
export default {
    data() {
        return {
            /**
             * 登录&注册
             */

            // 注册步骤
            registerStep: 1,

            // 注册表单
            registerForm: {
                username: "",
                password: "",
                passwordR: "",
                email: "",
                userValid: false,
                passwordValid: false,
                isExist: false,
                eye1: false,
                eye2: false,
                userRules: [
                    (v) => !!v || "用户名必填",
                    (v) =>
                        (v.length <= 16 && v.length >= 5) ||
                        "用户名至少5位，至多16位",
                    (v) => {
                        return (
                            /^[a-zA-Z][a-zA-Z0-9_]*$/.test(v) ||
                            "用户名可由字母数字下划线组成，且需字母开头"
                        );
                    },
                    // (v) =>
                    //     !this.registerForm.isExist || "该用户名已存在，请更换",
                ],
                passwordRules: [
                    (v) =>
                        (v.length >= 6 && v.length <= 18) ||
                        "密码至少6位，至多18位",
                ],
                passwordRRules: [
                    (v) => !!v || "必填",
                    // (v) => {
                    //     return (
                    //         this.registerForm.passwordR ===
                    //             this.registerForm.password || "密码不一致"
                    //     );
                    // },
                ],
            },
            // 登录表单
            loginForm: {
                username: "",
                password: "",
                verifyCode: "",
                valid: false,
                eye1: false,
            },
            // 通用规则
            formRules: {
                required: (v) => !!v || "必填",
            },
        };
    },
    computed: {
        /**
         * 注册框步骤
         */
        currentTitle() {
            switch (this.registerStep) {
                case 1:
                    return "登录";
                case 2:
                    return "创建账户-只需3步成为智鲨会员！";
                case 3:
                    return "创建密码";
                case 4:
                    return "注册成功";
            }
        },
        /**
         * 注册框后退步骤
         */
        backShow() {
            switch (this.registerStep) {
                case 1:
                    return false;
                case 2:
                    return true;
                case 3:
                    return true;
                case 4:
                    return false;
            }
        },
        /**
         * 表单按钮
         */
        formBtn() {
            switch (this.registerStep) {
                case 1:
                    return false;
                    break;
                case 2:
                    return !this.registerForm.userValid;
                    break;
                case 3:
                    return !this.registerForm.passwordValid;
                    break;
                case 4:
                    return false;
                    break;
                default:
                    break;
            }
        },
    },
    methods: {
        /**
         * 登录
         */
        login() {
            this.$yyRequest({
                url: NWOPT.LOGIN,
                method: "post",
                headers: { "content-type": "application/json; charset=UTF-8" },
                data: {
                    username: this.loginForm.username,
                    password: this.loginForm.password,
                    code: this.loginForm.verifyCode,
                },
            })
                .then((res) => {
                    this.$yyCookies.set("token", res.data.token);
                    this.requestUserInfo();
                    this.$yyHot.update("showSnackbar", {
                        type: "success",
                        text: res.msg,
                    });
                    this.$emit('input',false)

                })
                .catch((res) => {
                    this.$yyHot.update("showSnackbar", {
                        type: "error",
                        text: res,
                    });
                });
        },
        /**
         * 登录注册表单
         */
        registerStepFuc(step) {
            switch (step) {
                case 2:
                    this.registerStep++;
                    break;

                case 3:
                    // 注册
                    this.$yyRequest({
                        url: NWOPT.REGISTER,
                        method: "post",
                        data: {
                            email: this.registerForm.email,
                            username: this.registerForm.username,
                            password: this.registerForm.passwordR,
                        },
                    })
                        .then((res) => {
                            console.log(res, "回应");

                            this.registerForm.isExist = false;
                            this.registerStep++;
                        })
                        .catch((res) => {
                            this.registerForm.isExist = true;
                            let flag = this.$refs.userReForm.validate();

                            this.$yyHot.update("showSnackbar", {
                                type: "error",
                                text: res,
                            });
                        });

                    break;
                default:
                    this.registerStep++;
                    break;
            }
        },
        /**
         * 请求用户信息
         */
        requestUserInfo() {
            this.$yyRequest({
                url: NWOPT.INFO,
                headers: { Authorization: `${this.$yyCookies.get("token")}` },
            }).then((res) => {
                console.log(res, "res");
                // 修改登录状态
                this.$yyHot.update("isLogin", true);
                // 写入用户信息
                this.$yyHot.update("userInfo", res.data);
            });
        },
    },
};
</script>

<style>
</style>