<template>
    <v-container fluid fill-height>
        <v-row justify="center">
            <v-card>
                <v-carousel
                    :v-model="0"
                    cycle
                    hide-delimiter-background
                    delimiter-icon="mdi-minus"
                    height='315'
                >
                    <v-carousel-item
                        v-for="(item, index) in surlyPic"
                        :key="index"
                        :src="item.surlyImgUrl"
                        style="width:810px"
                        ripple
                        link
                        @click="$yyMusic.changeMusic([item.tsong])"
                    >
                    </v-carousel-item>
                </v-carousel>
            </v-card>
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
    },
    mounted() {
        this.requestData();
    },
};
</script>

<style scoped>
</style>