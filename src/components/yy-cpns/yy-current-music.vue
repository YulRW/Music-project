<template>
    <v-card>
        <!-- 顶部操作栏 -->
        <v-toolbar dark color="primary" dense class="rounded-0">
            <v-icon class="mx-4" large>mdi-music-accidental-double-flat</v-icon>

            <v-toolbar-title>{{
                $store.state.currentMusic.songName
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn dark text @click="$yyHot.update(['status','currentMusicOpen'],false)"
                    >返回</v-btn
                >
            </v-toolbar-items>
        </v-toolbar>
        <v-container> 
            <v-row>
                <!-- 唱片 -->
                <yy-music-box :isPlay='$store.state.isPlay'></yy-music-box>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import yyMusicBox from "@/components/yy-cpns/yy-music-box";
export default {
    components: {
        yyMusicBox,
    },
};
</script>

<style>
</style>