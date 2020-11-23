<template>
    <v-app id="inspire">
        <!-- 
          左抽屉
          app：app挂载
          clipped：抽屉位于应用程序工具栏下方
         -->
        <v-navigation-drawer
            app
            clipped
            v-model="openStatusData.drawer"
            width="282px"
        >
            <v-row class="fill-height flex-nowrap" no-gutters>
                <!-- 导航抽屉 -->
                <v-navigation-drawer
                    dark
                    mini-variant
                    v-model="openStatusData.drawer"
                    mini-variant-width="56"
                    class="tertiary"
                >
                    <!-- 用户 -->
                    <v-list-item
                        class="px-2"
                        @click="openStatusData.login = true"
                    >
                        <v-list-item-avatar>
                            <v-img
                                src="@/assets/img/default-avatar.png"
                            ></v-img>
                        </v-list-item-avatar>
                    </v-list-item>

                    <v-divider></v-divider>

                    <!-- 导航item -->
                    <v-list dense nav>
                        <!-- 选项渲染 -->
                        <template v-for="item in forData.items">
                            <v-tooltip right :key="item.text">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item
                                        v-bind="attrs"
                                        v-on="on"
                                        link
                                        :class="
                                            navShow(item.fullPath)
                                                ? 'primary'
                                                : ''
                                        "
                                        @click="$router.push(item.fullPath)"
                                    >
                                        <v-list-item-action>
                                            <v-icon>{{ item.icon }}</v-icon>
                                        </v-list-item-action>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{ item.text }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                                <span>{{ item.tips }}</span>
                            </v-tooltip>
                        </template>
                    </v-list>
                </v-navigation-drawer>

                <!-- 二级导航 -->
                <v-col cols class="tertiary">
                    <v-list dense shaped>
                        <v-list>
                            <!-- 副标题 -->
                            <v-subheader
                                class="mt-2 ml-3 grey--text text--darken-1"
                                >发现音乐
                            </v-subheader>
                            <template v-for="item in forData.items2">
                                <v-list-item
                                    link
                                    :key="item.text"
                                    @click="$router.push(item.fullPath)"
                                    class="mb-1"
                                    :class="
                                        item.fullPath === $route.fullPath
                                            ? 'primary'
                                            : ''
                                    "
                                >
                                    <v-list-item-action>
                                        <v-icon
                                            :class="
                                                item.fullPath ===
                                                $route.fullPath
                                                    ? 'white--text'
                                                    : 'primary--text'
                                            "
                                            >{{ item.icon }}</v-icon
                                        >
                                    </v-list-item-action>
                                    <v-list-item-content
                                        :class="
                                            item.fullPath === $route.fullPath
                                                ? 'white--text'
                                                : 'grey--text'
                                        "
                                    >
                                        <v-list-item-title>
                                            {{ item.text }}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>

                        <v-list-item link class="mt-4">
                            <v-list-item-action>
                                <v-icon color="grey darken-1">mdi-cog</v-icon>
                            </v-list-item-action>
                            <v-list-item-title class="grey--text text--darken-1"
                                >应用设置</v-list-item-title
                            >
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-navigation-drawer>

        <!-- 
          顶部导航栏
          app：app挂载
          clipped-left：指定位于左侧的应用程序的v-navigation-drawer在应用程序栏下方
          dense：密集
         -->
        <v-app-bar app clipped-left color="primary" dense>
            <v-app-bar-nav-icon
                @click.stop="openStatusData.drawer = !openStatusData.drawer"
            ></v-app-bar-nav-icon>
            <!-- 左上角icon -->
            <v-icon class="mx-4" large> mdi-music-note-outline </v-icon>
            <!-- 导航栏标题 -->
            <v-toolbar-title class="mr-12 align-center">
                <span class="title">智鲨音乐</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-card style="position: relative">
                <v-text-field
                    v-model="searchValue"
                    solo-inverted
                    flat
                    dense
                    hide-details
                    label="查找歌曲.."
                    prepend-inner-icon="mdi-magnify"
                    @input="requestSong"
                    @blur="searchRet = []"
                    @focus="requestSong"
                >
                </v-text-field>
                <v-list
                    style="position: absolute; top: 50px"
                    class="primary rounded"
                >
                    <template v-for="(item, index) in searchRet">
                        <v-list-item
                            two-line
                            :key="index"
                            link
                            @click="$yyMusic.changeMusic([item])"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    item.songName
                                }}</v-list-item-title>
                                <v-list-item-subtitle>{{
                                    item.tsinger.singerName
                                }}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
            </v-card>
        </v-app-bar>

        <!-- 
          音乐播放器
          inset：嵌入样式
          hide-overlay：隐藏遮罩
          persistent：在元素外部单击不会将其停用
         -->
        <v-bottom-sheet inset v-model="openStatusData.musicPlayer" hide-overlay>
            <yy-music-player
                :songList="$store.state.songList"
            ></yy-music-player>
        </v-bottom-sheet>

        <!-- 主要内容 -->
        <v-main class="secondary">
            <v-container class="fill-height">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </v-container>
        </v-main>

        <!-- 登录注册 -->
        <v-dialog max-width="500" v-model="openStatusData.login">
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
                                        loginForm.eye1
                                            ? 'mdi-eye'
                                            : 'mdi-eye-off'
                                    "
                                    :type="loginForm.eye1 ? 'text' : 'password'"
                                    @click:append="
                                        loginForm.eye1 = !loginForm.eye1
                                    "
                                ></v-text-field>
                                <v-row>
                                    <v-col cols="4">
                                        <v-btn
                                            @click="requestVerifyCode"
                                            class="px-0"
                                        >
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
                            <v-form
                                v-model="registerForm.userValid"
                                ref="userReForm"
                            >
                                <v-text-field
                                    v-model="registerForm.username"
                                    label="注册用户名"
                                    counter="16"
                                    :rules="registerForm.userRules"
                                    @input="registerForm.isExist = false"
                                    hint="字母开头，字母数字下划线组成。至少5位，至多16位"
                                ></v-text-field>
                                <span
                                    class="caption grey--text text--darken-1 mb-5"
                                    >用户名是用来登录此网站的唯一账号。</span
                                >

                                <v-text-field
                                    v-model="registerForm.email"
                                    label="输入邮箱"
                                    :rules="[formRules.required]"
                                ></v-text-field>
                                <span
                                    class="caption grey--text text--darken-1 mb-5"
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
                                        registerForm.eye1
                                            ? 'mdi-eye'
                                            : 'mdi-eye-off'
                                    "
                                    :type="
                                        registerForm.eye1 ? 'text' : 'password'
                                    "
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
                                        registerForm.eye2
                                            ? 'mdi-eye'
                                            : 'mdi-eye-off'
                                    "
                                    :type="
                                        registerForm.eye2 ? 'text' : 'password'
                                    "
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
                    <v-btn text @click="registerStep--" v-show="backShow"
                        >后退</v-btn
                    >
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
        </v-dialog>

        <!-- 常用消息提示组件 -->
        <v-snackbar v-model="snackbarStatus" :color="snackbarColor">
            {{ snackbarText }}
        </v-snackbar>

        <v-dialog max-width="500" :v-model="true">
            <v-card class="mx-auto" max-width="500">
                <v-card-title class="font-weight-bold justify-space-between">
                    <span>创建歌单</span>
                </v-card-title>

                <v-card-text>
                    <v-form v-model="loginForm.valid" ref="loginForm">
                        <v-text-field
                            label="创建歌单名"
                            placeholder="输入你要创建的歌单名吧"
                        ></v-text-field>

                        <v-text-field
                            label="密码"
                            placeholder="输入你的密码"
                        ></v-text-field>
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

                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>
