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
                    <v-tooltip right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-list-item class="px-2 justify-center">
                                <!-- 未登录 -->
                                <v-list-item-icon
                                    @click="openStatusData.login = true"
                                    v-bind="attrs"
                                    v-on="on"
                                    v-if="!$store.state.isLogin"
                                    ><v-icon
                                        >mdi-account-question-outline</v-icon
                                    ></v-list-item-icon
                                >

                                <!-- 已登录 -->
                                <v-list-item-avatar
                                    v-else
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-img
                                        :src="$store.state.userInfo.imgUrl"
                                        @click="
                                            openStatusData.currentUser = true
                                        "
                                    ></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                        </template>
                        <span>用户</span>
                    </v-tooltip>

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
                                        @click="navigation(item.fullPath)"
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
                                    @click="navigation(item.fullPath)"
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

                        <v-menu offset-x :close-on-content-click="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-list-item
                                    link
                                    class="mt-4"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-list-item-action>
                                        <v-icon color="grey darken-1"
                                            >mdi-cog</v-icon
                                        >
                                    </v-list-item-action>
                                    <v-list-item-title
                                        class="grey--text text--darken-1"
                                        >应用设置</v-list-item-title
                                    >
                                </v-list-item>
                            </template>
                            <yy-app-settings></yy-app-settings>
                        </v-menu>
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
            <yy-toolbar-title></yy-toolbar-title>

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
                            @click="changeMusic(item)"
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
                <v-scroll-x-transition mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </v-scroll-x-transition>
            </v-container>
        </v-main>

        <!-- 登录注册 -->
        <v-dialog max-width="500" v-model="openStatusData.login">
            <yy-login-and-register
                @input="openStatusData.login = $event"
            ></yy-login-and-register>
        </v-dialog>

        <!-- 常用消息提示组件 -->
        <v-snackbar v-model="snackbarStatus" :color="snackbarColor">
            {{ snackbarText }}
        </v-snackbar>

        <!-- 创建歌单 -->
        <v-dialog max-width="500" :v-model="true">
            <v-card class="mx-auto" max-width="500">
                <v-card-title class="font-weight-bold justify-space-between">
                    <span>创建歌单</span>
                </v-card-title>

                <v-card-text>
                    <v-form>
                        <v-text-field
                            label="创建歌单名"
                            placeholder="输入你要创建的歌单名吧"
                        ></v-text-field>
                    </v-form>

                    <v-btn block color="primary" class="mt-4">创建</v-btn>
                </v-card-text>

                <v-divider></v-divider>
            </v-card>
        </v-dialog>

        <!-- 用户详情 -->
        <v-dialog
            v-model="openStatusData.currentUser"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <yy-user-info
                @input="openStatusData.currentUser = $event"
            ></yy-user-info>
        </v-dialog>

        <!-- 歌曲详情 -->
        <v-dialog
            v-model="$store.state.status.currentMusicOpen"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <yy-current-music
                @input="$store.state.currentMusic = $event"
            ></yy-current-music>
        </v-dialog>

        <!-- 歌单详情页 -->
        <v-dialog
            v-model="$store.state.status.currentMusicListOpen"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <yy-music-list
                @input="$store.state.status.currentMusicListOpen = $event"
            ></yy-music-list>
        </v-dialog>

        <!-- 歌手详情页 -->
        <v-dialog
            v-model="$store.state.status.currentSinger"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <yy-current-singer
                @input="$store.state.status.currentSinger = $event"
            ></yy-current-singer> 
        </v-dialog>

        <!-- mv页面 -->
        <v-dialog
            v-model="$store.state.status.currentMV"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <yy-current-mv
                @input="$store.state.status.currentMV = $event"
            ></yy-current-mv>
        </v-dialog>
    </v-app>
</template>

