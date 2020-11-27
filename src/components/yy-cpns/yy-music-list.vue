<template>
    <v-card>
        <!-- 顶部操作栏 -->
        <v-toolbar dark color="primary" dense class="rounded-0">
            <v-icon class="mx-4" large>mdi-music-box-multiple</v-icon>

            <v-toolbar-title>{{
                $store.state.currentMusicList.listName
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
                        :src="$store.state.currentMusicList.listImg"
                        max-height="200"
                        max-width="200"
                        class="rounded"
                    ></v-img
                ></v-col>
                <v-col>
                    <v-card dark flat>
                        <v-card-title class="headline">
                            {{ $store.state.currentMusicList.listName }}
                        </v-card-title>

                        <v-card-subtitle>{{
                            $store.state.currentMusicList.id
                        }}</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in $store.state.songList"
                            :key="item.name"
                            class="quaternary rounded mb-3"
                            dense
                            style="height: 50px"
                            link
                            @click="$yyHot.update('curPlayerIndex', index)"
                        >
                            <v-list-item-avatar rounded>
                                <v-img :src="item.songImg"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content class="ml-2">
                                <v-list-item-title>{{
                                    index + 1
                                }}</v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-content>
                                <v-list-item-title>{{
                                    item.songName
                                }}</v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-content
                                class="mr-10"
                                style="flex-grow: 12"
                            >
                                <v-list-item-title class="grey--text">{{
                                    item.tsinger.singerName
                                }}</v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-content class="ml-10 text-right">
                                <v-list-item-title>{{
                                    $yyMusic.numberToTime(item.songTime)
                                }}</v-list-item-title>
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
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>