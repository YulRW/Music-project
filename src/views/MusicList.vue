<template>
    <v-container fluid>
        <v-row>
            <v-col cols="7">
                <v-row
                    ><v-subheader class="white--text text-h5"
                        >热门歌单</v-subheader
                    ></v-row
                >

                <v-row dense>
                    <v-col
                        v-for="(card, index) in cards"
                        :key="index"
                        :cols="cardsFlex[index]"
                        class="pb-3 pr-3"
                    >
                        <v-hover v-slot:default="{ hover }">
                            <v-card color="grey" link class="quaternary">
                                <v-img
                                    :src="card.listImg"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
                                    height="200px"
                                    @click="changeList(card,true)"
                                >
                                    <!-- 悬停 -->
                                    <v-expand-transition>
                                        <div
                                            v-if="hover"
                                            class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
                                            style="height: 100%"
                                        >
                                            {{ card.listName }}
                                        </div>
                                    </v-expand-transition>
                                </v-img>

                                <v-card-text
                                    class="pt-3 pb-3"
                                    style="position: relative"
                                >
                                    <!-- 浮动按钮 -->
                                    <v-btn
                                        absolute
                                        color="primary"
                                        class="white--text"
                                        fab
                                        right
                                        top
                                        @click="changeList(card,false)"
                                    >
                                        <v-icon large>mdi-music</v-icon>
                                    </v-btn>
                                </v-card-text>
                            </v-card>
                        </v-hover>
                    </v-col>
                </v-row></v-col
            >
            <v-col cols="5"> </v-col>
        </v-row>
    </v-container>
</template>

<script>
// 引入请求配置
import NWOPT from "@/network/options.js";
export default {
    data: () => {
        return {
            cards: [],
            cardsFlex: [4, 5, 3, 6, 6, 5, 3, 4],
        };
    },
    methods: {
        requestData() {
            this.$yyRequest({
                url: NWOPT.HOTLIST,
            }).then((res) => {
                let data = res.data.rows;
                this.cards.push(...data);
            });
        },
        changeList(card,type){
            if(type){
                this.$store.state.status.currentMusicListOpen = true
            }
            this.$yyHot.update('currentMusicList',card)
            this.$yyRequest({
                url:NWOPT.SONGLISTINFO,
                params:{
                    songListId:card.id
                }
            }).then(res=>{
                this.$store.state.songList = res.data
            })
        }
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