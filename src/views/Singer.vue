<template>
    <v-container fluid width="100%">
        <v-row>
            <v-col cols="12">
                <v-subheader class="white--text text-h5"
                    >探索新歌手</v-subheader
                >
                <v-card
                    class="d-inline-block secondary ml-3 mr-8 elevation-0"
                    v-for="item in newSinger"
                    :key="item.name"
                    link
                >
                    <v-container
                        class="py-0"
                        @click="$yyMusic.changeMusic([item])"
                    >
                        <v-row>
                            <v-img
                                height="180"
                                width="180"
                                :src="item.songImg"
                                class="rounded-lg d-block"
                            ></v-img>
                        </v-row>
                        <v-row class="pl-1 pt-2">
                            <div class="white--text d-block">
                                {{ item.tsinger.singerName }}
                            </div>
                        </v-row>
                        <v-row class="pl-1">
                            <div class="grey--text d-block">
                                {{ item.songName }}
                            </div>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="justify-space-between">
            <v-col cols="7"
                ><v-subheader class="white--text text-h5">热门</v-subheader>

                <v-list>
                    <v-list-item
                        v-for="(item, index) in popularSinger"
                        :key="item.name"
                        class="quaternary rounded ml-3 mb-3"
                        dense
                        style="height: 50px"
                        link
                    >
                        <v-list-item-avatar rounded>
                            <v-img :src="item.songImg"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content class="ml-2">
                            <v-list-item-title>{{
                                index + 1
                            }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content class="mr-10" style="flex-grow: 8">
                            <v-list-item-title>{{
                                item.tsinger.singerName
                            }}</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-content class="ml-10 text-right">
                            <v-list-item-title>3:23</v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action link>
                            <v-list-item-icon class="mx-auto align-center">
                                <v-btn icon>
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </v-list-item-icon>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
            </v-col>
            <v-col cols="5" class="">
                <v-subheader class="white--text text-h5 pl-1">氛围</v-subheader>
                <v-row>
                    <v-col cols="6">
                        <v-card
                            height="197px"
                            class="quaternary justify-center align-center d-flex"
                            link
                        >
                            <h1>古典</h1>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card
                            height="197px"
                            class="quaternary justify-center align-center d-flex"
                            link
                        >
                            <h1>流行</h1>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-card
                            height="197px"
                            class="quaternary justify-center align-center d-flex"
                            link
                        >
                            <h1>西方</h1>
                        </v-card>
                    </v-col>
                    <v-col cols="6">
                        <v-card
                            height="197px"
                            class="quaternary justify-center align-center d-flex"
                            link
                        >
                            <h1>阿萨德</h1>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// 引入请求配置
import NWOPT from "@/network/options.js";
export default {
    data: () => {
        return {
            // 新歌手
            newSinger: [],
            // 热门歌手
            popularSinger: [],
        };
    },
    methods: {
        requestSongerList() {
            this.$yyRequest({
                url: NWOPT.HOTSONG,
            }).then((res) => {
                let data = res.data.rows;

                this.newSinger = data;

                this.popularSinger = data;
            });
        },
    },
    mounted() {
        this.requestSongerList();
    },
};
</script>

<style>
</style>