<script>
// 引入组件
import yyMusicPlayer from "@/components/yy-cpns/yy-music-player";
import yyCurrentMusic from "@/components/yy-cpns/yy-current-music";
import yyUserInfo from "@/components/yy-cpns/yy-user-info";
import yyToolbarTitle from "@/components/yy-cpns/yy-toolbar-title";
import yyAppSettings from "@/components/yy-cpns/yy-app-settings";
import yyLoginAndRegister from "@/components/yy-cpns/yy-login-and-register";
import yyMusicList from "@/components/yy-cpns/yy-music-list";
import yyCurrentSinger from "@/components/yy-cpns/yy-current-singer";
import yyCurrentMv from "@/components/yy-cpns/yy-current-mv";

// 引入请求配置
import NWOPT from "@/network/options.js";
import YyAppSettings from "../components/yy-cpns/yy-app-settings.vue";
export default {
    name: "Home",
    data: () => {
        return {
            // 开启关闭状态
            openStatusData: {
                leftDrawer: null,
                musicPlayer: true,
                login: false,
                currentUser: false,
                currentMusicList: false,
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
            let wHeight = window.screen.height;
            let yHeight = wHeight * 0.77;
            // let yHeight = wHeight * 0.5;
            // 播放器弹入弹出监听
            document.addEventListener(
                "mousemove",
                this.handleChoke((e) => {
                    if (e.screenY > yHeight) {
                        this.openStatusData.musicPlayer = true;
                    } else {
                        this.openStatusData.musicPlayer = false;
                    }
                }, 200)
            );

            // 自动登录
            if (this.$yyCookies.get("token")) {
                this.requestUserInfo();
            }

            /**
             * 获取"我喜欢"歌单和其他歌单
             */
            this.requestUserSongList().then((res) => {
                /**
                 * 获取我喜欢歌单对象
                 */
                let myLoveList = res.data.find((n) => {
                    return n.listName === "我喜欢";
                });
                this.requestSongList(myLoveList.id).then((res) => {
                    this.$store.state.mySongList.push(...res.data);
                });

                /**
                 * 获取其他创建对象
                 */
                res.data.forEach((n) => {
                    this.requestSongList(n.id).then((res) => {
                        this.$store.state.myLoveList = res.data;
                    });
                });
            });
        },
        /**
         * 搜索栏点击结果
         */
        changeMusic(item) {
            this.$yyMusic.changeMusic([item]);
            this.$yyHot.update(["status", "currentMusicOpen"], true);
            this.searchValue = "";
            this.searchRet = [];
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
         * 获取用户所有歌单
         */
        requestUserSongList() {
            return this.$yyRequest({
                url: NWOPT.SONGLIST,
                headers: { Authorization: `${this.$yyCookies.get("token")}` },
            });
        },
        /**
         * 获取歌单所有歌曲
         */
        requestSongList(id) {
            return this.$yyRequest({
                url: NWOPT.SONGLISTINFO,
                headers: { Authorization: `${this.$yyCookies.get("token")}` },
                params: {
                    songListId: id,
                },
            });
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
         * 请求用户信息
         */
        requestUserInfo() {
            this.$yyRequest({
                url: NWOPT.INFO,
                headers: { Authorization: `${this.$yyCookies.get("token")}` },
            }).then((res) => {
                // 修改登录状态
                this.$yyHot.update("isLogin", true);
                // 写入用户信息
                this.$yyHot.update("userInfo", res.data);
            });
        },
        /**
         * 搜索
         */
        requestSong() {
            let e = this.searchValue;
            if (e === "") {
                this.searchRet = [];
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
            }).then((res) => {});
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
        navigation(to) {
            if (to === this.$route.fullPath) {
                return;
            }
            this.$router.push({
                path: to,
            });
        },
    },
    computed: {},
    created() {
        this.$vuetify.theme.dark = true;
        this.init();
    },
    watch: {
        "$store.state.showSnackbar"(newVal, oldVal) {
            this.showSnackbar(newVal);
        },
    },
    components: {
        yyMusicPlayer,
        yyUserInfo,
        yyToolbarTitle,
        yyAppSettings,
        yyLoginAndRegister,
        yyCurrentMusic,
        yyMusicList,
        yyCurrentSinger,
        yyCurrentMv
    },
};
</script>

<style>
.music-player-slider .v-slider--horizontal {
    margin-left: 0px;
    margin-right: 0px;
}
</style>
