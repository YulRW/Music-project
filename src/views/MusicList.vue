<template>
    <div>
        <v-container fluid>
            <v-row>
                <v-col cols="7"
                    ><v-row dense>
                        <v-col
                            v-for="(card, index) in cards"
                            :key="index"
                            :cols="cardsFlex[index]"
                        >
                            <v-card link class="quaternary">
                                <v-img
                                    :src="card.listImg"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                                >
                                    <v-card-title
                                        v-text="card.listName"
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
                <v-col cols="5"
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
// 引入请求配置
import NWOPT from "@/network/options.js";
export default {
    data: () => {
        return {
            cards: [],
            cardsFlex: [4, 6, 2, 6, 6, 5, 3, 4],
        };
    },
    methods: {
        requestData() {
            this.$yyRequest({
                url: NWOPT.HOTLIST,
            }).then((res) => {
                let data = res.data.rows;
                console.log(data);
                this.cards.push(...data)
                this.cards.push(...data)
                this.cards = this.cards.slice(0,8)

            });
        },
    },
    mounted() {
        this.requestData();
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