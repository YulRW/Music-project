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
            width="310px"
            v-model="openStatus.drawer"
        >
            <v-row class="fill-height flex-nowrap" no-gutters>
                <!-- 导航抽屉 -->
                <v-navigation-drawer
                    dark
                    mini-variant
                    mini-variant-width="56"
                    v-model="openStatus.drawer"
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
                        <template v-for="item in items">
                            <v-tooltip right :key="item.text">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-list-item v-bind="attrs" v-on="on" link>
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
                <v-list dense>
                    <v-list>
                        <template v-for="item in items2">
                            <v-list-item link :key="item.text">
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
                    </v-list>

                    <!-- 副标题 -->
                    <v-subheader class="mt-4 grey--text text--darken-1"
                        >SUBSCRIPTIONS
                    </v-subheader>
                    <v-list-item class="mt-4" link>
                        <v-list-item-action>
                            <v-icon color="grey darken-1"
                                >mdi-plus-circle-outline</v-icon
                            >
                        </v-list-item-action>
                        <v-list-item-title class="grey--text text--darken-1"
                            >Browse Channels</v-list-item-title
                        >
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon color="grey darken-1">mdi-cog</v-icon>
                        </v-list-item-action>
                        <v-list-item-title class="grey--text text--darken-1"
                            >Manage Subscriptions</v-list-item-title
                        >
                    </v-list-item>
                </v-list>
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
                @click.stop="openStatus.drawer = !openStatus.drawer"
            ></v-app-bar-nav-icon>
            <!-- 左上角icon -->
            <v-icon class="mx-4" large> mdi-music-note-outline </v-icon>
            <!-- 导航栏标题 -->
            <v-toolbar-title class="mr-12 align-center">
                <span class="title">智鲨音乐</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
            <v-container class="fill-height">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Main from "@/views/Main";
export default {
    name: "Home",
    data: () => {
        return {
            openStatus: {
                leftDrawer: null,
            },
            items: [
                { icon: "mdi-music-circle", text: "音乐", tips: "音乐" },
                { icon: "mdi-account-multiple", text: "好友", tips: "好友" },
                { icon: "mdi-shopping", text: "商城", tips: "商城" },
            ],
            items2: [
                { icon: "mdi-music", text: "推荐" },
                { icon: "mdi-account-music", text: "歌手" },
                { icon: "mdi-playlist-music-outline", text: "歌单" },
            ],
        };
    },
    created() {
        this.$vuetify.theme.dark = true;
    },
    components: {
        Main,
    },
};
</script>
