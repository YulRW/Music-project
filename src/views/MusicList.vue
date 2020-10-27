<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col cols="6"
                    ><v-row dense>
                        <v-col
                            v-for="card in cards"
                            :key="card.title"
                            :cols="card.flex"
                        >
                            <v-card>
                                <v-img
                                    :src="card.src"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                                >
                                    <v-card-title
                                        v-text="card.title"
                                    ></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                    </v-btn>

                                    <v-btn icon>
                                        <v-icon>mdi-bookmark</v-icon>
                                    </v-btn>

                                    <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row></v-col
                >
                <v-col cols="6"
                    ><v-hover v-slot:default="{ hover }">
                        <v-card
                            class="mx-auto"
                            color="grey lighten-4"
                            max-width="600"
                            
                        >
                            <v-img
                                :aspect-ratio="16 / 9"
                                src="https://cdn.vuetifyjs.com/images/cards/kitchen.png"
                            >
                                <!-- 悬停 -->
                                <v-expand-transition>
                                    <div
                                        v-if="hover"
                                        class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
                                        style="height: 100%"
                                    >
                                        机场追星产业链有这这这这这这么长
                                    </div>
                                </v-expand-transition>
                            </v-img>
                            <v-card-text
                                class="pt-3 pb-3"
                                style="position: relative"
                            >
                                <v-btn
                                    absolute
                                    color="primary"
                                    class="white--text"
                                    fab
                                    large
                                    right
                                    top
                                >
                                    <v-icon large>mdi-music</v-icon>
                                </v-btn>
                                <div
                                    class="font-weight-light grey--text title mb-2"
                                >
                                    For the perfect meal
                                </div>
                                <h5
                                    class="display-1 font-weight-light primary--text mb-1"
                                >
                                    QW cooking utensils
                                </h5>
                            </v-card-text>
                        </v-card>
                    </v-hover></v-col
                >
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            cards: [
                {
                    title: "[一周新歌推荐] 陈奕迅全新粤语作品，携希望与你共舞",
                    src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
                    flex: 4,
                },
                {
                    title: "「电子」美好的日月星辰在前方等着你去欣赏",
                    src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
                    flex: 6,
                },
                {
                    title: "你最近过得好吗？",
                    src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
                    flex: 2,
                },
                {
                    title: "土嗨神曲 ♪ 车载抖腿~提神醒脑",
                    src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                    flex: 6,
                },
                {
                    title: "好运来-抖音呲花-翻自祖海",
                    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                    flex: 6,
                },
                {
                    title: "网易云比你懂我",
                    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                    flex: 5,
                },
                {
                    title: " SEVENTEEN撒娇情话6到飞起，当红男团为何狂野呐喊？",
                    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                    flex: 3,
                },
                {
                    title: "机场追星产业链有这这这这这这么长",
                    src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                    flex: 4,
                },
            ],
        };
    },
};
</script>

<style scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
}
</style>