// 引入组件
import yyMusicPlayer from "@/components/yy-cpns/yy-music-player";
// 引入请求配置
import NWOPT from "@/network/options.js";
export default {
    name: "Home",
    data: () => {
        return {
            // 开启关闭状态
            openStatusData: {
                leftDrawer: null,
                musicPlayer: true,
                login: false,
            },
            // 音频状态数据
            audioStatusData: {
                paused: true,
            },
            // 列表渲染状态
            forData: {
                items: [
                    {
                        icon: "mdi-music-circle",
                        text: "音乐",
                        tips: "音乐",
                        fullPath: "/Main",
                    },
                    {
                        icon: "mdi-account-multiple",
                        text: "好友",
                        tips: "好友",
                        fullPath: "/Friends",
                    },
                    {
                        icon: "mdi-shopping",
                        text: "商城",
                        tips: "商城",
                        fullPath: "/Shop",
                    },
                ],
                items2: [
                    { icon: "mdi-music", text: "推荐", fullPath: "/Main" },
                    {
                        icon: "mdi-account-music",
                        text: "歌手",
                        fullPath: "/Singer",
                    },
                    {
                        icon: "mdi-playlist-music-outline",
                        text: "歌单",
                        fullPath: "/MusicList",
                    },
                ],
            },

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

            // 搜索结果
            searchRet: [],

            //常用消息提示组件
            snackbarStatus: false,
            snackbarText: "",
            snackbarColor: "info",

            //搜索歌曲
            searchValue: "",
        };
    },
    methods: {
        /**
         * 初始化
         */
        init() {
            // 播放器弹入弹出监听
            document.addEventListener(
                "mousemove",
                this.handleChoke((e) => {
                    if (e.screenY > 850) {
                        this.openStatusData.musicPlayer = true;
                    } else {
                        this.openStatusData.musicPlayer = false;
                    }
                }, 200)
            );
        },
        /**
         * 节流
         */
        handleChoke(fuc, delay) {
            let last = 0;
            let time = null;
            return function () {
                let _this = this;
                let _arguments = arguments;
                let now = new Date().getTime();
                if (now - last > delay) {
                    if (time) {
                        clearTimeout(time);
                        time = null;
                    }
                    fuc.apply(_this, _arguments);
                    last = now;
                } else if (time === null) {
                    time = setTimeout(function () {
                        time = null;
                        fuc.apply(_this, _arguments);
                    }, delay);
                }
            };
        },
        /**
         * 导航
         */
        navShow(fullPath) {
            let curRoute = this.$route.fullPath;
            if (fullPath === "/Main") {
                return (
                    this.$route.fullPath === "/Main" ||
                    this.$route.fullPath === "/Singer" ||
                    this.$route.fullPath === "/MusicList"
                );
            } else if (fullPath === "/Friends") {
                return this.$route.fullPath === "/Friends";
            } else if (fullPath === "/Shop") {
                return this.$route.fullPath === "/Shop";
            }
        },
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
                .then((res) => {})
                .catch((res) => {
                    this.showSnackbar({
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
                            this.showSnackbar({
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
         * 搜索
         */
        requestSong() {
            let e = this.searchValue;
            if (e === "") {
                return;
            }
            this.$yyRequest({
                url: NWOPT.SEARCH,
                params: {
                    keyWord: e,
                    page: 0,
                    limit: 6,
                },
            })
                .then((res) => {
                    let data = res.data.rows;
                    this.searchRet = data;
                })
                .catch((res) => {
                    this.showSnackbar({
                        type: "error",
                        text: res,
                    });
                });
        },

        /**
         * 获取验证码
         */
        requestVerifyCode() {
            this.$yyRequest({
                url: NWOPT.VERIFYCODE,
            }).then((res) => {
                console.log(res, "验证码");
            });
        },

        /**
         * 消息条函数
         */
        showSnackbar(obj) {
            this.snackbarText = obj.text;
            this.snackbarStatus = true;
            this.snackbarColor = obj.type || "info";
            setTimeout(() => {
                this.snackbarStatus = false;
                this.snackbarText = "";
            }, obj.time || 2000);
        },
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
                    return "创建账户";
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
    created() {
        this.$vuetify.theme.dark = true;
        this.init();
    },
    watch: {},
    components: { yyMusicPlayer },
};
</script>

<style>
.music-player-slider .v-slider--horizontal {
    margin-left: 0px;
    margin-right: 0px;
}
</style>
