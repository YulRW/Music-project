<template>
    <v-container fluid fill-height>
        <v-row justify="center" class="align-self-start">
            <v-col cols="8">
                <v-subheader class="white--text text-h5 mb-2">
                    发现
                </v-subheader>

                <v-row class="d-flex flex-nowrap ml-3">
                    <v-card style="width: 70%">
                        <!-- 轮播图 -->
                        <v-carousel
                            v-model="carousel"
                            cycle
                            hide-delimiter-background
                            delimiter-icon="mdi-minus"
                            height="344"
                            @change="changeCarousel"
                        >
                            <v-carousel-item
                                v-for="(item, index) in surlyPic"
                                :key="index"
                                :src="item.surlyImgUrl"
                                ripple
                                link
                                @click="$yyMusic.changeMusic([item.tsong])"
                            >
                                <!-- 885px -->
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>

                    <v-card
                        min-width="244"
                        max-width="244"
                        height="344"
                        class="carousel-btn"
                        flat
                    >
                        <v-expansion-panels
                            popout
                            accordion
                            v-model="panels"
                            mandatory
                        >
                            <template v-for="(item, i) in surlyPic">
                                <v-expansion-panel
                                    :key="i"
                                    :class="
                                        i == panels
                                            ? 'rounded-xl primary'
                                            : 'quaternary'
                                    "
                                    @click="handlePanel(i)"
                                >
                                    <v-expansion-panel-header>{{
                                        item.tsong.songName
                                    }}</v-expansion-panel-header>
                                    <v-expansion-panel-content
                                        class="grey--text"
                                    >
                                        {{ item.tsong.tsinger.singerName }}
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </template>
                        </v-expansion-panels>
                    </v-card>
                </v-row>

                <v-subheader class="white--text text-h5 mt-5">
                    新事物
                </v-subheader>

                <v-row>
                    <v-card class="secondary" flat>
                        <v-slide-group
                            :v-model="null"
                            class="pa-4"
                            show-arrows
                        >
                            <v-slide-item
                                v-for="item in newSinger"
                                :key="item.name"
                            >
                                <v-card
                                    class="d-inline-block ml-0 mr-8 secondary"
                                    link
                                    flat
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
                            </v-slide-item>
                        </v-slide-group>
                    </v-card>
                </v-row>
            </v-col>
            <v-col cols="4">
                <v-subheader class="white--text text-h5">
                    每日一推
                </v-subheader>

                <v-col v-for="(item, i) in musicList" :key="i" cols="12">
                    <v-card :color="i % 2 == 0 ? '#1F7087' : '#952175'" dark>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div>
                                <v-card-title
                                    class="headline"
                                    v-text="item.songName"
                                ></v-card-title>

                                <v-card-subtitle
                                    v-text="item.tsinger.singerName"
                                ></v-card-subtitle>

                                <v-card-actions>
                                    <v-btn
                                        v-if="i % 2 == 1"
                                        class="ml-2 mt-3"
                                        fab
                                        icon
                                        height="40px"
                                        right
                                        width="40px"
                                        @click="$yyMusic.changeMusic([item])"
                                    >
                                        <v-icon>mdi-play</v-icon>
                                    </v-btn>

                                    <v-btn
                                        v-else
                                        class="ml-2 mt-5"
                                        outlined
                                        rounded
                                        small
                                        @click="$yyMusic.changeMusic([item])"
                                    >
                                        START RADIO
                                    </v-btn>
                                </v-card-actions>
                            </div>

                            <v-avatar class="ma-3" size="125" tile>
                                <v-img :src="item.songImg"></v-img>
                            </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// 引入请求配置
import NWOPT from "@/network/options.js";
export default {
    data() {
        return {
            surlyPic: [],

            // 当前扩展面板
            panels: 0,

            // 当前轮播图
            carousel: 0,

            // 推荐歌曲
            newSinger: [],

            // 推荐歌单
            musicList: [],
        };
    },
    methods: {
        requestData() {
            this.$yyRequest({
                url: NWOPT.SURLYPIC,
            }).then((res) => {
                console.log(res);
                this.surlyPic = res.data;
            });
        },
        changeCarousel(index) {
            this.panels = index;
            setTimeout(() => {
                this.panels = index;
            }, 0);
        },
        handlePanel(index) {
            this.carousel = index;
        },
    },
    mounted() {
        this.requestData();

        this.$yyRequest({
            url: NWOPT.HOTSONG,
        }).then((res) => {
            let data = res.data.rows;

            this.newSinger = data;
            this.musicList = data.slice(0,4);
        });
    },
};
</script>

<style scoped>
.carousel-btn {
    position: relative;
    left: -16px;
    background-color: transparent;
}
</style>