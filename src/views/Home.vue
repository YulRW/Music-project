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
                    <v-list-item class="px-2">
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
            <v-text-field
                solo-inverted
                flat
                dense
                hide-details
                label="查找歌曲.."
                prepend-inner-icon="mdi-magnify"
            ></v-text-field>
        </v-app-bar>

        <!-- 
          音乐播放器
          inset：嵌入样式
          hide-overlay：隐藏遮罩
          persistent：在元素外部单击不会将其停用
         -->
        <v-bottom-sheet inset v-model="openStatusData.musicPlayer" hide-overlay>
            <yy-music-player></yy-music-player>
        </v-bottom-sheet>

        <!-- 主要内容 -->
        <v-main class="secondary">
            <v-container class="fill-height">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
// 引入组件
import yyMusicPlayer from "@/components/yy-cpns/yy-music-player";
export default {
    name: "Home",
    data: () => {
        return {
            // 开启关闭状态
            openStatusData: {
                leftDrawer: null,
                musicPlayer: true,
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
        // 导航
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
    },
    computed: {},
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
