<template>
    <v-card>
        <!-- 顶部操作栏 -->
        <v-toolbar dark color="primary" dense class="rounded-0">
            <v-icon class="mx-4" large>mdi-music-circle</v-icon>

            <v-toolbar-title>{{
                $store.state.userInfo.username + '的个人主页'
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark text @click="$emit('input', false)">返回</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-container>
            <v-row>
                <v-col cols="auto"
                    ><v-img
                        :src="$store.state.userInfo.imgUrl"
                        max-height="200"
                        max-width="200"
                        class="rounded"
                    ></v-img
                ></v-col>
                <v-col>
                    <v-card dark flat>
                        <v-card-title class="headline">
                            {{ $store.state.userInfo.username }}
                        </v-card-title>

                        <v-card-subtitle>{{
                            $store.state.userInfo.email
                        }}</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12">
                    <v-card color="#385F73" dark>
                        <v-card-title class="headline">
                            我常听的歌曲
                        </v-card-title>

                        <v-card-subtitle
                            >这里记录着
                            {{ $store.state.userInfo.username }}
                            一个星期内常听的歌曲</v-card-subtitle
                        >

                        <v-card-text>
                            暂无听过的歌曲~还不快去听歌 😤
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card color="#1F7087" dark>
                        <v-card-title class="headline">
                            我喜欢的歌曲
                        </v-card-title>

                        <v-card-subtitle
                            >这里记录着
                            {{ $store.state.userInfo.username }}
                            喜欢听的歌曲</v-card-subtitle
                        >

                        <v-card-text>
                            <span v-if="$store.state.myLoveList.length === 0">
                                这人什么屌喜欢的歌都没 😲
                            </span>

                            <v-list v-else>
                                <v-list-item
                                    v-for="item in $store.state.myLoveList"
                                    :key="item.id"
                                >
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card color="#952175" dark>
                        <v-card-title class="headline">
                            我收藏的歌单
                        </v-card-title>

                        <v-card-subtitle
                            >这里记录着
                            {{ $store.state.userInfo.username }}
                            收藏的歌单</v-card-subtitle
                        >

                        <v-card-text> 这人什么屌歌单都没收藏 👺 </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
// 引入请求配置
import NWOPT from "@/network/options.js";

export default {
    data() {
        return {
            
        };
    },
    methods: {
        /**
         * 初始化
         */
        init() {
            
        },
        
    },
    created() {

    },
};
</script>

<style>
</style>